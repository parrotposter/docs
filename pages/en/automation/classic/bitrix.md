---
title: Templates in the 1C-Bitrix module
description: Classic templates of the ParrotPoster module for 1C-Bitrix — autoposting of new infoblock elements and scheduled autounloading
---

# Templates in the 1C-Bitrix module

In the ParrotPoster module for 1C-Bitrix (`vettich.sp3`) automatic publishing is configured with **templates**. One template is bound to one infoblock and supports two kinds of automation:

| Kind | What it does | Analog in the new automation |
| --- | --- | --- |
| **Autoposting** | New infoblock elements are sent to the selected social networks right away | "Instant" mode |
| **Automatic unloading** | Existing elements are published one at a time on a schedule | "Archive" mode |

Both kinds are switched on independently in one template. The new [automation](/en/automation/) (sources, Hybrid and Digest modes, run journal) is not yet available in the Bitrix module — use templates.

::: warning The module interface is in Russian
The module has only a Russian interface. Below, field names are given as they appear in the module (in Russian) with an English translation in parentheses.
:::

::: tip Before you start
Before creating a template, [install the module and sign in](/en/start/bitrix.md) and [connect at least one account](/en/accounts/): a template cannot be saved without accounts.
:::

## Where to find templates

In the Bitrix admin: **Services → Автопубликации в соц. сети (Autoposting to social networks) → Шаблоны (Templates)**. The list shows ID, name, type and ID of the infoblock; each template has "Edit", "Copy" and "Delete" actions (users without write access to the module can only view). A new template is created with the add button above the list.

## Create a template

The template form has three tabs. The "Данные поста" and "Выгрузка" tabs appear after an infoblock is selected on the first tab.

### Tab "Основное" (General)

| Field | What it does |
| --- | --- |
| **Имя** (Name) | The template name (required). After you select an infoblock its name is filled in — you can change it. |
| **Активность** (Active) | The template's general activity flag. In the current version, a known bug prevents it from stopping autoposting and unloading: to pause the automation, clear "Автопубликация" and "Автоматическая выгрузка". |
| **Автопубликация** (Autoposting) | If on, new elements of the selected infoblock are processed by this template automatically. |
| **Тип инфоблока** (Infoblock type) → **Инфоблок** (Infoblock) | Where to take elements from. Select the type first, then the infoblock — the form refreshes. |
| **Выбрать разделы** (Select sections) → **Разделы инфоблока** (Infoblock sections) | Appears if the infoblock has sections. Turn it on to publish only elements of the selected sections (including nested ones). |
| **Домен** (Domain) | The site address used to build links. By default it is the domain you opened the admin from. |
| **UTM метки** (UTM tags) | If on, tags are added to the link: "Источник трафика" (traffic source, `utm_source`; the default is the `#SOCIAL_CODE#` macro — the network code), "Вид трафика" (traffic type, `utm_medium`; `social` by default), "Название компании" (campaign name, `utm_campaign`; `#IBLOCK_CODE#` by default), "Ключевое слово" (keyword, `utm_term`) and "Вид контента" (content type, `utm_content`). |
| **Только активные** (Active only) | Publish only active elements. |
| **Условия** (Conditions) | Extra element selection conditions: an infoblock or catalog field, an operator and a value. Operators: "Равно" (equals), "Не равно" (not equal), "Больше или равно" (greater or equal), "Меньше или равно" (less or equal), "Содержит" (contains), "НЕ содержит" (does not contain). An element is published only if all conditions are met. Enter dates in the format used on the site, for example `31.12.2031`. |
| **Аккаунты соц. сетей** (Social accounts) | Accounts to publish to. At least one is required. |

::: warning Known issue
The "Активность" flag does not yet disable the whole template. This is planned to be fixed in a future module release.
:::

The "Привязка к инфоблоку" (Binding to the infoblock) block (queue settings):

| Field | What it does |
| --- | --- |
| **Обновлять элемент** (Update element) | When an element changes, update the posts already created in social networks, if possible. On by default. |
| **Удалять элемент** (Delete element) | When an element is deleted, delete its posts in social networks, if possible. On by default. |
| **Исключать дубликаты** (Exclude duplicates) | If the queue already contains this element, it will not be published a second time. Off by default. |

### Tab "Данные поста" (Post data)

