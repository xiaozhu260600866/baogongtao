<template>
	<view>
		<page ref="page"></page>
		<view class="pb60">
			<view class="showBox top-box">
				<view class="cover">
					<image class="img" :src="detail.cover" mode="aspectFill"></image>
				</view>
				<view class="cash-info">
					<view class="w-b100">
						<view class="coupon-title fs-16 lh-20 mb5 fc-0">{{detail.name}}</view>
						<view class="coupon-merchant fs-15 lh-20 mb5 fc-6">{{detail.merchant_names}}</view>
					</view>
					<view class="flex-baseline w-b100">
						<view class="price fs-18"><text class="fs-14">￥</text>{{detail.amount}}</view>
						<view class="coupon-full fs-12 fc-9 ml10" v-if="detail.full_amount">满<text class="Arial plr3">{{detail.full_amount}}</text>元可使用</view>
					</view>
				</view>
			</view>
				
			<view class="con-box showBox">
				<view class="explain">
					<dx-title name="现金券介绍" borderColor="#33c45d" borderWidth="30" borderR="4" nameColor="#333" nameSize="16" nameBold="bold" Bline></dx-title>
					<view class="content"><u-parse :content="detail.content" /></view>
				</view>
			</view>
			<dxftButton type="success" size="lg" round>免费领取</dxftButton>
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
				detail:{
					name:'丝域养发凤山水岸100元现金券',
					cover:'/static/images/news/01.jpg',
					amount: 0.00,
					full_amount: 1000,
					merchant_names:'456在线',
					content:'寳之林古典红木珍藏馆（零售古玩）\n地址：新会区会城世纪商业街3号139\n电话：18026768862\n1.凭此券即可享受总价的8.8折优惠。\n2.到店使用。\n3.需要提前电话咨询预约。\n4.此活动券为500张，领完即止。\n5.请在9月30日前使用。'
				},
				merchant:[
					{
						headerPic:'/static/images/news/01.jpg',
						userInfo:{
							company_name:'大号干货店',
							remark:'经营南北干货，参茸海味,食疗食材',
							address:'天龙一街(江门市蓬江区)美食',
							getIndustry:['零食商超','干货'],
						}
					}
				]
			}
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>