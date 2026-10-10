# Создание поста

Мутация `createPost` создаёт пост: он публикуется сразу, по расписанию или сохраняется как черновик. Требуется токен с правом записи (не «только чтение») и активный тариф.

```graphql
mutation {
  createPost(
    post: {
      fields: { ... }
      networks: { accounts: ["account_id"] }
    }
  ) {
    id
    status
  }
}
```

## Параметры `post` (`PostCreate`)

| Поле                  | Тип                       | Обязательное | Описание                                                                                        |
| --------------------- | ------------------------- | ------------ | ----------------------------------------------------------------------------------------------- |
| `fields`              | PostFieldsInput!          | Да           | Содержимое поста                                                                                |
| `networks`            | PostNetworksInput!        | Да           | Куда публиковать                                                                                |
| `publishAt`           | DateTime                  | Нет          | Точное время публикации                                                                         |
| `publishDelayMinutes` | Int                       | Нет          | Опубликовать через N минут от текущего момента                                                  |
| `draft`               | Boolean                   | Нет          | `true` — сохранить как черновик, не публикуя. По умолчанию `false`                              |
| `draftParams`         | DraftParamsInput          | Нет          | Расписание черновика (когда публиковать после перевода в публикацию)                            |
| `fieldOverrides`      | PostFieldOverridesInput   | Нет          | Свой текст, ссылка, теги, файлы для отдельной соцсети или отдельного аккаунта                   |

### `fields` — содержимое (`PostFieldsInput`)

Все поля необязательные, но пост должен содержать текст или изображения/файлы, иначе сервер вернёт ошибку о незаполненных обязательных полях.

| Поле        | Тип             | Описание                                                                                              |
| ----------- | --------------- | ----------------------------------------------------------------------------------------------------- |
| `text`      | String          | Текст поста                                                                                           |
| `link`      | String          | Ссылка, которую нужно прикрепить к посту                                                              |
| `tags`      | String          | Теги одной строкой                                                                                    |
| `imageUrls` | [String!]       | URL изображений: сервис сам скачает и обработает их                                                   |
| `fileUrls`  | [String!]       | URL файлов (например, видео): сервис скачает их по ссылке                                             |
| `imageIds`  | [ID!]           | Идентификаторы уже загруженных изображений                                                            |
| `fileIds`   | [ID!]           | Идентификаторы уже загруженных файлов                                                                 |
| `needUtm`   | Boolean         | Добавить к ссылке UTM-метки                                                                           |
| `utmParams` | UtmParamsInput  | UTM-метки: `source`, `medium`, `campaign`, `content`, `term` (все — строки)                            |
| `extra`     | PostFieldsExtraInput | Дополнительные параметры для отдельных соцсетей (см. ниже)                                       |

Ссылки на медиа должны быть доступны серверу ParrotPoster по HTTP(S). Если изображение по ссылке скачать не удалось, запрос завершится ошибкой.

### `fields.extra` — настройки соцсетей (`PostFieldsExtraInput`)

**ВКонтакте:**

| Поле                       | Тип     | Описание                                                                           |
| -------------------------- | ------- | ---------------------------------------------------------------------------------- |
| `vkFromGroup`              | Boolean | `true` — публиковать от имени группы, иначе от имени пользователя                  |
| `vkSigned`                 | Boolean | Подписать пост автором (работает при `vkFromGroup: true`)                          |
| `vkCloseComments`          | Boolean | Отключить комментарии к посту                                                      |
| `vkFirstComment`           | String  | Текст первого комментария, который будет добавлен после публикации                 |
| `vkMarkAsAds`              | Boolean | Пометить пост как рекламный                                                        |
| `vkMuteNotifications`      | Boolean | Не уведомлять подписчиков о посте                                                  |
| `vkPrimaryAttachmentsMode` | String  | Способ показа вложений: `carousel` (по умолчанию) или `grid`                       |

**Facebook:**

| Поле             | Тип     | Описание                                                                        |
| ---------------- | ------- | ------------------------------------------------------------------------------- |
| `fbCtaEnabled`   | Boolean | Добавить кнопку призыва к действию для постов, где есть только ссылка           |
| `fbCtaType`      | String  | Тип кнопки (например, `LEARN_MORE`, `SHOP_NOW`)                                 |
| `fbFirstComment` | String  | Текст первого комментария после публикации на странице                          |

Поля `bxIblockId`, `bxId`, `bxTemplateId`, `wpPostId`, `wpSiteDomain` заполняют плагины 1C-Битрикс и WordPress; в своих интеграциях они не нужны.

### `networks` — куда публиковать (`PostNetworksInput`)

