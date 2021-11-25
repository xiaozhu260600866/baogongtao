<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="dis-add">
				<view class="tips">填写真实信息，成为我们的合作伙伴！</view>
				<view class="item">
					<input type="text" placeholder="请填写您的姓名" class="input" v-model.lazy="ruleform.name" />
				</view>
				<view class="item">
					<input type="number" placeholder="请填写您的手机号码" class="input" v-model.lazy="ruleform.phone" />
				</view>
				<view class="item">
					<dx-button type="primary" size="lg" block round @click="formSubmit()">提交</dx-button>
				</view>
			</view>
		</view>
	</view>
</template>
<style>
@import "./index.css";
</style>
<script>
	import {userinfo} from "@/api/user";
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
