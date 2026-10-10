---
title: Dzen
---

# Publishing to Dzen

In **Accounts** the **Dzen** button does not connect a separate account; it opens a hint: autoposting to Dzen is set up via Telegram. Full instructions are below.

::: tip How it works
Dzen does not provide an open API for third-party services to publish content.
The official way to automate publishing is via the **official Dzen Telegram bot** [`@zen_sync_bot`](https://t.me/zen_sync_bot), which mirrors posts from your Telegram channel to Dzen.

The scheme is simple: ParrotPoster publishes a post to your Telegram channel → the bot automatically copies it to Dzen.
:::

::: warning Limitations

- Updating or deleting a post in Telegram is **not synced** to Dzen — edit it manually in Dzen Studio.
- The Telegram channel must be **public**.
- The format of the publication in Dzen (post, article or media post) is chosen by Dzen itself based on the Telegram post content.

:::

---

## Step 1. Connect your Telegram channel in ParrotPoster

If you have not connected your Telegram channel to ParrotPoster yet, do it first.

👉 [Telegram channel connection guide](./tg.md)

After connecting, come back here and continue.

---

## Step 2. Link your Telegram channel to Dzen

### 2.1. Get an access code in Dzen Studio

1. Open your channel in Dzen and go to the channel settings.
2. In the left menu find **Settings** → **Crossposting** → **Telegram bot**.
3. Click **Get access code**.

![Settings](/images/socials/dzen/dzen-settings.png)

The code is a long combination of letters and digits. **Copy it** — it is valid for **30 minutes**, after which you must generate a new one.

![Access code](/images/socials/dzen/dzen-settings-code.png)

### 2.2. Link the channel via the Dzen sync bot

1. Open Telegram and find **[@zen_sync_bot](https://t.me/zen_sync_bot)** ("Dzen sync bot").
2. Click **Start** (or send `/start`).

![Starting the bot](/images/socials/dzen/dzen-bot-start.png)

3. **Paste the copied code** into the chat with the bot. The bot confirms the link to your Dzen channel and asks for consent.
4. Confirm.

![Channel linked](/images/socials/dzen/dzen-bot-ready.png)

5. Send the `/sync` command.

![Starting sync](/images/socials/dzen/dzen-bot-sync.png)

### 2.3. Add the sync bot as an admin of your Telegram channel

The bot asks you to add it as an administrator of your Telegram channel.

1. Go to your Telegram channel and open its settings.
2. Go to **Administrators** → **Add administrator**.
3. Find **@zen_sync_bot** in the search and select it.
4. Confirm (it is enough to keep the **Post messages** permission).

![Adding the bot as admin](/images/socials/dzen/dzen-bot-channel-admin.png)

### 2.4. Send the channel link to the bot

1. Go back to the chat with **@zen_sync_bot**.
2. Copy your Telegram channel link (like `https://t.me/channel_name`) and send it to the bot.

![Channel link](/images/socials/dzen/dzen-bot-add-link.png)

3. Choose the publishing mode: **automatic** (all posts from the channel are mirrored to Dzen immediately) or **manual** (you forward the post you need to the bot chat and it appears in Dzen).

::: tip We recommend "automatic"
With ParrotPoster the automatic mode is more convenient: every post sent through ParrotPoster to the Telegram channel appears in Dzen with no extra steps.
:::

![Automatic publishing](/images/socials/dzen/dzen-bot-auto.png)

---

## Step 3. Verify it works

1. In **ParrotPoster** create a test post and select your Telegram channel as the publishing account.
2. After publishing, go to your Telegram channel — the post should appear.
3. After a few minutes open your channel in Dzen — the post should appear there too.

## FAQ

::: details Can I connect several Dzen channels?
Yes. Each Telegram channel has to be linked separately to its own Dzen channel via the bot — create a separate account in ParrotPoster for each Telegram channel.
:::

::: details I edited/deleted a post in Telegram — will it change in Dzen?
No. Edits and deletions in Telegram **are not synced** to Dzen. To change material already published in Dzen, open [Dzen Studio](https://dzen.ru/profile/editor) and edit it manually.
:::

::: details The post was published in Telegram but did not appear in Dzen
Wait a few minutes — synchronization takes time. If the post still does not appear:

- Check that [@zen_sync_bot](https://t.me/zen_sync_bot) is still an administrator of your Telegram channel.
- Check that the Telegram channel is public.

:::

::: details Can I publish a post only to Dzen, bypassing Telegram?
No — there is no such option. Dzen receives posts only from a Telegram channel via the sync bot.
:::
