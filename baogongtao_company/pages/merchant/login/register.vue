<template>
	<view>
		<page ref="page"></page>
		<view class="register pb65">
			<!-- <view class="p15 fs-17 fw-bold">账号主体</view> -->
			<weui-input v-model="ruleform.name" label="企业名称" type="text" name="name" datatype="require" block></weui-input>
			<!-- <view class="p15 fs-17 fw-bold">账号信息</view> -->
			<weui-input v-model="ruleform.charger_name" label="负责人姓名" type="text" name="charger_name" datatype="require" block></weui-input>
			<weui-input v-model="ruleform.charger_phone" label="负责人手机" type="txt" name="charger_phone" block></weui-input>
			<weui-input v-model="ruleform.password" label="登录密码" type="password" name="password" block></weui-input>
			<weui-input v-model="ruleform.license" label="企业营业执照" type="upload" upurl='logo' allowUpLoadNum="1" name="license" block
			 tips="图片最大不超过10M"></weui-input>
			<!-- <view class="explain p15">
				<view class="fs-16">营业执照示例图:<text class="fc-7 fs-15">()</text></view>
				<image class="mt15" src="/static/images/explain-license.jpg" mode="widthFix" style="width: 240rpx;"></image>
			</view> -->
			<dxftButton type="primary" round size="lg" myclass="big-btn" @click="submit">注册</dxftButton>
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
page{background: $color-white;overflow-x: hidden;}
@import "index.scss";
</style>