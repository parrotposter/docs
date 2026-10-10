import { defineClientConfig } from 'vuepress/client'
import { definePhotoSwipeConfig } from '@vuepress/plugin-photo-swipe/client'
import Layout from './layouts/Layout.vue'

definePhotoSwipeConfig({
	gallery: '#gallery--zoom-transition',
	showHideAnimationType: 'zoom',
	imageClickAction: 'close',
	tapAction: 'close',
})

export default defineClientConfig({
	layouts: { Layout },
})
