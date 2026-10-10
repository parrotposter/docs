---
title: Telegram
---

# Connecting Telegram

Posts to Telegram are published on behalf of a bot that is added to your channel or group. ParrotPoster offers two ways:

- **Use ParrotPoster bot** — the simplest: you do not need your own bot. You add the ParrotPoster bot to your channel or group and paste the **public** link or `@username`.
- **Use your own bot** — you create a bot with [@BotFather](https://t.me/BotFather) and enter its token together with the link to the channel or group. The bot name is shown as the author of posts.

::: warning The channel or group must be public
Without a public link (or `@username`) publishing is not possible.
:::

## Option 1. ParrotPoster bot

1. In **Accounts** click **Telegram**. In the connection window keep the "Use ParrotPoster bot" option.

   ![Connection page](/images/socials/tg/tg-connect-0.png)

2. Add the ParrotPoster bot to your channel or group (click "Instruction" in the connection window for the permissions; if you cannot find the bot, write to [support](../assistant/support.md)):
   - **channel** — add the bot as an **administrator**; leave only the "Publish messages" permission;
   - **group** — add the bot as a **member**.
3. Paste the link or `@username` into the "Public channel or group link, or @username" field and click **Connect**.

## Option 2. Your own bot

### Create a bot

1. Open [@BotFather](https://t.me/BotFather) and send `/start`. It replies with a list of commands.

   ![Starting a dialog with BotFather](/images/socials/tg/tg-bot-0.png)

2. Send `/newbot` and enter a name for the bot. The name can be anything, but it is shown as the author of posts, so choose a meaningful one.

   ::: details What it looks like
   In a channel:

   ![In a channel](/images/socials/tg/tg-bot-channel.png)

   In a group:

   ![In a group](/images/socials/tg/tg-bot-group.png)
   :::

   ![Creating a bot](/images/socials/tg/tg-bot-1.png)

3. Set the bot username: Latin letters only, and it must end with `bot` (for example, `my_site_bot`). It must be unique across Telegram — if it is taken, choose another one.

   ![Bot username](/images/socials/tg/tg-bot-2.png)

4. BotFather gives you the bot **token**. Copy it.

   ![Bot created](/images/socials/tg/tg-bot-3.png)

### Add the bot to a group

You must be a group **administrator**. Open the group info, click "Add members", find the bot by username and add it.

![Group info](/images/socials/tg/tg-group-0.png)

![Adding the bot to a group](/images/socials/tg/tg-group-1.png)

### Add the bot to a channel

You must be a channel **administrator**. Open the channel info, click "Add members", find the bot and add it.

![Channel info](/images/socials/tg/tg-channel-0.png)

![Adding the bot to a channel](/images/socials/tg/tg-channel-1.png)

A bot can be added to a channel only as an **administrator** — confirm.

![Confirming the admin role](/images/socials/tg/tg-channel-2.png)

Leave only the "Publish messages" permission.

![Granting permissions](/images/socials/tg/tg-channel-3.png)

### Connect in ParrotPoster

1. In **Accounts** click **Telegram** and choose "Use your own bot".
2. Enter the bot token and the link to the channel or group. Click **Connect**.

   ![Entering connection data](/images/socials/tg/tg-connect-1.png)

Done: the account appears in the list.

## Reconnecting

If an account shows an error, choose **Reconnect** in the account card menu — the "Reconnect Telegram" window opens with your account. Check the bot token and the channel or group link and click **Reconnect**. The channel must stay the same: you cannot switch an account to another channel — connect another channel as a separate account.

## Troubleshooting

::: details "Failed to connect. Check that the data entered is correct"
- The bot is added to the channel as an administrator (to a group as a member) and has the "Publish messages" permission.
- The channel or group is public and the link or `@username` is correct.
- For your own bot the token is copied completely, without spaces.
:::

::: details I do not like the bot name in posts
The bot name is shown as the author of posts. For your own bot change the name in @BotFather; the ParrotPoster bot name cannot be changed.
:::

::: tip Dzen
A Telegram channel is the basis for publishing to Dzen: see [Dzen](./dzen.md).
:::
