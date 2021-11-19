<template>
	<view>
		<page ref="page"></page>
		<view class="pb60" v-if="data.show">
			<view class="showBox top-box">
				<view class="cover">
					<image class="img" :src="detail.getCover" mode="aspectFill"></image>
				</view>
				<view class="cash-info">
					<view class="w-b100">
						<view class="coupon-title fs-16 lh-20 mb5 fc-0">{{detail.name}}</view>
						<view class="coupon-merchant fs-15 lh-20 mb5 fc-6">{{detail.get_company.name}}</view>
					</view>
					<view class="flex-baseline w-b100">
						<view class="price fs-18"><text class="fs-14">￥</text>{{detail.price}}</view>
						<view class="coupon-full fs-12 fc-9 ml10" v-if="detail.price_full">满<text class="Arial plr3">{{detail.price_full}}</text>元可使用</view>
					</view>
				</view>
			</view>
				
			<view class="con-box showBox">
				<view class="explain">
					<dx-title name="现金券介绍" borderColor="#1e97ff" borderWidth="30" borderR="4" nameColor="#333" nameSize="16" nameBold="bold" Bline></dx-title>
					<view class="content"><u-parse :content="detail.remark" /></view>
				</view>
			</view>
			<dxftButton type="primary" size="lg" round @click="freeWithdraw">免费领取</dxftButton>
			<!-- <dxftButton type="info" size="lg" round>已领取</dxftButton> -->
		</view>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	import dxTitle from "doxinui/components/title/title"
	export default {
		components: {dxTitle,dxftButton},
		data() {
			return {
				formAction: '/api/company/coupon-store',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				detail:{}
			}
		},
		onLoad() {
			this.ajax();
		},
		methods: {
			freeWithdraw(){
				let sysUser = uni.getStorageSync('sysUser');
				if(!sysUser)return this.goto("/pages/user/login/index/index");
				this.getConfirm("是否领取",msg=>{
					this.ruleform.token = uni.getStorageSync('token');
					this.ruleform.coupon_id = this.data.query.id;
					this.postAjax("/api/company/coupon-order",this.ruleform).then(msg=>{
						if(msg.data.status == 2){
							this.ajax();
						}
					});
				})
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.detail = msg.data.data;
				});
			}
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>