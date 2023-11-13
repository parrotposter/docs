import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarEn: SidebarConfig = {
	'/': [
		{
			text: 'ParrotPoster',
			link: '/',
			children: [
				'/socials/readme.md'
			]
		}
	]
}
