# Начало работы

Это руководство поможет за несколько минут получить токен и выполнить первые запросы.

## Шаг 1. Создайте API-токен

1. Войдите в [личный кабинет](https://parrotposter.com/app) и откройте **Настройки → API-токены**.
2. Нажмите **Создать токен**.
3. Введите название токена (например, «Скрипт публикации»). Если скрипту нужно только читать данные, включите **Только чтение (без мутаций)**.
4. Скопируйте показанный секрет и сохраните его в надёжном месте.

::: warning Секрет показывается один раз
Позже его увидеть нельзя. Если секрет потерян — отзовите токен (**Отозвать**) и создайте новый.
:::

<!-- screenshot: api-tokens-create | Настройки → API-токены: форма «Создать токен» и окно «Сохраните токен» с секретом -->

Альтернатива без кабинета — мутация `login` с email и паролем, см. [Аутентификацию](./auth.md).

## Шаг 2. Передавайте токен в заголовке

```text
Authorization: Bearer ваш_токен
```

Во всех примерах документации этот заголовок подразумевается.

## Шаг 3. Получите список аккаунтов

**Запрос:**

```graphql
query {
  listSocialAccounts {
    id
    name
    type
  }
}
```

**Через cURL:**

```bash
curl -X POST https://parrotposter.com/api/graphql \
  -H "Authorization: Bearer ваш_токен" \
  -H "Content-Type: application/json" \
  -d '{"query": "query { listSocialAccounts { id name type } }"}'
```

**Ответ:**

```json
{
  "data": {
    "listSocialAccounts": [
      { "id": "account_id_1", "name": "Моя группа ВКонтакте", "type": "VK" },
      { "id": "account_id_2", "name": "Мой Telegram-канал", "type": "TG" }
    ]
  }
}
```

Значения `id` понадобятся при создании постов: их передают в `networks.accounts`.

## Шаг 4. Создайте пост

```graphql
mutation {
  createPost(
    post: {
      fields: { text: "Привет, мир! Это пост через API" }
      networks: { accounts: ["account_id_1"] }
    }
  ) {
    id
    status
  }
}
```

Пост ставится в очередь на публикацию. Результат по каждому аккаунту смотрите в поле `results` — см. [Получение поста](./posts/get.md).

## Пример на PHP

```php
<?php
$token = 'ваш_токен';

$ch = curl_init('https://parrotposter.com/api/graphql');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $token,
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode([
        'query' => 'query { listSocialAccounts { id name type } }',
    ]),
]);

$response = json_decode(curl_exec($ch), true);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if (!empty($response['errors'])) {
    // см. раздел «Ошибки»
    print_r($response['errors']);
} else {
    print_r($response['data']['listSocialAccounts']);
}
```

## Что дальше

- [Аутентификация](./auth.md) — токены только для чтения, отзыв, альтернативный вход
- [Создание поста](./posts/create.md) — медиа, расписание, черновики, настройки соцсетей
- [Ошибки](./errors.md)
