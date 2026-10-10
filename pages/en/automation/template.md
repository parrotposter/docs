---
title: Publication template
---

# Publication template

The template describes how a source item turns into a post: text, images and video, link, per-network options and (optionally) AI processing. It is configured on the last wizard step, **Publication template**, and later edited in the created automation on the **Content** tab ([how](./edit.md#content)).

The screen has two parts: the editor on the left and the **Preview** of the selected networks on the right.

## Post text

The **Post text** field is built from plain text and inserted item fields (title, excerpt, link, categories, etc.).

### Visual mode

The editor is visual by default: source fields are inserted as chips inside the text.

- **Insert field** — opens the list of source fields with search by name or key. Fields already in the template are marked **In template**. The set of fields depends on the source (for a WordPress site, for example, basic fields, media, taxonomies and WooCommerce fields).
- Click an inserted field to open **Field settings**.
- **Presets** — ready-made text blocks, for example **Title + excerpt**, **Short teaser**, **WooCommerce product**. For digests — **Titles only**, **Titles with links**, **Title + excerpt per entry**.

In **Field settings** you can:

| Option | What it does |
| --- | --- |
| **Strip HTML** | Removes markup |
| **First paragraph only** | Takes the first paragraph |
| **As hashtags** and **Max hashtags** | Turns the value (for example, categories) into hashtags |
| **Truncate by characters** / **Truncate by words** | Limits the length |
| **Default if empty** | A fallback value (**Fallback value**) if the field is empty |
| **AI processing** | Neural-network processing of this fragment only, see [below](#ai-processing) |

Order matters: put **Strip HTML** before AI (the model should not see markup), and **Truncate by characters** after AI as a length safety net.

If a field name is not found in the source, the editor shows **Unknown field**. A template with no text cannot be saved.

### Liquid mode

The **Editor mode** switch: **Visual** / **Liquid**. In **Liquid** mode the template is text in the Liquid template language, for example:

```liquid
{{ item.title }}

{{ item.title | truncate: 100 }}
```

Filters the visual editor shows as field options: `strip_html`, `hashtags`, `truncate`, `truncatewords`, `ai`. Other Liquid constructs stay in the text as they are and appear as non-editable inserts. If a template has advanced constructs, the editor opens in text mode and offers **Switch to visual editor**.

## Media

The **Media** block:

- Turn on **Add media from the article**.
- In **Media field** choose a source field with an image. With **+ Add field** you can specify several fields — media are taken from all selected ones in order (images, video, GIF, audio, files).
- For **Instagram, media is required**: a post without a picture or video will not go out.

Each network has its own limits and supported attachment types, and ParrotPoster adapts the post to them automatically. The preview shows warnings such as **Text was truncated to fit the platform limit**, **Media list was truncated to the platform limit**, **Unsupported media type was skipped**, and for Facebook that photos are skipped when there is a video (one video per post).

## Link

The **Link attachment** block: turn on **Add link to the article** and choose the **Link field**. How the link ends up in the post depends on the network: in Telegram it is shown as **Link → preview**, in other networks as **Link → attachment**.

Under **Advanced: link preview and UTM** you can set the link card **Title**, **Description** and **Preview image**, and turn on **Add UTM tags**.

## Per-network settings

At the top of the editor there are tabs: **Shared** and one for each network type selected on the **Accounts** step. If no accounts are selected yet, there are no tabs — select accounts to customize the template per network.

On a network tab any block (text, media, link) can be overridden:

- the block has a label **Same as shared** (the shared template is used) or **Overridden**;
- **Customize separately** — set your own variant for this network;
- **Revert to shared** — go back to the shared one;
- **Reset all overrides** — remove all differences at once.

A tab with differences gets the **Has overrides** mark.

### Publish options per network

On the individual network tabs the **Publish options** block holds options specific to that network.

**Telegram**

| Option | Description |
| --- | --- |
| **Telegram link preview** | For text-only posts: a site card. The URL is not appended to the body |
| **Large link preview** | Enlarge media in the link card |
| **Preview above text** | Show the link card above the message text |
| **URL button** and **Button label** | A button under the post (default label **Read**) |
| **Mute notifications** | Send silently — subscribers get no sound notification |
| **Protect content** | Prevent forwarding and saving of the message |
| **Media spoiler** | Cover photo, video or GIF with a spoiler until tapped (not for audio/documents) |
| **Caption above media** | Show the caption above the photo/video/GIF instead of below |

**VKontakte**

| Option | Description |
| --- | --- |
| **Publish on behalf of the group** | Post as the community, not as the connected user |
| **Add a signature to the post** | Show the author signature next to a community post |
| **Close comments** | Disable commenting |
| **Mute notifications** | Do not notify subscribers about the new post |
| **Mark as ads** | Add an "This is an ad" label to a community post |
| **Media layout** | **Carousel** or **Grid** — how to show several photos or videos |
| **First comment** and **First comment text** | After publishing, post a community comment (CTA, link, question) |

**Facebook**

| Option | Description |
| --- | --- |
| **First comment** and **First comment text** | After publishing, post a Page comment (often the article link when the post has photos) |
| **Link CTA button** and **Button type** | Only for posts without media: a button on the link card. Types: **Learn more**, **Shop now**, **Sign up**, **Book travel**, **Contact us**, **Get offer**, **Subscribe**. With photos or video a CTA with a link is not supported |

**MAX**

| Option | Description |
| --- | --- |
| **MAX link preview** | For text-only posts: a site card. The preview is disabled automatically when the post has a photo |
| **URL button** and **Button label** | A button under the post (default **Read**) |
| **Mute notifications** | Do not notify chat members |
| **First comment (reply)** and **First comment text** | After publishing, send a reply message |

Other networks have no separate options in the template.

## Preview

On the right you see how the post will look in each selected network: text, **Media: N** and warnings about the network's limits. You can choose which item to look at in the **Sample item** field (fresh source items that match the selection are used). If there are no items or they could not be loaded, the **Show demo data** button shows an example.

Before saving the preview is approximate (**Approximate — save the template for an exact preview**). After saving it is more accurate, and rendering errors appear as **Preview error**.

## AI processing

AI can adapt the finished text before publishing. There are two ways, and they can be combined.

### AI post-processing of the whole text

The **AI post-processing** block switches **Off** / **AI**. It can be turned on for all networks on the **Shared** tab and differently for individual networks on network tabs (the tab shows **Own instructions** or **Shared instructions**).

- **Model**: **Default model** (ParrotPoster's, depends on your tariff) or **My own model** (your OpenAI, Anthropic or compatible provider key; added under **Integrations → AI models**, then select it in **Your model**).
- **Instructions**: a task text for the model; you can pick a ready **Instruction template** or **Custom prompt**. These variables are available in instructions: `{{ platform.type }}`, `{{ platform.name }}`, `{{ platform.max_text_chars }}`, `{{ pipeline.name }}`, `{{ item.* }}`.
- **Temperature**: a lower value gives a more stable result.

The **Run through AI** button in the preview runs real AI processing as a check (it uses your AI limit and may take up to 20 seconds; the template must be saved first).

### AI on a single fragment

In **Field settings** turn on **AI processing**, set the **Instruction** (for example, "Summarize to three sentences, keep the numbers") and, if needed, **Max characters**. The template has a limit on the number of AI fragments, and the editor shows how many are used; extra fragments stay unprocessed. If an AI fragment is inside the digest entry list, it runs for every entry and quickly uses up the limit. If AI post-processing of the whole text is also on, such fragments are processed twice — the editor warns you.

### If AI is unavailable

AI never blocks publishing. If the neural network is unavailable (invalid key, quota exceeded, the default model is not in your tariff, provider failure), the post goes out with the **original text**, and the journal shows **AI unavailable — used original text** on the AI step. It is a degradation, not an error. A template with AI can be saved on any tariff: availability is checked at publish time. How much AI is available depends on your [tariff](/en/billing/index.md).

## Digest

For **Digest** mode the editor has extra blocks:

- **Insert entry list** — inserts a loop over the entries of the digest. Choose the fields you want for each entry, change the **Loop variable name** if needed and click **Insert**. The inserted block can then be edited as plain text. Fields outside the block (for example, `item.title`) refer only to the most recent entry and are not repeated.
- **Insert entry count** — inserts the number of entries in the digest.
- **Rubric cover** — a fixed image shown first in every digest (unlike an item image, which changes). **Upload image** / **Remove cover**.
- **One image per entry (carousel)** — one image from each entry; choose the image in **Image field**. The number of images is limited by the network.
- The preview is built from several fresh items (**Sample of N entries**).

<!-- screenshot: template-digest | The "Template" step in Digest mode: "Insert entry list", rubric cover | annotate: the "Insert entry list" button and the "Rubric cover" block -->

More about the mode: [Digest](./modes.md#digest).
