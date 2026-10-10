# Аккаунты соцсетей

Идентификаторы аккаунтов нужны для создания постов (`networks.accounts`). Сами аккаунты подключаются в [личном кабинете](../accounts/index.md) — через API подключить аккаунт нельзя.

<h2 id="listSocialAccounts">Список аккаунтов: <code>listSocialAccounts</code></h2>

Запрос возвращает все подключённые аккаунты текущего пользователя.

**Запрос:**

```graphql
query {
  listSocialAccounts {
    id
    name
    type
    link
    photo
    error
    checkedAt
    instagramPrivate
  }
}
```

**Поля `SocialAccount`:**

| Поле               | Тип        | Описание                                                                                                                                      |
| ------------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`               | ID!        | Идентификатор аккаунта. **Используйте его при [создании поста](./posts/create.md)** в `networks.accounts`                                    |
| `name`             | String     | Отображаемое имя (название группы, канала или страницы)                                                                                       |
| `type`             | SocialType | Соцсеть, см. таблицу ниже                                                                                                                     |
| `link`             | String     | Ссылка на аккаунт в соцсети                                                                                                                   |
| `photo`            | String     | URL изображения аккаунта                                                                                                                      |
| `error`            | String     | Текст последней ошибки проверки подключения на языке пользователя. Если проблем нет — `null`. При ошибке аккаунт нужно [переподключить](../accounts/index.md) в кабинете |
| `checkedAt`        | DateTime   | Время последней проверки подключения (UTC)                                                                                                    |
| `createdAt`        | DateTime   | Время подключения аккаунта (UTC)                                                                                                              |
| `instagramPrivate` | Boolean!   | `true` для Instagram, подключённого через логин и пароль (приватный API); для остальных аккаунтов — `false`                                   |

### Значения `type`

| Значение | Соцсеть       |
| -------- | ------------- |
| `VK`     | ВКонтакте     |
| `OK`     | Одноклассники |
| `TG`     | Telegram      |
| `FB`     | Facebook      |
| `IG`     | Instagram     |
| `MAX`    | Max           |

Значение `TEST` служебное (тестовая сеть для разработки). Список значений может расширяться, поэтому не падайте на неизвестном `type`.

**Пример ответа:**

```json
{
  "data": {
    "listSocialAccounts": [
      {
        "id": "account_id_1",
        "name": "Моя группа ВКонтакте",
        "type": "VK",
        "link": "https://vk.com/my_group",
        "photo": "https://...",
        "error": null,
        "checkedAt": "2026-01-12T04:00:19.123Z",
        "instagramPrivate": false
      },
      {
        "id": "account_id_2",
        "name": "my_instagram",
        "type": "IG",
        "link": "https://instagram.com/my_instagram",
        "photo": null,
        "error": "Ошибка доступа",
        "checkedAt": "2026-01-12T04:00:19.123Z",
        "instagramPrivate": true
      }
    ]
  }
}
```

::: tip
Для Instagram в посте обязательно нужно медиа — публикация только с текстом завершится ошибкой в `results[].errorMsg`. См. [Ошибки](./errors.md).
:::
