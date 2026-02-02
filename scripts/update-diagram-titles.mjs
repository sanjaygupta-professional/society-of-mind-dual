#!/usr/bin/env node
/**
 * Updates diagram titles in chapter overview.md files
 * Replaces generic "Tokyo-night theme (beautiful-mermaid):" with descriptive titles
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

// Mapping of chapter numbers to descriptive diagram titles
const DIAGRAM_TITLES = {
  '01': 'Agent Hierarchy: Builder → Specialists → Effectors',
  '02': 'Task Decomposition: Whole → Sub-problems → Agents',
  '03': 'Conflict Resolution: Goals → Negotiation → Behavior',
  '04': 'Self-Model Construction: Reflection, Prediction, Control',
  '05': 'Mind Development: Universal Agents → Unique Connections',
  '06': 'Consciousness Gap: Unconscious Work vs Narrative Report',
  '07': 'Problem Solving: Goals → Sub-problems → Agency Solution',
  '08': 'K-line Memory: Experience → Recording → Reactivation',
  '09': 'Hierarchical Abstraction: Detail → Summaries → Concepts',
  '10': 'Meta-Management: Skills + Organization = New Capability',
  '11': 'Spatial Reasoning: Maps → Navigation → Abstract Thinking',
  '12': 'Polyneme Networks: Word → Multi-agency Activation',
  '13': 'Perception Loop: Senses + Expectations → Beliefs',
  '14': 'Problem Transformation: New Form → New Solution',
  '15': 'Conscious Experience: STM + K-lines + Self-Model',
  '16': 'Emotional Reconfiguration: Trigger → Agency Reordering',
  '17': 'Cognitive Development: Infancy → Adulthood Layered Build',
  '18': 'Reasoning Chain: Premise → Agent Links → Conclusion',
  '19': 'Word-Idea Networks: Words Activate Multi-network Ideas',
  '20': 'Ambiguity Resolution: Context Agents → Winning Interpretation',
  '21': 'Transformation Frames: Before → Action → After State',
  '22': 'Expression Pipeline: Thought → Selection → Communication',
  '23': 'Comparison Operations: Similarity, Difference, Analogy',
  '24': 'Frame Matching: Observation → Defaults → Mismatch Handling',
  '25': 'Multi-perspective Frames: Viewpoints → Coherent Perception',
  '26': 'Sentence Frames: Structure Slots → Semantic Understanding',
  '27': 'Mental Censoring: Thought Check → Allow/Redirect/Bypass',
  '28': 'Mental Models: Senses → Predictions → Actions Loop',
  '29': 'Thought Realms: Concrete → Abstract → Reflective',
  '30': 'Soul Emergence: Agents → Society → Person → Understanding'
};

// Path to chapters directory
const chaptersDir = join(process.cwd(), 'src/content/docs/chapters');

// Pattern to match the generic title line
const OLD_PATTERN = /<p style="color: #7aa2f7; font-size: 0\.85rem; margin-bottom: 0\.75rem; font-weight: 500;">Tokyo-night theme \(beautiful-mermaid\):<\/p>/;

function getChapterNumber(folderName) {
  // Extract chapter number from folder name like "01-building-blocks"
  const match = folderName.match(/^(\d+)-/);
  return match ? match[1] : null;
}

function updateChapterFile(chapterFolder) {
  const chapterNum = getChapterNumber(chapterFolder);
  if (!chapterNum || !DIAGRAM_TITLES[chapterNum]) {
    console.log(`⚠️  Skipping ${chapterFolder} - no title mapping found`);
    return false;
  }

  const filePath = join(chaptersDir, chapterFolder, 'overview.md');

  try {
    const content = readFileSync(filePath, 'utf-8');

    if (!OLD_PATTERN.test(content)) {
      // Check if already updated
      if (content.includes(DIAGRAM_TITLES[chapterNum])) {
        console.log(`✓  ${chapterFolder} - already updated`);
        return true;
      }
      console.log(`⚠️  ${chapterFolder} - pattern not found`);
      return false;
    }

    const newTitle = DIAGRAM_TITLES[chapterNum];
    const newLine = `<p style="color: #7aa2f7; font-size: 0.85rem; margin-bottom: 0.75rem; font-weight: 500;">${newTitle}</p>`;

    const updatedContent = content.replace(OLD_PATTERN, newLine);
    writeFileSync(filePath, updatedContent, 'utf-8');

    console.log(`✅ ${chapterFolder} → "${newTitle}"`);
    return true;
  } catch (error) {
    console.error(`❌ Error updating ${chapterFolder}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🔄 Updating diagram titles...\n');

  const chapters = readdirSync(chaptersDir)
    .filter(f => f.match(/^\d+-/))
    .sort();

  let updated = 0;
  let skipped = 0;

  for (const chapter of chapters) {
    if (updateChapterFile(chapter)) {
      updated++;
    } else {
      skipped++;
    }
  }

  console.log(`\n📊 Summary: ${updated} updated, ${skipped} skipped`);
  console.log('✨ Done!');
}

main();
