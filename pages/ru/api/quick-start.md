# Начало работы (Quick Start)

Это руководство поможет вам быстро познакомиться с API и выполнить первые запросы. Весь процесс займет не больше 5 минут.

## Шаг 1: Получение токена доступа

Большинство методов API требуют аутентификации. Для этого необходимо получить токен с помощью мутации `login`.

Выполните следующий запрос к API, указав ваши реальные email и пароль от аккаунта ParrotPoster:

**Запрос:**

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

**Важно:** Поле from всегда должно содержать значение FRONT.

**Ответ:**

```json
{
  "data": {
    "login": {
      "token": "ваш_уникальный_токен_доступа"
    }
  }
}
```

Сохраните полученный токен — он понадобится для всех последующих запросов.

## Шаг 2: Использование токена в запросах

Для аутентификации токен необходимо передавать в HTTP-заголовке `Authorization`:

```text
Authorization: Bearer ваш_уникальный_токен_доступа
```

Все последующие примеры в документации подразумевают, что этот заголовок присутствует в запросе.

## Шаг 3: Первый запрос — получаем список аккаунтов

Теперь, когда у нас есть токен, давайте получим список ваших аккаунтов в социальных сетях, которые подключены к ParrotPoster.

**Запрос:**

```graphql
query {
  listSocialAccounts {
    id
    name
  }
}
```

**Ответ:**

```json
{
  "data": {
    "listSocialAccounts": [
      {
        "id": "account_id_1",
        "name": "Моя группа ВКонтакте"
      },
      {
        "id": "account_id_2",
        "name": "Мой Telegram-канал"
      }
    ]
  }
}
```

Обратите внимание на поле `id` — именно эти идентификаторы нужно будет использовать при создании постов для указания целевых соцсетей.

## Пример для PHP (Yii2)

Вот пример того же запроса с использованием встроенного `yii\httpclient\Client`:

```php
<?php
use yii\httpclient\Client;

$client = new Client();
$token = 'ваш_уникальный_токен_доступа';

// Выполняем GraphQL-запрос
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

if ($response->isOk) {
    $data = $response->data;
    $accounts = $data['data']['listSocialAccounts'] ?? [];
    print_r($accounts);
} else {
    echo 'Ошибка: ' . $response->statusCode;
}
?>
```

Что дальше?

Теперь вы умеете:

- Получать токен доступа
- Передавать его в запросах
- Получать список доступных аккаунтов

Следующий шаг — научиться создавать посты и управлять публикациями.
