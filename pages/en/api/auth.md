# Authentication

Protected API methods require authentication. ParrotPoster uses a token-based flow: you obtain a token with the `login` mutation and send it with every subsequent request.

## Obtaining a token: `login` mutation

The only unauthenticated API operation is the `login` mutation. It accepts user credentials and returns an access token.

### Request

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

**`input` fields:**

| Field        | Type   | Required | Description                                      |
| ------------ | ------ | -------- | ------------------------------------------------ |
| `username`   | String | Yes      | Email used when registering in ParrotPoster      |
| `password`   | String | Yes      | Account password                                 |
| `from`       | Enum   | Yes      | Always use `FRONT`                             |

### Response

On success the API returns an object with a `token` field:

```json
{
  "data": {
    "login": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

### Authentication errors

If credentials are wrong, the API returns a standard GraphQL error:

```json
{
  "errors": [
    {
      "message": "User not found",
      "extensions": {
        "code": "user_not_found"
      }
    }
  ]
}
```

## Using the token

Send the token on every request to protected operations in the `Authorization` header using the `Bearer` scheme:

```
Authorization: Bearer your_unique_access_token
```

### cURL example

```bash
curl -X POST https://parrotposter.com/api/graphql \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{"query": "query { listSocialAccounts { id name } }"}'
```

### PHP example (Yii2)

```php
use yii\httpclient\Client;

$client = new Client();
$token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

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
```

## Token lifetime

Access tokens do not expire by time. For security:

1. Store the token in a protected place (e.g. server-side config not exposed to the web).
2. Do not embed the token in client-side JavaScript.
3. To invalidate a token, change your ParrotPoster password — the old token stops working.
