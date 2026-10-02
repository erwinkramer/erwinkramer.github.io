import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware((context) => {
  const { entry, head } = context.locals.starlightRoute;

  // Point article pages at their raw markdown equivalent (llms.txt convention).
  if (entry.id.startsWith('articles/')) {
    head.push({
      tag: 'link',
      attrs: {
        rel: 'alternate',
        type: 'text/markdown',
        href: `/${entry.id}.md`,
      },
    });
  }
});
