<template>
  <view class="tui-sticky-class">
    <!--sticky 容器-->
    <view :class="[isFixed === true ? 'tui-sticky-fixed' : '']">
      <slot name="header" />
    </view>
    <!--sticky 容器-->
    <!--内容-->
    <slot name="content" />
  </view>
</template>

<script>
	export default {
		name: 'TuiSticky',
		props: {
			scrollTop: {
				type: Number
			}
		},
		data() {
			return {
				timer: null,
				top: 0,
				height: 0,
				isFixed: false
			}
		},
		watch: {
			scrollTop(newValue, oldValue) {
				this.updateStickyChange()
			}
		},
		// #ifdef H5
		mounted() {
			this.updateScrollChange()
		},
		// #endif
		onReady() {
			this.updateScrollChange()
		},
		methods: {
			updateStickyChange() {
				const top = this.top
				const height = this.height
				const scrollTop = this.scrollTop
				this.isFixed = !!((scrollTop >= top && scrollTop < top + height))
			},
			updateScrollChange() {
				if (this.timer) {
					clearTimeout(this.timer)
					this.timer = null
				}
				this.timer = setTimeout(() => {
					const className = '.tui-sticky-class'
					const query = uni.createSelectorQuery().in(this)
					query.select(className).boundingClientRect((res) => {
						if (res) {
							this.top = res.top
							this.height = res.height
						}
					}).exec()
				}, 0)
			}
		}
	}
</script>

<style>
	.tui-sticky-fixed {
		width: 100%;
		position: fixed;
		top: 0;
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
		z-index: 99999;
	}
</style>
