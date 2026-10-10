# Authentication

API methods that work with your data require a token. Send the token in the HTTP header:

```text
Authorization: Bearer your_token
```

Without a valid token, protected methods return an `unauthorized` error (see [Errors](./errors.md)).

There are two ways to get a token:

| Method | When to use |
| ------ | ----------- |
| **API token** from the web app (recommended) | Scripts, integrations, server-side jobs. No need to store your password; the token can be restricted to read-only mode and revoked at any time |
| The **`login`** mutation | When you cannot use the web app during setup, or you need to obtain a token programmatically with an email and password |

## API tokens (recommended)

### Creating in the web app

1. Open **Settings → API tokens**.
2. Click **Create token**.
3. Enter the **Token name** (required, up to 128 characters).
4. Optionally turn on **Read-only (disallows mutations)**: with such a token queries (`query`) work, and any mutation is rejected.
5. Copy the secret and store it.

::: warning The secret is shown only once
It cannot be shown again. If the secret is lost, revoke the token and create a new one.
:::

<!-- screenshot: api-tokens-list | Settings → API tokens: token list with the "Read-only" badge, last-used date, and the "Rename" and "Revoke" buttons -->

The token list shows the name, creation date, and last-used time. You can **Rename** or **Revoke** a token. A revoked token stops working.

### Creating via the API

You can also create a token with the `createApiToken` mutation (like any mutation, it is not available with a read-only token):

```graphql
mutation {
  createApiToken(name: "Publishing script", readOnly: false) {
    tokenValue
    token {
      id
      name
      readOnly
      active
      createdAt
    }
  }
}
```

| Argument   | Type       | Description                                             |
| ---------- | ---------- | ------------------------------------------------------- |
| `name`     | String!    | Token name, up to 128 characters                        |
| `readOnly` | Boolean!   | `true` — the token cannot run mutations                 |

In the response, `tokenValue` is the secret (**shown only in this response**) and `token` is the token metadata.

List your tokens and manage them:

```graphql
query {
  apiTokens {
    id
    name
    readOnly
    active
    createdAt
    lastUsedAt
  }
}
```

```graphql
mutation {
  updateApiToken(tokenId: "token_id", name: "New name")
}
```

```graphql
mutation {
  revokeApiToken(tokenId: "token_id")
}
```

The secret is never returned by `apiTokens`.

### Rate limit

Requests made with an API token are rate limited: by default 600 requests per minute per token (the window is a UTC calendar minute). When exceeded, the server responds with HTTP status `429 Too Many Requests`; retry in the next minute.

## Alternative: the `login` mutation

The `login` mutation does not need a token and returns a token for your ParrotPoster email and password.

```graphql
mutation {
  login(
    input: {
      username: "your-email@example.com"
      password: "your-password"
      from: FRONT
    }
  ) {
    token
    userId
  }
}
```

| `input` field | Type      | Required | Description                                                                |
| ------------- | --------- | -------- | -------------------------------------------------------------------------- |
| `username`    | String!   | Yes      | The email used at registration                                              |
| `password`    | String!   | Yes      | Password                                                                    |
| `from`        | Platform! | Yes      | Where the sign-in comes from. Use `FRONT` for your own integrations        |
| `fromSite`    | String    | No       | Site address (used by plugins)                                              |
| `lang`        | String    | No       | User interface language                                                     |

Allowed `Platform` values: `FRONT`, `BITRIX`, `BITRIX_24`, `WORDPRESS`. Values other than `FRONT` are meant for the official plugins.

**Response:**

```json
{
  "data": {
    "login": {
      "token": "your_token",
      "userId": "user_id"
    }
  }
}
```

Pass a `login` token the same way as an API token: `Authorization: Bearer <token>`.

### How a `login` token behaves

- The token has no expiry: it works until it is revoked.
- Such a token appears in **Settings → Sessions** (where you can end the session) and is revoked with the `revokeToken` mutation. Called without arguments, it revokes the token sent in the header:

```graphql
mutation {
  revokeToken
}
```

- The limit of 600 requests per minute applies only to API tokens; it does not apply to tokens from `login`.
- A `login` token has full access: there is no read-only mode for it. If you need restricted access, use an API token.

::: tip
Do not keep your password in scripts. Create an API token — it can be revoked without changing your password.
:::

## Storing the token

1. Store the token in a secure place (environment variables, CI secrets), not in a repository.
2. Do not put the token in client-side code (JavaScript on site pages): the token gives access to your account.
3. Create a separate token for each integration so you can revoke it independently of the others.

## Examples

### cURL

```bash
curl -X POST https://parrotposter.com/api/graphql \
  -H "Authorization: Bearer your_token" \
  -H "Content-Type: application/json" \
  -d '{"query": "query { listSocialAccounts { id name } }"}'
```

### PHP

```php
<?php
$ch = curl_init('https://parrotposter.com/api/graphql');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $token,
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode([
        'query' => 'query { listSocialAccounts { id name } }',
    ]),
]);
$response = json_decode(curl_exec($ch), true);
curl_close($ch);
```
