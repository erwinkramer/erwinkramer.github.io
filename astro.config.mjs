import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightGiscus from 'starlight-giscus';

const site = 'https://guanchen.nl';
const description =
  'Guanchen - technology consulting for resilient systems across cloud, APIs, integration, observability, and operations.';
const structuredData = JSON.stringify([
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Guanchen',
    url: site,
    description,
    inLanguage: 'en',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Guanchen',
    url: site,
    description,
    email: 'info@guanchen.nl',
    founder: {
      '@type': 'Person',
      name: 'Erwin Kramer',
      url: 'https://www.linkedin.com/in/kramererwin/',
      sameAs: ['https://github.com/erwinkramer', 'https://www.linkedin.com/in/kramererwin/'],
    },
    knowsAbout: ['Cloud consulting', 'API design', 'Integration architecture', 'Observability', 'Open source'],
  },
]);

export default defineConfig({
  site,
  integrations: [
    starlight({
      title: 'Guanchen',
      description,
      favicon: '/assets/g-logo.png',
      locales: {
        root: {
          label: 'English',
          lang: 'en',
        },
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/erwinkramer',
        },
      ],
      customCss: ['./src/styles/space-theme.css'],
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'alternate',
            type: 'application/atom+xml',
            title: 'Guanchen Articles',
            href: '/atom.xml',
          },
        },
        {
          tag: 'script',
          attrs: {
            type: 'application/ld+json',
          },
          content: structuredData,
        },
      ],
      plugins: [
        starlightGiscus({
          repo: 'erwinkramer/erwinkramer.github.io',
          repoId: 'R_kgDOIvvXuA',
          category: 'Announcements',
          categoryId: 'DIC_kwDOIvvXuM4DC21P',
          mapping: 'pathname',
          reactions: true,
          inputPosition: 'bottom',
          theme: 'transparent_dark',
          lazy: true,
        }),
      ],
      components: {
        Header: './src/components/Header.astro',
        ThemeProvider: './src/components/DarkThemeProvider.astro',
        ThemeSelect: './src/components/EmptyThemeSelect.astro',
        PageTitle: './src/components/PageTitle.astro',
        MobileMenuFooter: './src/components/EmptyMobileMenuFooter.astro',
      },
      sidebar: [
        { label: 'Home', link: '/' },
        {
          label: 'Articles',
          items: [
            { label: 'Service discovery', link: '/articles/service-discovery/' },
            { label: 'Observability by signal', link: '/articles/observability-by-signal/' },
            { label: 'Federated API security', link: '/articles/federated-api-security/' },
            { label: 'Queueing matters', link: '/articles/quiet-power-of-queues/' },
            { label: 'The shape of traffic', link: '/articles/shape-of-traffic/' },
            { label: 'Decoupled by design', link: '/articles/decoupled-api-design/' },
            { label: 'Open source sovereignty', link: '/articles/it-sovereignty-open-source/' },
            { label: 'OpenAPI-first MCP', link: '/articles/openapi-first-mcp/' },
          ],
        },
      ],
    }),
  ],
});