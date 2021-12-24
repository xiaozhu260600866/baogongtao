<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="pro-list">
			<view class="info-header bg-f fs-13 fc-3">
				<view class="ih-item ptb8" @click="goto('/pages/user/integral/index/index',1)">
					<view class="num lh-24 mb3 fc-red fs-20 Arial">{{lists.integral}}</view>
					<view class="name">我的积分</view>
				</view>
				<view class="ih-item ptb8" @click="goto('/pages/user/integral/list/main',1)">
					<view class="num lh-24 mb3 fc-red iconfont icon-integral-order fs-20"></view>
					<view class="name">兑换记录</view>
				</view>
			</view>
			<!-- <view class="porducts">
				<view class="pro-view" v-for="item in lists.lists" @click="goto('/pages/integral/show/main?id='+item.id)">
					<view class="cms_cover">
						<image class="img" :src="item.firstCover" mode="aspectFill"/>
					</view>
					<view class="cms_title Aname fs-15 nowrap">{{item.name}}</view>
					<view class="cms_price"><text class="Arial fc-red fs-16 pr3">{{item.integral}}</text> 积分</view>
				</view>
			</view> -->
			<view class="pro-col">
				<view class="pro-col-item">
					<view class="pro-col-box" v-for="(item,index) in lists.lists" :key="index" v-if="(index+1)%2!=0"
					 @click="goto('/pages/integral/show/main?id='+item.id)">
						<image :src="item.firstCover" class="img" mode="widthFix" />
						<view class="content">
							<view class="tit lh-20">{{item.name}}</view>
							<view class="priceG lh-22">
								<text class="price">{{item.integral}}</text>
								<text class="unit">积分</text>
							</view>
						</view>
					</view>
				</view>
				<view class="pro-col-item">
					<view class="pro-col-box" v-for="(item,index) in lists.lists" :key="index" v-if="(index+1)%2==0"
					 @click="goto('/pages/integral/show/main?id='+item.id)">
						<image :src="item.firstCover" class="img" mode="widthFix" />
						<view class="content">
							<view class="tit lh-20">{{item.name}}</view>
							<view class="priceG lh-22">
								<text class="price">{{item.integral}}</text>
								<text class="unit">积分</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<hasMore :parentData="data"></hasMore>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/shop/integral/lists?type=0',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				lists:{
					integral: 2595,
					lists:[{
						firstCover:'/static/images/user-bg.jpg',
						name:'汽车机器人',
						integral: 1500,
						id:18
					},{
						firstCover:'https://www.baogongtao.com/images/wap/banner01.jpg',
						name:'越南大青芒玉芒金煌芒精选大果青皮芒果香进口新鲜水果净重9斤',
						integral: 1500,
						id:18
					},{
						firstCover:'https://www.baogongtao.com/images/wap/banner01.jpg',
						name:'新鲜红富士苹果水果冰糖心5斤好吃的一整箱陕西平果生鲜萍果 5斤装（净重5斤）',
						integral: 1500,
						id:18
					},{
						firstCover:'/static/images/user-bg.jpg',
						name:'国产水蜜桃 新鲜桃子 精选优级果1.5kg装 单果150g以上 生鲜 新鲜水果',
						integral: 1500,
						id:18
					}]
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
			return this.shareSource(this, '商城');
		},
		onLoad(options) {
			//this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
<style>
@import "./index.css";
</style>