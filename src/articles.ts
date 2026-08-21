import { getCollection, type CollectionEntry } from 'astro:content';
import { articleNavItems } from './article-nav.mjs';

type ArticleEntry = CollectionEntry<'docs'>;
export type DatedArticle = ArticleEntry & { data: ArticleEntry['data'] & { date: Date } };

const articleRank = new Map(
  articleNavItems.map((item, index) => [item.link.replace(/^\//, '').replace(/\/$/, ''), index]),
);

export const articleDateFormatter = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

const rankArticle = (article: DatedArticle) => articleRank.get(article.id) ?? Number.MAX_SAFE_INTEGER;

const isDatedArticle = (entry: ArticleEntry): entry is DatedArticle =>
  entry.id.startsWith('articles/') && entry.data.date instanceof Date;

const compareArticlesByDate = (left: DatedArticle, right: DatedArticle) => {
  const dateDifference = right.data.date.getTime() - left.data.date.getTime();

  return dateDifference || rankArticle(left) - rankArticle(right);
};

export async function getArticles() {
  return (await getCollection('docs')).filter(isDatedArticle).sort(compareArticlesByDate);
}