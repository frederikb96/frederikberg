// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import contentFiles from './integrations/content-files.mjs';

export default defineConfig({
  site: 'https://frederikberg.com',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    sitemap({ filter: (page) => !page.includes('/search/') }),
    contentFiles([
      { from: 'src/content/blog', to: 'blog' },
      { from: 'src/content/publications', to: 'publications' },
    ]),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: { target: 'es2022' },
  },
});
