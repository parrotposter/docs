# Drafts, calendar and trash

## Drafts

A draft is a post that is never published by itself. It does not appear in the main list, in the calendar, or in the bulk delete of scheduled posts. The drafts page opens with the **Drafts** icon at the top right of the **Posts** page; it has a **+ Add new post** button and draft cards with the change date ("Updated …"). While there are no drafts it says "No drafts yet".

### Save a draft

In the post form click **Save draft**. A draft only needs text or an attachment: selecting accounts is optional ("You can save a draft without selecting accounts"). The option chosen in **When to publish** — **Now**, **After N minutes** or **Custom** — is stored together with the draft.

### Publish a draft

1. In the draft card menu choose **Publish**.
2. In the **Publish draft** window choose when to publish. Below it you see the result: "Will be published immediately" or "Will be published at …".
3. Confirm. The draft disappears from the drafts page and appears in the main list ("Draft published").

Publishing requires at least one account: if the draft has none, open it with **Edit**, select accounts and click **Publish** in the form. "After N minutes" counts from the moment of publishing, not from when the draft was created. If the chosen time has already passed, the post is sent immediately.

### Move a post to drafts

A scheduled post that has never been published can be put into drafts: in the card menu or the details window choose **Move to drafts** and confirm "Move this post to drafts?". Published posts, posts that already have a publication result, and posts that are being published right now cannot be moved to drafts.

## Calendar

The calendar is the second view of the **Posts** section: switch **Posts view mode** to **Calendar**. It shows published and scheduled posts by day of the month; drafts are not shown in it. Days and times are calculated in your time zone.

- The title shows the current month; the **Previous month** and **Next month** arrows flip the calendar.
- A day cell contains post cards (network icons, time), and if there are many posts — "N more posts". Days with publication errors are highlighted and show the number of errors.
- Click a day to open the **Posts on …** panel with all posts of that day (paged: **Previous** / **Next**). Click a post to open the same details window as in the list: per-account results, **Edit**, **Delete**.
- The stats at the bottom ("Publication stats") show the number of posts this month, this week and today.
- If the month has no posts, a hint suggests clicking a day to schedule one.

### Schedule a post from the calendar

The day panel (and the day cell) has a **Schedule a post** button. It opens the post form with "Custom" time already set to that day at 10:00; you can change the time if needed. Past days have no such button, and with an expired plan you cannot create posts.

You cannot drag a post to another day in the calendar. To move a scheduled post, open it, click **Edit** and set a new date and time.

### Calendar filters

The **Filters** icon opens the calendar filters (they are independent of the list filters):

- **Social network type** — **All** or one network;
- **Select account** — **All** or specific accounts (**Selected: N**);
- **Post origin** — **All**, **From automation** or **Manual**.

**Reset filters** returns everything to the default.

## Trash

Deleted posts go to the **Trash** (the icon at the top right of the **Posts** page). They are kept for 30 days and then removed permanently. The card shows when the post was deleted ("Deleted: …") and how long is left ("~N days left").

::: warning Plugins have no trash
The trash is available in the web app. In the embedded view inside the WordPress and 1C-Bitrix plugins there is no trash icon.
:::

### Restore a post

1. Click **Restore** on the card.
2. In the **Restore post** window choose a new publication date and time — the previous one is not kept.
3. Confirm: the post returns to the scheduled list ("Post restored").

Only a post that has never been published can be restored. A published post that was deleted from ParrotPoster cannot be brought back. Restoring requires an active plan.

### Delete forever

- **Delete forever** on a card (with the confirmation "Permanently delete this post?") deletes one post.
- **Empty trash** deletes all posts in the trash at once.

This cannot be undone. Permanent deletion does not affect the posts in the social networks: a post is deleted from them once, at the moment of the first deletion (see [Delete a post](./create.md#delete-a-post)).

### Delete all scheduled posts

On the **Posts** page select the **Scheduled** filter — the **Delete all scheduled…** button appears in the filter panel. The **Delete scheduled posts** window shows how many posts will go to the trash. The **Delete from a specific date** switch limits deletion to posts whose publication date is on or after the selected date. Published posts are not affected. You can restore such posts one by one by setting a new date.
