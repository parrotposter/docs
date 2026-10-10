---
title: Getting started
---

# Getting started

## How it works

1. **Register** in the [personal account](https://parrotposter.com) — or install the [WordPress plugin](./wordpress.md) / [1C-Bitrix module](./bitrix.md) and sign in there: it is the same account.
2. **Connect your social network accounts** in the "Accounts" section. Instructions for every platform are in [Accounts](/en/accounts/).
3. **Publish** — manually ([Posts](/en/posts/)) or automatically ([Automation](/en/automation/)): entries from your website or an RSS feed go to the selected networks on their own.

New users get a free 14-day trial.

## Choose how to work

| Way | Choose it if | Guide |
| --- | ------------ | ----- |
| Personal account | You need manual posts, a calendar, RSS automation; a CMS is not required | Below on this page |
| WordPress plugin | Your site runs WordPress; you want to publish from the admin panel and automatically | [WordPress plugin](./wordpress.md) |
| 1C-Bitrix module | Your site runs "1C-Bitrix: Site Management" | [1C-Bitrix module](./bitrix.md) |
| API | You want to embed publishing in your own service or script | [API](/en/api/quick-start.md) |

## Registration and login in the account

1. Open [parrotposter.com](https://parrotposter.com) and go to the login page.
2. Click "Signup", enter your name, email and a password (at least 6 characters), tick the consent to the data processing rules and click "Sign up". Or click "Continue with Google" — no separate registration is needed.
3. To log in, enter your email and password and click "Log in", or use Google.
4. If you forgot your password, click "Forgot password?" — a reset link will be sent to your email.

The same account works in the web app, the plugins and the API.

## Account menu

| Item | What is inside |
| ---- | -------------- |
| Posts | [Manual posts, drafts and calendar](/en/posts/) |
| Automation | [Autoposting rules](/en/automation/) |
| Accounts | [Connected social networks](/en/accounts/) |
| Integrations | Connected sites and AI models (see below) |
| Tariffs | [Plan, limits and payment](/en/billing/) |
| Support | [Contacting support](/en/assistant/support.md) |
| What's changed | Service changelog |
| ParrotAI | [The assistant](/en/assistant/) |
| Settings | Profile, password, sessions, posts, notifications, API tokens |

### Integrations

The "Integrations" page has two tabs:

- **Sites** — sites where the plugin is installed and signed in: they appear here automatically. For each site you can see its status ("Active" or "Disabled") and last activity: "Requests from site" and "Requests to the site". You can disconnect a site (autoposting from it stops, automations are not deleted) or delete it. A disabled site can only be enabled again from the plugin on the site itself — see [WordPress](./wordpress.md#site-connection-and-status). The "Connect site" button starts connecting a new site.
- **AI models** — your own API keys for OpenAI, Anthropic or an OpenAI-compatible provider, used for AI-assisted post text.

### Settings

"Settings" is split into groups:

- **Account** — "Profile" (your name) and "Change password".
- **Security** — "Sessions" (active logins: the web app and plugins on sites; you can end other sessions) and "API tokens" (tokens for scripts and your own integrations; the secret is shown only once — see [API: authentication](/en/api/auth.md)).
- **Application** — "Posts" (minimum interval between posts in seconds; it does not affect Automation, where the interval is set in the publishing rules) and "Notifications" (email addresses and email types: system, news and promotions, publication errors, support replies).

## Plugins vs. the account

The WordPress and 1C-Bitrix plugins show the same interface as the account right inside the site's admin panel: the "Posts", "Accounts", "Tariffs" and (in WordPress) "Automation" pages are the account in an embedded frame. That is why the instructions in this documentation are written once — for the account — and apply to the plugins too.

Only the plugins have:

- installation, sign-in and connecting the site to ParrotPoster;
- the plugin's own settings;
- classic autoposting — [WordPress](/en/automation/classic/wordpress.md), [1C-Bitrix](/en/automation/classic/bitrix.md);
- publishing an entry right from the posts list and the edit screen (WordPress).

Only the account has: ParrotAI, "Support", "Integrations" and the account "Settings" (profile, sessions, API tokens, notifications). If you need one of these, open [parrotposter.com](https://parrotposter.com) and sign in with the same account.
