<template>
	<view>
		<page ref="page"></page>
		<view class="register">
			<view class="p15 fs-17 fw-bold">账号主体</view>
			<weui-input v-model="ruleform.compnay_name" label="商家名称" type="text" name="compnay_name" datatype="require" block></weui-input>
			<view class="p15 fs-17 fw-bold">账号信息</view>
			<weui-input v-model="ruleform.name" label="负责人姓名" type="text" name="name" datatype="require" block></weui-input>
			<weui-input v-model="ruleform.phone" label="负责人手机" type="text" name="phone" block></weui-input>
			<weui-input v-model="ruleform.password" label="登录密码" type="password" name="password" block></weui-input>
			<dxftButton type="primary" size="lg" @click="goto('/pages/merchant/login/success',1)">注册</dxftButton>
		</view>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components:{dxftButton},
		data() {
			return {
				mpType: 'page',
				ruleform:{
					phone:'13380951183'
				},
			}
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>