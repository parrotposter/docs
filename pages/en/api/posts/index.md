# Main use cases

This section covers key API methods for managing accounts and posts. All examples assume you have already [obtained an access token](../auth.md) and send it in the `Authorization` header.

## Social account management

Before creating posts, list the accounts you can publish to. Those accounts must be added in the ParrotPoster web UI first.

## Working with posts

The API supports the full post lifecycle: create, read, update, and delete.

### Creating a post: `createPost`

**Request:**

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

See the [createPost](./create.md) mutation in detail.

### Fetching a post: `post`

**Request:**

```graphql
query {
  post(id: "post_id_12345") {
    id
    fields { ... }
    status
    publishAt
    results { ... }
  }
}
```

See the [post](./get.md) query and the [Post](./item.md) object shape.

### Updating a post: `updatePost`

Updates an existing post. The same fields are available as when creating. You **cannot** update a post more than **24 hours** after it was published.

```graphql
mutation {
  updatePost(
    id: "post_id_12345"
    post: { fields: { text: "Updated post text" } }
  ) {
    id
  }
}
```

See [updatePost](./update.md).

### Deleting a post: `deletePost`

```graphql
mutation {
  deletePost(id: "post_id_12345") {
    id
  }
}
```

See [deletePost](./delete.md).

## Important notes

1. **Images** are fetched automatically from the URLs you provide. The service downloads, optimizes, and attaches them to the post.
2. **Interval between posts:** In [settings](https://parrotposter.com/app/settings/posts) you can set a minimum gap between publications (default 60 seconds). That reduces spam risk and respects network limits. You can create posts via the API as often as you like; the limit applies only to **actual** delivery to social networks.
