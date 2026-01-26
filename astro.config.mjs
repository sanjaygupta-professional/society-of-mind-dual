// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

export default defineConfig({
  integrations: [
    // Mermaid MUST come before Starlight
    mermaid(),
    starlight({
      title: 'Society of Mind Visual',
      description: 'A dual-reader learning companion for The Society of Mind by Marvin Minsky',
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        { label: 'Book Overview', slug: 'overview' },
        {
          label: 'Chapters',
          autogenerate: { directory: 'chapters' },
        },
        {
          label: 'Core Concepts',
          autogenerate: { directory: 'concepts' },
        },
        {
          label: 'Learning Paths',
          autogenerate: { directory: 'paths' },
        },
      ],
    }),
  ],
});
