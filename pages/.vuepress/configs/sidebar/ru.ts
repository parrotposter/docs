import type { SidebarConfig } from '@vuepress/theme-default'
import { pages } from './helpers'

export const sidebarRu: SidebarConfig = {
	'/ru/': [
		'/ru/',
		{
			text: 'Подключение соцсетей',
			link: '/ru/socials.md',
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
			link: '/ru/bitrix/socials/',
			children: [
				'/ru/bitrix/socials/vk/',
				'/ru/bitrix/socials/tg/',
				'/ru/bitrix/socials/fb/',
				'/ru/bitrix/socials/insta/',
				'/ru/bitrix/socials/ok/',
			]
		},
	]
}
