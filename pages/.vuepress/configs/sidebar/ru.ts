import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarRu: SidebarConfig = {
	'/ru/': [
		'/ru/',
		{
			text: 'Подключение соцсетей',
			collapsible: true,
			children: [
				'/ru/socials/vk/',
				'/ru/socials/tg/',
				'/ru/socials/fb/',
				'/ru/socials/insta/',
				'/ru/socials/ok/',
			]
		},
	],
	'/ru/bitrix/': [
		'/ru/bitrix/',
		{
			text: 'Подключение соцсетей',
			collapsible: true,
			children: [
				'/ru/bitrix/socials/vk/',
				'/ru/bitrix/socials/tg/',
				'/ru/bitrix/socials/fb/',
				'/ru/bitrix/socials/insta/',
				'/ru/bitrix/socials/ok/',
			]
		},
	],
	'/ru/wordpress/': [
		'/ru/wordpress/',
		{
			text: 'Подключение соцсетей',
			collapsible: true,
			children: [
				'/ru/wordpress/socials/vk/',
				'/ru/wordpress/socials/tg/',
				'/ru/wordpress/socials/fb/',
				'/ru/wordpress/socials/insta/',
				'/ru/wordpress/socials/ok/',
			]
		},
	]
}
