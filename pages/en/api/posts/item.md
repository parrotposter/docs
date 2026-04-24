# Post object shape

This object represents a post created in ParrotPoster.

### `Post` fields

| Field        | Type       | Description                                          |
| ------------ | ---------- | ---------------------------------------------------- |
| `id`         | ID         | Unique post ID                                       |
| `status`     | String     | Post status (`PREPARE`, `SUCCESS`, `READY`, etc.)     |
| `fields`     | Object     | Post content (same shape as at creation)           |
| `networks`   | Object     | Where to publish                                     |
| `publishAt`  | String     | Scheduled or actual publish time                     |
| `results`    | [Object]?  | Per-network publish results                          |
| `createdAt`  | String     | Creation time                                        |
| `updatedAt`  | String     | Last update time                                     |

### Post status

| Status       | Description                                                   |
| ------------ | ------------------------------------------------------------- |
| `PREPARE`    | Preparing for publication                                     |
| `READY`      | Ready to publish, waiting for scheduled time                  |
| `SUCCESS`    | Published successfully                                        |
| `FAIL`       | Publishing failed for at least one network                    |
| `PUBLISHING` | Publishing in progress                                        |
| `UPDATING`   | Post is being updated                                         |
| `DELETING`   | Post is being deleted                                         |

### `fields`

Describes text content and media.

| Field        | Type       | Description                           |
| ------------ | ---------- | ------------------------------------- |
| `text`       | String?    | Post text                             |
| `link`       | String?    | Link attached to the post             |
| `tags`       | String?    | Tags (hashtags)                       |
| `imageIds`   | [ID]?      | Image ID list                         |
| `images`     | [Object]?  | Image objects                         |
| `fileIds`    | [ID]?      | File ID list                          |
| `files`      | [Object]?  | File objects                          |
| `neetUtm`    | Boolean?   | Attach UTM tags                       |
| `utmParams`  | Object?    | UTM parameters                        |
| `extra`      | Object?    | Extra options                         |

### `fields.extra`

Extra options for specific networks.

| Field          | Type      | Description                                                                                     |
| -------------- | --------- | ----------------------------------------------------------------------------------------------- |
| `vkFromGroup`  | Boolean?  | Publish as the VK community (`true`) or as the author (`false`). Default: `true`                |
| `vkSigned`     | Boolean?  | Add an author signature in VK. Default: `false`                                                 |

### `networks`

Defines publish targets.

| Field       | Type      | Required     | Description                                                                 |
| ----------- | --------- | ------------ | --------------------------------------------------------------------------- |
| `accounts`  | [String]  | Yes          | Account IDs from [listSocialAccounts](../socials.md)                      |

### `results`

Per-network publish results.

| Field               | Type     | Description                              |
| ------------------- | -------- | ---------------------------------------- |
| `accountId`         | String   | Account ID                               |
| `success`           | Boolean  | Whether publishing succeeded             |
| `linkToSocialPost`  | String?  | URL of the created post in the network   |
| `errorMsg`          | String?  | Error message                            |
