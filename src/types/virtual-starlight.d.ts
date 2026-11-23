// Type declarations for Starlight's Vite virtual modules.
// Starlight provides these at build time but no longer ships ambient types for them.
declare module 'virtual:starlight/user-config' {
  import type { StarlightUserConfig } from '@astrojs/starlight/types';
  const config: StarlightUserConfig;
  export default config;
}

declare module 'virtual:starlight/components/Search' {
  import type { Component } from 'astro';
  const Search: Component;
  export default Search;
}

declare module 'virtual:starlight/components/SiteTitle' {
  import type { Component } from 'astro';
  const SiteTitle: Component;
  export default SiteTitle;
}

declare module 'virtual:starlight/components/SocialIcons' {
  import type { Component } from 'astro';
  const SocialIcons: Component;
  export default SocialIcons;
}
