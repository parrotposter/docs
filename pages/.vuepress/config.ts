import { defaultTheme, defineUserConfig } from 'vuepress'
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { head } from './configs/head'
import { sidebarEn, sidebarRu } from './configs/sidebar'

export default defineUserConfig({
	// base: '/pp-docs/',
	pagePatterns: ['**/*.md', '!**/README.md', '!.vuepress', '!node_modules'],
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
			},
			'/ru/': {
				selectLanguageName: 'Русский',
				navbar: [
					{
						text: 'Сайт',
						link: 'https://parrotposter.com'
					}
				],
				sidebar: sidebarRu,
				openInNewWindow: 'Открыть в новой вкладке',
				toggleColorMode: 'Переключить тему',
				lastUpdated: true,
				lastUpdatedText: 'Последнее обновление',
			},
		}
	}),
	plugins: [
		mdEnhancePlugin({
			tabs: true,
		})
	]
})
