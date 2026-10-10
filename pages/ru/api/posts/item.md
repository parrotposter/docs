# Структура Post

Объект `Post` описывает пост в ParrotPoster. Его возвращают `createPost`, `updatePost`, `post` и `posts`. Запрашивайте только нужные поля.

## Поля `Post`

| Поле                | Тип                    | Описание                                                                                              |
| ------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------- |
| `id`                | ID!                    | Идентификатор поста                                                                                   |
| `status`            | PostStatus             | Статус, см. ниже                                                                                      |
| `draft`             | Boolean                | `true` — черновик, ещё не поставленный на публикацию                                                  |
| `draftParams`       | DraftParams            | Расписание черновика: `schedule { kind at delayMinutes }`. У не-черновика — `null`                    |
| `fields`            | PostFields             | Содержимое поста                                                                                      |
| `networks`          | PostNetworks           | Куда публиковать: `accounts` — список идентификаторов аккаунтов                                       |
| `publishAt`         | DateTime               | Запланированное или фактическое время публикации (UTC)                                                |
| `results`           | [PostResult!]          | Результат по каждому аккаунту                                                                         |
| `fieldOverrides`    | PostFieldOverrides     | Отдельные тексты/файлы для соцсетей и аккаунтов (`bySocialType`, `byAccount`)                         |
| `hasFieldOverrides` | Boolean!               | Есть ли хотя бы одна такая правка                                                                     |
| `linkPreview`       | PostLinkPreview        | Превью ссылки: `title`, `caption`, `imageUrl`                                                         |
| `engagement`        | [PostSocialEngagement!]! | Вовлечённость по аккаунтам, см. ниже                                                                |
| `provenance`        | PostProvenance         | Откуда появился пост при автоматизации; для ручных постов — `null`                                    |
| `from`              | Platform               | Откуда создан пост (`FRONT`, `WORDPRESS`, `BITRIX`, `BITRIX_24`)                                      |
| `createdAt`         | DateTime               | Время создания                                                                                        |
| `updatedAt`         | DateTime               | Время последнего обновления                                                                           |
| `deleted`           | Boolean                | Пост удалён (в корзине)                                                                               |
| `deletedAt`         | DateTime               | Время удаления                                                                                        |

Даты возвращаются в UTC в формате RFC 3339, например `2026-01-13T12:00:00Z`.

### Статус поста (`PostStatus`)

| Статус       | Описание                                                    |
| ------------ | ----------------------------------------------------------- |
| `PREPARE`    | Пост готовится к публикации                                 |
| `READY`      | Готов к публикации, ждёт запланированного времени           |
| `PUBLISHING` | Публикуется                                                 |
| `SUCCESS`    | Опубликован успешно                                         |
| `FAIL`       | Ошибка публикации в одной или во всех соцсетях              |
| `UPDATING`   | Обновляется                                                 |
| `DELETING`   | Удаляется                                                   |

## `fields` — содержимое (`PostFields`)

| Поле        | Тип             | Описание                                                                                     |
| ----------- | --------------- | -------------------------------------------------------------------------------------------- |
| `text`      | String          | Текст поста                                                                                  |
| `link`      | String          | Ссылка                                                                                       |
| `tags`      | String          | Теги                                                                                         |
| `needUtm`   | Boolean         | Добавлялись ли UTM-метки                                                                      |
| `utmParams` | UtmParams       | UTM-метки: `source`, `medium`, `campaign`, `content`, `term`                                 |
| `imageIds`  | [ID!]           | Идентификаторы изображений                                                                   |
| `fileIds`   | [ID!]           | Идентификаторы файлов                                                                        |
| `files`     | [File!]         | Файлы: `id`, `name`, `mime`, `size`, `links { origin thumbnail_150 thumbnail_256 }`          |
| `extra`     | PostFieldsExtra | Настройки соцсетей (поля те же, что в [`createPost`](./create.md)) |

Поле `images` устарело (`@deprecated`): используйте `files` и `fileIds`.

## `results` — результаты публикации (`PostResult`)

Список результатов по каждому аккаунту.

| Поле               | Тип                 | Описание                                                                                   |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------ |
| `accountId`        | ID                  | Идентификатор аккаунта                                                                     |
| `success`          | Boolean             | Публикация прошла успешно                                                                  |
| `errorMsg`         | String              | Причина ошибки на языке пользователя                                                       |
| `linkToSocialPost` | String              | Ссылка на пост в соцсети                                                                   |
| `publishedAt`      | DateTime            | Время публикации                                                                           |
| `operation`        | PostResultOperation | Текущая операция над результатом: `PUBLISHING`, `UPDATING` или `DELETING`                  |
| `lastUpdate`       | PostOpOutcome       | Итог последнего обновления: `at`, `success`, `errorMsg`                                    |
| `deleted`          | PostOpOutcome       | Итог удаления из соцсети: `at`, `success`, `errorMsg`                                      |
| `notAllowed`       | [PostNotAllowedOp!]! | Операции, недоступные для этой публикации: `UPDATE`, `DELETE`                              |

## `engagement` — вовлечённость (`PostSocialEngagement`)

Снимок статистики по каждому аккаунту (просмотры, лайки и т. д.). Данные собираются не для всех соцсетей. Подробнее о вовлечённости в кабинете — в разделе [Вовлечённость](../../posts/engagement.md).

| Поле                 | Тип                  | Описание                                                           |
| -------------------- | -------------------- | ------------------------------------------------------------------ |
| `accountId`          | ID!                  | Аккаунт                                                            |
| `platform`           | SocialType!          | Соцсеть                                                            |
| `pollStatus`         | EngagementPollStatus! | Состояние сбора: `PENDING`, `OK`, `ERROR`, `DISABLED`, `RATE_LIMITED` |
| `viewsCount`         | Int                  | Просмотры                                                          |
| `likesCount`         | Int                  | Лайки                                                              |
| `commentsCount`      | Int                  | Комментарии                                                        |
| `reactionsCount`     | Int                  | Реакции (всего)                                                    |
| `reactions`          | [EngagementReaction!]! | Реакции по эмодзи: `emoji`, `count`                              |
| `fetchedAt`          | DateTime             | Когда данные получены                                              |
| `lastError`          | String               | Последняя ошибка сбора                                             |
| `unsupportedReason`  | String               | Почему статистика для этой соцсети недоступна                      |

## `provenance` — происхождение

Заполнено для постов, созданных [автоматизацией](../../automation/index.md): `pipelineId`, `pluginId`, `triggerId`, `triggerRunId`, `sourceItemId`. У постов, созданных вручную или через API, значение — `null`.
