<template>
	<section>
		<div>
			<div v-if="data.show && data.lists && data.lists.length == 0 ">
				<div v-if="source == 'order' ">
					<div class="empty">
						<image class="img" src="https://boss.doxinsoft.com/images/order/order02.png" />
						<p class="name ptb10 fs-14 fc-6">没有订单信息</p>
						<a class="btn" hover-class="none" href="/pages/index/main">去购物</a>
					</div>
				</div>
				<div v-else-if="source == 'nodata' ">
					<div class="empty">
						<image class="img" src="https://boss.doxinsoft.com/images/order/cart02.png" />
						<p class="name ptb10 fs-14 fc-6">{{ message ? message :'暂无数据' }}</p>
					</div>
				</div>
				<div v-else-if="source == 'cart' ">
					<!-- <div id="empty1">
						<div class="e_img">
							<image src="https://boss.doxinsoft.com/images/order/cart02.png"></image>
						</div>
						<div class="pb fs-18">您的购物车空空的</div>
						<div class="pd fs-12">赶紧去挑些喜欢的填满它吧</div>
						<div class="pa">
							<a hover-class="none" href="/pages/index/main" open-type="redirect">去首页逛逛</a>
						</div>
					</div> -->
					<div class="empty">
						<image class="img" src="https://boss.doxinsoft.com/images/order/cart02.png" />
						<p class="name pt10 fs-16 fc-6">您的购物车空空的</p>
						<p class="name pt5 pb10 fs-12 fc-6">赶紧去挑些喜欢的填满它吧</p>
						<a class="btn" hover-class="none" href="/pages/index/main" open-type="redirect">去首页逛逛</a>
					</div>
				</div>
				<div v-else>
					<p class="p20 fs-12 fc-9 text-center">暂无数据</p>
				</div>
			</div>
			<div v-if="data.show && data.lists.data && data.lists.data.length == 0 || data.listsIntegral && data.listsIntegral.data && data.listsIntegral.data.length == 0">
				<div v-if="source == 'order' ">
					<div class="empty">
						<image class="img" src="https://boss.doxinsoft.com/images/order/order02.png" />
						<p class="name ptb10 fs-14 fc-6">没有订单信息</p>
						<a class="btn" hover-class="none" href="/pages/index/main">去购物</a>
					</div>
				</div>
				<div v-else-if="source == 'cart' ">
					<div class="empty">
						<image class="img" src="https://boss.doxinsoft.com/images/order/cart02.png" />
						<p class="name pt10 fs-16 fc-6">您的购物车空空的</p>
						<p class="name pt5 pb10 fs-12 fc-6">赶紧去挑些喜欢的填满它吧</p>
						<a class="btn" hover-class="none" href="/pages/index/main" open-type="redirect">去首页逛逛</a>
					</div>
				</div>
				<div v-else-if="source == 'nodata' ">
					<div class="empty">
						<image class="img" src="https://boss.doxinsoft.com/images/order/cart02.png" />
						<p class="name ptb10 fs-14 fc-6">{{ message ? message :'暂无数据' }}</p>
					</div>
				</div>
				<div v-else-if="source == 'iconNo' ">
					<div class="bgf NO-bg"></div>
					<div class="NO-con">
						<div class="p NO-img pt15">
							<img src="https://card.doxinsoft.com/images/wap/remarkBtn.jpg" mode="widthFix">
						</div>
						<p class="p NO-intro fs-14 fc-6">{{ message ? message : '暂无数据'}}</p>
					</div>
				</div>
				<div v-else>
					<p class="p20 fs-13 fc-6 text-center">{{ message ? message : '暂无数据'}}</p>
				</div>
			</div>
			<div class="tips1 hasMore" style="text-align:center;" v-if="data.lastPage>1 && data.thisPage>=1">
				<div v-if="data.hasMore">
					<div class="weui-loadmore">
						<text class="weui-loading"></text>
						<text class="weui-loadmore__tips fs-12 fc-9">正在加载</text>
					</div>
				</div>
				<div v-else>
					<div class="">
						<text class="weui-loadmore__tips fs-12 fc-9">没有更多了...</text>
					</div>
				</div>
			</div>
			<div class="tips1 hasMore" style="text-align:center;" v-if="!data.show">
				<div>
					<div class="weui-loadmore">
						<text class="weui-loading"></text>
						<text class="weui-loadmore__tips fs-12 fc-9">正在加载</text>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script type="text/javascript">
export default {
	props: ["data", "source", "isLoading", "myclass", 'message', 'noShowLoading'],
	data() {
		return {
			getSiteName: this.getSiteName(),
			data: this.formatData(),
			name: 'xiaozhu'
		}
	},
	onReachBottom() {
		if (this.data.canLoadMore && this.data.hasMore) {
			this.data.nextPage = this.data.nextPage + 1;
			console.log(this.$parent);
			if(this.$parent.$refs.page){
				this.$parent.$refs.page.ajax();
			}else{
				this.$parent.ajax();
			}
			
		}
	},
	onUnload() {
		this.data.show = false;
	},
	computed: {
		loading() {
			if (!this.isLoading) return "";
			if (!this.data.show) {
				return "loading";
			} else {
				return "";
			}
		},

	},
}

</script>
<style type="text/css">
/* 订单列表为空时 */

.empty{text-align: center;margin-top: 60px;}
.empty .img{width: 75px;height: 75px;}
.empty .btn{border: 1px #FF721F solid;background: transparent;border-radius: 36px;height: 36px;line-height: 36px;width: 120px;margin: 10px auto 0;color: #FF721F;font-size: 14px;}

.no-order {
	padding-top: 15vh;
	text-align: center;
}

.no-order image {
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

.NO-bg{position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: -1;}
.NO-con{display: flex;justify-content: center;flex-wrap: wrap;margin-top: 30%;}
.NO-con .p{width: 100%;text-align: center;}
.NO-con .NO-img ._img{width: 150px;}

/* 购物车为空时 */
#empty1 {
	text-align: center;
	padding-top: 15vh;
}

#empty1 .e_img image {
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
.weui-loadmore{width: 100%!important;margin: 0!important;padding: 1.5em 0;}

</style>
