<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="container">
			<view class="validform_ajax">
				<view class="list-group">
					<view class="list-group-item">
						<view class="value">填写真实信息，成为我们的合作伙伴！</view>
					</view>
					<view class="list-group-item">
						<view class="value">
							<input type="text" placeholder="请填写您的姓名" class="form-control"
								v-model.lazy="ruleform.name" />
						</view>
					</view>
					<view class="list-group-item">
						<view class="value">
							<input type="text" placeholder="请填写您的手机号码" class="form-control"
								v-model.lazy="ruleform.phone" />
						</view>
					</view>
					<view class="list-group-item">
						<button @click="formSubmit()">提交</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<style scoped="">
	@import url("xiaozhu/uniapp/font/globalFont.css");
	@import url("xiaozhu/css/dx-input.css");
	
</style>
<script>
	import {userinfo} from "@/api/user";
	import "./index.css";

	export default {
		components: {},
		data() {
			return {
				formAction: '/api/dis/login',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform: {
					phone: '',
					name: '',
					city2: '',
				},
				vaildate: {
					/*验证规则，目前支前有，require|phone|integer|price*/
					phone: {
						name: '电话',
						vaild: 'require|phone',
						errorMessage: '电话'
					},
					name: {
						name: '姓名',
						vaild: 'require',
						errorMessage: '姓名'
					},
				},


			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			this.shareSource(this, '商城');
		},
		onLoad(options) {

			userinfo({token:uni.getStorageSync('token')}).then((res)=>{
				this.ruleform = res.data.user;
				this.ruleform.phone = this.ruleform.username;
				
			})
		},
		methods: {
			formSubmit: function(e) {
				this.vaildForm(this, res => {
					if (res) {
						this.ruleform.token = uni.getStorageSync("token");
						this.postAjax(this.formAction, this.ruleform).then(msg => {
							if (msg.data.status == 2) {
								this.goto('/pages/distribution/index/main');
							}
						});
					}
				});
			},
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
