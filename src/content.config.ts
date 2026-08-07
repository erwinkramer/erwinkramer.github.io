import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        author: z.string().optional(),
        date: z.coerce.date().optional(),
        giscus: z.boolean().optional(),
      }),
    }),
  }),
};