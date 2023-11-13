import { defineClientConfig } from '@vuepress/client'

const defaultHome = '/en/';

export default defineClientConfig({
	enhance({ router }) {
		router.beforeEach((to, _from, next) => {
			if (to.path === '/') {
				router.push(defaultHome);
			}
			next()
		})
	},
})
