# Social accounts

You may need account data when creating posts. Accounts themselves must be connected beforehand in the [ParrotPoster web app](https://parrotposter.com/app/accounts).

<h2 id="listSocialAccounts">Listing accounts: <code>listSocialAccounts</code></h2>

The `listSocialAccounts` query returns all connected social accounts.

**Request:**

```graphql
query {
  listSocialAccounts {
    id
    name
    type
    link
    photo
  }
}
```

**Response fields:**

| Field    | Type   | Description                                                                                                                           |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `id`     | String | Unique account ID. **Use this value in [create post](./posts/create.md)** in `networks.accounts`                                   |
| `name`   | String | Display name (e.g. group or page title)                                                                                               |
| `type`   | String | Account type (e.g. VK, FB, TG, OK, etc.)                                                                                              |
| `link`   | String | URL of the account in the social network                                                                                              |
| `photo`  | String | URL of the account image                                                                                                              |

**Example response:**

```json
{
  "data": {
    "listSocialAccounts": [
      {
        "id": "account_id_1",
        "name": "My VK community",
        "type": "VK",
        "link": "https://vk.com/my_group",
        "photo": "https://..."
      },
      {
        "id": "account_id_2",
        "name": "My Telegram channel",
        "type": "TG",
        "link": "https://t.me/my_channel",
        "photo": null
      }
    ]
  }
}
```
