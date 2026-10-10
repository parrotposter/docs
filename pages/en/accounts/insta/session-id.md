---
title: Instagram — Session ID
---

# Connecting Instagram via Session ID

This method is for cases when Instagram does not send an SMS or a two-factor code during login with login and password. You sign in to Instagram in a desktop browser (SMS and 2FA usually work there), copy the `sessionid` cookie and paste it into ParrotPoster. No password is needed in ParrotPoster.

## How to copy sessionid

1. Open [instagram.com](https://www.instagram.com) in a desktop browser and sign in.
2. Open developer tools (the **F12** key) and find the `sessionid` cookie for `https://www.instagram.com`:

   **Chrome, Edge, Yandex Browser** — F12 → **Application** tab → on the left **Cookies → https://www.instagram.com** → the **sessionid** row → copy **Value**.

   **Firefox** — F12 → **Storage** tab → **Cookies → https://www.instagram.com** → **sessionid** → **Value**.

   **Safari (Mac)** — enable the Develop menu in Safari settings → **Develop → Show Web Inspector** → **Storage → Cookies** → **sessionid**.

3. Copy exactly the value from the **Value** column — a long string (50+ characters) that starts with your userId digits. Do not copy `ds_user_id` or `csrftoken`.
4. In ParrotPoster open **Accounts → Instagram**, choose "Via Session ID (if SMS codes don't arrive)", paste the value into the "Session ID" field and click **Connect**.

::: warning Security
Do not share the Session ID with anyone: it can be used to access your account.
:::

## Validity

A Session ID is valid for about 90 days. If you change your password or log out of the account in the browser, you will need to reconnect the account: choose **Reconnect** in the card menu, open the **Session ID** tab and paste the new value.

::: tip Proxy
For Session ID, as for login with password, the "Proxy (optional)" field is available. See the [Instagram guide](./index.md#using-a-proxy).
:::

## Troubleshooting

::: details "Failed to connect. Check that the data entered is correct"
- You copied the value from the **Value** column of the `sessionid` row, with no extra spaces or quotes.
- You did not mix up the rows: `ds_user_id` and `csrftoken` do not work.
- You did not log out in the browser after copying: logging out invalidates the Session ID (see "Validity").
:::

::: details The connection stopped working
Most likely about 90 days have passed, or you changed your password or logged out. Copy a new `sessionid` and use **Reconnect**.
:::

::: details I cannot find the cookies in developer tools
Make sure the **Application** tab (Chrome, Edge, Yandex Browser) or **Storage** tab (Firefox) is open and the `https://www.instagram.com` domain is selected. If there is no such tab, open developer tools on the instagram.com page.
:::
