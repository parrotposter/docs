# Аутентификация

Для доступа к защищенным методам API требуется аутентификация. В ParrotPoster используется токен-ориентированный подход: вы получаете временный токен через мутацию `login` и передаете его в каждом последующем запросе.

## Получение токена: мутация `login`

Единственный открытый метод API — это мутация `login`. Она принимает учетные данные пользователя и возвращает токен доступа.

### Запрос

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

**Параметры input:**
| Поле | Тип | Обязательное | Описание |
|------|-----|--------------|----------|
| `username` | String | Да | Email, указанный при регистрации в ParrotPoster |
| `password` | String | Да | Пароль от аккаунта |
| `from` | Enum | Да | Всегда указывайте значение `FRONT` |

### Ответ

При успешной аутентификации API возвращает объект с полем `token`:

```json
{
  "data": {
    "login": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

### Ошибки аутентификации

Если указаны неверные учетные данные, API вернет стандартную GraphQL-ошибку:

```json
{
  "errors": [
    {
      "message": "Пользователь не найден",
      "extensions": {
        "code": "user_not_found"
      }
    }
  ]
}
```

## Использование токена

Полученный токен необходимо передавать во всех последующих запросах к защищенным методам API. Токен включается в HTTP-заголовок `Authorization` с использованием схемы `Bearer`:

```
Authorization: Bearer ваш_уникальный_токен_доступа
```

### Пример с cURL

```bash
curl -X POST https://parrotposter.com/api/graphql \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{"query": "query { listSocialAccounts { id name } }"}'
```

### Пример на PHP (Yii2)

```php
use yii\httpclient\Client;

$client = new Client();
$token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

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
```

## Срок действия токена

Токены доступа не имеют срока действия и могут использоваться постоянно. Однако в целях безопасности рекомендуется:

1. Хранить токен в защищенном месте (например, в конфигурационных файлах, недоступных извне)
2. Не включать токен в клиентский код (JavaScript на фронтенде)
3. При необходимости "сбросить" токен — достаточно изменить пароль в аккаунте ParrotPoster, после чего старый токен перестанет работать
