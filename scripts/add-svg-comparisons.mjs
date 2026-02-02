#!/usr/bin/env node
/**
 * Add pre-generated beautiful-mermaid SVGs alongside existing mermaid blocks
 * for side-by-side comparison.
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const CHAPTERS_DIR = join(PROJECT_ROOT, 'src/content/docs/chapters');

function getChapterId(dirName) {
  const match = dirName.match(/^(\d+)/);
  return match ? `ch${match[1].padStart(2, '0')}` : null;
}

function getChapterSlug(dirName) {
  return dirName.replace(/^\d+-/, '');
}

function processChapter(chapterDir) {
  const overviewPath = join(CHAPTERS_DIR, chapterDir, 'overview.md');
  let content = readFileSync(overviewPath, 'utf-8');

  // Skip if already has the comparison
  if (content.includes('<!-- beautiful-mermaid comparison -->')) {
    console.log(`  ${chapterDir}: Already has comparison, skipping`);
    return false;
  }

  const chapterId = getChapterId(chapterDir);
  const chapterSlug = getChapterSlug(chapterDir);
  const svgPath = `/diagrams/${chapterId}-${chapterSlug}.svg`;

  // Find the mermaid code block and add SVG after it
  const mermaidRegex = /(```mermaid\n[\s\S]*?```)/;
  const match = content.match(mermaidRegex);

  if (!match) {
    console.log(`  ${chapterDir}: No mermaid block found`);
    return false;
  }

  const comparison = `

<!-- beautiful-mermaid comparison -->
<div style="margin-top: 1.5rem; padding: 1rem; background: #1a1b26; border-radius: 8px;">
  <p style="color: #7aa2f7; font-size: 0.85rem; margin-bottom: 0.75rem; font-weight: 500;">Tokyo-night theme (beautiful-mermaid):</p>
  <img src="${svgPath}" alt="Chapter diagram - tokyo-night theme" style="max-width: 100%; height: auto;" />
</div>
<!-- end beautiful-mermaid comparison -->`;

  // Insert after the mermaid block
  content = content.replace(mermaidRegex, `$1${comparison}`);

  writeFileSync(overviewPath, content);
  console.log(`+ ${chapterDir}: Added comparison`);
  return true;
}

// Main
console.log('Adding beautiful-mermaid SVG comparisons to chapters\n');

const chapters = readdirSync(CHAPTERS_DIR)
  .filter(d => /^\d+/.test(d))
  .sort((a, b) => parseInt(a) - parseInt(b));

let updated = 0;
for (const chapter of chapters) {
  if (processChapter(chapter)) {
    updated++;
  }
}

console.log(`\nDone: ${updated} chapters updated`);
