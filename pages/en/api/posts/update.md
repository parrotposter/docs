# Update post

The `updatePost` mutation updates a post that has not been published yet, or that was published **within the last 24 hours**.

::: warning Important
You **cannot** update a post if **24 hours** have passed since it was published.
:::

## Input shape

```graphql
mutation {
  updatePost(
    id: "post_id"
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

## `id` parameter

Unique ID of the post to update.

## `post` parameter

Same structure as in [createPost](./create.md).

## `updatePost` response

Returns the updated post. Request the fields you need. See [Post](./item.md).

## Important notes

1. Updating images or links on an already published post may not apply in some networks.
2. You cannot change the publish time of a post that has already been published.
