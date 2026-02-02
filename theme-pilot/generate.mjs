#!/usr/bin/env node
/**
 * Society of Mind × Beautiful-Mermaid Theme Pilot
 *
 * Generates SVG diagrams with tokyo-night and nord themes for visual comparison.
 */

import { renderMermaid, renderMermaidAscii, THEMES } from 'beautiful-mermaid';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, 'output');

// Ensure output directory exists
mkdirSync(OUTPUT_DIR, { recursive: true });

// Chapter 1: Building Blocks - Agent Hierarchy
const ch01Diagram = `flowchart TB
    B[Builder Agent] --> F[Find Agent]
    B --> G[Grasp Agent]
    B --> P[Place Agent]
    F --> S[See Agent]
    G --> M[Move Agent]
    P --> R[Release Agent]
    S --> E[Eyes]
    M --> H[Hand]`;

// Chapter 8: A Theory of Memory - K-line Flow
const ch08Diagram = `flowchart TB
    EXP[Experience] --> A1[Agent 1 Active]
    EXP --> A2[Agent 2 Active]
    EXP --> A3[Agent 3 Active]
    A1 --> K[K-line Created]
    A2 --> K
    A3 --> K
    K -->|later| R1[Reactivate Agent 1]
    K -->|later| R2[Reactivate Agent 2]
    K -->|later| R3[Reactivate Agent 3]
    R1 --> M[Memory Reconstructed]
    R2 --> M
    R3 --> M`;

const diagrams = [
  { id: 'ch01-building-blocks', title: 'Chapter 1: Building Blocks', code: ch01Diagram },
  { id: 'ch08-theory-of-memory', title: 'Chapter 8: A Theory of Memory', code: ch08Diagram },
];

const themes = ['tokyo-night', 'nord'];

async function generateAll() {
  console.log('🎨 Society of Mind × Beautiful-Mermaid Theme Pilot\n');
  console.log('Generating diagrams...\n');

  const results = [];

  for (const diagram of diagrams) {
    console.log(`📊 ${diagram.title}`);

    // Generate ASCII preview
    console.log('   └─ ASCII preview:');
    try {
      const ascii = renderMermaidAscii(diagram.code);
      const asciiPath = join(OUTPUT_DIR, `${diagram.id}-ascii.txt`);
      writeFileSync(asciiPath, ascii);
      console.log(`      ✓ Saved to ${diagram.id}-ascii.txt`);

      // Print ASCII to terminal (indented)
      const indentedAscii = ascii.split('\n').map(line => '      ' + line).join('\n');
      console.log('\n' + indentedAscii + '\n');
    } catch (err) {
      console.log(`      ✗ ASCII generation failed: ${err.message}`);
    }

    // Generate SVGs for each theme
    for (const themeName of themes) {
      const theme = THEMES[themeName];
      if (!theme) {
        console.log(`      ✗ Theme '${themeName}' not found`);
        continue;
      }

      try {
        const svg = await renderMermaid(diagram.code, theme);
        const filename = `${diagram.id}-${themeName}.svg`;
        const filepath = join(OUTPUT_DIR, filename);
        writeFileSync(filepath, svg);
        console.log(`   └─ ${themeName}: ✓ ${filename}`);

        results.push({
          diagram: diagram.id,
          title: diagram.title,
          theme: themeName,
          filename,
          code: diagram.code,
        });
      } catch (err) {
        console.log(`   └─ ${themeName}: ✗ ${err.message}`);
      }
    }
    console.log('');
  }

  // Generate comparison data for HTML gallery
  const galleryData = {
    generated: new Date().toISOString(),
    diagrams: diagrams.map(d => ({
      id: d.id,
      title: d.title,
      code: d.code,
      files: themes.map(t => ({
        theme: t,
        svg: `output/${d.id}-${t}.svg`,
        ascii: `output/${d.id}-ascii.txt`,
      })),
    })),
  };

  writeFileSync(
    join(__dirname, 'gallery-data.json'),
    JSON.stringify(galleryData, null, 2)
  );

  console.log('✨ Generation complete!');
  console.log(`   └─ ${results.length} SVG files generated`);
  console.log(`   └─ Gallery data: gallery-data.json`);
  console.log('\n📂 Open index.html in a browser to compare themes.');
}

generateAll().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
