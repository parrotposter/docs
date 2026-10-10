# Posts

The **Posts** section is where you create posts manually and keep track of every post: the ones you made and the ones published by [automation](/en/automation/). It works the same way in the web app and in the WordPress and 1C-Bitrix plugins (where it is shown in an embedded window).

## What is in the section

| What | Where |
| --- | --- |
| Post list and calendar | the main page of the section |
| Creating a post | the **+ Add new post** button → [Creating and editing a post](./create.md) |
| Drafts | the "Drafts" icon at the top right → [Drafts, calendar and trash](./drafts-and-calendar.md) |
| Trash | the "Trash" icon at the top right (web app only; plugins have no trash) |
| Post metrics: likes, comments, views | in the post card → [Engagement](./engagement.md) |

If you have no posts yet, the page shows "You don't have any posts yet" and an **Add post** button. When your plan has expired you cannot create, edit or delete posts — renew your [plan](/en/billing/).

## The post list

Every post in the list is a card: text, attachments, publication date, status, account icons and, for posts that came from automation, a source badge. Click a card to open the details window. It shows:

- the full text, tags, link and attachments;
- the **Publication results** block — the result for each account separately, with a **View post** button (a link to the post on the social network) and, on failure, the error text and a **Try post again** button;
- engagement metrics;
- the **Delete**, **Edit** and **Move to drafts** buttons (when available).

The arrows in the details window move between neighbouring posts of the list. More posts load with the **Show more** button.

### Statuses

| Status | Meaning |
| --- | --- |
| Preparing | the post is accepted and its attachments are being prepared |
| Waiting for the right time | the post is scheduled and waits for its publication time |
| Publishing | the post is being sent to the social networks |
| Success | the post is published to all selected accounts |
| Publish failed | publishing failed in at least one account (details are in the per-account results) |
| Updating | changes to a published post are being sent to the social networks |
| Deleting | the post is being deleted from the social networks |
| Draft | the post is not published until you publish it yourself (see [Drafts](./drafts-and-calendar.md)) |

In the per-account results each social network has its own badge: **Pending**, **Publishing**, **Published**, **Failed**, **Updating**, **Deleting**. If a network cannot change or delete published posts, you will see "Update is not supported on this network" or "Delete is not supported on this network".

::: tip What to do on an error
Open the post card, read the error in the row of the relevant account, fix the cause (for example, reconnect the [account](/en/accounts/)) and press **Try post again** — for that account only. Other accounts are not published again. Before retrying, check the social network page: if the post is already there, do not retry or you will get a duplicate.
:::

## Filters

Click the **Filters** icon at the top right — filters appear above the list. A dot on the icon means a filter is active.

**Post status:**

- **All**;
- **Published** — posts with the statuses "Success" and "Publish failed";
- **Scheduled** — posts with the statuses "Preparing" and "Waiting for the right time".

**Post origin:**

- **All**;
- **From automation** — posts created by [automation](/en/automation/); you can pick a specific pipeline or keep **Any pipeline**;
- **Manual** — posts created in the post form.

If nothing matches, you will see "No posts match the selected origin filter" and a **Reset filter** link.

Drafts are not in the main list — they are on a separate page.

## Bulk delete of scheduled posts

With the **Scheduled** filter selected, the filter panel shows a **Delete all scheduled…** button. The window tells you how many posts will be deleted; you can turn on **Delete from a specific date** to delete only posts whose publication date is on or after the selected date. Published posts are not affected, and deleted posts go to the trash. Details: [Drafts, calendar and trash](./drafts-and-calendar.md#trash).

## List and calendar

The **Posts view mode** switch (**List** / **Calendar**) changes how posts are shown. The calendar shows the same posts by day of the month — see [Calendar](./drafts-and-calendar.md#calendar). The chosen view is remembered. The list and the calendar have separate filters.

## Posts from automation

Posts created by automation carry a source badge (automation mode, WordPress or Bitrix icon). The details window has an **Automation** block with links to the pipeline and to the run details in the journal. When you edit such a post you will see a warning: manual edits may be overwritten when the CMS sends an update for this item.

## Next

- [Creating and editing a post](./create.md)
- [Drafts, calendar and trash](./drafts-and-calendar.md)
- [Settings for different social networks](./network-settings.md)
- [Engagement: likes, comments, views](./engagement.md)
