<template>
	<view>
		
		<view v-if="parentData.show && parentData.lists && parentData.lists.length == 0 ">
			<view v-if="source == 'order' ">
				<view class="empty">
					<image class="img" src="https://boss.doxinsoft.com/images/order/order02.png" mode="widthFix"/>
					<view class="name ptb10 fs-14 fc-6">没有订单信息</view>
					<view class="btn" @click="toIndex2">{{ message ? message :'去购物' }}</view>
				</view>
			</view>
			<view v-else-if="source == 'nodata' ">
				<view class="empty">
					<image class="img" src="https://boss.doxinsoft.com/images/order/cart02.png" mode="widthFix"/>
					<view class="name ptb10 fs-14 fc-6">{{ message ? message :'暂无数据' }}</view>
				</view>
			</view>
			<view v-else-if="source == 'cart' ">

				<view class="empty">
					<image class="img" src="https://boss.doxinsoft.com/images/order/cart02.png" mode="widthFix"/>
					<view class="name pt10 fs-16 fc-6">您的购物车空空的</view>
					<view class="name pt5 pb10 fs-12 fc-6">赶紧去挑些喜欢的填满它吧</view>
					<view class="btn" @click="toIndex2" >去首页逛逛</view>
				</view>
			</view>
			<view v-else>
				<view class="p20 fs-12 fc-9 text-center">暂无数据</view>
			</view>
		</view>
		<view v-if="parentData.show && parentData.lists.data && parentData.lists.data.length == 0 || parentData.listsIntegral && parentData.listsIntegral.data && parentData.listsIntegral.data.length == 0">
			<view v-if="source == 'order' ">
				<view class="empty">
					<image class="img" src="https://boss.doxinsoft.com/images/order/order02.png" mode="widthFix"/>
					<view class="name ptb10 fs-14 fc-6">没有订单信息</view>
					<view class="btn" @click="toIndex2">{{ message ? message :'去购物' }}</view>
				</view>
			</view>
			<view v-else-if="source == 'cart' ">
				<view class="empty">
					<image class="img" src="https://boss.doxinsoft.com/images/order/cart02.png" />
					<view class="name pt10 fs-16 fc-6">您的购物车空空的</view>
					<view class="name pt5 pb10 fs-12 fc-6">赶紧去挑些喜欢的填满它吧</view>
					<view class="btn" @click="toIndex2">{{ message ? message :'去购物' }}</view>
				</view>
			</view>
			<view v-else-if="source == 'nodata' ">
				<view class="empty">
					<image class="img image" src="https://boss.doxinsoft.com/images/order/cart02.png" mode="widthFix"/>
					<view class="name ptb10 fs-14 fc-6">{{ message ? message :'暂无数据' }}</view>
				</view>
			</view>
			<view v-else-if="source == 'iconNo' ">
				<view class="bgf NO-bg"></view>
				<view class="NO-con">
					<view class="p NO-img pt15">
						<image src="https://card.doxinsoft.com/images/wap/remarkBtn.jpg" mode="widthFix" />
					</view>
					<view class="p NO-intro fs-14 fc-6">{{ message ? message : '暂无数据'}}</view>
				</view>
			</view>
			<view v-else>
				<view class="p20 fs-13 fc-6 text-center">{{ message ? message : '暂无数据'}}</view>
			</view>
		</view>
		<view class="tips1 hasMore" style="text-align:center;" v-if="parentData.lastPage>1 && parentData.thisPage>=1">
			<view v-if="parentData.hasMore">
				<view class="weui-loadmore">
					<text class="weui-loading"></text>
					<text class="weui-loadmore__tips fs-12 fc-9 pb0">正在加载</text>
				</view>
			</view>
			<view v-else>
				<view class="">
					<text class="weui-loadmore__tips fs-12 fc-9">没有更多了...</text>
				</view>
			</view>
		</view>
		<view class="tips1 hasMore" style="text-align:center;" v-if="!parentData.show">
			<view>
				<view class="weui-loadmore">
					<text class="weui-loading"></text>
					<text class="weui-loadmore__tips fs-12 fc-9 pb0">正在加载</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script type="text/javascript">
	export default {
		props: ["parentData", "source", "isLoading", "myclass", 'message', 'noShowLoading','url','urlType'],
		data() {
			return {
				getSiteName: this.getSiteName(),
				name: 'xiaozhu'
			}
		},
		methods:{
			toIndex2() {
				if (this.getSiteName== 'https://boss.doxinsoft.com') {
					let role_type = uni.getStorageSync('role_type');
					if (role_type == 0) {
						return this.goto("/pages/cardLists/index");
					}
					if (role_type == 1) {
						return this.goto("/pages/user/website/products/lists/index", 2);
					}
					if (role_type == 2) {
						return this.goto("/pages/shop/index/index", 2);
					}
					if (role_type == 3) {
						return this.goto("/pages/cardLists/index");
					}
					if (role_type == 4) {
						return this.goto("/pages/index/main",2);
					}
				} else {
					console.log(this.url,this.urlType,123333333)
					if(this.url){
						return this.goto(this.url, this.urlType);
					}else{
						return this.goto("/pages/index/index", 2);
					}
				}
			}
		}
		
	}
</script>
<style type="text/css" scoped>
	/* 订单列表为空时 */

	.empty {
		text-align: center;
		margin-top: 60px;
	}

	.empty .img {
		width: 75px;
		height: 75px;
	}

	.empty .btn {
		border: 1px #FF721F solid;
		background: transparent;
		border-radius: 36px;
		height: 36px;
		line-height: 36px;
		width: 120px;
		margin: 10px auto 0;
		color: #FF721F;
		font-size: 14px;
	}

	.no-order {
		padding-top: 15vh;
		text-align: center;
	}

	.no-order .image {
		width: 98px;
		height: 98px;
	}

	.no-order ._div:first-of-type {
		color: #333;
		font-size: 15.4px;
		line-height: 42px;
	}

	.no-order .go-shopping {
		margin: 0 auto;
		width: 180px;
		line-height: 40px;
		border-radius: 40px;
	}

	.NO-bg {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: -1;
	}

	.NO-con {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: 30%;
	}

	.NO-con .p {
		width: 100%;
		text-align: center;
	}

	.NO-con .NO-img ._img {
		width: 150px;
	}

	/* 购物车为空时 */
	#empty1 {
		text-align: center;
		padding-top: 15vh;
	}

	#empty1 .e_img .image {
		width: 120px !important;
		height: 120px !important;
		margin-bottom: 20px;
	}

	#empty1 .pb {
		font-weight: 500;
		color: black
	}

	#empty1 .pd {
		color: #999;
		margin: 10px 0 20px;
	}

	#empty1 .pa {
		border: 1px #FF721F solid;
		background: #fff;
		border-radius: 40px;
		height: 40px;
		line-height: 40px;
		width: 160px;
		margin: 0 auto;
		color: #FF721F;
		font-size: 14px;
	}

	.weui-loadmore {
		width: 100% !important;
		margin: 0 !important;
		padding: 1.5em 0;
	}
</style>
