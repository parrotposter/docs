# Introduction

Welcome to the ParrotPoster GraphQL API documentation. This API lets you automate publishing to social networks, manage your accounts, and embed ParrotPoster in your apps and sites.

## Overview

The ParrotPoster API is built on **GraphQL**. You request exactly the fields you need and can combine them in a single query.

**Base URL for the API:**

```text:no-line-numbers
https://parrotposter.com/api/graphql
```

The API supports two HTTP methods:

- **GET** opens **GraphiQL** (sometimes called a “playground”) in the browser. It is a convenient way to explore the schema and try queries manually.
- **POST** is for running GraphQL queries and mutations from your code. All production traffic should use POST.

[Open the playground](https://parrotposter.com/api/graphql)

## API status and backward compatibility

The API is under active development, but the current version is stable. We aim to keep changes backward compatible:

- Existing fields and operations will not be removed without notice.
- Deprecated fields get a `@deprecated` directive with a reason and an alternative; they remain for a transition period.
- New features are added as new fields and operations without breaking existing behavior.

Integrations written against the current API should keep working as we evolve the service.

## What’s next?

In the following sections you will learn how to:

- **Authenticate** and obtain an access token.
- **List your social accounts** connected to ParrotPoster.
- **Create, read, update, and delete posts.**
- **Handle publishing scenarios** (immediate, scheduled, with media).

Go to **[Quick start](./quick-start.md)** to send your first API request.
