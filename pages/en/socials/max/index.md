---
title: Max
---

# Connecting Max

::: tip Beta
The Max messenger integration is in beta. If something goes wrong, email [support@parrotposter.com](mailto:support@parrotposter.com).
:::

You can connect a Max channel or group in **two ways**:

1. **Use the ParrotPoster bot** — generate a confirmation code, bind it in our bot, add the bot as an administrator, then enter the channel link or [numeric ID](#max-numeric-id).
2. **Use your own bot** — create a bot in the [Max partner portal](https://business.max.ru), pass moderation, then enter the token and the **[numeric chat ID](#max-numeric-id)**. Automatic channel lists are no longer available.

<!-- #region max-instructions -->

## Option 1: ParrotPoster bot

### Confirmation code

1. The Max connection dialog creates a 15-minute code and an “Open ParrotPoster bot” link.
2. Open the [ParrotPoster bot](https://max.ru/id745313661965_1_bot) or send the code in a direct chat so Max binds the code to your account.
3. **Add** the ParrotPoster bot to the channel as a **member**, then grant **administrator** rights. You must be an administrator yourself.

### Connect the channel

1. Paste the channel **link or [numeric ID](#max-numeric-id)**.
2. Click **Connect** only after the code is bound and the bot is an administrator.
3. If the channel is not found by link, remove the bot from the channel and add it again, or use the [numeric ID](#max-numeric-id).

## Option 2: Your own bot

### Creating a bot

1. Open the [Max partner portal](https://business.max.ru) and register as a legal entity if needed.
2. When the dashboard is ready, click [Add bot](https://business.max.ru/self/#/create-bot).
3. Fill in the bot details and click **Create**. After **moderation**, the bot is ready.

### Token and numeric chat ID

1. Start a chat with the bot, then add it to the channel as a member and administrator.
2. On the [bot page](https://business.max.ru/self/#/chat-bots), under Integration, click **Get token**.
3. In ParrotPoster paste the token and the **[numeric chat ID](#max-numeric-id)**. Channels are no longer listed automatically from the token.

<h2 id="max-numeric-id">How to get the numeric ID</h2>

The numeric ID of a channel or group is a long number, sometimes with a minus sign, for example `123456789`. You can paste it instead of a link.

1. Open the channel or group in the Max app or on [web.max.ru](https://web.max.ru) and copy its link.
2. If the address looks like `https://max.ru/123456789` or `https://web.max.ru/123456789`, that trailing number is the ID. Paste **only the number** into ParrotPoster.
3. If the link is a username (`https://max.ru/mychannel`) or an invite (`https://max.ru/join/...`), it does not contain the ID. With the ParrotPoster bot a public link is enough; with your own bot you still need the numeric ID.
4. **Your own bot:** MAX does not list the bot’s channels. After you add the bot to the chat, open the [bot page](https://business.max.ru/self/#/chat-bots), Integration section, and copy the numeric ID from the “bot added” event.

<!-- #endregion max-instructions -->

## Support

If you have trouble connecting Max, email **support@parrotposter.com**.
