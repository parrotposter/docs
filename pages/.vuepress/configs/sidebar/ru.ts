import type { SidebarConfig } from '@vuepress/theme-default'
import { pages } from './helpers'

export const sidebarRu: SidebarConfig = {
	'/ru/': [
		'/ru/',
		{
			text: 'Подключение соцсетей',
			link: '/ru/socials.md',
			children: pages('/ru/socials/')
		},
	]
}
