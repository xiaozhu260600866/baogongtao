<template>
	<view>
		<page ref="page"></page>
		<view class="bg-f info">
			<view class="dx-cell upload-head">
				<view class="dx-cell_hd flex1">
					<view class="dx-label fs-15">头像</view>
					<view class="fs-18 fc-8 mt10">真实的头像更能吸引HR的关注</view>
				</view>
				<view class="dx-cell_bd">
					<image class="img" :src="avatarUrl?avatarUrl:'https://www.baogongtao.com/images/user.png'" mode="aspectFill"
					 @click="uploadAvatar"></image>
					<view style="height: 1upx;overflow:hidden;width: 100rpx;">
						<avatar @upload="avatarUploaded" ref="avatar"></avatar>
					</view>
				</view>
			</view>
			<weui-input v-model="ruleform.name" label="姓名" type="text" name="name" datatype="require" block></weui-input>
			<weui-input v-model="ruleform.email" label="邮箱" type="text" name="email" datatype="require" block></weui-input>
			<weui-input v-model="ruleform.position" label="我的职务" type="text" name="position" datatype="require" block></weui-input>
			<weui-input v-model="company.name" label="我的公司" type="txt" name="company" datatype="require" block></weui-input>
			<dxftButton type="primary" size="lg" @click="submit">保存</dxftButton>
		</view>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	import avatar from "@/components/yq-avatar/yq-avatar.vue";
	import { loginSentMsg, login, userinfo } from "@/api/user";
	export default {
		components: {dxftButton,avatar},
		data() {
			return {
				avatarUrl: '',
				ruleform: {},
				company:{}
			}
		},
		onLoad() {
			userinfo({token:uni.getStorageSync('token')}).then((res)=>{
				this.ruleform = res.data.user.get_user_info;
				this.avatarUrl = this.ruleform.avatarUrl
				this.company = res.data.company
			
			})
		},
		methods: {
			submit(){
				this.vaildForm(this, res => {
					if (res) {
						this.ruleform.token = uni.getStorageSync('token');
						this.postAjax("/api/auth/user/update", this.ruleform).then(msg => {
							if (msg.data.code == 0) {
							 return this.goto("/pages/user/index/index",2);
							}
						});
					}
				
				})
			},
			uploadAvatar() {
				this.$refs.avatar.fChooseImg(0, {
					selWidth: "300upx",
					selHeight: "300upx",
					expWidth: '260upx',
					expHeight: '260upx',
					canRotate: 'false'
				});
			},
			avatarUploaded(rsp) {
				//console.log(rsp)
			
				uni.uploadFile({
					url: this.$store.state.apiInterfaceUrl + '/base/upload',
					filePath: rsp.path,
					name: 'file',
					formData: {
						pathname: 'user',
						type: 'image'
					},
					success: (uploadFileRes) => {
						let dataObj = JSON.parse(uploadFileRes.data);
						console.log(dataObj);
						if (dataObj.code != 0) {
							return this.msgError(dataObj.msg);
						}
						this.ruleform.avatarUrl = dataObj.data.filePath;
						this.avatarUrl = rsp.path; //更新头像方式一
						//rsp.avatar.imgSrc = rsp.path; //更新头像方式二
					}
				});
			},
		}
	}
</script>
<style lang="scss">
	@import "index.scss";
	@import "xiaozhu/css/dx-input.css";
</style>