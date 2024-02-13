import { definePhotoSwipeConfig } from '@vuepress/plugin-photo-swipe/client'

definePhotoSwipeConfig({
	gallery: '#gallery--zoom-transition',
	showHideAnimationType: 'zoom',
	imageClickAction: 'close',
	tapAction: 'close',
})

export default {};