| Field | What it does |
| --- | --- |
| **Текст для публикации** (Publication text) | The post text. Insert element data with macros — a hint with all macros is shown under the form. Default: `#NAME#`, a line break, `#PREVIEW_TEXT#`. |
| **Теги** (Tags) | The element field the tags are taken from (`TAGS` by default); they are placed at the end of the post. |
| **Ссылка (на детальную страницу)** (Link to the detail page) | The field with the link (`DETAIL_PAGE_URL` by default). The link is attached to the post or embedded in the text, depending on what the network supports. |
| **Главная картинка** (Main picture) | The field with the main image (`DETAIL_PICTURE` by default). Required for Instagram and Pinterest. |
| **Дополнительные картинки** and **Дополнительные картинки 2** (Additional pictures) | Two more image fields (`PROPERTY_MORE_PICTURES` and empty by default), if the network allows. |
| **Время публикации** (Publish time) | The field with the date to publish the post at (`DATE_ACTIVE_FROM` by default). If the date is in the past or empty, the post is published immediately. |
| **Опубликовать пост от имени группы**, **Добавить подпись к посту** (Publish on behalf of the group, Add a signature) | VKontakte-only options. |

Images: no more than 10 images go into a post; local files are checked for format and size, unsuitable ones are skipped. If image files for watermarks are placed in the module's `watemarks` folder, they are applied to the pictures (the file name format is described in the module code).

#### Macros in the text

The hint under the form describes the syntax:

- `#NAME#` — substitutes the value of an element field or property, for example `#PREVIEW_TEXT#`, `#PROPERTY_COLOR#`.
- `#BR#` — a line break.
- **Indicator** `{Color: #PROPERTY_COLOR#}` — everything inside the curly braces is shown only if the macro value is not empty.
- **Blocks for trade offers and multiple properties:** `[LIST #SKU#] … [/LIST]` — a template for each list row; `[TABLE #SKU#] … [/TABLE]` — a table: the first line holds headings, the second the fields, columns separated by `|`. Inside a block, field names start with a dot: `#.PROPERTY_COLOR#`.
- **Reference properties:** `#PROPERTY_GIFT.REF.NAME#` — a field of the element linked to the property.

Available are element fields (`ID`, `CODE`, `NAME`, `PREVIEW_TEXT`, `DETAIL_TEXT`, `DATE_ACTIVE_FROM`, `DETAIL_PAGE_URL`, etc.), infoblock properties (`PROPERTY_*`) and catalog fields (`CATALOG_QUANTITY`, `CATALOG_PRICE_<price type ID>`, `CATALOG_CURRENCY_<ID>`, etc.). The full list is visible in the form's drop-down fields.

### Tab "Выгрузка" (Unloading)

| Field | What it does |
| --- | --- |
| **Автоматическая выгрузка** (Automatic unloading) | Turns on scheduled publishing of existing elements. |
| **Соблюдать интервал выгрузки в 30 мин.** (Keep a 30-minute unloading interval) | At least 30 minutes pass between publications by this template. Works for unloading only. On by default. |
| **Выберите время для выгрузки** (Choose unloading time) | The schedule: an "Все дни" (all days) row and separate rows for weekdays; time is chosen in 30-minute steps, and you can add several values per day (the "+" button). By default "all days" is 9:00 and 12:00. |
| **Часовой пояс** (Time zone) | The schedule runs in this time zone. |
| **Поле инфоблока для сортировки** and **Направление сортировки** (Sort field and direction) | Which field and order are used to pick the next element: "По возрастанию" (ascending), "По убыванию" (descending) or "Рандомно" (random). Default: `ID` descending. |

Save the template with "Сохранить" (Save) or "Применить" (Apply). Without a name, an infoblock and at least one account the template is not saved: the form shows an error.

## How autoposting works

1. When a new element is saved, the module adds a task to the site's **local queue**. No post is created at this point.
2. After saving, the module tells ParrotPoster that the queue has work. ParrotPoster calls the site in a separate request to start processing the queue. This prevents template selection, data preparation and post creation from delaying the save operation in Bitrix.
3. On that request, the module selects templates for the infoblock that have "Автопубликация" enabled, then checks their sections, conditions and "Только активные" setting. For every matching template, the module prepares the publication and creates a post in ParrotPoster; its status is shown in the **Posts** section.
4. If the task cannot be processed, the module retries it: there are four attempts in total, with increasing pauses of 2, 4 and 8 minutes. The task is then marked as failed and deleted after a month.

