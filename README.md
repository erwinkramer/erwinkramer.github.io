# Guanchen

Static website for Guanchen, built with Astro and Starlight.

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

The production site is generated in `dist/` and can be deployed to GitHub Pages. The custom domain is configured with `public/CNAME`.

## Comments

Blog pages use [Giscus](https://giscus.app/) through the `starlight-giscus` plugin for GitHub Discussions-backed comments. Discussions must stay enabled for `erwinkramer/erwinkramer.github.io`, and the Giscus GitHub app must be installed for the repository.