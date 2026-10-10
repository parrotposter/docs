# Post object

The `Post` object describes a post in ParrotPoster. It is returned by `createPost`, `updatePost`, `post`, and `posts`. Request only the fields you need.

## `Post` fields

| Field               | Type                     | Description                                                                                             |
| ------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------- |
| `id`                | ID!                      | Post ID                                                                                                 |
| `status`            | PostStatus               | Status, see below                                                                                       |
| `draft`             | Boolean                  | `true` — a draft not yet queued for publishing                                                          |
| `draftParams`       | DraftParams              | Draft schedule: `schedule { kind at delayMinutes }`. `null` for a non-draft                             |
| `fields`            | PostFields               | Post content                                                                                            |
| `networks`          | PostNetworks             | Where to publish: `accounts` — list of account IDs                                                      |
| `publishAt`         | DateTime                 | Scheduled or actual publishing time (UTC)                                                               |
| `results`           | [PostResult!]            | Result per account                                                                                      |
| `fieldOverrides`    | PostFieldOverrides       | Separate texts/files for networks and accounts (`bySocialType`, `byAccount`)                            |
| `hasFieldOverrides` | Boolean!                 | Whether there is at least one such override                                                             |
| `linkPreview`       | PostLinkPreview          | Link preview: `title`, `caption`, `imageUrl`                                                            |
| `engagement`        | [PostSocialEngagement!]! | Engagement per account, see below                                                                       |
| `provenance`        | PostProvenance           | Where the post came from in automation; `null` for manual posts                                         |
| `from`              | Platform                 | Where the post was created (`FRONT`, `WORDPRESS`, `BITRIX`, `BITRIX_24`)                                |
| `createdAt`         | DateTime                 | Creation time                                                                                           |
| `updatedAt`         | DateTime                 | Last update time                                                                                        |
| `deleted`           | Boolean                  | The post is deleted (in the trash)                                                                      |
| `deletedAt`         | DateTime                 | Deletion time                                                                                           |

Dates are returned in UTC in RFC 3339 format, for example `2026-01-13T12:00:00Z`.

### Post status (`PostStatus`)

| Status       | Description                                              |
| ------------ | -------------------------------------------------------- |
| `PREPARE`    | The post is being prepared for publishing                |
| `READY`      | Ready to publish, waiting for the scheduled time         |
| `PUBLISHING` | Being published                                          |
| `SUCCESS`    | Published successfully                                   |
| `FAIL`       | Publishing failed in one or all social networks          |
| `UPDATING`   | Being updated                                            |
| `DELETING`   | Being deleted                                            |

## `fields` — content (`PostFields`)

| Field       | Type            | Description                                                                                 |
| ----------- | --------------- | ------------------------------------------------------------------------------------------- |
| `text`      | String          | Post text                                                                                   |
| `link`      | String          | Link                                                                                        |
| `tags`      | String          | Tags                                                                                        |
| `needUtm`   | Boolean         | Whether UTM tags were added                                                                 |
| `utmParams` | UtmParams       | UTM tags: `source`, `medium`, `campaign`, `content`, `term`                                 |
| `imageIds`  | [ID!]           | Image IDs                                                                                   |
| `fileIds`   | [ID!]           | File IDs                                                                                    |
| `files`     | [File!]         | Files: `id`, `name`, `mime`, `size`, `links { origin thumbnail_150 thumbnail_256 }`         |
| `extra`     | PostFieldsExtra | Social network settings (the same fields as in [`createPost`](./create.md))                 |

The `images` field is deprecated (`@deprecated`): use `files` and `fileIds`.

## `results` — publishing results (`PostResult`)

A list of results per account.

| Field              | Type                  | Description                                                                                |
| ------------------ | --------------------- | ------------------------------------------------------------------------------------------ |
| `accountId`        | ID                    | Account ID                                                                                 |
| `success`          | Boolean               | Whether publishing succeeded                                                               |
| `errorMsg`         | String                | Error reason in the user's language                                                        |
| `linkToSocialPost` | String                | Link to the post on the social network                                                     |
| `publishedAt`      | DateTime              | Publishing time                                                                            |
| `operation`        | PostResultOperation   | Current operation on the result: `PUBLISHING`, `UPDATING`, or `DELETING`                   |
| `lastUpdate`       | PostOpOutcome         | Outcome of the last update: `at`, `success`, `errorMsg`                                    |
| `deleted`          | PostOpOutcome         | Outcome of deletion from the network: `at`, `success`, `errorMsg`                          |
| `notAllowed`       | [PostNotAllowedOp!]!  | Operations not available for this publication: `UPDATE`, `DELETE`                          |

## `engagement` — engagement (`PostSocialEngagement`)

A statistics snapshot per account (views, likes, and so on). Data is not collected for every social network. For engagement in the web app, see [Engagement](../../posts/engagement.md).

| Field                | Type                   | Description                                                            |
| -------------------- | ---------------------- | ---------------------------------------------------------------------- |
| `accountId`          | ID!                    | Account                                                                |
| `platform`           | SocialType!            | Social network                                                         |
| `pollStatus`         | EngagementPollStatus!  | Collection state: `PENDING`, `OK`, `ERROR`, `DISABLED`, `RATE_LIMITED` |
| `viewsCount`         | Int                    | Views                                                                  |
| `likesCount`         | Int                    | Likes                                                                  |
| `commentsCount`      | Int                    | Comments                                                               |
| `reactionsCount`     | Int                    | Reactions (total)                                                      |
| `reactions`          | [EngagementReaction!]! | Reactions by emoji: `emoji`, `count`                                   |
| `fetchedAt`          | DateTime               | When the data was fetched                                              |
| `lastError`          | String                 | Last collection error                                                  |
| `unsupportedReason`  | String                 | Why statistics are unavailable for this network                        |

## `provenance` — origin

Filled in for posts created by [automation](../../automation/index.md): `pipelineId`, `pluginId`, `triggerId`, `triggerRunId`, `sourceItemId`. For posts created manually or through the API the value is `null`.
