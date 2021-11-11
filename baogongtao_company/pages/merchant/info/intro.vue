<template>
	<view class="pb60">
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="block-sec edit-write" v-if="type == 'personal'">
				<weui-input v-model="ruleform.remark" label="个人介绍" type="textarea" name="remark"></weui-input>
				<weui-input v-model="ruleform.remark_pic" label="介绍图片" type="upload" upurl='user' allowUpLoadNum="5" name="remark_pic"></weui-input>
			</view>
			<view class="block-sec edit-write" v-if="type == 'company'">
				<weui-input v-model="ruleform.remark_company" label="介绍内容" type="textarea" name="remark_company"></weui-input>
				<weui-input v-model="ruleform.remark_pic_company" label="介绍图片" type="upload" upurl='logo' allowUpLoadNum="5" name="remark_pic_company"></weui-input>
			</view>
			<dxftButton type="primary" size="lg" round @click="submit">确认</dxftButton>
		</view>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	import {userinfo, action, logout} from "@/api/user";
	export default {
		components:{dxftButton},
		data() {
			return {
				formAction: '/api/company/store',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				type:'',
				vaildate:{}
			}
		},
		mounted() {
		
		},
		methods: {
			submit(){
				this.ruleform.token = uni.getStorageSync('token');
				this.vaildForm(this, res => {	
					this.postAjax(this.formAction, this.ruleform).then(msg => {
						if (msg.data.code == 0) {
							return this.back();
						}
					});
				})
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.ruleform = msg.user.userInfo;
					this.ruleform.remark_pic = msg.user.userInfo.remark_pic ? msg.user.userInfo.remark_pic.split(","): []
					this.ruleform.remark_pic_company = msg.user.userInfo.remark_pic_company ? msg.user.userInfo.remark_pic_company.split(","): []
				});
			},
			
		},
		onLoad(options) {
			this.type = options.type;
			if(this.type == 'personal'){
				this.setTitle('个人介绍');
			}else{
				this.setTitle('公司简介');
			}
			userinfo({token:uni.getStorageSync('token')}).then((res)=>{
			   this.ruleform =res.data.company;
			   this.ruleform.cover = this.ruleform.cover ? this.ruleform.cover.split(",") : [];
			   this.ruleform.remark_pic_company = this.ruleform.remark_pic_company ? this.ruleform.remark_pic_company.split(",") : [];
			})
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		
	}
</script>
<style scoped="" lang="scss">
.edit-write ::v-deep .dx-cell{
	flex-wrap: wrap;
	.dx-cell_hd{width: 100%;margin-bottom: 20rpx;}
	.dx-cell_bd{
		width: 100%;
		.dx-text{border: 1rpx #eee solid;padding: 20rpx;border-radius: 8rpx;min-height: 500rpx;height: 500rpx;}
		.upload-img{
			.uploadvalue{width: 180rpx;height: 180rpx;}
			.il-item .img{width: 180rpx;height: 180rpx;}
		}
	}
}
</style>