# Creating and editing a post

This page explains how to create a post manually, choose the time and accounts, and how to change or delete an already published post. Before you start, connect at least one [social network account](/en/accounts/) (a draft can be saved without accounts).

## Create a post

1. Open **Posts** and click **+ Add new post**. The **Create post** page opens: the form on the left, the preview on the right.
2. Fill in **Content** — the **Post text** field. A character counter is shown inside the field.
3. Add **Attachments** (optional): click the upload area or drag files into it. You can also paste a picture from the clipboard (`Ctrl+V`).
4. If you need a link, click **Attach link** and paste the page address (it must start with `http://` or `https://`). Networks that support it receive the link as an attachment. **Remove link** removes it.
5. If needed, turn on **Add UTM tags to the link** (see [UTM tags](#utm-tags)).
6. In **When to publish**, choose the time (see [Publish time](#publish-time)).
7. In **Where to publish**, select one or more accounts. The number of selected accounts is shown next to the title.
8. If VKontakte is among the accounts, the **Platform options** block appears (see [Settings for different social networks](./network-settings.md)).
9. Click **Publish** — the post is published at the chosen time — or **Save draft** — the post is stored without publishing ([Drafts](./drafts-and-calendar.md)).

While attachments are uploading, the buttons are disabled and a message asks you to wait for the upload to finish. A post with no text and no attachments cannot be saved: "Add text or at least one attachment". If no account is selected, the post cannot be published ("Specify where to publish the post"), but a draft can be saved.

After publishing you return to the post list; after saving a draft, to the **Drafts** page.

## Attachments

Click the upload area ("Click to select media (images, video, audio, files), or drag them here") or drag files onto the page. Accepted:

- images: PNG, GIF, JPEG, WebP;
- video and audio;
- files: PDF, Word, ZIP, text files.

You can reorder attachments by dragging and remove the extra ones.

::: warning Limits
- A post holds no more than **10 files**: if there are more, the first 10 are taken.
- Every social network has its own limits on file size, duration and number of attachments, and on text length. If a file does not suit a particular network, it is skipped or publishing to that network fails (Instagram, for example, requires at least one picture or video). A summary is in [Settings for different social networks](./network-settings.md).
- A picture with a side shorter than 100 pixels is rejected.
:::

## UTM tags

The **Add UTM tags to the link** switch shows the fields `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`. Non-empty tags are appended to the link. UTM only works for the post link (which must be set and valid), not for addresses pasted inside the text.

You can use macros in tag values: `{social_code}` is replaced with the full network name (`vkontakte`, `facebook`, `odnoklassniki`, `instagram`, `telegram`, `max`) and `{social_short_code}` with the short one (`vk`, `fb`, `ok`, `ig`, `tg`, `max`). This way one form gives different `utm_source` values for different networks.

## Publish time

**When to publish** offers three options:

| Option | What happens |
| --- | --- |
| **Now** | the post is sent right after you click **Publish** |
| **After 15 minutes** | 15 by default; the **Number of minutes** list offers 5, 10, 15, 20, 30 or **Own option** where you type your own number. The time counts from the moment you click **Publish** |
| **Custom** | pick the **Publish date** and **Publish time**; a past date cannot be chosen |

You set the custom time in the time zone of your browser (the device ParrotPoster is open on). If you came to the form from a day in the [calendar](./drafts-and-calendar.md#calendar), "Custom" is preselected for that day at 10:00.

::: tip Interval between posts
Posting too often can get accounts blocked by social networks, so ParrotPoster keeps a minimum interval between your posts. If you schedule a post too close to another one, its publication time is shifted automatically. The interval is set in **Settings → Posts**, the **Interval between posts in seconds** field: from 1 to 3600 is allowed, and if no value is set, 60 seconds is used. The setting applies to manually created posts; in [automation](/en/automation/) the interval is set in the pipeline publishing rules.
:::

## Preview

The post preview is shown to the right of the form. Switch between the selected networks to see the post formatted for each one ("Preview social network"). Until an account is selected there is no preview — a hint asks you to select at least one account. The preview is approximate: the final look depends on the social network.

## Editing a post

Open the post in the list and click **Edit** (or choose **Edit** in the card menu). The **Edit post** page opens with the same fields as when creating, plus separate **Tags** and **Link** fields. The save button is called **Update**.

What you can change depends on the post state:

| Post state | What you can change |
| --- | --- |
| Not published yet ("Preparing", "Waiting for the right time") | everything: text, tags, link, UTM, attachments, accounts, time |
| Published (successfully or with an error) | only text, tags, link and UTM. The publish time, accounts and attachments are locked — hints appear under the fields. To publish to other accounts, create a new post |
| Publishing, updating, deleting | cannot be edited: wait for processing to finish |

::: warning A published post can be edited only during the first day
If more than a day has passed since the publication date, ParrotPoster will not accept changes to the post, and the **Edit** button is hidden. Edit such a post directly in the social network.
:::

Changes to a published post are sent to all of its accounts at once, and the result is visible per account in the details window: "Updated: …" or "Update error: …". Not every network applies changes to the link and pictures.

### Which networks support editing

| Network | Editing | Deleting |
| --- | --- | --- |
| VKontakte | yes | yes |
| Facebook | yes | yes |
| Odnoklassniki | yes | yes |
| Telegram | yes | yes |
| MAX | yes | yes |
| Instagram | **no** | yes |

If you change a post published to Instagram, the change is saved in ParrotPoster but is not sent to Instagram: that account shows "Update is not supported on this network". To change a caption in Instagram, delete the post and create a new one, or fix the caption in the Instagram app itself.

## Delete a post

In the post details window (or the card menu) click **Delete** and confirm "Delete post?". What happens:

- A post that has not been published yet simply stops being published and goes to the **Trash** — you can [restore it](./drafts-and-calendar.md#trash).
- A published post (status "Success" or "Publish failed") is also deleted from the social networks: the status becomes "Deleting" and a request is sent for each account separately. If deletion failed in some network, the post stays there — delete it in the social network itself.
- If you delete a post while it is being published, updated or deleted, no delete request is sent to the social networks: delete such a post manually in the social network.
- You cannot delete a post only from ParrotPoster and leave it in the social networks.

Permanent deletion from the trash is not connected with the social networks: a post is deleted from them only at the moment of the first deletion.
