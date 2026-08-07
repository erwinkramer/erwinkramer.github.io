import atom from 'astrojs-atom';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

type ArticleEntry = {
  id: string;
  data: {
    title: string;
    description?: string;
    date?: Date;
  };
};

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://guanchen.nl');
  const posts = ((await getCollection('docs')) as ArticleEntry[])
    .filter((entry) => entry.id.startsWith('articles/') && entry.data.date)
    .sort((a, b) => (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0));

  const feedUrl = new URL('/atom.xml', site).toString();
  const articlesUrl = new URL('/articles/', site).toString();
  const updated = posts[0]?.data.date ?? new Date();

  return atom({
    title: 'Guanchen Articles',
    subtitle: 'Short articles from Guanchen.',
    id: feedUrl,
    updated: updated.toISOString(),
    link: [
      { href: feedUrl, rel: 'self', type: 'application/atom+xml' },
      { href: articlesUrl },
    ],
    author: [{ name: 'Erwin Kramer', uri: new URL('/', site).toString() }],
    entry: posts.map((post) => {
      const postUrl = new URL(`/${post.id}/`, site).toString();
      const date = post.data.date ?? updated;

      return {
        id: postUrl,
        title: post.data.title,
        updated: date.toISOString(),
        published: date.toISOString(),
        link: [{ href: postUrl }],
        summary: post.data.description ?? '',
      };
    }),
  });
}