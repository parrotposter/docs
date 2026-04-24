import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarEn: SidebarConfig = {
	'/en/': [
		'/en/',
		{
			text: 'Connect social networks',
			collapsible: true,
			children: [
				'/en/socials/vk/',
				'/en/socials/tg/',
				'/en/socials/fb/',
				'/en/socials/insta/',
				'/en/socials/ok/',
				'/en/socials/max/',
				'/en/socials/dzen/',
			],
		},
	],
	'/en/wordpress/': [
		'/en/wordpress/',
		{
			text: 'Connect social networks',
			collapsible: true,
			children: [
				'/en/wordpress/socials/vk/',
				'/en/wordpress/socials/tg/',
				'/en/wordpress/socials/fb/',
				'/en/wordpress/socials/insta/',
				'/en/wordpress/socials/ok/',
				'/en/wordpress/socials/max/',
				'/en/wordpress/socials/dzen/',
			],
		},
	],
	'/en/api/': [
		'/en/api/',
		'/en/api/quick-start.md',
		{
			text: 'API methods',
			collapsible: true,
			children: [
				'/en/api/auth.md',
				'/en/api/socials.md',
				{
					text: 'Posts',
					collapsible: true,
					children: [
						'/en/api/posts/index.md',
						'/en/api/posts/item.md',
						'/en/api/posts/get.md',
						'/en/api/posts/create.md',
						'/en/api/posts/update.md',
						'/en/api/posts/delete.md',
					],
				},
			],
		},
	],
}
