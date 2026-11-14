import atom from 'astrojs-atom';
import type { APIContext } from 'astro';
import { getArticles } from '../articles';
import { siteInfo } from '../site';

export async function GET(context: APIContext) {
  const siteUrl = context.site ?? new URL(siteInfo.url);
  const posts = await getArticles();

  const feedUrl = new URL(siteInfo.feed.path, siteUrl).toString();
  const articlesUrl = new URL(siteInfo.feed.articlesPath, siteUrl).toString();
  const updated = posts[0]?.data.date ?? new Date();

  return atom({
    title: siteInfo.feed.title,
    subtitle: siteInfo.feed.subtitle,
    id: feedUrl,
    updated: updated.toISOString(),
    link: [
      { href: feedUrl, rel: 'self', type: 'application/atom+xml' },
      { href: articlesUrl },
    ],
    author: [{ name: siteInfo.author.name, uri: new URL('/', siteUrl).toString() }],
    entry: posts.map((post) => {
      const postUrl = new URL(`/${post.id}/`, siteUrl).toString();
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