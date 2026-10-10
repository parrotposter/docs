# Social accounts

Account IDs are needed to create posts (`networks.accounts`). Accounts themselves are connected in the [web app](../accounts/index.md) — you cannot connect an account through the API.

<h2 id="listSocialAccounts">Account list: <code>listSocialAccounts</code></h2>

The query returns all connected accounts of the current user.

**Query:**

```graphql
query {
  listSocialAccounts {
    id
    name
    type
    link
    photo
    error
    checkedAt
    instagramPrivate
  }
}
```

**`SocialAccount` fields:**

| Field              | Type       | Description                                                                                                                                |
| ------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`               | ID!        | Account ID. **Use it when [creating a post](./posts/create.md)** in `networks.accounts`                                                    |
| `name`             | String     | Display name (group, channel, or page name)                                                                                                |
| `type`             | SocialType | Social network, see the table below                                                                                                        |
| `link`             | String     | Link to the account on the social network                                                                                                  |
| `photo`            | String     | Account image URL                                                                                                                          |
| `error`            | String     | Text of the last connection-check error in the user's language. `null` if there are no problems. On error, [reconnect](../accounts/index.md) the account in the web app |
| `checkedAt`        | DateTime   | Time of the last connection check (UTC)                                                                                                    |
| `createdAt`        | DateTime   | Time the account was connected (UTC)                                                                                                       |
| `instagramPrivate` | Boolean!   | `true` for Instagram connected with login and password (private API); `false` for all other accounts                                        |

### `type` values

| Value | Social network |
| ----- | -------------- |
| `VK`  | VKontakte      |
| `OK`  | Odnoklassniki  |
| `TG`  | Telegram       |
| `FB`  | Facebook       |
| `IG`  | Instagram      |
| `MAX` | Max            |

`TEST` is a service value (a test network for development). The list of values may grow, so do not fail on an unknown `type`.

**Example response:**

```json
{
  "data": {
    "listSocialAccounts": [
      {
        "id": "account_id_1",
        "name": "My VK group",
        "type": "VK",
        "link": "https://vk.com/my_group",
        "photo": "https://...",
        "error": null,
        "checkedAt": "2026-01-12T04:00:19.123Z",
        "instagramPrivate": false
      },
      {
        "id": "account_id_2",
        "name": "my_instagram",
        "type": "IG",
        "link": "https://instagram.com/my_instagram",
        "photo": null,
        "error": "Access error",
        "checkedAt": "2026-01-12T04:00:19.123Z",
        "instagramPrivate": true
      }
    ]
  }
}
```

::: tip
Instagram posts must include media — publishing text only ends with an error in `results[].errorMsg`. See [Errors](./errors.md).
:::
