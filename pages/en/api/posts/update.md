# Updating a post

The `updatePost` mutation changes an existing post: not yet published, scheduled, a draft, or already published (with the limits below). It requires a token with write access and an active plan.

```graphql
mutation {
  updatePost(
    id: "post_id"
    post: { fields: { text: "Updated post text" } }
  ) {
    id
    status
  }
}
```

## Parameters

| Argument | Type        | Description                              |
| -------- | ----------- | ---------------------------------------- |
| `id`     | ID!         | Post ID                                  |
| `post`   | PostUpdate! | Data to change (all fields are optional) |

`PostUpdate` fields:

| Field            | Type                    | Description                                                                                                                  |
| ---------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `fields`         | PostFieldsInput         | Content — the same fields as in [`createPost`](./create.md)                                                                  |
| `networks`       | PostNetworksInput       | Accounts to publish to                                                                                                       |
| `publishAt`      | DateTime                | New publishing time (UTC)                                                                                                    |
| `draft`          | Boolean                 | `false` — move a draft to publishing                                                                                         |
| `draftParams`    | DraftParamsInput        | Draft schedule. If omitted, it stays as it was. When moving a draft to publishing (`draft: false`), pass a schedule so it is resolved into a publishing time |
| `fieldOverrides` | PostFieldOverridesInput | Per-network and per-account changes. If omitted, they stay as they were; empty `bySocialType` and `byAccount` clear them     |

Unlike `createPost`, there is no `publishDelayMinutes` here: use `publishAt` to change the time.

## Response

The mutation returns the updated [`Post`](./item.md) object.

## Limits

- You cannot update a published post if more than a day has passed since it was published.
- You cannot change the publishing time (`publishAt`) of an already published post.
- While a post is being processed (publishing or updating), the update is rejected — retry later.
- Changing images and the link in an already published post is not supported by all social networks: in some of them such changes will not be applied. Operations that are not available for a particular publication are listed in `results[].notAllowed` (see the [Post object](./item.md)).

Error codes are described in [Errors](../errors.md).
