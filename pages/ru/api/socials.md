# Аккаунты соцсетей

Получение данных аккаунтов может понадобиться для создания постов. Предварительно сами аккаунты должны быть подключены через [веб-интерфейс ParrotPoster](https://parrotposter.com/app/accounts).

<h2 id="listSocialAccounts">Получение списка аккаунтов: <code>listSocialAccounts</code></h2>

Запрос `listSocialAccounts` вернет все подключенные аккаунты соцсетей.

**Запрос:**

```graphql
query {
  listSocialAccounts {
    id
    name
    type
    link
    photo
  }
}
```

**Поля ответа:**

| Поле    | Тип    | Описание                                                                                                                           |
| ------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `id`    | String | Уникальный идентификатор аккаунта. **Используйте это значение при [создании поста](./posts/create.md)** в поле `networks.accounts` |
| `name`  | String | Отображаемое имя аккаунта (например, название группы или страницы)                                                                 |
| `type`  | String | Тип аккаунта (например, VK, FB, TG, OK, etc.)                                                                                      |
| `link`  | String | Ссылка на аккаунт в социальной сети                                                                                                |
| `photo` | String | URL изображения аккаунта                                                                                                           |

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
        "photo": "https://..."
      },
      {
        "id": "account_id_2",
        "name": "Мой Telegram-канал",
        "type": "TG",
        "link": "https://t.me/my_channel",
        "photo": null
      }
    ]
  }
}
```
