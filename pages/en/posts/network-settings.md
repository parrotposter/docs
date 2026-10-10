# Settings for different social networks

In the manual post form one text and one set of attachments go to all selected accounts. Network-specific settings are minimal, and the differences come from the capabilities of the social networks themselves.

## Platform options in the post form

The **Platform options** block appears only when VKontakte is among the selected accounts. Other social networks have no extra options in the manual form.

| Option | What it does |
| --- | --- |
| **Publish on behalf of the group** | the post is published as the VKontakte community, not as the connected user. On by default when creating a post |
| **Add a signature to the post** | shows the author signature next to a community post. Available only when publishing on behalf of the community is on |

These options, like the accounts, cannot be changed after the post is published.

## Base version and per-network differences

The same post can differ between networks: its own text, link, tags, attachments or settings for a specific network or account. Priority: account → network → base version. The manual form does not set such differences: they appear on posts created by automation or through the [API](/en/api/).

If a post has differences, the details window shows **Base** and one switch per network above the content. Select a network to see the text, tags, link and attachments that go to that network. If a network has different text, turn on **Diff** — the differing words are highlighted. The notes "Media differs from the base version" and "Link differs from the base version" tell you that attachments or the link are different too.

In addition, before sending, ParrotPoster adapts the text to the network's rules: text that is too long is shortened at a word boundary, unsupported markup is simplified to plain text, and attachments the network does not accept are skipped. A link that a network cannot publish separately (Instagram) is removed, while an address already pasted in the text stays.

## What each network supports

The values below are the limits ParrotPoster applies when publishing. The social networks themselves may have other rules, so check the final outcome in the [publication results](./index.md#statuses).

| Network | Text, characters | Attachments in a post | Photo, up to | Video, up to | Editing a published post | Separate link |
| --- | --- | --- | --- | --- | --- | --- |
| VKontakte | 16000 | 10 | 50 MB | 2048 MB, 14400 s | yes | yes, as an attachment |
| Facebook | 63206 | 20 | 25 MB | 10000 MB, 14400 s | yes | yes, as an attachment |
| Odnoklassniki | 40000 | 10 | 10 MB | 5000 MB | yes | yes, as an attachment |
| Instagram | 2200 | 10 | 8 MB | 100 MB, 60 s | no | no |
| Telegram | 4096 | 10 | 10 MB | 2000 MB | yes | yes, as an attachment |
| MAX | 4000 | 12 | 50 MB | 250 MB | yes | yes, as an attachment |

Also:

- A post never holds more than 10 files regardless of the network: if the table shows more for a network (Facebook, MAX), the post limit still applies.
- Telegram accepts text in HTML and MarkdownV2, MAX in Markdown and HTML; in the other networks formatting is simplified to plain text.
- Attachment types: VKontakte — photos, video, GIF, documents; Facebook, Odnoklassniki, Instagram — photos and video; Telegram — photos, video, GIF, documents, audio; MAX — photos, video, audio, documents.
- Instagram requires at least one photo or video: without attachments publishing fails.
- All networks support deleting a published post.

Connection requirements and per-account details are on the pages of the [Accounts](/en/accounts/) section.
