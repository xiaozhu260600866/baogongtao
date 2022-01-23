<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="show_banner">
				<myswiper :lists="data.covers" purl="product"></myswiper>
			</view>
			<view class="pro-info bg-f mb8 plr15 ptb12">
				<view class="pro-name fs-18 pb15 lh-1_4">{{data.product.name}}</view>
				<view class="pro-price lh-1"><text class="fs-24 price">{{data.product.integral}}</text><text class="fs-14 fc-9 pl5">积分</text></view>
			</view>
			<view class="pro-title plr15 bd-b bg-f">
				<text class="name fs-17">商品详情</text>
			</view>
			<view class="pro-content p15 mb50">
					<uParse :content="data.product.content" />
			</view>
			<view id="footer-btn" class="w-b100">
				
				<dx-button size="lg" type="info" class="w-b100" block round v-if="data.integral < data.product.integral ">当前积分为{{data.integral}}分，不足以兑换此商品哦</dx-button>
				<dx-button size="lg" type="success"  class="w-b100" block round @click="toBuy" v-else>立即兑换</dx-button>
			</view>


		</view>
	</view>
</template>

<script>
	import "@/components/gaoyia-parse/parse.css";
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		data() {
			return {
				
				formAction: '/integral/show',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				id:''
				
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
			this.id = options.id;
			this.ajax();
		},
		methods: {
			toBuy() {
				this.postAjax(this.formAction, {
					id: this.data.product.id,
					token:uni.getStorageSync('token'),
					num: 1,
					is_info: 0
				}).then(msg=>{
					if (msg.data.status == 2) {
						this.goto("/pages/integral/order/buy/main?order_no=" + msg.data.order_no);
					}
				});
			},
			ajax() {
				this.getAjaxForApp(this,{id:this.id,token:uni.getStorageSync('token')}).then(msg => {
					console.log(this.data);
				});
			}
		},
		components: {
			uParse
		}
	}
</script>
<style scoped="">
@import url('index.css');
</style>