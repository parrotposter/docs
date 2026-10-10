# Получение постов

Есть два запроса: `post` — один пост по идентификатору, `posts` — список постов с фильтрами и постраничной навигацией. Оба требуют токен; право записи не нужно, поэтому они работают и с токеном «только чтение».

## Один пост: `post`

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
      errorMsg
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
          "linkToSocialPost": "https://vk.com/wall-111222333_7777",
          "errorMsg": null
        }
      ]
    }
  }
}
```

Можно получить только свой пост. Для чужого или несуществующего поста возвращается ошибка (`forbidden` / `not_found`, см. [Ошибки](../errors.md)). Все поля — в разделе [Структура Post](./item.md).

::: tip Как узнать, что пост опубликован
Публикация асинхронна. Следите за `status`: `SUCCESS` — всё опубликовано, `FAIL` — ошибка хотя бы в одной соцсети (подробности в `results[].errorMsg`). Помните про [лимит запросов](../errors.md), если опрашиваете статус в цикле.
:::

## Список постов: `posts`

Запрос возвращает посты текущего пользователя постранично (курсорная пагинация, формат Relay-connection). Удалённые посты по умолчанию не включаются.

```graphql
query {
  posts(
    first: 20
    filter: { lifecycle: SCHEDULED }
    sort: { publishAt: ASC }
  ) {
    nodes {
      id
      status
      publishAt
      fields {
        text
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

Чтобы получить следующую страницу, передайте `endCursor` в аргумент `after`:

```graphql
query {
  posts(first: 20, after: "курсор_из_endCursor") {
    nodes {
      id
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

### Аргументы

| Аргумент | Тип       | Описание                                                                  |
| -------- | --------- | ------------------------------------------------------------------------- |
| `first`  | Int       | Сколько постов вернуть                                                    |
| `after`  | String    | Курсор (`pageInfo.endCursor`) с которого продолжить                       |
| `filter` | PostFilter | Фильтр (см. ниже)                                                        |
| `sort`   | PostSort  | Сортировка: `{ publishAt: ASC }` или `{ publishAt: DESC }`. По умолчанию `DESC` |

### Фильтр `PostFilter`

| Поле           | Тип           | Описание                                                                                                    |
| -------------- | ------------- | ----------------------------------------------------------------------------------------------------------- |
| `lifecycle`    | PostLifecycle | `ALL`, `PUBLISHED` (опубликованные) или `SCHEDULED` (запланированные; черновики сюда не входят)              |
| `draft`        | Boolean       | `true` — только неопубликованные черновики                                                                   |
| `deleted`      | Boolean       | `true` — только удалённые (корзина). По умолчанию только активные                                           |
| `publishAtMin` | DateTime      | Только посты с `publishAt` не раньше указанного времени (включительно)                                       |
| `from`         | Platform      | Только посты, созданные с указанной платформы                                                               |
| `hasPipeline`  | Boolean       | `true` — только созданные [автоматизацией](../../automation/index.md); `false` — только вручную или через API |
| `pipelineId`   | ID            | Только посты указанной автоматизации                                                                        |

### Результат

| Поле       | Описание                                                                 |
| ---------- | ------------------------------------------------------------------------ |
| `nodes`    | Список постов (объекты [`Post`](./item.md))                              |
| `edges`    | То же с курсором каждого поста: `edges { cursor node { ... } }`          |
| `pageInfo` | `hasNextPage`, `endCursor` (для вперёд-навигации), `hasPreviousPage`, `startCursor` |

Чтобы получить весь список, листайте страницами, пока `hasNextPage` равен `true`.

### Количество постов

Чтобы узнать общее число постов с теми же фильтрами, используйте `postsCount`:

```graphql
query {
  postsCount(filter: { lifecycle: SCHEDULED })
}
```
