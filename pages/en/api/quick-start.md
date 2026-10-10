# Quick start

This guide helps you get a token and make your first requests in a few minutes.

## Step 1. Create an API token

1. Sign in to the [web app](https://parrotposter.com/app) and open **Settings → API tokens**.
2. Click **Create token**.
3. Enter a token name (for example, "Publishing script"). If the script only needs to read data, turn on **Read-only (disallows mutations)**.
4. Copy the secret shown and store it somewhere safe.

::: warning The secret is shown only once
You cannot see it again later. If the secret is lost, **Revoke** the token and create a new one.
:::

<!-- screenshot: api-tokens-create | Settings → API tokens: the "Create token" form and the "Save your token" dialog with the secret -->

An alternative that does not need the web app is the `login` mutation with your email and password, see [Authentication](./auth.md).

## Step 2. Send the token in a header

```text
Authorization: Bearer your_token
```

All examples in this documentation assume this header is present.

## Step 3. Get the list of accounts

**Query:**

```graphql
query {
  listSocialAccounts {
    id
    name
    type
  }
}
```

**With cURL:**

```bash
curl -X POST https://parrotposter.com/api/graphql \
  -H "Authorization: Bearer your_token" \
  -H "Content-Type: application/json" \
  -d '{"query": "query { listSocialAccounts { id name type } }"}'
```

**Response:**

```json
{
  "data": {
    "listSocialAccounts": [
      { "id": "account_id_1", "name": "My VK group", "type": "VK" },
      { "id": "account_id_2", "name": "My Telegram channel", "type": "TG" }
    ]
  }
}
```

You will need the `id` values when creating posts: pass them in `networks.accounts`.

## Step 4. Create a post

```graphql
mutation {
  createPost(
    post: {
      fields: { text: "Hello, world! This post was sent via the API" }
      networks: { accounts: ["account_id_1"] }
    }
  ) {
    id
    status
  }
}
```

The post is queued for publishing. Check the result per account in the `results` field — see [Getting posts](./posts/get.md).

## PHP example

```php
<?php
$token = 'your_token';

$ch = curl_init('https://parrotposter.com/api/graphql');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $token,
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode([
        'query' => 'query { listSocialAccounts { id name type } }',
    ]),
]);

$response = json_decode(curl_exec($ch), true);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if (!empty($response['errors'])) {
    // see "Errors"
    print_r($response['errors']);
} else {
    print_r($response['data']['listSocialAccounts']);
}
```

## What's next

- [Authentication](./auth.md) — read-only tokens, revoking, alternative sign-in
- [Creating a post](./posts/create.md) — media, scheduling, drafts, network settings
- [Errors](./errors.md)
