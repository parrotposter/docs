import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineUserConfig } from 'vuepress'
import { markdownIncludePlugin } from '@vuepress/plugin-markdown-include'
import { head } from './configs/head'
import { sidebarEn, sidebarRu } from './configs/sidebar'
import { defaultTheme } from '@vuepress/theme-default';
import { viteBundler } from '@vuepress/bundler-vite'
import { photoSwipePlugin } from '@vuepress/plugin-photo-swipe';
import { redirectPlugin } from '@vuepress/plugin-redirect';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineUserConfig({
	alias: {
		'@theme/useNavbarSelectLanguage': path.resolve(
			__dirname,
			'./composables/useNavbarSelectLanguage.ts',
		),
	},
	// @ts-ignore
	base: process.env.BASE_URL || '/',
	pagePatterns: ['**/*.md', '!**/README.md', '!**/readme.md', '!.vuepress', '!node_modules'],
	head,
	lang: 'en',
	locales: {
		'/en/': {
			lang: 'en',
			title: 'ParrotPoster',
			description: 'Social network auto-publishing service from Wordpress, Bitrix and other'
		},
		'/ru/': {
			lang: 'ru',
			title: 'ParrotPoster',
			description: 'Сервис автопубликаций в соцсети из Wordpress, 1С-Битрикс и других'
		},
	},
	theme: defaultTheme({
		logo: '/images/logo.png',
		contributors: false,
		docsRepo: 'https://github.com/parrotposter/docs',
		docsBranch: 'master',
		docsDir: 'pages',
		locales: {
			'/en/': {
				selectLanguageName: 'English',
				navbar: [
					{
						text: 'API',
						link: '/en/api/',
					},
					{
						text: 'Plugins',
						children: ['/en/wordpress/'],
					},
					{
						text: 'Site',
						link: 'https://parrotposter.com',
					},
				],
				sidebar: sidebarEn,
				sidebarDepth: 1,
				openInNewWindow: 'Open in new tab',
				toggleColorMode: 'Toggle color mode',
				lastUpdated: true,
				lastUpdatedText: 'Last updated',
				editLinkText: 'Edit on GitHub',
			},
			'/ru/': {
				selectLanguageName: 'Русский',
				navbar: [
					{
						text: 'API',
						link: '/ru/api/'
					},
					{
						text: 'Плагины',
						children: [
							'/ru/bitrix/',
							'/ru/wordpress/',
						]
					},
					{
						text: 'Сайт',
						link: 'https://parrotposter.com'
					},
				],
				sidebar: sidebarRu,
				sidebarDepth: 1,
				openInNewWindow: 'Открыть в новой вкладке',
				toggleColorMode: 'Переключить тему',
				lastUpdated: true,
				lastUpdatedText: 'Последнее обновление',
				editLinkText: 'Редактировать в Github'
			},
		},
		themePlugins: {
			mediumZoom: false,
		},
	}),
	plugins: [
		redirectPlugin({
			autoLocale: true,
		}),
		markdownIncludePlugin({
			deep: true,
			useComment: true,
		}),
		photoSwipePlugin({
			scrollToClose: false,
		}),
	],
	bundler: viteBundler({
		viteOptions: {},
		vuePluginOptions: {},
	})
})
