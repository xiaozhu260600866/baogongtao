<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="pb60" v-if="data.show">
			<view class="show_banner bgf" id="arrowTop">
				<myswiper :lists="data.covers" purl="product"></myswiper>
			</view>
			<view class="pro_infor bg-f plr15" v-if="data.product">
				<view class="pro_name fs-16 fw-bold pt12">{{data.product.name}}</view>
				<view class="cms_price nokill pt10 flex-baseline fs-16 lh-1">
					<view class="saleprice flex-baseline">
						<text class="">￥</text>
						<text class="fs-35 fw-bold">{{data.product.price.split(".")[0]}}</text>
						<text class="fw-bold">.{{data.product.price.split(".")[1]}}</text>
					</view >
					<view class="cprice pl8 fc-7 mb3 fs-13" v-if="data.product.new_price">￥{{data.product.new_price}}</view>
				</view>

				<view class="other-info pt8 pb12 fs-12">
					<view class="info-item fs-12">运费：{{ data.product.yunfei ? data.product.yunfei : '免运费' }}</view>
					<view class="info-item flex fc-9">
						<view class="">已售<text class="Arial fs-12">{{data.product.self_num_}}</text></view>
						<view class=" plr3">|</view>
						<view class="">剩余<text class="Arial fs-12">{{data.product.is_miaosha ? data.product.miaosha_num :data.product.num}}</text></view>
					</view>
				</view>
				<!-- <view class="buy-num-indetail of-hidd plr15 pt10">
					<view class="num_wrap">
						<view class="inline float_l">选购数量：</view>
						<view class="iconfont icon-count-minus span minus_disabled float_l of-hidd" id="minus" @click="minus"></view>
						<view class="float_l">
							<input class="num" name="num" id="buyNum" type="tel" v-model.lazy="num"></input>
						</view>
						<view class="iconfont icon-count-plus span float_l of-hidd" @click="plus"></view>
					</view>
				</view> -->
			</view>
			<view class="buy-num plr15 ptb10 flex-between bg-f mt10">
				<view class="fs-15 lh-30">选购数量</view>
				<tui-numberbox :value="num" @change="change" :max="data.product.fclass == 160 ? 1 : 11000"></tui-numberbox>
			</view>
			<view class="pro_title mt10 bg-f">
				<view class="title-item" @click="evaluate(false)">
					<text :class="['name',!showEvaluate ? 'cur' :'']">商品详情</text>
				</view>
				<view class="title-item" @click="evaluate(true)">
					<text :class="['name',showEvaluate ? 'cur' : '']">评价</text>
				</view>
			</view>
			<view class="pro-content bg-f" v-if="!showEvaluate && data.product">
				<view class="pro-con-main p10">
					<u-parse :content="data.product.content" />
				</view>
			</view>
			<view class="evalute bd-be" v-if="showEvaluate">
				<view class="evalute-item p10 bgf bd-be" v-for="v in data.suggestLists" :key="v.id">
					<view class="u-info">
						<view class="u-info-box">
							<view class="u-img"><img class="img" :src="v.getUser.headimgurl"></view>
							<view class="u-name pl10">
								<p class="name lh20 fs-14">{{ v.getUser.nickname }}</p>
							
							</view>
							<view class="r-time Arial fs-12 font_grey pl10">{{ v.created_at }}</view>
						</view>
					</view>
					<view class="u-con pt10 plr15">
						<p class="p">{{ v.suggestContent1 || '' }}</p>
						<view class="image-group">
							<view class="img-item" v-for="(item,index2) in v.getSuggestLogo" :key="item">
								<image :src="getSiteName + '/upload/images/order/'+item " mode="aspectFill"></image>
							</view>
						</view>
					</view>
					
				</view>
				<view class="data-con" v-if="data.suggestLists.length == 0">
					<p class="fs-12 font_grey p10 text-center">暂无评价</p>
				</view>
			</view>
			<view class="pro_footer"></view>
			<info :productInfo="data.productInfo" @callback="infoCallBack" ref="productInfo"></info>
			
		</view>
		<!-- 下架提示 -->
		<view class="offSale" v-if="data.product.putaway == 0">
			商品已下架啦~
		</view>
		<view id="show_footer">
			<view class="left plr8">
				<button class="btn-item" hover-class="none" @click="goto('/pages/index/index',2)">
					<view class="icon iconfont icon-pro-home"></view>
					<view class="txt">首页</view>
				</button>
				<button class="btn-item" hover-class="none" open-type="share">
					<view class="icon iconfont icon-pro-share"></view>
					<view class="txt">分享</view>
				</button>
			</view>
			<view class="right flex1 w-b100 pr5">
				<!-- <view class="r-nav">
					<myform :ruleform="ruleform" :vaildate="vaildate" @callBack="addCart" myclass="r-item r-item-red" title="加入购物车"></myform>
				</view> -->
				<view class="r-nav">
					<myform :ruleform="ruleform" :vaildate="vaildate" @callBack="toBuy" myclass="r-item r-item-red" title="立即下单"></myform>
				</view>
			</view>
		</view>
		<!-- <view id="footer">
			<view class="left plr8">
				<button class="btn-item share" hover-class="none" @click="goto('/pages/index/index', 2)">
					<p class="iconfont icon-pro-home"></p>
					<p class="txt">商城</p>
				</button>
				<button class="btn-item share" hover-class="none" open-type="share">
					<p class="iconfont icon-pro-share"></p>
					<p class="txt">分享</p>
				</button>
			</view>
			
			
			<view class="flex1 right w-b100 pr5" >
				<view class="r-nav" >
					<view class="r-item r-item-red" v-if="data.product.putaway == 0"><span class="r-opacity">立即购买</span></view>
					<myform title="立即购买" :ruleform="{}"  :vaildate="{}"  @callBack="toBuy" myclass="r-item r-item-red" ></myform>
				</view>
			</view>
		</view> -->
		<view class="share-overlay" @click="shareDiag=!shareDiag" v-if="shareDiag"></view>
		<view class="share-tip" @click="shareDiag=!shareDiag" v-if="shareDiag">
			<img class="img" src="https://niu-shop-app.doxinsoft.com/images/jmb/share-tip.png" mode="widthFix">
		</view>
	</view>
