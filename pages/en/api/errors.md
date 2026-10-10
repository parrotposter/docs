# Errors

## GraphQL error format

As in any GraphQL API, request errors arrive in the `errors` field of the response. Check for it, not only the HTTP status.

```json
{
  "errors": [
    {
      "message": "Wrong password",
      "path": ["login"],
      "extensions": {
        "code": "wrong_password",
        "correlation_id": "..."
      }
    }
  ],
  "data": null
}
```

| Field                        | Description                                                                                                       |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `message`                    | Human-readable error text in the user's language. Meant for people — do not rely on its wording in code            |
| `extensions.code`            | Error category for programmatic handling (table below)                                                            |
| `extensions.correlation_id`  | Identifier for support. Include it when you contact [support](../assistant/support.md)                            |
| `extensions.detail`          | Extra details, if any                                                                                             |
| `path`                       | Which query field caused the error                                                                                |

The `message` language is determined by the `?lang=ru|en` query parameter, the `X-Lang` header, or `Accept-Language`; the default is Russian.

## `extensions.code` values

| Code                  | Meaning                                                          | What to do                                                                              |
| --------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `unauthorized`        | The token is missing, invalid, or revoked                        | Check the `Authorization: Bearer ...` header and that the token is not revoked ([Authentication](./auth.md)) |
| `forbidden`           | Action not allowed: someone else's post, read-only token, etc.   | Use a token with write access and work only with your own data                          |
| `not_found`           | Object not found (post, account, user, file)                     | Check the ID                                                                            |
| `validation_error`    | Invalid input or a disallowed action                             | Fix the request according to `message`                                                  |
| `tariff_limit`        | The plan has expired or a plan limit is reached                  | [Renew or change your plan](../billing/index.md)                                        |
| `wrong_password`      | Wrong password in `login`                                        | —                                                                                       |
| `user_exists`         | The user already exists                                          | —                                                                                       |
| `service_unavailable` | The service is temporarily unavailable                           | Retry later                                                                             |
| `internal_error`      | Internal server error                                            | Retry; if it keeps happening, send the `correlation_id` to support                      |

The list of codes may grow: treat unknown codes as a generic error.

## Typical errors

### Authentication

| Situation                                  | `code`             | Meaning                                            |
| ------------------------------------------ | ------------------ | -------------------------------------------------- |
| Token missing, invalid, or revoked         | `unauthorized`     | Not authorized                                     |
| A mutation with a read-only token          | `forbidden`        | Read-only session. This action is unavailable.     |
| `login`: user not found                    | `not_found`        | User not found                                     |
| `login`: wrong password                    | `wrong_password`   | Wrong password                                     |
| Empty or too long token name               | `validation_error` | A token name is required / the name is too long (maximum 128 characters) |

An invalid or revoked token does not cause an HTTP error: the request runs as unauthenticated, and protected methods return `unauthorized`.

### Plan

| Situation                                                        | `code`         | Meaning                    |
| ---------------------------------------------------------------- | -------------- | -------------------------- |
| Creating, updating, or deleting a post when the plan has expired | `tariff_limit` | The plan has expired       |
| The plan's account limit is reached (when connecting in the web app) | `tariff_limit` | Account limit exceeded |

You can see your plan and its limits in [Plans](../billing/index.md).

### Posts

| Situation                                                           | `code`             | Meaning                                                         |
| ------------------------------------------------------------------- | ------------------ | --------------------------------------------------------------- |
| Neither text nor images                                             | `validation_error` | Required fields are missing (text or images)                    |
| No account selected                                                 | `validation_error` | Select at least one account to publish to                       |
| Account not found                                                   | `not_found`        | Social account not found                                        |
| Both `publishAt` and `publishDelayMinutes` specified                | `validation_error` | You cannot specify a publish date and a relative delay together |
| `publishDelayMinutes` outside 0–525600                              | `validation_error` | Invalid publishing delay (minutes)                              |
| Invalid `draftParams` / draft state transition                      | `validation_error` | Invalid draft schedule / the draft state cannot be changed      |
| An image from `imageUrls` could not be downloaded                   | `validation_error` | Failed to load the image from the URL                           |
| Some of the `fileIds` not found                                     | `not_found`        | Some of the specified files are missing                         |
| Post not found                                                      | `not_found`        | Post not found                                                  |
| Someone else's post                                                 | `forbidden`        | No access to the post                                           |
| Updating a published post older than a day                          | `validation_error` | A published post older than a day cannot be updated             |
| Changing the date of a published post                               | `validation_error` | The publishing date of a published post cannot be updated       |
| The post is being processed right now                               | `validation_error` | The post is being processed, try again later                    |

### Errors publishing to a social network

An error that occurs while sending a post to a particular social network does **not** make the GraphQL request itself fail. The post gets the `FAIL` status, and the reason is written to `results[].errorMsg` of the corresponding account (in the user's language). Typical reasons:

| Reason                                           | What to do                                                                              |
| ------------------------------------------------ | --------------------------------------------------------------------------------------- |
| Instagram needs at least one image               | Add an image to `fields.imageUrls`                                                      |
| Unsupported media type, text too long            | Change the post to meet the network's requirements                                      |
| No access to the page/group/channel, social token expired | Check the account state in the [web app](../accounts/index.md) (`error` and `checkedAt` in [`listSocialAccounts`](./socials.md)) and reconnect it |
| The post was already published to this account successfully | Nothing to do                                                         |

For connection instructions and troubleshooting for a specific social network, see [Accounts](../accounts/index.md).

## HTTP statuses and limits

- **GraphQL errors** arrive in the `errors` field; do not rely on the HTTP status to detect request success.
- **`429 Too Many Requests`** — the request limit was exceeded. For API tokens the default is 600 requests per minute per token (the window is a UTC calendar minute). Wait until the next minute and retry. Tokens obtained with the `login` mutation are not subject to this limit.

There is also an interval between post publications (**Settings → Posts**), but it does not cause errors: the send time is simply shifted. See [creating a post](./posts/create.md).
