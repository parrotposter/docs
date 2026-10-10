---
title: Social network accounts
---

# Social network accounts

An account is a page, group or channel of a social network where ParrotPoster publishes posts. All accounts are collected in the **Accounts** section (in the WordPress plugin it is the "Accounts" menu item, in the 1C-Bitrix module the "Accounts" section: it is the same interface).

## How to connect an account

1. Open the **Accounts** section.
2. Above the account list click the button of the network you need: **VKontakte**, **Telegram**, **Facebook**, **Odnoklassniki**, **Instagram**, **Max** or **Dzen**. If not all buttons fit in the row, some of them are moved to the **More** menu.
3. Follow the connection steps for the chosen network (see the table below and the network pages).

<!-- screenshot: accounts-page | Раздел «Аккаунты»: кнопки соцсетей, счётчик «Добавлено X из Y», переключатель «Карточки/Таблица», список аккаунтов -->

The connect buttons are unavailable if your tariff has expired or you have already added the maximum number of accounts — then choose another [tariff](../billing/index.md) (the "Change tariff" link next to the counter).

::: tip Account limit
The number of accounts depends on the tariff. The current value is shown by the "Added X of Y" counter at the top of the page. When connecting VKontakte, Facebook, Odnoklassniki and Instagram (official method), the counter is also shown on the community selection page: if you select more than your tariff allows, the "Add" button becomes inactive.
:::

### Connection methods

| Network | How it is connected | Guide |
| --- | --- | --- |
| VKontakte | Official authorization, then selection of pages and groups | [VKontakte](./vk.md) |
| Telegram | ParrotPoster bot or your own bot; a public link to the channel or group is required | [Telegram](./tg.md) |
| Facebook | Official authorization, then selection of **Pages** (profiles and groups are not supported) | [Facebook](./fb.md) |
| Odnoklassniki | Official authorization, then selection of groups | [Odnoklassniki](./ok.md) |
| Instagram | Three methods: authorization through Instagram, login/password (optional proxy), Session ID | [Instagram](./insta/index.md), [Session ID](./insta/session-id.md) |
| Max | ParrotPoster bot (confirmation code) or your own bot (token and numeric chat ID); beta | [Max](./max.md) |
| Dzen | Via a Telegram channel and the @zen_sync_bot bot | [Dzen](./dzen.md) |

If you already have an active VKontakte, Facebook, Odnoklassniki or Instagram (official method) connection, the "Existing connection" window appears before authorization: **Use** the existing session (for example, to add one more page) or **New connection**.

## Statuses, cards and table

The **Cards / Table** switch changes the list view. The table shows the columns "Name", "Social network", "Status", "Added" and "Last check". A healthy account is shown as "Active". If the network does not respond or access is lost, the account gets an error. Open the account details (name, social network, link, added, last check, error): there you also find the **Reconnect** and **Check connection** buttons — the latter checks access right away and saves the result.

::: warning An old error is not always a new problem
The connection is checked in the background; so a previous error does not disappear by itself until you click "Check connection" or reconnect the account.
:::

## Reconnecting and deleting

Every account has a menu (three dots) with the items:

- **Reconnect** — available when the account has an error. For VKontakte, Facebook, Odnoklassniki and Instagram (official method), ParrotPoster first tries to restore access through another working connection of this network and only if that fails asks you to authorize again. For Telegram and Instagram by login/password, a "Reconnect" window with your data opens. For Max and Dzen there is no reconnecting: delete the account and connect it again.
- **Delete** — after confirming "Delete account …?" the account is deleted.

Reconnecting fixes the account state but does not resend old failed publications — publish them again if needed.

## Limits by network

Below are the publishing capabilities. If the text is longer than the limit, ParrotPoster shortens it at a word boundary and shows a warning; extra attachments are dropped. The table describes what the network supports, not a promise that a particular connection method supports it.

| Network | Text, characters | Attachments | Photo | Video | Edit after publishing | Delete | Link preview |
| --- | --- | --- | --- | --- | --- | --- | --- |
| VKontakte | 16,000 | up to 10 (photo, video, GIF, documents) | up to 50 MB | up to 2048 MB, up to 4 hours | yes | yes | yes |
| Telegram | 4096 (HTML, MarkdownV2 or plain text formatting) | up to 10 (photo, video, GIF, documents, audio) | up to 10 MB | up to 2000 MB | yes | yes | yes |
| Facebook | 63,206 | up to 20 (photo, video) | up to 25 MB | up to 10,000 MB, up to 4 hours | yes | yes | yes |
| Odnoklassniki | 40,000 | up to 10 (photo, video) | up to 10 MB | up to 5000 MB | yes | yes | yes |
| Instagram | 2200 | up to 10 (photo, video); **a post without media is not published** | up to 8 MB | up to 100 MB, up to 60 seconds | no | yes (except the official method) | no; a standalone link is removed, an address in the text stays |
| Max | 4000 (plain text, Markdown, HTML) | up to 12 (photo, video, audio, documents) | up to 50 MB | up to 250 MB | yes | yes | yes |
| Dzen | as in Telegram: published from the Telegram channel | as in Telegram | as in Telegram | as in Telegram | no (edit manually in Dzen) | no | — |

For all networks except Instagram, a post without attachments can be published. How limits apply to posts and what you see in the result is described in the ["Posts"](../posts/index.md) section.

## Pages by network

- [VKontakte](./vk.md)
- [Telegram](./tg.md)
- [Facebook](./fb.md)
- [Instagram](./insta/index.md) and [Session ID](./insta/session-id.md)
- [Odnoklassniki](./ok.md)
- [Max](./max.md)
- [Dzen](./dzen.md)
