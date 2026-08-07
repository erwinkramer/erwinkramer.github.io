import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightGiscus from 'starlight-giscus';

export default defineConfig({
  site: 'https://guanchen.nl',
  integrations: [
    starlight({
      title: 'Guanchen',
      description: 'Guanchen - cloud consulting and IT services.',
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
            { label: 'IT sovereignty and open source', link: '/articles/it-sovereignty-open-source/' },
            { label: 'OpenAPI-first MCP', link: '/articles/openapi-first-mcp/' },
          ],
        },
      ],
    }),
  ],
});