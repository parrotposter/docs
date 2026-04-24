# Get post

Returns post information by its unique ID.

**Request:**

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
          "linkToSocialPost": "https://vk.com/wall-111222333_7777"
        }
      ]
    }
  }
}
```

See the [Post](./item.md) object structure.