Other events also go through the queue:

- **Element change** — already created posts are updated (if the template has "Обновлять элемент" on). Posts are updated if they have not gone out yet or no more than a day has passed since publication. If the element was inactive, became active and has no posts yet, it is published.
- **Element deletion** — the posts are deleted (if the template has "Удалять элемент" on).

::: warning Bitrix agents and BX_CRONTAB_SUPPORT
The module registers two Bitrix agents that run every 60 seconds: one retries the ParrotPoster notification if the first attempt failed, and the other refreshes the service domain list. Immediately after an element is saved, the module notifies ParrotPoster about the new task itself; no agent is required for this initial notification. If that notification fails, the agent retries it so that the task does not remain in the local queue. Bitrix agents run on site hits by default; on low-traffic sites it is better to run them from cron (add `define("BX_CRONTAB_SUPPORT", true);` to `/bitrix/php_interface/dbconn.php` and set up a system cron), otherwise the retry may be delayed.
:::

## How autounloading works

Autounloading gradually publishes an accumulated catalog or news archive.

- The ParrotPoster service periodically calls your site. On every call, the module checks templates with "Автоматическая выгрузка" enabled.
- The schedule is checked in the template's time zone. Times from the "Все дни" row and the current weekday's row are considered. If the call arrives less than five minutes from a scheduled time, the module can start unloading.
- If "Соблюдать интервал выгрузки в 30 мин." is enabled, the module also checks the time of the previous publication by this template. When less than 25 minutes have passed, the current unload is skipped.
- **One** element is published per run. It is chosen like this: the infoblock's elements (taking sections, "Только активные" and conditions into account) **that have no post by this template yet** are sorted by the chosen field, and the first one is taken.
- When the matching elements run out, unloading stops publishing.

::: tip
To unload the needed elements sooner, choose a meaningful sort: for example "`ID` ascending" goes from old to new. Random sorting takes a random unprocessed element.
:::

## Publish elements manually

In infoblock element and section lists (the row context menu and group actions) there is an item **Создать пост в соц. сеть** (Create a post in a social network). It opens a window where you can choose a template from those suitable for the infoblock or publish without a template. When publishing via a template, the template's conditions are not checked. This is handy for sending specific elements to social networks without waiting for automation.

## The "Посты" page and the local queue

The module has no separate "Queue" or "Journal" pages. Check the state of publications in the **Посты** (Posts) section (the post list and their statuses, see [Posts](/en/posts/)). If the local queue has tasks, the line "В локальной очереди элементов: N" (N elements in the local queue) is shown above the list with an explanation: this is a temporary list of tasks on the site that the module is still passing to ParrotPoster. Until the queue is processed, posts may not appear in the list.

## Common problems

| What happens | What to check |
| --- | --- |
| A new element is not published | Is "Автопубликация" on in the template; is the infoblock and section right; are the conditions and "Только активные" met; are accounts selected. |
| Many elements sit in the local queue and are not sent | Is your site reachable from the internet for the ParrotPoster service (the call goes to `/bitrix/tools/vettich.sp3.ajax.php`), is it not closed by authorization or a firewall; do the Bitrix agents work. |
| An Instagram or Pinterest post is not created | The main picture is required for them — check the "Главная картинка" field and that the file exists. |
| Autounloading does not publish | Is "Автоматическая выгрузка" on; is a schedule set; is the time zone right; are there elements left without posts by this template; does the 30-minute interval get in the way. |
| A post was not updated after editing the element | Is "Обновлять элемент" on; the post must be no more than a day past its publication. |
| You need to dig deeper | Enable debug logging in `/bitrix/php_interface/dbconn.php`: `define('VETTICH_SP3_LOG_ENABLED', true);`. The log file is created in the module folder with a date in its name. Attach it when contacting [support](/en/assistant/support.md). |

## What next

- [New automation and modes](/en/automation/modes.md)
- [Publication template (in the new automation)](/en/automation/template.md)
- [Installing the 1C-Bitrix module](/en/start/bitrix.md)
