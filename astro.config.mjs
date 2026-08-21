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
      favicon: '/assets/icon-128.png',
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
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: '/assets/icon-16.png',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/assets/icon-32.png',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            type: 'image/png',
            sizes: '128x128',
            href: '/assets/icon-128.png',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'apple-touch-icon',
            sizes: '256x256',
            href: '/assets/icon-256.png?v=source-icon-bordered',
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
          theme: {
            light: 'transparent_dark',
            dark: 'transparent_dark',
            auto: 'transparent_dark',
          },
          lazy: true,
        }),
      ],
      components: {
        Header: './src/components/Header.astro',
        SiteTitle: './src/components/SiteTitle.astro',
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