| Поле       | Тип   | Описание                                                                              |
| ---------- | ----- | ------------------------------------------------------------------------------------- |
| `accounts` | [ID!] | Идентификаторы аккаунтов из [`listSocialAccounts`](../socials.md#listSocialAccounts). Нужен минимум один аккаунт |

### Время публикации: `publishAt` и `publishDelayMinutes`

Это взаимоисключающие параметры: **указывать оба сразу нельзя** — сервер вернёт ошибку.

- Ничего не указано — публикация как можно скорее.
- `publishAt` — дата и время в формате RFC 3339. Время в прошлом приравнивается к «сейчас».
- `publishDelayMinutes` — число минут от текущего момента, от 0 до 525 600 (около 365 дней).

Время всегда в UTC: `"2026-01-12T04:00:19.123Z"`. Допустима разная точность: `"2026-01-12T04:00:19Z"`, `"2026-01-12T04:00Z"`.

::: tip Интервал между постами
Фактическое время отправки может быть сдвинуто, если рядом уже запланированы другие посты: действует интервал между публикациями из **Настройки → Посты** (по умолчанию 60 секунд, допустимо от 1 до 3600). Сами посты через API можно создавать с любой частотой. К автоматизации этот интервал не применяется.
:::

### Черновики: `draft` и `draftParams`

Черновик сохраняется без публикации и виден в кабинете ([Черновики и календарь](../../posts/drafts-and-calendar.md)).

```graphql
mutation {
  createPost(
    post: {
      draft: true
      fields: { text: "Черновик" }
      networks: { accounts: ["account_id"] }
      draftParams: { schedule: { kind: DELAY, delayMinutes: 60 } }
    }
  ) {
    id
    draft
    draftParams {
      schedule {
        kind
        at
        delayMinutes
      }
    }
  }
}
```

`schedule.kind` — одно из значений `NOW`, `DELAY` (с `delayMinutes`), `AT` (с `at`). Если `draft: true`, а `draftParams` не указан, расписание берётся из `publishAt`/`publishDelayMinutes` (или «сразу»). Когда черновик переводят в публикацию (`updatePost` с `draft: false`), расписание превращается в `publishAt`.

### `fieldOverrides` — разные тексты для разных соцсетей

Позволяет изменить `text`, `link`, `tags`, `fileIds` и `linkPreview` (`title`, `caption`, `imageUrl`) для соцсети целиком (`bySocialType`) или для конкретного аккаунта (`byAccount`):

```graphql
mutation {
  createPost(
    post: {
      fields: { text: "Общий текст" }
      networks: { accounts: ["account_vk", "account_tg"] }
      fieldOverrides: {
        bySocialType: [{ socialType: TG, partial: { text: "Текст для Telegram" } }]
        byAccount: [{ accountId: "account_vk", partial: { tags: "#новости" } }]
      }
    }
  ) {
    id
    hasFieldOverrides
  }
}
```

## Примеры

**Текстовый пост в один аккаунт, публикация сразу:**

```graphql
mutation {
  createPost(
    post: {
      fields: { text: "Привет, мир! Это мой первый пост через API" }
      networks: { accounts: ["account_id"] }
    }
  ) {
    id
    status
  }
}
```

**Ссылка и изображения в несколько соцсетей, от имени группы ВКонтакте:**

```graphql
mutation {
  createPost(
    post: {
      fields: {
        text: "Новая статья на нашем сайте"
        link: "https://example.com/article"
        imageUrls: [
          "https://example.com/images/preview1.jpg"
          "https://example.com/images/preview2.jpg"
        ]
        needUtm: true
        utmParams: { source: "parrotposter", medium: "social", campaign: "spring" }
        extra: { vkFromGroup: true, vkSigned: false }
      }
      networks: { accounts: ["account_vk", "account_tg"] }
    }
  ) {
    id
  }
}
```

**Отложенный пост на конкретное время (UTC):**

```graphql
mutation {
  createPost(
    post: {
      fields: { text: "Этот пост выйдет 13 января в полдень по UTC" }
      networks: { accounts: ["account_id"] }
      publishAt: "2026-01-13T12:00:00Z"
    }
  ) {
    id
    status
    publishAt
  }
}
```

**Пост через 30 минут:**

```graphql
mutation {
  createPost(
    post: {
      fields: { text: "Опубликуется через полчаса" }
      networks: { accounts: ["account_id"] }
      publishDelayMinutes: 30
    }
  ) {
    id
    publishAt
  }
}
```

## Ответ

Мутация возвращает объект [`Post`](./item.md): запросите нужные поля. Публикация выполняется асинхронно: сразу после создания пост ещё не опубликован, а результаты по аккаунтам появятся позже в поле `results` ([получение поста](./get.md)).

::: warning Требования соцсетей
Каждая соцсеть предъявляет свои требования к посту. Например, для Instagram нужно хотя бы одно изображение. Нарушение не приводит к ошибке самой мутации: причина появится в `results[].errorMsg` этого аккаунта. См. [Ошибки](../errors.md).
:::
