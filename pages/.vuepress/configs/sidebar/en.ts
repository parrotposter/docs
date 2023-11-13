import type { SidebarConfig } from '@vuepress/theme-default'
import { pages } from './helpers'

export const sidebarEn: SidebarConfig = {
	'/': [
		'/',
		{
			text: 'Connect socials',
			link: '/socials.md',
			children: pages('/socials/')
		},
	]
}
