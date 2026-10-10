---
title: Troubleshooting
---

# Troubleshooting

If an automation publishes nothing, first open its **Journal**: it will show **Skipped** (by design) or **Error** (needs fixing). Common cases are below.

## No sites in the wizard

Message: **No connected sites. Install the WordPress or Bitrix plugin first.**

For the new automation the source site can only be a WordPress site (plugin version 2.0 and newer). 1C-Bitrix has no new automation yet — use [classic autoposting](./classic/bitrix.md). As an option without a plugin, the source can be an [RSS feed](./rss.md).

- Install the [WordPress plugin](/en/start/wordpress.md) and sign in to it with the same account as in the cabinet.
- Under **Integrations** in the cabinet the site must be in the list and active.
- If the site was disabled, reconnect it from the plugin on the site: open **Automation** in WordPress and click **Reconnect** (see [below](#site-was-disabled-in-integrations)).

## Site is listed but the source cannot be configured

Messages like: the site plugin is disabled or inactive, the site is temporarily unavailable, or **open this page from the plugin's settings section on your site**.

To configure the source the site must be reachable from ParrotPoster's servers. Check:

- the plugin on the site is enabled and active;
- the site opens over HTTPS, the WordPress REST API is not closed by a password (basic-auth), a firewall, a Cloudflare challenge, and the site is not on a private IP;
- open the wizard **from the WordPress admin** (the plugin's **Automation** section), not only via a direct cabinet link: that way requests go the same route the plugin uses on the site.

The **Retry** button requests the record types again. If the site does not respond, the wizard shows the default type list (**Showing the default list**); the site's availability is checked on saving.

## No accounts on the "Publish to" step

Connect a social network under **Accounts**: [connection instructions](/en/accounts/index.md). If an account needs reconnecting, go through the connection again: otherwise the automation will not save (**An inactive account is selected**) or runs will fail with an account error.

## I published a post on the site — the journal is empty

Wait a couple of minutes and refresh the journal (it refreshes by itself, but not instantly).

- For **Instant** mode the post must be **published**. A draft, "pending review" or a scheduled post does not create an event.
- The automation must be **Enabled**. While it is disabled, events are accepted but there are no runs, and such posts are not made up later.
- The record type in the automation must match the type of the post on the site.
- In **Instant** mode, items published before the automation was created are not sent (the card shows **The automation is waiting for its first new item**). For them you need **Archive** or **Hybrid**.
- The filter on the **Content** tab must not reject the post.
- If your tariff has expired, the automation creates posts but they are not published until the tariff is renewed — check **Tariffs**.

## Journal shows "Waiting for plugin poll"

The plugin on the site periodically picks up tasks from ParrotPoster itself. Until then the run waits. The polling interval adapts and ranges from 5 to 60 minutes: shorter when there are tasks and longer when there have been none for a while.

If the wait does not end:

- WP-Cron (or a system cron that triggers it) must be working on WordPress;
- the site must be reachable from the internet, and the REST API must not be closed by a firewall, a Cloudflare check, basic-auth or a private IP;
- the plugin must be a current version (2.0 or newer).

If the wait lasts for hours, write to [support@parrotposter.com](mailto:support@parrotposter.com).

## Status "Skipped"

This is not a failure: the run deliberately published nothing. The reason is in the **Outcome** column and in the run details (**Skip reason**).

| What you see | What to do |
| --- | --- |
| **No matching items**, **Source returned 0 items** | Relax the selection or publish an item of the right type |
| **No matching item after filtering** | The conditions reject items at the front of the archive queue; relax them |
| **Pipeline conditions were not met**, **Event is outside pipeline scope** | The item does not match the automation's selection |
| **Already published before** | This automation already handled this item — no duplicate is created |
| **Some accounts already published** | The post was created only for accounts that did not have it before |
| **Changed fields do not affect the template** | You edited the item but not what the template uses. To update the post on any edit, choose **Run on every event** |
| **Update without a linked post**, **Delete without a linked post** | No post was created from this item (for example, it was published before the automation) — not an error |
| **Archive exhausted, trigger stopped** / **…trigger paused** | All matching items are used. Click **Resume** when new ones appear — see [after setup](./edit.md#disable-resume-delete) |
| **Archive exhausted (cycle)** | **Start over** is on: this run went to the cycle change, items will start from the beginning |
| **Too soon after the previous publish**, **Minimum spacing not met** | The minimum interval between posts kicked in. The item is not used up and is taken at the next slot |
| **Trigger disabled** | The automation is disabled |
| **No items matched — digest skipped for this period**, **No items left after the item filter**, **Item set does not meet the digest condition** | There are no suitable items for the period — an empty digest is not published |
| **This window was already processed (retry)** | This digest period is already published (for example, manually) |
| **Published later than the scheduled time** | The **Late vs schedule** mark: the run started after the intended time, and the post went out immediately. Increase **Start early** |

Allowed publishing hours do not skip a run: the post is simply moved to the nearest window start.

## Status "Error"

Open the journal row: **Error details** shows a description and a code. Common cases:

- **Account is inactive or needs reconnection** / **Account token revoked or expired** — reconnect the account under **Accounts**.
- **Platform requires media, but none is available** (**Instagram requires media**) — turn on **Add media from the article** in the template; the item must have a picture or video.
- **Text exceeds the platform limit** — shorten the text or add truncation to a field (**Truncate by characters**).
- **No publish targets selected** — select accounts on the **Publishing** tab.
- **Template is missing a required field**, **Template rendering failed**, **Template produced an invalid link**, **Template media could not be resolved** — check the [template](./template.md) and the item data.
- **Delivery to social network failed**, **Social network rate limit**, **Social delivery timed out**, **Delivery retries exhausted** — a limit or failure on the social network's side; try later, and with recurring errors check the account.
- **Plugin is unreachable**, **Plugin version is incompatible**, **Plugin callback URL is unreachable**, **Source unavailable** — the site is unreachable for ParrotPoster or the plugin is outdated: update the plugin and check the site's availability.
- **Source authentication failed**, **Source returned 404** — for an RSS feed: check the URL and access details.

You can repeat a run with the **Run again** button in the run details.

### AI did not work

If a post went out **without** AI processing, that is not an error but the fallback path: the run steps show **AI unavailable — used original text**. Causes: an invalid key of your own model, exhausted AI quota, **AI is not available on the current tariff**, the daily limit of AI calls. More in [AI processing](./template.md#ai-processing).

## "Archive finished"

All records that match the selection are already published. Click **Resume** if new items appeared on the site or you widened the filter. Details in [after setup](./edit.md#disable-resume-delete).

## RSS feed does not publish

- The first successful check only remembers the items already in the feed; only new ones are published (unless **Import existing items** is on).
- Check the feed status on the **Publishing** tab: **Last check**, **Next check**. The message **The feed rejected the credentials** means: check access and enter the details again.
- At most 20 items are published per check, the rest wait (how many — see the card).
- Item edits are noticed only if the feed provides a modification date.

More on the [RSS feed as a source](./rss.md) page.

## Posts go to the wrong place or with the wrong text

- Accounts are set on the **Publishing** tab.
- The text of future posts is the template on the **Content** tab. Posts already created do not change when you edit the template.
- A network can have a tab with its own options (Telegram, VKontakte, Facebook, MAX) or its own text. Check for **Has overrides** on the tab of that network ([details](./template.md#per-network-settings)).

## Site was disabled in "Integrations"

Autoposting from that site is paused. Automations are not deleted but publish nothing. The **Automation** page shows the message **Autoposting from … is disabled**.

You can bring the site back from the WordPress plugin: open **Automation** and click **Reconnect**. In the cabinet the button of this message is **Go to Integrations**.

## Still unclear

Write to [support@parrotposter.com](mailto:support@parrotposter.com) or through [support in the cabinet](/en/assistant/support.md): include the site address, the automation name and a screenshot of the journal with the error.
