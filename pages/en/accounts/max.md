---
title: Max
---

# Connecting Max

::: tip Beta
The Max messenger integration is in beta. If something goes wrong, email [support@parrotposter.com](mailto:support@parrotposter.com).
:::

In **Accounts** click **Max**. In the "Connect Max" window select a connection type:

1. **Use ParrotPoster bot** — get a confirmation code, bind it in the ParrotPoster bot, add the bot as a channel administrator and enter the channel link or [numeric ID](#how-to-get-the-numeric-id).
2. **Use your bot** — create a bot in the [Max partner portal](https://business.max.ru), wait for moderation and enter the token together with the **[numeric chat ID](#how-to-get-the-numeric-id)**. The channel list is not loaded by token.

## Option 1: ParrotPoster bot

### Confirm the connection

1. The connection window creates a code (valid for a limited time) and shows an **Open bot** button.
2. Click it: the code is passed to the bot automatically and the "Code accepted" status appears. If the button did not work, click **Copy code** and send the code to the bot manually in a direct chat.
3. If the code has expired, click **Get a new code**.

### Add the bot to the channel

Add ParrotPoster to the channel or group first as a **member**, then make it an **administrator**. You must be a channel administrator yourself.

### Specify the channel

1. In the "Paste the channel/group link or ID" field paste the link or the [numeric ID](#how-to-get-the-numeric-id).
2. Click **Connect** — only after the code is accepted and the bot has become an administrator.
3. If the link is not found yet, wait a few seconds. If it does not help, remove the bot from the channel and add it again, or enter the numeric ID.

## Option 2: your own bot

### Create a bot

1. Go to the [Max partner portal](https://business.max.ru) and register as a legal entity if you have not done so yet.
2. When your account is ready, click [Add bot](https://business.max.ru/self/#/create-bot).
3. Specify the bot data: name, phone, site link, description and logo — and click **Create**. The bot is ready after moderation.

### Token and numeric ID

1. Find your bot in Max search and start a dialog with it, then add it to the channel as a member and afterwards as an administrator.
2. On the [bot page](https://business.max.ru/self/#/chat-bots) in the "Integration" section click **Get token** and copy it.
3. In ParrotPoster paste the token into the "Insert your bot token" field and the [numeric chat ID](#how-to-get-the-numeric-id) into the "Channel/group chat ID" field. Click **Connect**.

## How to get the numeric ID

The numeric ID of a channel or group is a long number, sometimes with a minus sign, for example `123456789`. You can paste it instead of the link.

1. Open the channel or group in the Max app or at [web.max.ru](https://web.max.ru) and copy the link.
2. If the address looks like `https://max.ru/123456789` or `https://web.max.ru/123456789`, the number at the end is the ID. Paste **only this number** into ParrotPoster.
3. If the link contains a username (`https://max.ru/mychannel`) or an invitation (`https://max.ru/join/...`), there is no ID in it. For the ParrotPoster bot such a public link can be used as is; for your own bot the numeric ID is still required.
4. **Your own bot:** Max does not show a list of the bot's channels. After adding the bot to a chat, take the numeric `chat_id` from the `bot_added` event in your bot's integration, as described in the [Max documentation](https://dev.max.ru/docs-api/use-cases/getting-chat-id).

## Troubleshooting

::: details "Add the ParrotPoster bot to this channel or group and make it an administrator"
The ParrotPoster bot must be in the channel, and it must be an **administrator**. Grant the rights and try connecting again.
:::

::: details The confirmation code is not accepted or has expired
Click **Get a new code** and send it to the bot — bind the code first, then click "Connect".
:::

::: details A link is not accepted for your own bot
Your own bot needs the numeric chat ID; a link or alias will not work.
:::

::: warning No reconnecting
There is no "Reconnect" button for Max in the account list. If access is lost, delete the account and connect the channel again.
:::

## Support

If you have problems connecting Max, write to **support@parrotposter.com**.
