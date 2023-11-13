import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarEn: SidebarConfig = {
	'/': [
		{
			text: 'ParrotPoster',
			link: '/en/',
			children: [
				'/en/socials/readme.md'
			]
		}
	]
}
