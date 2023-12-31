import type { HeadConfig } from '@vuepress/core'

export const head: HeadConfig[] = [
	[
		'link',
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			href: `/images/favicon/favicon-16x16.png`,
		},
	],
	[
		'link',
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			href: `/images/favicon/favicon-32x32.png`,
		},
	],
	['link', { rel: 'manifest', href: '/site.webmanifest' }],
	['meta', { name: 'application-name', content: 'ParrotPoster docs' }],
	['meta', { name: 'apple-mobile-web-app-title', content: 'ParrotPoster docs' }],
	['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
	[
		'link',
		{ rel: 'apple-touch-icon', href: `/images/favicon/apple-touch-icon.png` },
	],
]
