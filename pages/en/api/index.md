# Introduction

The ParrotPoster GraphQL API lets you automate publishing to social networks, manage posts, and list connected accounts from your scripts, websites, and services.

## Overview

The API is built on **GraphQL**: you request only the fields you need and get them in a single request. The ParrotPoster web app and the WordPress and 1C-Bitrix plugins use the same API.

**API endpoint:**

```text:no-line-numbers
https://parrotposter.com/api/graphql
```

- **POST request** runs queries (`query`) and mutations (`mutation`). The body is JSON with a `query` field (and `variables` if needed). This is how you should call the API from code.
- **GET request** opens the interactive **GraphiQL** environment (playground) in the browser: you can see the full schema and try queries by hand.

[Open the playground](https://parrotposter.com/api/graphql)

## What you can do with the API

- list connected [accounts](./socials.md) and their state;
- [create](./posts/create.md), [get](./posts/get.md), [update](./posts/update.md), and [delete](./posts/delete.md) posts;
- publish immediately, on a schedule, or save as a draft;
- read publishing results and engagement statistics.

Connecting social accounts and configuring automation is done in the [web app](../accounts/index.md): it is not available through the API.

## How to start

1. In the web app open **Settings → API tokens** and create a token ([details](./auth.md)).
2. Send the token in the `Authorization: Bearer <token>` header.
3. Make your first request — see [Quick start](./quick-start.md).

## Limits

- Publishing and changing posts require an active plan, and the number of posts and accounts is limited by your [plan](../billing/index.md).
- Requests made with an API token are rate limited: by default 600 requests per minute per token. When exceeded, the server responds with HTTP status `429`. See [Errors](./errors.md).

## Compatibility

The API schema is extended with new fields and methods. Deprecated fields are marked with the `@deprecated` directive in the schema (visible in the playground), so request only the fields you need and do not rely on the order of fields in a response.

## Contents

- [Quick start](./quick-start.md) — your first request in 5 minutes
- [Authentication](./auth.md) — API tokens and the `login` mutation
- [Social accounts](./socials.md) — `listSocialAccounts`
- [Posts](./posts/index.md) — overview, [Post object](./posts/item.md), [getting and listing](./posts/get.md), [creating](./posts/create.md), [updating](./posts/update.md), [deleting](./posts/delete.md)
- [Errors](./errors.md) — error format, codes, limits
