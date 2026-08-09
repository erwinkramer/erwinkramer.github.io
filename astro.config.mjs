import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightGiscus from 'starlight-giscus';
import { articleNavItems } from './src/article-nav.mjs';

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
      favicon: '/assets/pillars-favicon.svg?v=two-pillars-sun',
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
          tag: 'link',
          attrs: {
            rel: 'preload',
            as: 'image',
            href: '/assets/lets-talk-button-bg.svg',
            type: 'image/svg+xml',
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
          items: articleNavItems,
        },
      ],
    }),
  ],
});