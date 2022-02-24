<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<div v-if="data.show">
			<div class="show_banner bgf" id="arrowTop">
				<myswiper :lists="data.covers" purl="product"></myswiper>
			</div>
			<div class="pro_infor bg-f" v-if="data.product">

				<!-- 秒杀产品进入显示 -->
				<!-- <div class="pro_top p15" v-if="data.product.is_miaosha">
					<div class="cms_price">
						<p class="p saleprice fc-white fw-bold h-30" v-if="data.productInfo.length == 0">
							<span class="span lh-16 fs-20">￥</span>
							<span class="span lh-34 fs-35">{{data.product.miaosha_price.split(".")[0]}}</span>
							<span class="span lh-16 fs-20">.{{data.product.miaosha_price.split(".")[1]}}</span>
						</p>
						<p class="p cprice fc-white fs-12 mt5 fc-e lh-14" v-if="data.product.new_price">￥{{data.product.new_price}}</p>
					</div>
					<div class="end-time text-right" v-if="!data.product.isMiaoshaEnd">
						<p class="fs-13 fc-3 lh-20">距结束</p>
						<leftTime v-model="data.product.miaosha_end_date" type="1"></leftTime>
					</div>
					<div class="end-time text-right" v-if="data.product.isMiaoshaEnd">
						<p class="fs-13 fc-3 lh-20">已结束</p>
					</div>
				</div> -->
				<div class="ass-price plr15 ptb10" v-if="data.product.is_miaosha">
					<p class="price fs-28" v-if="data.productInfo.length == 0">
						<span class="span lh-16 fs-20">￥</span>
						<span class="span lh-34 fs-35">{{data.product.miaosha_price.split(".")[0]}}</span>
						<span class="span lh-16 fs-20">.{{data.product.miaosha_price.split(".")[1]}}</span>
					</p>
					<div class="r-time" v-if="data.product.miaosha_end_date!='2099-12-30' || data.product.miaosha_end_date != '2099-12-30 00:00:00'">
						<div v-if="!data.product.isMiaoshaEnd">
							<p class="fc-white fs-12">距离活动结束还剩</p>
							<leftTime v-model="data.product.miaosha_end_date" type="1"></leftTime>
						</div>
						<div v-else>
							<p class="fc-white fs-18">活动已结束</p>
						</div>
					</div>
				</div>
				<!-- 秒杀产品进入显示:end -->

				<div class="pro_name fs-16 plr15 fw-bold pt12">{{data.product.name}}</div>

				<!-- 平常产品进入显示 -->
				<div class="cms_price nokill mlr15 mt5"  >
					<p class="saleprice">
						<span class="span lh-16 fs-16">￥</span>
						<span class="span lh-34 fs-35 fw-bold">{{data.product.price.split(".")[0]}}</span>
						<span class="span lh-16 fs-16 fw-bold">.{{data.product.price.split(".")[1]}}</span>
					</p >
					<p class="cprice fs-13 pl8 mb5 lh-16 h-16 fc-6" v-if="data.product.new_price">￥{{data.product.new_price}}</p >
				</div>
				<!-- 平常产品进入显示:end -->

				<div class="other-info plr15 pt8 lh-24">
					<div class="info-item fs-12">运费：{{ data.product.yunfei ? data.product.yunfei : '免运费' }}</div>
					<div class="info-item flex">
						<p class="fs-12 fc-9 lh-24">已售<span class="Arial fs-12">{{data.product.self_num_}}</span></p>
						<p class="fs-12 fc-9 lh-24 plr3">|</p>
						<p class="fs-12 fc-9 lh-24">剩余<span class="Arial fs-12">{{data.product.is_miaosha ? data.product.miaosha_num :data.product.num}}</span></p>
					</div>
				</div>
				<div class="pro-type bg-f pb10 plr15">
					<p class="p_type fs-12 lh-24 fc-9" v-if="data.product.unit">规格：<span class="fc-3 fs-12">{{data.product.unit}}</span></p>
					<p class="p_type fs-12 lh-24 fc-9" v-if="data.product.take_date">时间：预计{{data.product.take}}可提货</p>
				</div>
				<div class="buy-num-indetail of-hidd plr15 pt10">
					<div class="num_wrap">
						<div class="inline float_l">选购数量：</div>
						<div class="iconfont icon-count-minus span minus_disabled float_l of-hidd" id="minus" @click="minus"></div>
						<div class="float_l">
							<input class="num" name="num" id="buyNum" type="tel" v-model.lazy="num"></input>
						</div>
						<div class="iconfont icon-count-plus span float_l of-hidd" @click="plus"></div>
					</div>
				</div>
			</div>
			<div class="pro_title mt10 bgf">
				<div class="title-item" @click="evaluate(false)">
					<span :class="['span',!showEvaluate ? 'cur' :'']">商品详情</span>
				</div>
				<div class="title-item" @click="evaluate(true)">
					<span :class="['span',showEvaluate ? 'cur' : '']">评价</span>
				</div>
			</div>
			<div class="pro-content bgf" v-if="!showEvaluate && data.product">
				<div class="pro-con-main p10">
					<u-parse :content="data.product.content" />
				</div>
			</div>
			<div class="evalute bd-be" v-if="showEvaluate">
				<div class="evalute-item p10 bgf bd-be" v-for="v in data.suggestLists" :key="v.id">
					<div class="u-info">
						<div class="u-info-box">
							<div class="u-img"><img class="img" :src="v.getUser.headimgurl"></div>
							<div class="u-name pl10">
								<p class="name lh20 fs-14">{{ v.getUser.nickname }}</p>
							
							</div>
							<div class="r-time Arial fs-12 font_grey pl10">{{ v.created_at }}</div>
						</div>
					</div>
					<div class="u-con pt10 plr15">
						<p class="p">{{ v.suggestContent1 || '' }}</p>
						<div class="image-group">
							<div class="img-item" v-for="(item,index2) in v.getSuggestLogo" :key="item">
								<image :src="getSiteName + '/upload/images/order/'+item " mode="aspectFill"></image>
							</div>
						</div>
					</div>
					
				</div>
				<div class="data-con" v-if="data.suggestLists.length == 0">
					<p class="fs-12 font_grey p10 text-center">暂无评价</p>
				</div>
			</div>
			<div class="pro_footer"></div>
			<info :productInfo="data.productInfo" @callback="infoCallBack" ref="productInfo"></info>
			
		</div>
		<!-- 下架提示 -->
		<view class="offSale" v-if="data.product.putaway == 0">
			商品已下架啦~
		</view>
		<div id="footer">
			<div class="left plr8">
				<button class="btn-item share" hover-class="none" @click="goto('/pages/index/index', 2)">
					<p class="iconfont icon-pro-home"></p>
					<p class="txt">商城</p>
				</button>
				<button class="btn-item share" hover-class="none" open-type="share">
					<p class="iconfont icon-pro-share"></p>
					<p class="txt">分享</p>
				</button>
			</div>
			
			
			<div class="flex1 right w-b100 pr5" >
				<div class="r-nav" >
					<view class="r-item r-item-red" v-if="data.product.putaway == 0"><span class="r-opacity">立即购买</span></view>
					<myform title="立即购买" :ruleform="{}"  :vaildate="{}"  @callBack="toBuy" myclass="r-item r-item-red" ></myform>
				</div>
			</div>
		</div>
		<div class="share-overlay" @click="shareDiag=!shareDiag" v-if="shareDiag"></div>
		<div class="share-tip" @click="shareDiag=!shareDiag" v-if="shareDiag">
			<img class="img" src="https://niu-shop-app.doxinsoft.com/images/jmb/share-tip.png" mode="widthFix">
		</div>
	</view>
</template>

<script>
	import "./index.css";
	import "@/components/gaoyia-parse/parse.css";
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import leftTime from "./layouts/left_time";
	import info from './layouts/info'
	export default {
		data() {
			return {
				formAction: '/shop/product/show',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
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
			}
		},
		components: {
			uParse,
			info,
			leftTime

		}
	}
</script>
<style>

</style>
