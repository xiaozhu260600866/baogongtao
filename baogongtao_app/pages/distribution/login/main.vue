<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<div v-if="data.show">
			<div v-if="data.show">
				<div class="logo ptb20">
					<image class="img" :src="getSiteName+'/images/456LOGO-02.jpg'"></image>
				</div>
				<div class="login-list m15" v-if="data.show">
					
					<div class="login02" >
						<view class="login-info">
							<weui-input v-model="ruleform.phone" placeholder="手机号码" type="number" myclass="plr0" name="phone" datatype="require|phone">
								<view slot="left" class="slot-icon">
									<view class="iconfont icon-login-phone"></view>
								</view>
							</weui-input>
							<weui-input v-model="ruleform.code" placeholder="验证码" type="sms" name="code" myclass="plr0" action="/auth/sendSms"
							 :phone="ruleform.phone" datatype="require">
								<view slot="left" class="slot-icon">
									<view class="iconfont icon-login-passwork"></view>
								</view>
							</weui-input>
								
						</view>
						<div class="login-btn mt20">
							<myform :ruleform="ruleform" :vaildate="vaildate" @callBack="formSubmit" myclass="dx-btn dx-btn-big dx-btn-green bdr4 w-b100 fs-17"
							 title="登录"></myform>
						</div>
						
					</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				showType: 1,
				ruleform: {
					password: ''
				},
				vaildate: {}
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
			//return this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					//this.setTitle(msg.merchantName);
				});
			},
			formSubmit(unionId) {
				
				if (this.ruleform.code != wx.getStorageSync('smsCode')) {
					this.getError("验证码不正确");
					return false;
				}
				this.postAjax("/login-dis.html", this.ruleform).then(msg => {
					if (msg.data.status == 2) {
						this.goto('/pages/distribution/index/main');
					}
				});
			}
		}
	}
</script>
