import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const guides = defineCollection({
  loader: glob({ base: './src/content/guides', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    language: z.enum(['ru', 'uk']),
    category: z.enum(['snaryazhenie', 'instrument']),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    pairedSlug: z.string().optional(),
  }),
});

export const collections = { guides };
