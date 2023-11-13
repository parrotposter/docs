import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarRu: SidebarConfig = {
	'/ru/': [
		'/ru/',
		{
			text: 'Подключение соцсетей',
			link: '/ru/socials.md',
			children: [
				'/ru/socials/vk.md',
				'/ru/socials/tg.md',
			]
		},
	]
}
