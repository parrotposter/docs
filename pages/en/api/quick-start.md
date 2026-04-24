# Quick start

This guide helps you get familiar with the API and run your first requests in about five minutes.

## Step 1: Get an access token

Most API operations require authentication. Obtain a token with the `login` mutation.

Run the following request with your real ParrotPoster email and password:

**Request:**

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
  }
}
```

**Important:** The `from` field must always be `FRONT`.

**Response:**

```json
{
  "data": {
    "login": {
      "token": "your_unique_access_token"
    }
  }
}
```

Save the token — you will need it for all later requests.

## Step 2: Send the token with each request

Pass the token in the `Authorization` HTTP header:

```text
Authorization: Bearer your_unique_access_token
```

All examples below assume this header is present.

## Step 3: First query — list social accounts

With a token, fetch the social accounts connected to ParrotPoster.

**Request:**

```graphql
query {
  listSocialAccounts {
    id
    name
  }
}
```

**Response:**

```json
{
  "data": {
    "listSocialAccounts": [
      {
        "id": "account_id_1",
        "name": "My VK community"
      },
      {
        "id": "account_id_2",
        "name": "My Telegram channel"
      }
    ]
  }
}
```

Note the `id` values — you will use them in `networks.accounts` when creating posts.

## PHP example (Yii2)

The same query using `yii\httpclient\Client`:

```php
<?php
use yii\httpclient\Client;

$client = new Client();
$token = 'your_unique_access_token';

$response = $client->createRequest()
    ->setMethod('POST')
    ->setUrl('https://parrotposter.com/api/graphql')
    ->addHeaders([
        'Authorization' => 'Bearer ' . $token,
        'Content-Type' => 'application/json',
    ])
    ->setData([
        'query' => '
            query {
                listSocialAccounts {
                    id
                    name
                }
            }
        ',
    ])
    ->send();

if ($response->isOk) {
    $data = $response->data;
    $accounts = $data['data']['listSocialAccounts'] ?? [];
    print_r($accounts);
} else {
    echo 'Error: ' . $response->statusCode;
}
?>
```

## What’s next?

You now know how to:

- Obtain an access token
- Pass it in requests
- List available accounts

Next, learn how to **create posts** and manage publications.
