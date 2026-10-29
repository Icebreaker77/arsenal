# Arsenal 7

Двуязычный статический сайт-хаб о снаряжении и инструменте на Astro. Русские страницы размещаются в корне, украинские — в `/ua/`.

## Локальная разработка

Требуется Node.js 22 и pnpm.

```sh
pnpm install
pnpm dev       # astro dev --background
astro dev status
astro dev logs
astro dev stop
pnpm format:astro
pnpm lint
pnpm build
pnpm preview
```

Готовые статические файлы появляются в `dist/`.

## Деплой на Cloudflare Pages

Подключите Git-репозиторий к Cloudflare Pages и задайте:

- Production branch: `main`
- Build command: `pnpm build`
- Build output directory: `dist`
- Environment variable: `NODE_VERSION=22`
- For Cloudflare Pages Git deployments, leave the deploy command unset so Pages publishes `dist` after the build. If using a custom deploy command, set it to `pnpm deploy:pages` (equivalent to `wrangler pages deploy dist`). Do not use `wrangler deploy`, which deploys Workers and is incompatible with this static Pages project.
- If the project is currently connected under **Workers Builds** (the log says `Executing user deploy command`), set Build command to `pnpm build`, Deploy command to `pnpm deploy:pages`, and disable **Enable Preview Builds** under Settings → Build → Branch control. The default Preview command `npx wrangler preview` is for Workers and expects a Worker `previews` configuration; this static Pages project should not run it.
- For a direct Pages upload from Workers Builds, the `CLOUDFLARE_API_TOKEN` build secret used by Wrangler must have Account → Cloudflare Pages → Edit permission, scoped to the account that owns Pages project `arsenal`. The automatically generated Worker build token may not include Pages permissions. If Wrangler reports that it reads the token from `CLOUDFLARE_API_TOKEN`, replace that exact build secret in Workers Builds settings.
- Workers Builds also has a separate **Build token** under Worker → Settings → Builds → API token. If Cloudflare says that token belongs to a user who left the organization, select or create a current Build token there and retry. This runner token is separate from the `CLOUDFLARE_API_TOKEN` secret used by Wrangler for the Pages upload.

Для ручного деплоя используйте `pnpm deploy` (сборка и публикация) либо `pnpm deploy:pages` (если `dist` уже собран). Перед запуском настройте домен `arsenal-7.com`, HTTPS, редиректы www и Cloudflare Web Analytics. Файл `public/_headers` закрывает `*.pages.dev` от индексации.

## Страницы и языки

Главная: `/` и `/ua/`. Снаряжение: `/snaryazhenie/` и `/ua/sporyadzhennya/`. Инструмент: `/instrument/` и `/ua/instrument/`. Гайды: `/guides/` и `/ua/guides/`. О проекте: `/about/` и `/ua/about/`. Политика: `/privacy/` и `/ua/privacy/`.

Тексты главной, разделов и SEO-метаданные находятся в `src/pages/` и `src/consts.ts`. Парные URL для hreflang и переключателя языка собраны в `routes` в `src/consts.ts`. Служебные страницы политики исключены из индекса; страницы гайдов откроются для индексации после публикации достаточного количества статей.

## Публикация гайдов

Статьи пока не входят в первый релиз. При добавлении статей создайте для каждого языка отдельный Markdown-файл со своим латинским URL-slug, добавьте его маршрут в `src/pages/guides/` и `src/pages/ua/guides/`, обновите листинг и sitemap-фильтр в `astro.config.mjs`. Публикуйте не менее трёх вычитанных материалов на язык до включения листинга в индекс.

## Перед релизом

Замените временную ссылку `TELEGRAM_URL` в `src/consts.ts` настоящим каналом; согласуйте редакционные сведения и контакт автора для страницы «О проекте»; проверьте текст политики по фактически включённым сервисам. Настройте Google Search Console, Bing Webmaster Tools, Cloudflare Web Analytics и IndexNow, затем проверьте доменные редиректы и Cloudflare AI Crawl Control согласно `guide.md`.
