# Deleting a post

The `deletePost` mutation deletes a post. It requires a token with write access and an active plan. You can delete only your own posts.

A post is not erased right away: it is marked as deleted and goes to the **Trash** in the web app (from there it can be restored if it was never published, or deleted permanently; posts stay in the trash for 30 days). For a published post, deletion also starts removing the publications from social networks where this is supported; such a post can no longer be restored.

```graphql
mutation {
  deletePost(id: "post_id") {
    id
  }
}
```

## Parameters

| Argument | Type | Description                  |
| -------- | ---- | ---------------------------- |
| `id`     | ID!  | ID of the post to delete     |

## Response

The mutation returns a `Post` in which only the `id` field is filled — the ID of the deleted post. Other fields will be empty, so request only `id`.

Deleted posts are not shown in the post list by default; to see the trash, use the `deleted: true` filter ([getting posts](./get.md)).
