<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="show_banner">
				<dx-swiper :data="detail.covers" :tbPadding="0" :lrPadding="0" :bdR="0"></dx-swiper>
			</view>
			<view class="pro-info bg-f mb8 plr15 ptb12">
				<view class="pro-name fs-18 pb15 lh-1_4">{{detail.product.name}}</view>
				<view class="pro-price lh-1"><text class="Arial fs-24">{{detail.product.integral}}</text><text class="fs-14 fc-9 pl5">积分</text></view>
			</view>
			<view class="pro-title plr15 bd-b bg-f">
				<text class="name fs-17">商品详情</text>
			</view>
			<view class="pro-content p15">
				<uParse :content="detail.product.content" />
			</view>
			<view>
				<dxftButton size="lg" type="info" v-if="detail.integral<detail.product.integral">当前积分为{{detail.integral}}分，不足以兑换此商品哦</dxftButton>
				<dxftButton size="lg" type="primary" @click="toBuy" v-else>立即兑换</dxftButton>
			</view>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import dxftButton from "doxinui/components/button/footer-button"
	import dxSwiper from "doxinui/components/swiper/swiper"
	export default {
		components: {uParse,dxftButton,dxSwiper},
		data() {
			return {
				formAction: '/shop/integral/show',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				detail:{
					covers:[
						{cover: "/static/images/news/01.jpg"},
						{cover: "/static/images/news/02.jpg"},
					],
					integral: 2533,
					product:{
						name:'新鲜红富士苹果水果冰糖心5斤好吃的一整箱陕西平果生鲜萍果 5斤装（净重5斤）',
						integral: 1500,
						content:'<p>新鲜红富士苹果水果冰糖心5斤好吃的一整箱陕西平果生鲜萍果 5斤装（净重5斤）</p>'
					},
					order_no: 20210020003,
				}
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
			toBuy() {
				this.postAjax(this.formAction, {
					id: this.data.product.id,
					num: 1,
					is_info: 0
				}).then(msg=>{
					if (msg.data.status == 2) {
						this.goto("/pages/integral/order/buy?order_no=" + msg.detail.order_no);
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
<style lang="scss">
@import "./index.scss";
@import "@/components/gaoyia-parse/parse.css";
</style>