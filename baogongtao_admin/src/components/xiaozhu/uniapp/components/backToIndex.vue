<!-- 调用
<backToIndex ></backToIndex>
-->
<template>
  <div v-if="source == 'share' " @click="toIndex2">
    <floatBtn2 type="1" title="回首页" :myclass="myclass" />
  </div>
</template>
<script>
import floatBtn2 from './floatBtn'
export default {
	components: {
		floatBtn2
	},
	props: ['text', 'bottom', 'url', 'urlType', 'myclass'],
	data() {
		return {
			source: ''
		}
	},
	mounted() {
		setTimeout(() => {
			const parent = this.getParent(this)
			console.log(parent)
			if (parent.data.query.shareSource && parent.data.show) {
				this.source = parent.data.query.shareSource
			} else {
				this.source = ''
			}
		}, 50)
	},
	methods: {
		toIndex2() {
			if (this.getSiteName() == 'https://boss.doxinsoft.com') {
				const role_type = wx.getStorageSync('role_type')
				if (role_type == 0) {
					return this.goto('/pages/cardLists/index')
				}
				if (role_type == 1) {
					return this.goto('/pages/user/website/products/lists/index', 2)
				}
				if (role_type == 2) {
					return this.goto('/pages/shop/index/index', 2)
				}
				if (role_type == 3) {
					return this.goto('/pages/cardLists/index')
				}
				if (role_type == 4) {
					return this.goto('/pages/index/main', 2)
				}
			} else if (this.getSiteName() == 'https://456.doxinsoft.com' || this.getSiteName() == 'https://456-0310.doxinsoft.com') {
				return this.goto('/pages/index/main', 2)
			} else {
				return this.goto('/pages/index/index', 2)
			}
		}
	}

}

</script>
