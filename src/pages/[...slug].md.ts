import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

export const getStaticPaths: GetStaticPaths = async () => {
  const docs = await getCollection('docs');
  return docs
    .filter((entry) => entry.id.startsWith('articles/'))
    .map((entry) => {
      return {
        params: { slug: entry.id },
        props: { entry },
      };
    });
};

export const GET: APIRoute = ({ props }) => {
  const { entry } = props;
  const separator = '---';
  const content = [
    separator,
    `title: ${entry.data.title}`,
    separator,
    '',
    entry.body,
  ].join('\n');
  return new Response(content, {
    headers: {
      // text/markdown is the IANA-registered media type (RFC 7763); charset is required.
      'Content-Type': 'text/markdown; charset=utf-8',
      // llms.txt convention: describe this resource with the site index.
      Link: '</llms.txt>; rel="describedby"',
    },
  });
};
