---
description: Public documentation site for ParrotPoster (VuePress)
alwaysApply: false
---

# Context: docs

Repository for **ParrotPoster** user-facing documentation published at [parrotposter.com/docs](https://parrotposter.com/docs). Source lives here; product behavior is implemented in `back-app-2.0`, `front-app-2.0`, and microservices — keep API and flow descriptions aligned with those codebases when you change contracts or UX.

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
  en/, ru/           — locale content (Markdown)
  .vuepress/
    config.ts        — VuePress config (theme, locales, navbar, sidebar)
    client.ts        — client-side enhancements
    configs/         — split config if used
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

## Deploy / ops

- **CI:** `Jenkinsfile` uses shared library `parrotposter-shared-libs` and `pipelineBasic` with `deployNoEnv: true`.
- **Runtime:** Built static files are served per `Dockerfile`, `nginx.conf`, and `stack.yml` (adjust only when intentionally changing hosting).

## Contribution

See `README.md`: issues and PRs are welcome; support contact is listed there.
