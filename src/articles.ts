import { getCollection, type CollectionEntry } from 'astro:content';

type ArticleEntry = CollectionEntry<'docs'>;
export type DatedArticle = ArticleEntry & { data: ArticleEntry['data'] & { date: Date } };

export const articleDateFormatter = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

const getArticleOrder = (article: DatedArticle) => article.data.sidebar?.order ?? Number.MAX_SAFE_INTEGER;

const isDatedArticle = (entry: ArticleEntry): entry is DatedArticle =>
  entry.id.startsWith('articles/') && entry.data.date instanceof Date;

const compareArticlesByDate = (left: DatedArticle, right: DatedArticle) => {
  const dateDifference = right.data.date.getTime() - left.data.date.getTime();

  return dateDifference || getArticleOrder(left) - getArticleOrder(right) || left.id.localeCompare(right.id);
};

export async function getArticles() {
  return (await getCollection('docs')).filter(isDatedArticle).sort(compareArticlesByDate);
}