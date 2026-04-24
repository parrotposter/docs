import { useRoutePaths } from '@vuepress/helper/client'
import { useMounted } from '@vueuse/core'
import { computed } from 'vue'
import { useRoute } from 'vuepress/client'
import { useData } from '@theme/useData'

/**
 * Копия логики темы default, но без автолокали `/`, которую VuePress
 * всегда добавляет в `site.locales` (см. resolveAppOptions: locales["/"] ??= …).
 * При структуре с английским под `/en/` иначе в меню два пункта English: `/` и `/en/`.
 */
export function useNavbarSelectLanguage() {
	const route = useRoute()
	const routePaths = useRoutePaths()
	const { routeLocale, site, siteLocale, theme, themeLocale } = useData()
	const isMounted = useMounted()

	return computed(() => {
		let localePaths = Object.keys(site.value.locales)

		// Убрать синтетическую корневую локаль, если английский уже под /en/
		if (localePaths.includes('/') && localePaths.includes('/en/')) {
			localePaths = localePaths.filter((p) => p !== '/')
		}

		if (localePaths.length < 2) {
			return []
		}

		const path = route.path
		const fullPath = route.fullPath

		return [
			{
				text: `${themeLocale.value.selectLanguageText}`,
				ariaLabel: `${themeLocale.value.selectLanguageAriaLabel ?? themeLocale.value.selectLanguageText}`,
				children: localePaths.map((localePath) => {
					const localeConfig = site.value.locales?.[localePath] ?? {}
					const themeLocaleConfig = theme.value.locales?.[localePath] ?? {}
					const lang = `${localeConfig.lang}`
					const name = themeLocaleConfig.selectLanguageName ?? lang
					if (lang === siteLocale.value.lang) {
						return {
							text: name,
							activeMatch: '.',
							link: isMounted.value ? fullPath : path,
						}
					}
					const targetPath = path.replace(routeLocale.value, localePath)
					return {
						text: name,
						link: routePaths.value.some((p) => p === targetPath)
							? isMounted.value
								? fullPath.replace(path, targetPath)
								: targetPath
							: themeLocaleConfig.home ?? localePath,
					}
				}),
			},
		]
	})
}
