<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { onContentUpdated, usePageFrontmatter, usePageLang } from 'vuepress/client'

type TocItem = { slug: string; title: string; level: number }

const frontmatter = usePageFrontmatter()
const lang = usePageLang()

const title = computed(() => (lang.value.startsWith('ru') ? 'На этой странице' : 'On this page'))

const items = ref<TocItem[]>([])
const activeSlug = ref('')

const visible = computed(
	() => !frontmatter.value.home && frontmatter.value.toc !== false && items.value.length > 1,
)

let observer: IntersectionObserver | null = null

// Headings are read from the rendered DOM (same approach as the theme's sidebar),
// so content pulled in via markdown-include is covered too.
function collect() {
	const nodes = document.querySelectorAll<HTMLElement>('[vp-content] h2[id], [vp-content] h3[id]')
	items.value = [...nodes].map((el) => ({
		slug: el.id,
		title: (el.textContent ?? '').trim(),
		level: el.tagName === 'H2' ? 2 : 3,
	}))
}

function observe() {
	observer?.disconnect()
	observer = null
	if (items.value.length < 2) return
	const passed = new Set<string>()
	observer = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				const rootTop = e.rootBounds?.top ?? 0
				const rootH = e.rootBounds?.height ?? window.innerHeight
				if (e.boundingClientRect.top < rootTop + rootH * 0.3) passed.add(e.target.id)
				else passed.delete(e.target.id)
			}
			const current = [...items.value].reverse().find((i) => passed.has(i.slug))
			activeSlug.value = current?.slug ?? items.value[0].slug
		},
		{ rootMargin: '0px 0px -70% 0px', threshold: [0, 1] },
	)
	for (const i of items.value) {
		const el = document.getElementById(i.slug)
		if (el) observer.observe(el)
	}
	activeSlug.value = items.value[0].slug
}

onContentUpdated((reason) => {
	if (reason === 'beforeUnmount') {
		observer?.disconnect()
		items.value = []
		return
	}
	collect()
	nextTick(observe)
})

watch(visible, (v) => {
	if (!v) observer?.disconnect()
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
	<aside v-if="visible" class="page-toc">
		<div class="page-toc__title">{{ title }}</div>
		<ul class="page-toc__list">
			<li v-for="i in items" :key="i.slug" :class="`page-toc__item--l${i.level}`">
				<a
					:href="`#${i.slug}`"
					class="page-toc__link"
					:class="{ active: activeSlug === i.slug }"
				>{{ i.title }}</a>
			</li>
		</ul>
	</aside>
</template>
