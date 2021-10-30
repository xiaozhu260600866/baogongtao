<template>
	<view>
		<page ref="page"></page>
		<view class="pb60">
			<view class="showBox">
				<view class="top-box">
					<view class="cash-info">
						<!-- <view class="price fc-white"><text class="fs-14">￥</text>{{detail.amount}}</view> -->
						<view class="cover">
							<image class="img" :src="detail.getCoupon.logo_url" mode="aspectFill"></image>
						</view>
						<view class="info">
							<view class="coupon-title w-b100 fs-16 lh-1_5 wrap2">{{detail.name}}</view>
							<view class="time w-b100 fs-12 lh-1 Arial">{{detail.start_at}}-{{detail.end_at}}</view>
						</view>
					</view>
				</view>
				<view class="con-box">
					<view class="qrcode">
						<image :src="getSiteName + '/upload/images/qrcode/'+detail.code+'.svg'" class="img"></image>
						<view class="txt">出示二维码给商家扫码</view>
						<view class="txt">电子券码：<text class="Arial">{{detail.code}}</text></view>
					</view>
					<view class="explain">
						<dx-title name="现金券介绍" borderColor="#33c45d" borderWidth="30" borderR="4" nameColor="#333"
							nameSize="16" nameBold="bold" Bline></dx-title>
						<view class="content">{{detail.getCoupon.deal_detail}}</view>
					</view>
				</view>
				<view class="con-box bg-f" v-if="merchant.length">
					<view class="explain">
						<dx-title name="附近使用店" borderColor="#33c45d" borderWidth="30" borderR="4" nameColor="#333"
							nameSize="16" nameBold="bold" Bline></dx-title>
						<merchantLists :data="merchant"></merchantLists>
						
					</view>
				</view>
			</view>
			<dxftButton type="success" size="lg" round @click="goto('/pages/merchant/show/index',1)">商家主页</dxftButton>
		</view>
	</view>
</template>

<script>
	import dxTitle from "doxinui/components/title/title"
	import dxftButton from "doxinui/components/button/footer-button"
	import merchantLists from '@/components/merchantLists';
	export default {
		components: {
			dxTitle,
			dxftButton,
			merchantLists
		},
		data() {
			return {
				detail:{
					name:'丝域养发凤山水岸100元现金券',
					code:'202110230000330',
					getCoupon:{
						logo_url:'/static/images/news/01.jpg',
						abstract: '',
						deal_detail:''
					},
					merchant_names:'456在线',
					start_at:'2021-10-01',
					end_at:'2021-10-31',
					
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