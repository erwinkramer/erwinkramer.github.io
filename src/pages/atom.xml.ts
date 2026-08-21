import atom from 'astrojs-atom';
import type { APIContext } from 'astro';
import { getArticles } from '../articles';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://guanchen.nl');
  const posts = await getArticles();

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