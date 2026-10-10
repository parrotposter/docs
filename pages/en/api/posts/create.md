# Creating a post

The `createPost` mutation creates a post: it is published immediately, on a schedule, or saved as a draft. It requires a token with write access (not read-only) and an active plan.

```graphql
mutation {
  createPost(
    post: {
      fields: { ... }
      networks: { accounts: ["account_id"] }
    }
  ) {
    id
    status
  }
}
```

## `post` parameters (`PostCreate`)

| Field                 | Type                      | Required | Description                                                                                     |
| --------------------- | ------------------------- | -------- | ----------------------------------------------------------------------------------------------- |
| `fields`              | PostFieldsInput!          | Yes      | Post content                                                                                    |
| `networks`            | PostNetworksInput!        | Yes      | Where to publish                                                                                |
| `publishAt`           | DateTime                  | No       | Exact publishing time                                                                           |
| `publishDelayMinutes` | Int                       | No       | Publish N minutes from now                                                                      |
| `draft`               | Boolean                   | No       | `true` — save as a draft without publishing. Default `false`                                    |
| `draftParams`         | DraftParamsInput          | No       | Draft schedule (when to publish after the draft is moved to publishing)                         |
| `fieldOverrides`      | PostFieldOverridesInput   | No       | Custom text, link, tags, files for a single social network or a single account                  |

### `fields` — content (`PostFieldsInput`)

All fields are optional, but the post must contain text or images/files, otherwise the server returns a required-fields error.

| Field       | Type                 | Description                                                                                           |
| ----------- | -------------------- | ----------------------------------------------------------------------------------------------------- |
| `text`      | String               | Post text                                                                                             |
| `link`      | String               | Link to attach to the post                                                                            |
| `tags`      | String               | Tags as a single string                                                                               |
| `imageUrls` | [String!]            | Image URLs: the service downloads and processes them itself                                           |
| `fileUrls`  | [String!]            | File URLs (for example, video): the service downloads them by link                                    |
| `imageIds`  | [ID!]                | IDs of already uploaded images                                                                        |
| `fileIds`   | [ID!]                | IDs of already uploaded files                                                                         |
| `needUtm`   | Boolean              | Add UTM tags to the link                                                                              |
| `utmParams` | UtmParamsInput       | UTM tags: `source`, `medium`, `campaign`, `content`, `term` (all strings)                             |
| `extra`     | PostFieldsExtraInput | Extra parameters for individual social networks (see below)                                           |

Media links must be reachable by the ParrotPoster server over HTTP(S). If an image behind a link cannot be downloaded, the request fails with an error.

### `fields.extra` — social network settings (`PostFieldsExtraInput`)

**VKontakte:**

| Field                      | Type    | Description                                                                        |
| -------------------------- | ------- | ---------------------------------------------------------------------------------- |
| `vkFromGroup`              | Boolean | `true` — publish on behalf of the group, otherwise on behalf of the user           |
| `vkSigned`                 | Boolean | Sign the post with its author (works with `vkFromGroup: true`)                     |
| `vkCloseComments`          | Boolean | Disable comments on the post                                                       |
| `vkFirstComment`           | String  | Text of the first comment added after publishing                                   |
| `vkMarkAsAds`              | Boolean | Mark the post as advertising                                                       |
| `vkMuteNotifications`      | Boolean | Do not notify subscribers about the post                                           |
| `vkPrimaryAttachmentsMode` | String  | How attachments are shown: `carousel` (default) or `grid`                          |

**Facebook:**

| Field            | Type    | Description                                                                     |
| ---------------- | ------- | ------------------------------------------------------------------------------- |
| `fbCtaEnabled`   | Boolean | Add a call-to-action button for posts that contain only a link                  |
| `fbCtaType`      | String  | Button type (for example, `LEARN_MORE`, `SHOP_NOW`)                             |
| `fbFirstComment` | String  | Text of the first comment after publishing to the page                          |

The fields `bxIblockId`, `bxId`, `bxTemplateId`, `wpPostId`, `wpSiteDomain` are filled in by the 1C-Bitrix and WordPress plugins; you do not need them in your own integrations.

### `networks` — where to publish (`PostNetworksInput`)

