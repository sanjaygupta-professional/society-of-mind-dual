#!/usr/bin/env node
/**
 * Society of Mind - Diagram Builder
 *
 * Extracts Mermaid diagrams from all chapter overview files and generates
 * beautiful SVGs using the tokyo-night theme.
 *
 * Usage:
 *   node scripts/build-diagrams.mjs           # Build all diagrams
 *   node scripts/build-diagrams.mjs --watch   # Watch for changes
 *   node scripts/build-diagrams.mjs --clean   # Remove generated files
 */

import { renderMermaid, THEMES } from 'beautiful-mermaid';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, existsSync } from 'fs';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const CHAPTERS_DIR = join(PROJECT_ROOT, 'src/content/docs/chapters');
const OUTPUT_DIR = join(PROJECT_ROOT, 'public/diagrams');
const THEME = THEMES['tokyo-night'];

// Parse command line args
const args = process.argv.slice(2);
const isClean = args.includes('--clean');
const isWatch = args.includes('--watch');

/**
 * Extract Mermaid code blocks from markdown content
 */
function extractMermaidBlocks(content) {
  const blocks = [];
  const regex = /```mermaid\n([\s\S]*?)```/g;
  let match;
  let index = 0;

  while ((match = regex.exec(content)) !== null) {
    blocks.push({
      index: index++,
      code: match[1].trim()
    });
  }

  return blocks;
}

/**
 * Get chapter ID from directory name (e.g., "01-building-blocks" -> "ch01")
 */
function getChapterId(dirName) {
  const match = dirName.match(/^(\d+)/);
  return match ? `ch${match[1].padStart(2, '0')}` : null;
}

/**
 * Get chapter slug from directory name (e.g., "01-building-blocks" -> "building-blocks")
 */
function getChapterSlug(dirName) {
  return dirName.replace(/^\d+-/, '');
}

/**
 * Process a single chapter's overview.md file
 */
async function processChapter(chapterDir) {
  const overviewPath = join(CHAPTERS_DIR, chapterDir, 'overview.md');

  if (!existsSync(overviewPath)) {
    return { chapter: chapterDir, diagrams: [], error: 'No overview.md found' };
  }

  const content = readFileSync(overviewPath, 'utf-8');
  const blocks = extractMermaidBlocks(content);

  if (blocks.length === 0) {
    return { chapter: chapterDir, diagrams: [], error: 'No Mermaid blocks found' };
  }

  const chapterId = getChapterId(chapterDir);
  const chapterSlug = getChapterSlug(chapterDir);
  const results = [];

  for (const block of blocks) {
    const suffix = blocks.length > 1 ? `-${block.index + 1}` : '';
    const filename = `${chapterId}-${chapterSlug}${suffix}.svg`;
    const filepath = join(OUTPUT_DIR, filename);

    try {
      const svg = await renderMermaid(block.code, THEME);
      writeFileSync(filepath, svg);
      results.push({
        filename,
        success: true,
        code: block.code
      });
    } catch (err) {
      results.push({
        filename,
        success: false,
        error: err.message,
        code: block.code
      });
    }
  }

  return { chapter: chapterDir, diagrams: results };
}

/**
 * Clean generated files
 */
function clean() {
  if (existsSync(OUTPUT_DIR)) {
    rmSync(OUTPUT_DIR, { recursive: true });
    console.log('Cleaned: public/diagrams/');
  }
}

/**
 * Build all diagrams
 */
async function build() {
  console.log('Society of Mind - Diagram Builder');
  console.log('Theme: tokyo-night\n');

  // Ensure output directory exists
  mkdirSync(OUTPUT_DIR, { recursive: true });

  // Get all chapter directories
  const chapters = readdirSync(CHAPTERS_DIR)
    .filter(d => /^\d+/.test(d))
    .sort((a, b) => {
      const numA = parseInt(a.match(/^(\d+)/)[1]);
      const numB = parseInt(b.match(/^(\d+)/)[1]);
      return numA - numB;
    });

  console.log(`Found ${chapters.length} chapters\n`);

  const manifest = {
    generated: new Date().toISOString(),
    theme: 'tokyo-night',
    chapters: []
  };

  let successCount = 0;
  let failCount = 0;

  for (const chapter of chapters) {
    const result = await processChapter(chapter);

    const successDiagrams = result.diagrams.filter(d => d.success);
    const failedDiagrams = result.diagrams.filter(d => !d.success);

    if (result.diagrams.length === 0) {
      console.log(`  ${chapter}: No diagrams`);
    } else {
      const status = failedDiagrams.length > 0 ? '!' : '+';
      console.log(`${status} ${chapter}: ${successDiagrams.length} diagram(s)`);

      for (const d of successDiagrams) {
        console.log(`    -> ${d.filename}`);
        successCount++;
      }

      for (const d of failedDiagrams) {
        console.log(`    !! ${d.filename}: ${d.error}`);
        failCount++;
      }
    }

    manifest.chapters.push({
      id: getChapterId(chapter),
      slug: getChapterSlug(chapter),
      dir: chapter,
      diagrams: result.diagrams.map(d => ({
        filename: d.filename,
        success: d.success,
        error: d.error
      }))
    });
  }

  // Write manifest
  writeFileSync(
    join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  console.log('\n' + '='.repeat(50));
  console.log(`Generated: ${successCount} SVG files`);
  if (failCount > 0) {
    console.log(`Failed: ${failCount} diagrams`);
  }
  console.log(`Output: public/diagrams/`);
  console.log(`Manifest: public/diagrams/manifest.json`);
}

/**
 * Watch mode (simplified - just rebuilds on any change)
 */
async function watch() {
  const { watch: fsWatch } = await import('fs');

  console.log('Watching for changes... (Ctrl+C to stop)\n');
  await build();

  fsWatch(CHAPTERS_DIR, { recursive: true }, async (eventType, filename) => {
    if (filename && filename.endsWith('overview.md')) {
      console.log(`\nChange detected: ${filename}`);
      await build();
    }
  });
}

// Main
if (isClean) {
  clean();
} else if (isWatch) {
  watch();
} else {
  build().catch(err => {
    console.error('Build failed:', err);
    process.exit(1);
  });
}
