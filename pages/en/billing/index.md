---
title: Plans and billing
---

# Plans and billing

The **Tariffs** section in the cabinet menu (in the WordPress plugin, the **Tariffs** item) shows your current plan and limits, and lets you renew or change the plan. Current prices and plan contents are shown on the **Tariffs** page itself; they are not listed in the documentation so that it doesn't go out of date.

## Your tariff

Use the **Your tariff** block to find out:

- whether the plan is currently valid and whether there is a payment problem — from the **Active**, **Expiring soon**, **Expired**, **Auto-renew** or **Payment failed** status;
- the date through which the plan is paid — from **Active until** (or "Expired {date}" / "Renews {date}" if auto-renewal is on);
- whether you can connect another social account — **Added accounts** shows how many accounts are connected and how many are allowed, for example "3 of 5";
- how much AI quota for post-text processing remains until the next reset — from "N% used" and "Resets on {date}". If there is no limit, it says **Unlimited**; if your plan has no AI, it says **AI is not available on your plan** with an **AI plans** link.

This block only shows the state of your current plan; it has no payment or renewal buttons.

::: tip What the limits mean
- **Accounts.** The limit is checked when you add a new account. When there is no room left, the add button is disabled. Delete an account you don't need or switch to a larger plan. More in [Accounts](/en/accounts/index.md).
- **Posts.** Plan cards say "Unlimited number of posts".
- **AI.** The quota limits use of ParrotPoster models for AI text processing. You can connect your own AI model in **Integrations → AI models**; its costs go to your provider and do not use the quota.
:::

## Trial period

A new user starts on a trial plan. According to the plugin interface, it lasts 14 days with no card required. The trial cannot be renewed; when it ends, select a paid plan card.

## What happens when the plan expires

Your data (accounts, posts, automations, templates) is kept. But until the plan is renewed, publishing does not run, and creating or editing posts and connecting new accounts are unavailable. Restrictions are lifted immediately after payment. Scheduled posts are not published until the plan is renewed, so renew in advance.

## Choosing and paying for a plan

1. Open **Tariffs** and find the plan you want in the **Select a plan** block. The card shows the monthly price (**/ month**) and the number of accounts. Your current plan is marked **Current**.
2. In **Select a subscription period**, choose 1 month, 3 months, 6 months or 1 year. A longer period gets a discount (up to 22%); the total is shown on the card and in the **payable** block.
3. On the selected plan card, click **Proceed to payment**. When paying for your current paid plan, this button is called **Renew**.

::: tip Renewing and switching
- Paying for your **current** plan prolongs it: the chosen number of months is added if the plan has not expired yet.
- When you switch to a **different** plan, the remaining days of the previous plan are recalculated and transferred to the new one.
:::

**Legal entities:** send your company details to [support@parrotposter.com](mailto:support@parrotposter.com) and we will issue an invoice.

If payment went through but the period did not change, wait up to 15 minutes and refresh the page. If it still has not changed, contact support: [Support](/en/assistant/support.md). Refunds and disputed payments are also handled by support.

## Auto-renewal

Auto-renewal is enabled during payment (the auto-payment checkbox) and is available for payment by a Russian card through T-Bank. It is not available for other payment methods.

When auto-renewal is on, the **Tariffs** page shows the **Auto-renew** status and "Next auto-renew".

- **Details:** **Auto-renew** button → **Read more** shows the plan expiry, the next renewal date, amount and period.
- **Turn off:** **Auto-renew** button → **Cancel**, then confirm **Cancel auto-renewal?**. The period you already paid for is kept.
- **Charge failed:** if the bank declines the payment, the status becomes **Payment failed** with **Failed to auto-renew**. Click **Try again** or **Pay now**.

::: warning
A regular payment without the auto-payment checkbox turns off a previously enabled auto-renewal.
:::

## Partner program

In the partner program you earn a percentage of payments from users who paid for a plan with your promo code.

1. On the **Tariffs** page, in **FAQ**, choose **How to earn with us?** → **Become a partner** (the menu also has a **Become a partner** item). Read the Partnership Agreement and click **Accept**.
2. After that a **Partner** section appears in the menu. Create a promo code: come up with a symbol code (Latin letters, numbers, hyphen, underscore, for example `PARROT_7`) and choose how much of your partnership interest to give the user as a discount.
3. The user enters the promo code when paying and gets a discount, and the remaining percentage is credited to your balance.

Example from the interface: partnership interest 15%, promo code discount 5%. For a 1000 ₽ payment the user gets a 50 ₽ discount and you earn 100 ₽.

The **Partner** page shows **Your balance**, the amount of orders with your promo codes in the current and previous month, **Partnership interest** and **Current level**. For each promo code: number of payments, amount of orders and earnings.

Your level depends on the monthly amount of payments with your promo codes; it goes up on the 1st day of the next month:

| Level | Partnership interest | Monthly payments by promo codes |
| --- | --- | --- |
| 1 | 15% | — |
| 2 | 20% | from 5,000 ₽ |
| 3 | 25% | from 15,000 ₽ |
| 4 | 30% | from 50,000 ₽ |
| 5 | 35% | from 150,000 ₽ |

If in the last 6 months the monthly amount did not reach the amount required for your level, the level is lowered accordingly.

**Withdrawing funds:** available when your balance is at least 1000 ₽. To withdraw, email your details to [support@parrotposter.com](mailto:support@parrotposter.com).
