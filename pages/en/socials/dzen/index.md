---
title: Dzen
---

# Publishing to Dzen

::: tip How it works
Dzen does not offer a public API for third-party services to publish directly to Dzen.
The official way to automate publishing is via the **official Dzen Telegram bot** [`@zen_sync_bot`](https://t.me/zen_sync_bot), which mirrors posts from your Telegram channel to Dzen.

The flow is simple: ParrotPoster publishes to your Telegram channel → the bot copies it to Dzen.

:::

::: warning Limitations

- Editing or deleting a post in Telegram **is not synced** to Dzen — changes are made manually in the Dzen studio.
- The Telegram channel must be **public**.
- Posts with text become **articles** in Dzen; posts with only photos or video become **media posts**.

:::

---

## Step 1. Connect your Telegram channel in ParrotPoster

If you have not added your Telegram channel to ParrotPoster yet, do that first.

👉 [Telegram channel connection guide](../tg/)

Then return here and continue setup.

---

## Step 2. Link your Telegram channel to Dzen

### 2.1. Get an access code in the Dzen studio

1. Open your channel and go to channel settings.
2. In the left menu, open **Settings** → **Cross-posting** → **Telegram bot**.
3. Click **Get access code**.

![Settings](/images/socials/dzen/dzen-settings.png)

The code is a long alphanumeric string. **Copy it** — it is valid for **30 minutes**, then you need a new one.

![Access code](/images/socials/dzen/dzen-settings-code.png)

### 2.2. Link the channel via the Dzen sync bot

1. Open Telegram and find **[@zen_sync_bot](https://t.me/zen_sync_bot)** (“Dzen sync bot”).
2. Tap **Start** (or send `/start`).

![Starting the bot](/images/socials/dzen/dzen-bot-start.png)

3. **Paste the copied code** into the chat. The bot will confirm linking to your Dzen channel and ask for consent.
4. Confirm.

![Channel linked](/images/socials/dzen/dzen-bot-ready.png)

5. Send the `/sync` command.

![Starting sync](/images/socials/dzen/dzen-bot-sync.png)

### 2.3. Add the sync bot as an admin of your Telegram channel

The bot will ask you to add it as an administrator of your Telegram channel.

1. Open your Telegram channel and its settings.
2. Go to **Administrators** → **Add administrator**.
3. Search for **@zen_sync_bot** and select it.
4. Confirm (it is enough to leave **Post messages** enabled).

![Adding bot as admin](/images/socials/dzen/dzen-bot-channel-admin.png)

### 2.4. Send the channel link to the bot

1. Return to the chat with **@zen_sync_bot**.
2. Copy your Telegram channel link (like `https://t.me/channel_name`) and send it to the bot.

![Channel link](/images/socials/dzen/dzen-bot-add-link.png)

3. Choose publishing mode: **automatic** (all channel posts are duplicated to Dzen) or **manual** (forward only selected posts to the bot chat).

::: tip We recommend automatic
With ParrotPoster, automatic mode is more convenient — every post sent through ParrotPoster to the Telegram channel appears in Dzen without extra steps.
:::

![Automatic publishing](/images/socials/dzen/dzen-bot-auto.png)

---

## Step 3. Verify it works

1. In **ParrotPoster**, create a test post and select your Telegram channel as the publishing target.
2. After publishing, check your Telegram channel — the post should appear.
3. After 2–5 minutes, open your channel in Dzen — the post should appear there as well.

<!-- Screenshots: post in TG via ParrotPoster; same post in Dzen -->

---

## What happens with long posts

| Text length in Telegram        | Format in Dzen                          |
| ------------------------------ | --------------------------------------- |
| Up to 1,500 characters         | **Post**                                |
| From 1,500 to 3,000 characters | **Article** or multiple posts (by Dzen) |
| No text (photo or video only)  | **Media post**                          |

---

## FAQ

::: details Can I connect several Dzen channels?
Yes. Each Telegram channel must be linked to its own Dzen channel via the bot — create a separate ParrotPoster account for each TG channel if needed.
:::

::: details I edited/deleted a post in Telegram — will Dzen update?
No. Edits and deletions in Telegram **are not synced** to Dzen. To change material already in Dzen, open [Dzen Studio](https://dzen.ru/profile/editor) and edit there.
:::

::: details The post is in Telegram but not in Dzen
Wait 5–10 minutes — sync can take a bit longer. If it still does not appear:

- Check that [@zen_sync_bot](https://t.me/zen_sync_bot) is still an administrator of your Telegram channel.
- Check that the Telegram channel is public.

:::

::: details Can I publish only to Dzen, without Telegram?
No — that option does not exist. Dzen receives posts only from a Telegram channel via the sync bot.
:::
