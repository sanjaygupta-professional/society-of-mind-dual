import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { glob } from 'astro/loaders';

export const collections = {
  // Starlight companion content (diagrams, concepts, paths)
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),

  // Original book text (one file per chapter)
  original: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/original' }),
    schema: z.object({
      title: z.string(),
      chapter: z.number(),
      slug: z.string(),
    }),
  }),
};