</template>

<script>
	import "@/components/gaoyia-parse/parse.css";
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import leftTime from "./layouts/left_time";
	import info from './layouts/info'
	import tuiNumberbox from "xiaozhu/uniapp/thorui/components/numberbox/numberbox"
	export default {
		components: {uParse,info,leftTime,tuiNumberbox},
		data() {
			return {
				formAction: '/shop/product/show',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				vaildate: {},
				num: 1,
				showEvaluate: false,
				keepAlive: false,
				showType: '',
				intoView: '',
				shareDiag: false,
				rule_type: 0,
				otherData: {
					card_user_id: ''
				},
			}
		},
		onReachBottom() {
			console.log('123');
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			if(this.data.dis) this.data.query.distribution = this.data.dis.id;
			this.data.query.shareImg =this.data.product.firstCover;
			return this.shareSource(this,this.data.product.name);
		},
		onLoad(options) {
			//this.getMyAddress(this);
			this.ajax();
		},
		methods: {
			evaluate(res){
				this.showEvaluate = res;
			},
			minus (){
				this.num = parseInt(this.num);
				this.num = this.num<=1 ? 1:this.num-=1
			},
			plus (){
				this.num = parseInt(this.num);
				let max_num = parseInt(this.data.product.max_num);
				if(this.num >= max_num){
					this.num = max_num;
				}else{
					this.num = this.num+1;
				}
			
			},
			toCart(){
				this.$store.state.mutations.historyUrl=true;
				this.goto('/pages/user/cart/index?historyUrl=del',2)
			},
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
					this.setTitle(msg.product.name)
				});
			},
			addCart() {
				this.$store.state.mutations.cart = true;
				this.$refs.productInfo.showType = 'addCart';
				if (this.data.productInfo.length > 0) {
					this.$refs.productInfo.toggleInfoDiag();
				} else {
					this.$refs.productInfo.addCartAjax({
						id: this.data.product.id,
						num: this.num,
						is_info: 0
					});
				}
			},
			infoCallBack(cartNum) {
				this.data.cartNum = cartNum;
			},
			toBuy() {
				this.$refs.productInfo.showType = '';
				if (this.data.productInfo.length > 0) {
					this.$refs.productInfo.toggleInfoDiag();
				} else {
					this.$refs.productInfo.addCartAjax({
						id: this.data.product.id,
						num: this.num,
						is_info: 0
					});
				}
			},
			addUserCollection() {
				let product_id = this.data.product.id;
				let url = "/shop/product/collection";
				if (this.data.collections) return false;
				this.postAjax(url, {
					id: product_id
				}, msg => {
					if (msg.data.status == 2) {
						this.data.collections = 1;
					}
				});
			},
			change: function(e) {
				this.num = e.value
			},
		},
	}
</script>
<style>
@import url('index.css');
</style>
