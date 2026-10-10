---
description: Public documentation site for ParrotPoster (VuePress)
alwaysApply: false
---

# Context: docs

Repository for **ParrotPoster** user-facing documentation published at [parrotposter.com/docs](https://parrotposter.com/docs). Source lives here; product behavior is implemented in `back-app`, `front-app`, `plugin-wordpress`, `plugin-bitrix`, and microservices — keep API and flow descriptions aligned with those codebases when you change contracts or UX.

Follow the workspace root `AGENTS.md` for multi-repo rules.

## Agent / contributor rules

1. **Working directory** — Run install, dev, build, and any tooling **inside this repository** (`docs`). Use `Makefile` and `package.json` here; do not assume commands from the frontend or backend repos.

2. **Keep this file accurate** — When you change build tooling, deploy layout, or documentation conventions (locales, sidebar, plugins), update this `AGENTS.md` in the same change or immediately after.

3. **Language** — This `AGENTS.md` is in **English**. Documentation pages may be split by locale (`en`, `ru`) under `pages/`; follow existing locale structure and tone.

## Technology stack

- **Site generator:** VuePress 2 (RC), Vite bundler (`@vuepress/bundler-vite`)
- **Theme:** `@vuepress/theme-default`
- **Plugins:** markdown include, photo swipe, redirect, register components (see `package.json`)
- **Styles:** Sass (`sass-embedded`)

## Project layout

```
pages/
  index.md           — entry / redirect as configured
  en/, ru/           — locale content (Markdown), identical file tree in both locales
    start/           — getting started, WordPress / 1C-Bitrix install + connect
    accounts/        — one page per social network (shared by web app and plugins)
    posts/           — manual posts, drafts, calendar, engagement
    automation/      — new automation (pipelines) + classic/ (legacy plugin autoposting)
    billing/ assistant/ api/
  .vuepress/
    config.ts        — VuePress config (theme, locales, navbar, sidebar)
    client.ts        — client-side enhancements; registers the custom `layouts/Layout.vue`
    layouts/         — Layout.vue wraps the theme layout and adds the right-side "On this page" block
    components/      — PageToc.vue (that block; headings read from DOM, hidden < 1400px; `toc: false` in frontmatter disables it)
    configs/         — split config; sidebar/helpers.ts builds the tree for both locales
    public/          — static assets (images, etc.)
    styles/          — custom CSS
.dist/               — production build output (generated; not the source of truth)
Dockerfile           — static image (build + nginx or similar)
nginx.conf           — server config for the built site
stack.yml            — Docker Swarm service definition
Jenkinsfile          — CI: `pipelineBasic` with project `docs`, image `pp-docs`
```

## Commands

```bash
# Install dependencies (from this repo root)
npm ci   # or npm install

# Local dev server (VuePress)
make run
# equivalent: npm run docs:dev

# Production build → `.dist/`
make build
# equivalent: npm run docs:build
```

## Conventions

- Plugin pages (WordPress, 1C-Bitrix) embed the `front-app` UI in an iframe, so web-app instructions are written once; plugin-specific content is only install/connect/settings and classic (legacy) autoposting.
- Every page exists in `ru` and `en` with the same path. Update both in one change.
- Screenshots live in `pages/.vuepress/public/images/`. A reference to a missing image **fails the build**; for a screenshot that does not exist yet use a `<!-- screenshot: name | purpose -->` comment instead of an image link.
- Page URLs are not stable aliases: no redirects from old paths. When you move or rename a page, update every consumer below.

## Consumers of the page tree

- `back-app` ParrotAI knowledge base is generated from `pages/ru/**` (`make kb-sync` in `back-app`; section ids = file path + heading anchor). Re-run it after docs change.
- `front-app` hard-links `/docs/...` (integrations pages, Telegram/Instagram/Dzen connect modals, user menu, changefeed). Update when paths change.

## Deploy / ops

- **CI:** `Jenkinsfile` uses shared library `parrotposter-shared-libs` and `pipelineBasic` with `deployNoEnv: true`.
- **Runtime:** Built static files are served per `Dockerfile`, `nginx.conf`, and `stack.yml` (adjust only when intentionally changing hosting).

## Contribution

See `README.md`: issues and PRs are welcome; support contact is listed there.
