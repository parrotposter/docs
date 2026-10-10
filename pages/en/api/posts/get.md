# Getting posts

There are two queries: `post` — a single post by ID, `posts` — a list of posts with filters and pagination. Both require a token; write access is not needed, so they also work with a read-only token.

## A single post: `post`

```graphql
query {
  post(id: "post_id") {
    id
    status
    fields {
      text
    }
    publishAt
    results {
      accountId
      success
      linkToSocialPost
      errorMsg
    }
  }
}
```

**Response:**

```json
{
  "data": {
    "post": {
      "id": "post_id",
      "status": "SUCCESS",
      "fields": { "text": "This post was published successfully" },
      "publishAt": "2026-01-13T12:00:00Z",
      "results": [
        {
          "accountId": "account_vk",
          "success": true,
          "linkToSocialPost": "https://vk.com/wall-111222333_7777",
          "errorMsg": null
        }
      ]
    }
  }
}
```

You can get only your own post. For someone else's or a non-existent post an error is returned (`forbidden` / `not_found`, see [Errors](../errors.md)). All fields are described in [Post object](./item.md).

::: tip How to know a post is published
Publishing is asynchronous. Watch `status`: `SUCCESS` — everything is published, `FAIL` — an error in at least one social network (details in `results[].errorMsg`). Keep the [rate limit](../errors.md) in mind if you poll the status in a loop.
:::

## Post list: `posts`

The query returns the current user's posts page by page (cursor pagination, Relay connection format). Deleted posts are not included by default.

```graphql
query {
  posts(
    first: 20
    filter: { lifecycle: SCHEDULED }
    sort: { publishAt: ASC }
  ) {
    nodes {
      id
      status
      publishAt
      fields {
        text
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

To get the next page, pass `endCursor` in the `after` argument:

```graphql
query {
  posts(first: 20, after: "cursor_from_endCursor") {
    nodes {
      id
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

### Arguments

| Argument | Type       | Description                                                                |
| -------- | ---------- | -------------------------------------------------------------------------- |
| `first`  | Int        | How many posts to return                                                   |
| `after`  | String     | Cursor (`pageInfo.endCursor`) to continue from                             |
| `filter` | PostFilter | Filter (see below)                                                         |
| `sort`   | PostSort   | Sorting: `{ publishAt: ASC }` or `{ publishAt: DESC }`. Default is `DESC`  |

### `PostFilter`

| Field          | Type          | Description                                                                                                  |
| -------------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
| `lifecycle`    | PostLifecycle | `ALL`, `PUBLISHED`, or `SCHEDULED` (drafts are not included)                                                  |
| `draft`        | Boolean       | `true` — only unpublished drafts                                                                              |
| `deleted`      | Boolean       | `true` — only deleted posts (trash). By default only active posts                                             |
| `publishAtMin` | DateTime      | Only posts with `publishAt` not earlier than the given time (inclusive)                                       |
| `from`         | Platform      | Only posts created from the given platform                                                                    |
| `hasPipeline`  | Boolean       | `true` — only posts created by [automation](../../automation/index.md); `false` — only manual or API posts   |
| `pipelineId`   | ID            | Only posts of the given automation                                                                            |

### Result

| Field      | Description                                                              |
| ---------- | ------------------------------------------------------------------------ |
| `nodes`    | List of posts ([`Post`](./item.md) objects)                              |
| `edges`    | The same with each post's cursor: `edges { cursor node { ... } }`        |
| `pageInfo` | `hasNextPage`, `endCursor` (forward navigation), `hasPreviousPage`, `startCursor` |

To get the whole list, page through results until `hasNextPage` is `false`.

### Post count

To get the total number of posts with the same filters, use `postsCount`:

```graphql
query {
  postsCount(filter: { lifecycle: SCHEDULED })
}
```
