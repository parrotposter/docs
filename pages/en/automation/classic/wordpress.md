---
title: Classic autoposting in WordPress
description: The ParrotPoster WordPress plugin Scheduler — autoposting templates, publishing via a template from the post screen, switching to the new automation
---

# Classic autoposting in WordPress

The classic **Scheduler** is the original scheme of the ParrotPoster WordPress plugin: you create autoposting templates, and every newly published site post is automatically sent to the selected social networks. It is the analog of the "Instant" mode of the [new automation](/en/automation/). The Scheduler has no scheduled publishing and no archive unloading.

::: tip The new scheme is better
Sites running plugin version 2.0 or later can use the [new automation](/en/automation/): Instant, Archive, Hybrid and Digest modes, post selection, schedule and a run journal. See [Switching to the new automation](#switching-to-the-new-automation) for how to move.
:::

## Which scheme is active on your site

Look at the ParrotPoster menu in the WordPress admin:

| Menu item | Scheme |
| --- | --- |
| **Scheduler** | classic: autoposting templates (this page) |
| **Automation** | new: automations ([description](/en/automation/)) |

Only one scheme works at a time. While the new one is on, Scheduler templates do not fire.

## What autoposting does

- Publishing starts when a post **changes to the "Published" status** (for example, you click "Publish" or a post scheduled in WordPress goes live). An already published post is not resent by this event.
- Autoposting works for public post types (posts, pages, WooCommerce products and other public types; attachments are excluded).
- For a post, all **enabled** templates of its type that have at least one account selected and all conditions met are used. Each matching template creates a separate post in ParrotPoster — its status is visible in the **Posts** section.
- If the template has "Exclude duplicates" on, the same post is not published again via this template.
- If you **edit** an already published post, the text, tags, link and images of the linked ParrotPoster posts are updated. This works while the ParrotPoster post has not been published yet or no more than a day has passed since its publication; older posts are left unchanged.
- If a post is **deleted or moved to trash**, the ParrotPoster posts linked to it are deleted.
- Posts are sent to ParrotPoster through the site's local queue. If the queue has not been processed yet, a notice about waiting items with a view button appears at the top of the plugin pages.

## Create an autoposting template

1. Open **ParrotPoster → Scheduler** (the autoposting tab is open by default).
2. Click **+ Add autoposting**.
3. Fill in the form (fields are described below) and click **Create**.

A new template is pre-filled with defaults: post type "Posts", text — title and excerpt, link — to the post, tags — the post's tags, images — images from the content, duplicate exclusion on. You only need to select social networks.

### General

| Field | What it does |
| --- | --- |
| **Name** | The template name — for you only. |
| **Enable** | Turns the template on or off. |

### Activation conditions

| Field | What it does |
| --- | --- |
| **Wordpress post type** | Which posts the template applies to. After changing the type, press the **Reload** button: the form fields update for the selected type. |
| **Custom conditions** | Extra restrictions. **+ Add field** adds a condition; a post is published only if **all** conditions are met. |

Available conditions:

- **Title**: "Include" or "Not include" the given text.
- **Author**: "Equals one of" or "Not equal to one of" the selected authors.
- **Categories, tags and other taxonomies** of the selected post type: "Equals one of" or "Not equal to one of" the selected terms.
- For WooCommerce products: **regular price**, **sale price** (and their minimum and maximum values) — "Equal", "Not equal", "Less", "Less or equal", "Greater", "Greater or equal"; **product type** — "Equals one of" or "Not equal to one of".

### Post template

| Field | What it does |
| --- | --- |
| **Post text** | The post text. Insert post data with macros (list below). Line breaks typed in the field itself are ignored — use the `{br}` macro for a line break. |
| **Link** | A link to the post or product (`{link}` by default). Remove the macro if you do not need a link. |
| **UTM tags** | If on, UTM tags are added to the link for analytics. These fields appear: "Traffic source" (`utm_source`), "Traffic type" (`utm_medium`), "Campaign name" (`utm_campaign`), "Keyword" (`utm_term`), "Content type" (`utm_content`). Macros work in the fields; in the traffic source the `{social_code}` macro is replaced by the network code (telegram, facebook, etc.). |
| **Tags** | The post's tags become hashtags at the end of the post: "red book, bestseller" → `#red #book #bestseller`. `{post_tag}` by default. |
| **Images** | Post fields to take images from. You can add several fields with **+ Add field**. An image is required for Instagram. |

Image requirements: jpg, png or webp, up to 10 MB each, no more than 10 per post. Only the first image in the list is uploaded to Facebook.

### Macros

The macro list for text, link, tags and UTM is shown next to the "Post text" field: click a macro to insert it. The set depends on the post type.

| Macro | Value |
| --- | --- |
| `{br}` | Break line |
| `{title}` | Title |
| `{content}` | Content |
| `{content_first_paragraph}` | First paragraph of content |
| `{excerpt}` | Excerpt |
| `{link}` | Link to the post |
| `{date}` | Date |
| `{post_tag}`, `{category}`, etc. | Terms of the selected post type's taxonomies (`{taxonomy_name}`) |

For the "Images" field these are available: `{featured_image}`, `{images_in_content}`, `{featured_video}`, `{videos_in_content}`, `{attached_videos}`, `{gifs_in_content}`, `{attached_audio}`, `{attached_documents}`.

For WooCommerce products these are added: `{product_title}`, `{product_short_description}`, `{product_description}`, `{product_regular_price}`, `{product_sale_price}`, `{product_currency}`, `{product_height}`, `{product_length}`, `{product_width}`, `{product_weight}`, `{product_link}`, `{product_image}`, `{product_gallery}`.

::: tip
WordPress shortcodes in the text also work — they are executed before sending.
:::

### Choice of social networks

In the **Choice of social networks** block, tick the accounts to publish to. Connect accounts in the **Accounts** section — see [Accounts](/en/accounts/). If none is selected, the template does not fire.

### When to publish

| Option | What happens |
| --- | --- |
| **Immediately upon publishing the post** | The social network post goes out at the same time as the post on the site. |
| **With a delay** | The post goes out after the given number of minutes — from 1 to 10. |

### Additional settings

- **Exclude duplicates (within this template)** — the same post is not published again via this template. If off, the same post can be published several times.

### Additional settings for VKontakte

- **Publish a post on behalf of the group**.
- **Add a signature to the post**.

These options apply to VKontakte publications only. More about the account — [VKontakte](/en/accounts/vk.md).

## Edit, enable, delete

The template list (**Scheduler**) shows the name, post type, publish time, social networks and an on/off toggle.

- **Edit** — click the name or the "Edit" link, change the fields and click **Update**. Changes affect new publications only.
- **Enable/disable** — the toggle in the "Enable" column. A disabled template does not fire.
- **Delete** — the "Delete" link under the template name.

## Publish a post manually via a template

You can send a post to social networks at any moment without waiting for automation.

1. Open the post in the WordPress editor.
2. In the ParrotPoster block click **Publish to socials network**.
3. In the "Publish post" window choose one or more existing templates for the post's type. If the post was already published via a template, a warning with the date is shown under it.
4. Click **Publish via selected templates**. A message appears that the post was created in ParrotPoster; check its status in the **Posts** section.

If there are no templates or you need other settings, click **Publish manually** — the regular post creation opens, see [Creating a post](/en/posts/create.md).

When the new automation is enabled on the site, the same window shows the "On social networks" and "Publish again" tabs and offers publishing via automations.

## Autounloading

The **Autounloading** tab in the WordPress Scheduler is currently unavailable — it shows "This section is in development". To unload an archive of posts use the [new automation](/en/automation/modes.md) in Archive mode.

## Switching to the new automation

While the classic scheme is on, the top of the Scheduler shows an **Upgrade to Pipelines** block ("Pipelines" is the internal name of the new automation). It offers two paths:

- **Migrate selected templates** — enabled Scheduler templates are converted into automations. The templates (or their groups) are listed under the block; untick those you do not want to migrate.
- **Start from scratch** — switch the site to the new scheme without migrating. If there are no templates, the button is called **Switch to Pipelines**.

After a successful switch the menu shows **Automation** instead of "Scheduler", and its page opens.

### What is migrated

From each template these are migrated: post type, accounts, text (macros are replaced with their equivalents in the new scheme), link, images, UTM tags, VKontakte options ("on behalf of the group", "signature"), conditions and publish delay (minutes become a pause before publishing).

A condition that cannot be converted is skipped; the server returns warnings about such cases. After migration check the texts, UTM tags and conditions in the new automations.

### How templates are grouped

Templates that differ only in their set of accounts (same post type, conditions, publish time, images and text) are merged into one automation with a combined account list. Templates with the same post type, conditions, time and images but different text and **different social networks** are merged too: each network keeps its own text variant. In other cases a template becomes a separate automation. The merged automation's name is the original template names joined with " · ".

### Can you go back

Yes. While enabled Scheduler templates remain in the new scheme, **Settings → Pipelines** has a **Revert to Scheduler** button, and the automation page shows a compact "Pipeline mode is active" block with the same button (the block can be hidden; to bring it back tick "Show migration notice on Pipelines page" in settings). After you confirm, the site works by the classic scheme again. Created automations stay on the server but their triggers are disabled; the Scheduler templates stay on the site.

::: warning
The revert button is shown only while the site has enabled Scheduler templates. Only one scheme is active at a time.
:::

## What next

- [New automation: quick start](/en/automation/quick-start.md)
- [Automation modes](/en/automation/modes.md)
- [Publication template](/en/automation/template.md)
- [Installing the WordPress plugin](/en/start/wordpress.md)
