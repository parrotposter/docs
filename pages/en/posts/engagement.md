# Engagement: likes, comments, views

ParrotPoster collects metrics of published posts from the social networks and shows them right in the **Posts** section — you do not have to open every network.

## Where to look

- **In the post list**, a published post card shows totals across all accounts: **Likes and reactions** (tooltip "Likes and reactions combined"), **Comments** and **Views**. Until metrics are received, the card has no such row.
- **In the post details window**, in the **Publication results** block: metrics for each account separately, next to the **View post** link. Above the block you can see when the data was last refreshed ("Updated: …").

## Which metrics each network provides

| Network | What is shown |
| --- | --- |
| VKontakte | likes, comments, views |
| Odnoklassniki | likes, comments |
| Facebook | reactions (by kind), comments |
| Instagram | likes, comments (views if the connection method provides them) |
| Telegram | reactions (per emoji); no comments or views |
| MAX | views only |

If a network does not provide a metric, it is simply not shown. Telegram and Facebook reactions are shown by kind ("❤ 5", "👍 3"); Telegram custom emoji appear as a generic icon with the tooltip "Custom emoji". In the card totals, reactions are added to likes.

## How the data is refreshed

Metrics are requested automatically: the first time soon after publishing, and then the older the post, the less often. That is why numbers of a fresh post change more often.

To get fresh data right away, open the post and click **Refresh metrics** above the publication results. The button works no more than once per 5 minutes for each post: until then it is disabled and its tooltip says "Available again after …".

## Metric states

Instead of numbers, an account row may show an explanation:

| What you see | What it means |
| --- | --- |
| "Waiting for metrics…" | the post has just been published and there is no first data yet |
| "Unavailable" | metrics are not collected for this post or account (the tooltip explains why) |
| "Could not refresh metrics" | the last attempt failed; the previous data is shown, a retry will follow later |
| "Refresh limited; showing last known data" | the social network asked not to query so often; the last received data is shown |

::: tip
Metrics are not calculated instantly and may lag behind the social network until the next poll. Use **Refresh metrics** for the most up-to-date numbers.
:::
