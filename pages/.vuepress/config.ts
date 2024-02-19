import { defineUserConfig } from 'vuepress'
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { head } from './configs/head'
import { sidebarEn, sidebarRu } from './configs/sidebar'
import { defaultTheme } from '@vuepress/theme-default';
import { viteBundler } from '@vuepress/bundler-vite'
import { photoSwipePlugin } from '@vuepress/plugin-photo-swipe';

export default defineUserConfig({
	// base: '/docs/',
	pagePatterns: ['**/*.md', '!**/README.md', '!**/readme.md', '!.vuepress', '!node_modules'],
	head,
	lang: 'en',
	locales: {
		'/': {
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
			'/': {
				selectLanguageName: 'English',
				navbar: [
					{
						text: 'Site',
						link: 'https://parrotposter.com'
					}
				],
				sidebar: sidebarEn,
				editLinkText: 'Edit on Github'
			},
			'/ru/': {
				selectLanguageName: 'Русский',
				navbar: [
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
		mdEnhancePlugin({
			tabs: true,
			include: true,
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
