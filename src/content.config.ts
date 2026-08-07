import { defineCollection, z } from 'astro:content';
import { feedLoader } from '@ascorbic/feed-loader';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const articleFeedUrl = 'https://guanchen.nl/atom.xml';

export const collections = {
  articleFeed: defineCollection({
    loader: feedLoader({ url: articleFeedUrl }),
  }),
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