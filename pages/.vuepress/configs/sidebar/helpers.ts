import type { SidebarConfig } from '@vuepress/theme-default'

export type SidebarLabels = {
	start: string
	startPlugins: string
	accounts: string
	posts: string
	automation: string
	automationNew: string
	automationClassic: string
	billing: string
	assistant: string
	api: string
	apiMethods: string
	apiPosts: string
}

/** Same page tree for every locale; only group titles are localized. */
export function buildSidebar(locale: string, t: SidebarLabels): SidebarConfig {
	const p = (path: string) => `/${locale}/${path}`
	return {
		[p('')]: [
			{
				text: t.start,
				collapsible: true,
				children: [p('start/'), p('start/wordpress.md'), p('start/bitrix.md')],
			},
			{
				text: t.accounts,
				collapsible: true,
				children: [
					p('accounts/'),
					p('accounts/vk.md'),
					p('accounts/tg.md'),
					p('accounts/fb.md'),
					p('accounts/insta/'),
					p('accounts/insta/session-id.md'),
					p('accounts/ok.md'),
					p('accounts/max.md'),
					p('accounts/dzen.md'),
				],
			},
			{
				text: t.posts,
				collapsible: true,
				children: [
					p('posts/'),
					p('posts/create.md'),
					p('posts/drafts-and-calendar.md'),
					p('posts/network-settings.md'),
					p('posts/engagement.md'),
				],
			},
			{
				text: t.automation,
				collapsible: true,
				children: [
					p('automation/'),
					{
						text: t.automationNew,
						collapsible: true,
						children: [
							p('automation/quick-start.md'),
							p('automation/rss.md'),
							p('automation/modes.md'),
							p('automation/template.md'),
							p('automation/edit.md'),
							p('automation/troubleshooting.md'),
						],
					},
					{
						text: t.automationClassic,
						collapsible: true,
						children: [p('automation/classic/wordpress.md'), p('automation/classic/bitrix.md')],
					},
				],
			},
			{
				text: t.billing,
				collapsible: true,
				children: [p('billing/')],
			},
			{
				text: t.assistant,
				collapsible: true,
				children: [p('assistant/'), p('assistant/support.md')],
			},
		],
		[p('api/')]: [
			p('api/'),
			p('api/quick-start.md'),
			{
				text: t.apiMethods,
				collapsible: true,
				children: [
					p('api/auth.md'),
					p('api/socials.md'),
					{
						text: t.apiPosts,
						collapsible: true,
						children: [
							p('api/posts/index.md'),
							p('api/posts/item.md'),
							p('api/posts/get.md'),
							p('api/posts/create.md'),
							p('api/posts/update.md'),
							p('api/posts/delete.md'),
						],
					},
				],
			},
			p('api/errors.md'),
		],
	}
}
