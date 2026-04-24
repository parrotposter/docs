# Delete post

This mutation deletes a post. If it was already published, the service also removes it from the social networks where possible.

::: warning Important
Deletion is **permanent** — the post cannot be restored.
:::

## Example request

```graphql
mutation {
  deletePost(id: "post_id_12345") {
    id
  }
}
```

## `id` parameter

Unique ID of the post to delete.

## `deletePost` response

Returns the deleted post object. Request the fields you need. See [Post](./item.md).
