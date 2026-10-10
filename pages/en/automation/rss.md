---
title: RSS feed as a source
---

# RSS feed as a source

An automation's source can be not only a WordPress site but also an **RSS/Atom feed**. ParrotPoster checks the feed regularly on its own and publishes new items to your accounts. No plugin on the site is needed: a feed from any site works, including someone else's or one protected by a password.

::: warning
An RSS source is created only in the [parrotposter.com](https://parrotposter.com) cabinet. The wizard inside the WordPress plugin has no RSS choice: it offers only a site and a record type.
:::

## How it works

- RSS supports **Instant mode only**: the **Mode** step in the wizard is skipped. Archive, Hybrid and Digest are not available for a feed.
- Wizard steps: **Source → Record selection → Accounts → Template** (no schedule).
- The automation reacts to new items that appear in the feed after it was created. What was already in the feed is not published by default.

## Creating one

1. **Automation** → **Create automation**.
2. On the **Content source** step, in **Source type** choose **RSS feed**.
3. In **Feed URL** paste the address. It must be an **HTTPS** address.
4. ParrotPoster checks the feed (**Checking the feed…**). You cannot continue until the check passes.
5. Adjust the options below if needed and click **Next**.
6. The rest is like the [quick start](./quick-start.md): record selection, accounts, [template](./template.md). The template fields come from the feed items.

### Source options

| Option | Meaning |
| --- | --- |
| **Check interval (seconds)** | How often to check the feed. 900 seconds (15 minutes) by default. Allowed: 300 to 86400 seconds (5 minutes to 24 hours). |
| **Import existing items** | **Do not import past items** (default) or **Import items from a recent window**. For the window set **Window duration (seconds)**: from 1 hour to 30 days. |
| **Feed access** | **No authentication**, **HTTP Basic** (username and password) or **Custom header** (header name and value). |
| **Update posts when feed items change** | On by default. If an already published item changes in the feed, the social post is updated. |
| **Delete posts when feed items disappear** | On by default. See below. |

## First check and importing old items

The first successful check only remembers everything that is already in the feed: those items count as seen and are not published.

If **Import existing items** is set to a window, items whose publication date falls into that window are published, oldest first. Items without a publication date are not imported. After the first successful check this option no longer has any effect and becomes read-only on the automation page.

## How many are published at a time

One check creates at most **20** new posts; the rest wait for the next checks and go out in publication-date order. The number of waiting items is shown on the automation page. The waiting queue holds up to 500 items, anything beyond that is lost — for very busy feeds narrow the [record selection](./edit.md#content).

## Item changes and deletions

- **Update.** A post is updated only if the feed item has an explicit modification date, it is newer than before, and the content actually changed. If only fields the template does not use changed, nothing happens. If the feed does not provide a modification date, edits are not noticed.
- **Deletion.** A post is deleted only if the feed explicitly marks the item as deleted, or the item has an expiry date that has passed. An item that merely vanished from the feed (pushed out by newer ones) does **not** count as deleted, even though the hint in the interface says otherwise. A deleted item that reappears in the feed is published as new.

Deletion moves the post to the ParrotPoster trash but does not remove it from the social network if it was already published.

## Feed status

On the automation's **Publishing** tab you can see the feed status:

- **Last check**, **Last success**, **Next check**;
- **The feed has not been checked yet** — before the first check;
- **The feed rejected the credentials. Check the authentication settings.** — an access error (401/403 responses);
- **Push updates (WebSub) are active** — the feed supports instant notifications;
- how many new items are waiting to be published.

If the feed server answers "not modified", that counts as a successful check. On network failures ParrotPoster waits longer and longer between attempts (up to 6 hours) and returns to the usual interval after a successful response. A failed check is written to the **Journal** as a separate run with status **Error**.

## Changing source settings

On the **Publishing** tab the **RSS source** block lets you change the feed checks and access. **Feed URL** is fixed for the automation and cannot be changed; for another feed create a new automation. The switches for updating and deleting items are in the launch block.

::: tip
ParrotPoster does not show saved passwords or header values. To save any changes to the source of a protected feed, enter the complete access details again.
:::

The rest (**Journal**, disabling, deleting) is on the [after setup](./edit.md) page. If the feed does not work — [troubleshooting](./troubleshooting.md#rss-feed-does-not-publish).
