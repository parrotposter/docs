---
title: Automation
---

# Publishing automation

An automation is a rule: **what** to publish (posts from your site or an RSS feed), **where** (your accounts) and **when**. You set it up once, and from then on posts go out to social networks on their own.

ParrotPoster has two autoposting schemes. Pick yours.

| | New automation | Classic autoposting in the plugin |
| --- | --- | --- |
| Where you set it up | Cabinet → **Automation** (in the WordPress plugin the same screen opens under **Automation**) | Only inside the plugin: **Scheduler** in WordPress, **Templates** in 1C-Bitrix |
| Source | A WordPress site with plugin version 2.0 or newer, or an RSS/Atom feed | The site where the plugin is installed |
| Modes | Instant, Archive, Hybrid, Digest | Autoposting of new posts; in 1C-Bitrix also autounload |
| New-scheme features | Publishing rules (timezone, allowed hours, interval), Liquid templates, AI processing, step-by-step run journal | Described on the classic-mode pages |
| Suited for | New projects | Sites that stay on the old plugin mode for now |

## How classic modes map to the new one

| Classic mode | New automation equivalent |
| --- | --- |
| WordPress → Scheduler, autoposting | **Instant** |
| 1C-Bitrix → Templates, autoposting | **Instant** |
| 1C-Bitrix → Templates, autounload | **Archive** |

For WordPress the new automation is available from plugin version 2.0. For 1C-Bitrix there is no new automation yet: the classic mode works. More details:

- [Classic autoposting in WordPress](./classic/wordpress.md)
- [Classic autoposting in 1C-Bitrix](./classic/bitrix.md)

::: tip
Manual posts are still there: you can create them in **Posts**. Automation is for a steady flow from a site or a feed.
:::

## Before you start

The wizard will not let you save a rule without these.

1. **A content source** — one of two:
   - **a WordPress site**: install the [plugin](/en/start/wordpress.md) version 2.0 or newer and sign in to it with the same ParrotPoster account. The site will appear under **Integrations** in the cabinet;
   - **an RSS/Atom feed**: you only need its HTTPS address, no plugin required. See [RSS feed as a source](./rss.md).
2. **Social network accounts.** Connect them under **Accounts**: [connecting accounts](/en/accounts/index.md).

## Choosing a mode

| You want… | Mode | Next |
| --- | --- | --- |
| New posts to go to social networks right away | **Instant** | [Quick start](./quick-start.md) |
| To gradually publish material that already exists | **Archive** | [Modes](./modes.md#archive) |
| New posts right away and the archive on a schedule | **Hybrid** | [Modes](./modes.md#hybrid) |
| Several posts bundled into one (daily or weekly) | **Digest** | [Modes](./modes.md#digest) |

An RSS feed supports only **Instant** mode. If unsure, start with it: it is the shortest path.

## Where to begin

1. Open the [cabinet](https://parrotposter.com) → **Automation**.
2. Follow the [quick start](./quick-start.md).
3. Set up the post text: [template](./template.md).
4. Once the rule works, see [after setup](./edit.md): journal, manual run, disabling.
5. If something is not publishing — [troubleshooting](./troubleshooting.md).