| Field      | Type  | Description                                                                              |
| ---------- | ----- | ---------------------------------------------------------------------------------------- |
| `accounts` | [ID!] | Account IDs from [`listSocialAccounts`](../socials.md#listSocialAccounts). At least one account is required |

### Publishing time: `publishAt` and `publishDelayMinutes`

These are mutually exclusive: **you cannot specify both** — the server returns an error.

- Neither specified — publish as soon as possible.
- `publishAt` — date and time in RFC 3339 format. A time in the past is treated as "now".
- `publishDelayMinutes` — number of minutes from now, from 0 to 525,600 (about 365 days).

Time is always UTC: `"2026-01-12T04:00:19.123Z"`. Different precision is allowed: `"2026-01-12T04:00:19Z"`, `"2026-01-12T04:00Z"`.

::: tip Interval between posts
The actual send time may be shifted if other posts are already scheduled nearby: the interval between publications from **Settings → Posts** applies (default 60 seconds, allowed 1 to 3600). You can create posts through the API at any rate. This interval does not apply to automation.
:::

### Drafts: `draft` and `draftParams`

A draft is saved without publishing and is visible in the web app ([Drafts and calendar](../../posts/drafts-and-calendar.md)).

```graphql
mutation {
  createPost(
    post: {
      draft: true
      fields: { text: "Draft" }
      networks: { accounts: ["account_id"] }
      draftParams: { schedule: { kind: DELAY, delayMinutes: 60 } }
    }
  ) {
    id
    draft
    draftParams {
      schedule {
        kind
        at
        delayMinutes
      }
    }
  }
}
```

`schedule.kind` is one of `NOW`, `DELAY` (with `delayMinutes`), `AT` (with `at`). If `draft: true` and `draftParams` is not specified, the schedule is taken from `publishAt`/`publishDelayMinutes` (or "immediately"). When a draft is moved to publishing (`updatePost` with `draft: false`), the schedule is resolved into `publishAt`.

### `fieldOverrides` — different texts for different networks

Lets you change `text`, `link`, `tags`, `fileIds`, and `linkPreview` (`title`, `caption`, `imageUrl`) for a whole network (`bySocialType`) or for a specific account (`byAccount`):

```graphql
mutation {
  createPost(
    post: {
      fields: { text: "Common text" }
      networks: { accounts: ["account_vk", "account_tg"] }
      fieldOverrides: {
        bySocialType: [{ socialType: TG, partial: { text: "Text for Telegram" } }]
        byAccount: [{ accountId: "account_vk", partial: { tags: "#news" } }]
      }
    }
  ) {
    id
    hasFieldOverrides
  }
}
```

## Examples

**Text post to one account, published immediately:**

```graphql
mutation {
  createPost(
    post: {
      fields: { text: "Hello, world! This is my first post via the API" }
      networks: { accounts: ["account_id"] }
    }
  ) {
    id
    status
  }
}
```

**Link and images to several networks, on behalf of a VK group:**

```graphql
mutation {
  createPost(
    post: {
      fields: {
        text: "New article on our site"
        link: "https://example.com/article"
        imageUrls: [
          "https://example.com/images/preview1.jpg"
          "https://example.com/images/preview2.jpg"
        ]
        needUtm: true
        utmParams: { source: "parrotposter", medium: "social", campaign: "spring" }
        extra: { vkFromGroup: true, vkSigned: false }
      }
      networks: { accounts: ["account_vk", "account_tg"] }
    }
  ) {
    id
  }
}
```

**Scheduled post for a specific time (UTC):**

```graphql
mutation {
  createPost(
    post: {
      fields: { text: "This post goes out on January 13 at noon UTC" }
      networks: { accounts: ["account_id"] }
      publishAt: "2026-01-13T12:00:00Z"
    }
  ) {
    id
    status
    publishAt
  }
}
```

**Post in 30 minutes:**

```graphql
mutation {
  createPost(
    post: {
      fields: { text: "Will be published in half an hour" }
      networks: { accounts: ["account_id"] }
      publishDelayMinutes: 30
    }
  ) {
    id
    publishAt
  }
}
```

## Response

The mutation returns a [`Post`](./item.md) object: request the fields you need. Publishing is asynchronous: right after creation the post is not yet published, and per-account results appear later in the `results` field ([getting a post](./get.md)).

::: warning Social network requirements
Each social network has its own requirements for a post. For example, Instagram needs at least one image. A violation does not make the mutation itself fail: the reason appears in `results[].errorMsg` of that account. See [Errors](../errors.md).
:::
