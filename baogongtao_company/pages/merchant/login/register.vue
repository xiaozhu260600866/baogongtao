<template>
	<view>
		<page ref="page"></page>
		<view class="register">
			<view class="p15 fs-17 fw-bold">账号主体</view>
			<weui-input v-model="ruleform.name" label="商家名称" type="text" name="name" datatype="require" block></weui-input>
			<view class="p15 fs-17 fw-bold">账号信息</view>
			<weui-input v-model="ruleform.charger_name" label="负责人姓名" type="text" name="charger_name" datatype="require" block></weui-input>
			<weui-input v-model="ruleform.charger_phone" label="负责人手机" type="txt" name="charger_phone" block></weui-input>
			<weui-input v-model="ruleform.password" label="登录密码" type="password" name="password" block></weui-input>
			<dxftButton type="primary" size="lg" @click="submit">注册</dxftButton>
		</view>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components:{dxftButton},
		data() {
			return {
				vaildate: {},
				formAction: '/api/company/register',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
			}
		},
		onLoad() {
			if(	uni.getStorageSync('phone')){
				this.ruleform.charger_phone = 	uni.getStorageSync('phone')
				this.ruleform.username = 	uni.getStorageSync('phone');
			}
		},
		methods: {
			submit(){
				this.ruleform.status =1;
				this.vaildForm(this, res => {	
					if(res){
						this.postAjax(this.formAction, this.ruleform).then(msg => {
							if (msg.data.status == 2) {
								return this.goto('/pages/merchant/login/success?id='+msg.data.id);
							}
						});
					}
				})
			},
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>