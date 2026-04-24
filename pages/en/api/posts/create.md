# Create post

The main method for publishing content. Supports text, links, images, and scheduled publishing.

## Input shape

The mutation accepts a `post` object:

```graphql
mutation {
  createPost(
    post: {
      fields: { ... }
      networks: { ... }
      publishAt: "2024-01-12T04:00:19.123Z"
    }
  ) {
    id
  }
}
```

## `post` parameters

### `fields` — post body

Describes text and media.

| Field        | Type      | Required | Description                                                                      |
| ------------ | --------- | -------- | -------------------------------------------------------------------------------- |
| `text`       | String    | Yes      | Post text                                                                        |
| `link`       | String    | No       | Link to attach to the post                                                       |
| `tags`       | String    | No       | Tags (format depends on the network)                                             |
| `imageUrls`  | [String]  | No       | Image URLs — the service downloads and processes them automatically              |
| `extra`      | Object    | No       | Extra options for specific networks                                              |

**`extra` may contain:**

| Field          | Type    | Description                                                                                     |
| -------------- | ------- | ----------------------------------------------------------------------------------------------- |
| `vkFromGroup`  | Boolean | Publish as the VK community (`true`) or as the author (`false`). Default: `true`                |
| `vkSigned`     | Boolean | Add an author signature in VK. Default: `false`                                                 |

### `networks` — targets

| Field       | Type      | Required | Description                                                                                               |
| ----------- | --------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `accounts`  | [String]  | Yes      | Account IDs from [listSocialAccounts](../socials.md#listSocialAccounts)                                   |

### `publishAt` — schedule

| Field        | Type   | Required | Description                                                                                                                                                                                   |
| ------------ | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `publishAt`  | String | No       | **RFC3339** date/time. If omitted or in the past, the post publishes immediately. If in the future, it is scheduled.                                                                        |

**Date format:**

- Use **UTC**. If no timezone is given, the server treats the value as UTC.
- Example: `"2024-01-12T04:00:19.123Z"` (`Z` means UTC).
- Precision may vary: `"2024-01-12T04:00:19Z"`, `"2024-01-12T04:00:00Z"`, etc.

## Examples

**Example 1: immediate text post to one account**

```graphql
mutation {
  createPost(
    post: {
      fields: { text: "Hello, world! This is my first post via the API" }
      networks: { accounts: ["social_account_id"] }
    }
  ) {
    id
    status
  }
}
```

**Example 2: post with link and images to multiple networks**

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
        extra: { vkFromGroup: true, vkSigned: false }
      }
      networks: { accounts: ["account_vk", "account_tg"] }
    }
  ) {
    id
  }
}
```

**Example 3: scheduled post — publish in one day at noon UTC**

```graphql
mutation {
  createPost(
    post: {
      fields: { text: "This post will go live tomorrow at noon UTC" }
      networks: { accounts: ["social_account_id"] }
      publishAt: "2026-01-13T12:00:00Z"
    }
  ) {
    id
    publishAt
  }
}
```

## `createPost` response

The mutation returns the created post. Request any fields you need. See the [Post](./item.md) object.
