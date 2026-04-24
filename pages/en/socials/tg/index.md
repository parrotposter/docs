---
title: Telegram
---

# Connecting Telegram

To connect a Telegram group or channel, you first need to create a bot and then add it as an administrator of the group or channel.

It takes a few more steps than with other networks, but it is still straightforward — take your time.

<!-- #region common-auth -->

## Creating a bot

Start a chat with Telegram’s bot for creating bots: [@BotFather](https://t.me/BotFather).
This bot creates other bots and lets you manage them.
We need the simplest kind of bot.

Send `/start` to BotFather. It will reply with a list of available commands. You do not need to learn all of them right now.

![Starting a chat with BotFather](/images/socials/tg/tg-bot-0.png)

Now send `/newbot`.
BotFather will ask for a display name for your new bot. The name can be anything.

::: tip Note
Choose a meaningful name — it will appear as the author of posts in your channel or group

::: details More detail
In a channel it will look like this:
![In a channel](/images/socials/tg/tg-bot-channel.png)

In a group it will look like this:
![In a group](/images/socials/tg/tg-bot-group.png)
:::

![Creating the bot](/images/socials/tg/tg-bot-1.png)

Next, set a username for the bot.
The username must be in Latin characters and must end with `bot`,
for example `my_site_bot` or `mySiteBot`.

::: tip Note
The bot username must be unique across Telegram.
If a name is already taken, choose another one.
:::

![Bot username](/images/socials/tg/tg-bot-2.png)

Congratulations — you have created a bot!

BotFather will give you a token for the bot; copy it (a single tap on the token is enough). You will need it soon.

![Bot created](/images/socials/tg/tg-bot-3.png)

Now add the bot to your group or channel. To do that, you must be an **administrator** of the group or channel.

## Adding the bot to a group

Open your group and its info.
At the bottom, tap **Add member** (or similar).

![Group info](/images/socials/tg/tg-group-0.png)

Enter the username of the bot you created.
Your bot should appear in the list.
Select it and tap **Add**.

![Adding the bot to the group](/images/socials/tg/tg-group-1.png)

Done — the bot is in the group. Continue to the next step.

## Adding the bot to a channel

Open your channel and its info.
At the bottom, tap **Add member**.

![Channel info](/images/socials/tg/tg-channel-0.png)

Enter the username of the bot you created.
Select the bot from the list and tap **Add**.

![Adding the bot to the channel](/images/socials/tg/tg-channel-1.png)

In a channel the bot must be added as an administrator — confirm that.

![Confirming admin role](/images/socials/tg/tg-channel-2.png)

You can leave permissions such as editing channel info and posting messages enabled.

![Permissions](/images/socials/tg/tg-channel-3.png)

Done — the bot is in the channel. Continue to the next step.

<!-- #endregion common-auth -->

## Connecting in ParrotPoster

After the steps above, open the page for adding social networks and click **Connect Telegram**.

![Connection page](/images/socials/tg/tg-connect-0.png)

Enter the bot token from BotFather and the link to your group or channel in the corresponding fields.
Then click **Add**.

![Entering connection details](/images/socials/tg/tg-connect-1.png)

Done — your Telegram account is connected in the service.
