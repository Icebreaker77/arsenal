// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://arsenal-7.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: { defaultLocale: 'ru', locales: ['ru', { path: 'ua', codes: ['uk'] }], routing: { prefixDefaultLocale: false } },
  integrations: [mdx(), sitemap({
    filter: (page) => !page.includes('/privacy/') && !page.includes('/404/') && !page.includes('/guides/'),
    lastmod: new Date('2026-10-28T00:00:00.000Z'),
  })],
});
