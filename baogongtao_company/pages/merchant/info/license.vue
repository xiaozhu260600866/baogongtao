<template>
	<view>
		<page ref="page"></page>
		<view>
			<weui-input v-model="ruleform.license" label="企业营业执照" type="upload" upurl='logo' allowUpLoadNum="1" name="license" block></weui-input>
			<view class="explain p15">
				<view class="fs-15">营业执照示例图:<text class="fc-7 fs-14">(图片最大不超过10M)</text></view>
				<image class="mt15" src="/static/images/explain-license.jpg" mode="widthFix" style="width: 240rpx;"></image>
			</view>
			<dxftButton type="primary" @click="submit()">提交</dxftButton>
		</view>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	import {userinfo, action, logout} from "@/api/user";
	export default {
		components:{
			dxftButton
		},
		data() {
			return {
				vaildate: {},
				formAction: '/api/company/store',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
			}
		},
		onLoad() {
			userinfo({token:uni.getStorageSync('token')}).then((res)=>{
			   this.ruleform =res.data.company;	
			   this.ruleform.license =  this.ruleform.license ? this.ruleform.license.split(",") : [],
			   this.ruleform.cover = this.ruleform.cover ? this.ruleform.cover.split(",") : [];
			   this.ruleform.remark_pic_company = this.ruleform.remark_pic_company ? this.ruleform.remark_pic_company.split(",") : [];
			})
		},
		methods: {
			submit(){
				this.ruleform.token = uni.getStorageSync('token');
				this.vaildForm(this, res => {	
					this.postAjax(this.formAction, this.ruleform).then(msg => {
						if (msg.data.code == 0) {
							return this.goto("/pages/merchant/index/index");
						}
					});
				})
			}
		}
	}
</script>
<style lang="scss">
page{background: $color-white;}
@import "index.scss";
</style>