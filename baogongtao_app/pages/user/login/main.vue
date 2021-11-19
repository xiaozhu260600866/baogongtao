<template>
	<view class="login-body">
		<view class="bg-white"></view>
		<page :parentData="data" :formAction="formAction"></page>
		<!-- <div ><myHeader name="用户登录" icon="1" iconName="left"></myHeader></div> -->
		<view class="zindex2">

			<view class="logo">
				<image class="img" src="/static/logo.jpg"></image>
			</view>
			<view class="mlr30">
				<view class="login-list">
					<weui-input v-model="ruleform.username" placeholder="电话号码" type="number" myclass="plr0"
						name="username" datatype="require">
						<view slot="left" class="slot-icon">
							<view class="iconfont icon-login-phone"></view>
						</view>
					</weui-input>
					<weui-input v-model="ruleform.password" placeholder="请输入密码" type="password" myclass="plr0"
						name="password" datatype="require">
						<view slot="left" class="slot-icon">
							<view class="iconfont icon-login-passwork"></view>
						</view>
					</weui-input>
				</view>
				<view class="mt30">
					<myform :ruleform="ruleform" :vaildate="vaildate" @callBack="submit" title="登录" myclass="dx-btn dx-btn-big dx-btn-green bdr4 w-b100 fs-17"
							 ></myform>

				</view>
				<view class="flex-between flex-right mt15 fc-6 fs-14">
					<view @click="goto('/pages/user/register/index',1)">快速注册</view>
				</view>
				<!-- <view class="mt15 other-type">
					<dx-divider :border="true">其它登录方式</dx-divider>
					<view class="wechat mt10" @click="wechatAuth"><text class="dxi-icon dxi-icon-wechat"></text></view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import myHeader from "doxinui/components/header/header";
	export default {
		components: {
			myHeader
		},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform: {},
				vaildate: {},
				login: {
					src: 'https://appmarket.doxinsoft.com/images/wap/logo.png'
				}
			}
		},

		methods: {
			submit() {
				this.vaildForm(this, res => {
					if (res) {
						this.postAjax("/user/login", this.ruleform).then(msg => {
							if (msg.data.status == 2) {
								let userInfo = uni.getStorageSync('userInfo')
								userInfo.is_bing = 1;
								uni.setStorageSync('userInfo', userInfo);
								setTimeout(() => {
									if (!msg.data.user.wechat_openid) {
										this.goto("/pages/openid/main?user_id=" + msg.data.user.id,
											1);
									} else {
										this.goto("/pages/user/index/index", 2);
									}

								}, 1000);
							}
						});
					}
				});

			},
			wechatAuth() {
				this.wechatLogin().then(msg => {

				});
			},
			ajax() {

				this.getAjaxForApp(this, {

				}).then(msg => {

				});
			}
		},
		onLoad(options) {
			//this.getError(uni.getStorageSync('openid') + '1');
			//this.ajax();

		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},

	}
</script>
<style scoped="">
	@import url('index.css')
</style>
