---
title: Automation modes
---

# Automation modes

The mode is chosen on the **Mode** step of the wizard (right after **Source**) and **cannot be changed** after creation. If you need another scenario, create one more automation.

The basic steps (source, selection, accounts, template) are described in the [quick start](./quick-start.md). Here is how the modes differ and what to fill in on the **Schedule** step.

| Mode | What it does | Wizard steps |
| --- | --- | --- |
| **Instant** | Publishes new items right after they appear | Source → Mode → Record selection → Accounts → Template |
| **Archive** | Publishes existing items on a schedule, one at a time | same + **Schedule** |
| **Hybrid** | New items right away, archive on a schedule | same + **Schedule** |
| **Digest** | Bundles several items into one post on a schedule | same + **Schedule** |

For an RSS feed the **Mode** step is skipped and **Instant** always applies ([details](./rss.md)).

## Instant

**When:** you run a blog or a news feed and a fresh post should reach social networks immediately.

**How it works:** a new post is published on the site → a social post is prepared → it goes to the selected accounts. Items published before the automation was enabled are not processed in this mode. Drafts are not published until they become regular published items.

There is no schedule. The timezone, allowed hours and minimum spacing between posts can be set later on the **Publishing** tab (see [publishing rules](#publishing-rules)).

What happens when you edit things on the site:

- **You edit a post** — the social post already created from it is updated (if there is one). No new post is created. Before updating, ParrotPoster waits a short pause to merge several edits in a row (**Delay**). The **Skip when relevant fields did not change** setting is on by default: if only things the template does not use were changed, nothing happens. **Run on every event** turns this check off.
- **You delete a post** — the related social posts go to the ParrotPoster trash. If a post was already published on the social network, it is not deleted there.

This is the [quick start](./quick-start.md) scenario.

## Archive

**When:** the site already has a lot of material and you want to publish it to social networks gradually — one item at a set time.

**How it works:** at the scheduled time the next suitable item that this automation has not published yet is taken and published. The first publication is at the nearest schedule slot, not right after creation. Missed slots (for example, while disabled) are not made up.

### Schedule

The **When to publish** field:

- **At set times** — one or more times per day (**Add time**), at least 5 minutes apart. The **Days** field: **Every day**, **Weekdays**, **Weekends** or **Pick days**. The **Different times per day** switch lets you set separate times for each weekday.
- **Every N hours** — the **Interval, hours** field. The interval is counted on a grid starting at 00:00 in your timezone: for N = 5 that is 00:00, 05:00, 10:00, 15:00, 20:00 and then 00:00 again, so the interval is shorter at the day boundary.
- **Once a week** — a weekday and a time.

The **Upcoming publishes** block shows when the schedule will fire. By default: every day at 10:00.

<!-- screenshot: wizard-schedule-archive | The "Schedule and publishing" step of Archive mode: "Scheduled archive", time 10:00, "When archive is exhausted", the "Publishing rules" block | annotate: the "When to publish", "When archive is exhausted" and "Timezone" fields -->

### Item selection and sorting

The **Sort by** and **Order** fields define which item is taken next. The default is by date, **Descending** — newest first. The archive is not limited to "old" items: items published after the automation was created are eligible too, and with "newest first" a fresh item goes out before old ones.

The conditions from the **Record selection** step narrow the choice. Some conditions are checked on the site right away, others by ParrotPoster after it receives the item. If 10 items in a row fail the filter, the run is skipped with status **Skipped** ("No matching item after filtering"), and the next run starts from the same items — so avoid conditions that reject many items at the front of the order.

### When archive is exhausted

The **When archive is exhausted** field:

- **Stop** (default) — the schedule goes on pause, the card shows **Archive finished**. You can continue with the **Resume** button.
- **Pause** — behaves the same, only the card label is **On pause**.
- **Start over** — the run in which items ran out is skipped, and from the next slot items go round again from the start. Turn it on only if you want an endless repeat of posts.

**Resume** counts the next time from the current moment. If there are no new items, the next run puts the schedule on pause again. Enabling and disabling the automation does not lift the pause.

### Start early

In the **Preparation** block, the **Start early** field (in seconds, 60 by default): ParrotPoster starts preparing the post slightly before the publish time and schedules it for the right moment. That is why a scheduled post shows up in the list a minute or two before publication. If you often see the **Late vs schedule** badge, increase this value.

## Hybrid

**When:** new posts should go out immediately, and the accumulated archive should be published little by little.

**How it works:** new items are published like in **Instant** mode, and the archive like in **Archive** mode. The wizard shows a note: the automation will publish new items immediately and also backfill the archive on a schedule. The schedule fields are the same as in Archive.

In Hybrid an instant post and an archive slot can land close together. If a **minimum interval** is on, the archive run is skipped in that case and retried at the next slot — that is normal.

One automation covers both flows. Two separate rules (Instant + Archive) are also possible, but make sure the same items do not go out twice.

## Digest

**When:** many short news items appear per day or week, and one summary post is better than ten separate ones.

**How it works:** at the chosen time items for the period are collected and published as **one** post. Digest is available for sites only, not for RSS.

On the **Schedule** step the **Digest settings** block contains:

- **When to publish** — the same options as in Archive. The default is Monday, 09:00;
- **Aggregation window** — the period to collect items for:

| Window | What is taken |
| --- | --- |
| **Calendar day** | The previous full calendar day (00:00–24:00) |
| **Calendar week** (default) | The previous full week, Mon–Sun |
| **Calendar month** | The previous full month |
| **Last N hours** | N hours before the publish time. If N is longer than the schedule interval, digests overlap |
| **Since last run** | From the previous run to the current one. After a pause the first digest may catch up on the accumulated items |

Calendar windows do not depend on the run time or day: a weekly digest on Wednesday also collects the previous week from Monday to Sunday.

- **Skip already digested items** — on by default. It matters when **Last N hours** windows overlap: an item will not land in two digests in a row.
- **Start early** — same as in Archive.

<!-- screenshot: wizard-schedule-digest | The "Schedule" step of Digest mode: "Digest settings", "When to publish", "Aggregation window" | annotate: the "Digest settings" block and "Aggregation window" -->

On the **Record selection** step the digest has an extra **Whole-set condition** block: it is evaluated once for the whole set ("Number of items in the set", "Set is empty"), not per item.

On the **Template** step for a digest you can insert an **entry list** and a **rubric cover** — see [publication template](./template.md#digest).

If there were no suitable items for the period, the digest is skipped: the journal shows **Skipped** ("No items matched — digest skipped for this period"), not an error. The same period is published at most once: if the schedule is more frequent than the window, repeated runs in the same window are skipped ("This window was already processed"). A digest holds at most 500 items: if more match, the digest is truncated and the journal shows a **Truncated** mark.

## Publishing rules

The **Publishing rules** block applies to the whole automation and to every new post. In the wizard it is on the **Schedule** step (Archive, Hybrid, Digest). **Instant** mode has no such step — the rules are configured on the **Publishing** tab of the created automation; until then the timezone is UTC and there are no restrictions.

- **Timezone** — schedule times and digest windows are counted in it. The wizard recommends setting it right away.
- **Allowed publishing hours** — the **Limit publishing hours** checkbox, **From** and **To** fields. The "From" time is inside the window, "To" is not; the window may cross midnight. A post outside the window is not dropped but moved to the nearest window start. If several posts appear at night, they all get the window opening time: add a minimum interval so they go out one by one.
- **Minimum spacing** — the **Set minimum interval between posts** checkbox, a value in minutes or hours. It is counted between posts of one automation. Instant posts are not skipped but shifted forward to a free spot. Scheduled runs (Archive, Digest) that fall too close to another post are skipped; the item is not used up and is taken at the next slot.

Updates and deletions of site posts are not affected by publishing rules: they go out immediately. A manual run ignores the minimum interval but respects the allowed hours.

Changes to the rules affect only the next posts: posts already created and scheduled are not rewritten.

## Which mode to choose

- Only new posts are needed, the archive does not matter → **Instant**, not Hybrid.
- You need to "publish all the old stuff and stop" → **Archive**, not Digest.
- You need one summary instead of a post per news item → **Digest**, not Instant.
- You need new posts immediately and the archive little by little → **Hybrid**.
