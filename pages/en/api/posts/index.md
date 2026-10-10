# Posts

The API lets you manage the whole post lifecycle: create, get, update, and delete. All examples assume you have already [obtained a token](../auth.md) and send it in the `Authorization` header. The accounts you publish to must be connected in the [web app](../../accounts/index.md); their IDs come from [`listSocialAccounts`](../socials.md).

| Operation            | Method                          | Page                                      |
| -------------------- | ------------------------------- | ----------------------------------------- |
| Create a post        | mutation `createPost`           | [Creating a post](./create.md)            |
| Get a post           | query `post`                    | [Getting posts](./get.md)                 |
| List posts           | query `posts`, `postsCount`     | [Getting posts](./get.md)                 |
| Update a post        | mutation `updatePost`           | [Updating a post](./update.md)            |
| Delete a post        | mutation `deletePost`           | [Deleting a post](./delete.md)            |
| `Post` object fields | —                               | [Post object](./item.md)                  |

Mutations require an active plan and a token with write access (not read-only); the `post` and `posts` queries are also available to a read-only token.

## Creating

```graphql
mutation {
  createPost(
    post: {
      fields: { text: "Post text" }
      networks: { accounts: ["account_id"] }
    }
  ) {
    id
    status
  }
}
```

More in [createPost](./create.md): media, UTM tags, VKontakte and Facebook settings, scheduling, drafts.

## Getting

```graphql
query {
  post(id: "post_id") {
    id
    status
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

More in [post and posts](./get.md).

## Updating and deleting

```graphql
mutation {
  updatePost(id: "post_id", post: { fields: { text: "New text" } }) {
    id
  }
}
```

```graphql
mutation {
  deletePost(id: "post_id") {
    id
  }
}
```

More in [updatePost](./update.md) and [deletePost](./delete.md).

## Good to know

1. **Publishing is asynchronous.** `createPost` returns the post right away, and per-account results appear later in `results`; the overall outcome is in `status`.
2. **Media is loaded by link.** The service downloads images and files from `imageUrls` and `fileUrls` itself, so the links must be reachable from the internet.
3. **Interval between posts.** **Settings → Posts** sets the minimum interval between publications (in seconds, from 1 to 3600; default 60). You can create posts through the API at any rate, but the actual send time is shifted so that the interval is respected. This interval does not apply to automation.
4. **Time is UTC.** All dates are sent and returned in UTC.
