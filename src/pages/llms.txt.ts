import type { APIRoute } from 'astro';
import { getArticles } from '../articles.ts';
import { siteInfo } from '../site.ts';

export const GET: APIRoute = async () => {
  const articles = await getArticles();

  const docLines = articles.map((doc) => {
    const title = doc.data.title;
    const description = doc.data.description || '';
    const url = `${siteInfo.url}/${doc.id}.md`;
    return description ? `- [${title}](${url}): ${description}` : `- [${title}](${url})`;
  });

  const content = `# ${siteInfo.name}

> ${siteInfo.description}

This is the documentation site for ${siteInfo.name} at ${siteInfo.url}

## Articles

${docLines.join('\n')}
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
