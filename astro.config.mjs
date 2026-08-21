import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightGiscus from 'starlight-giscus';
import { siteInfo, siteStructuredData } from './src/site.ts';

// Custom theme workaround for thin Giscus borders on scaled Windows displays:
// https://github.com/dragomano/starlight-giscus/discussions/10
const giscusTheme = process.env.NODE_ENV === 'development'
  ? 'transparent_dark'
  : new URL('/giscus/transparent-dark.css?v=20260821', siteInfo.url).toString();

export default defineConfig({
  site: siteInfo.url,
  integrations: [
    starlight({
      title: siteInfo.name,
      description: siteInfo.description,
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
          href: siteInfo.author.githubUrl,
        },
      ],
      customCss: ['./src/styles/space-theme.css'],
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'alternate',
            type: 'application/atom+xml',
            title: siteInfo.feed.title,
            href: siteInfo.feed.path,
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
          content: JSON.stringify(siteStructuredData),
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
            light: giscusTheme,
            dark: giscusTheme,
            auto: giscusTheme,
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
          items: [{ autogenerate: { directory: 'articles' } }],
        },
      ],
    }),
  ],
});