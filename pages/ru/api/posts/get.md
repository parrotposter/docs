# Получение поста

Получить информацию о посте по его уникальному идентификатору.

**Запрос:**

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

**Ответ:**

```json
{
  "data": {
    "post": {
      "id": "post_id",
      "status": "SUCCESS",
      "fields": { "text": "Этот пост был успешно опубликован" },
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

Посмотрите структуру [Post](./item.md).
