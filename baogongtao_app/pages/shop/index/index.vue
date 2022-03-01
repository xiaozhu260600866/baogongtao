<template>
	<view>
		<page :parentData="data" :formAction="formAction" Fbottom="bottom:50px">
			<view slot="floatBtn">
				<floatBtn type="2" icon="icon-float-feedback-o" iSize="fs-25" openType="contact" title="咨询"></floatBtn>
				<view @click="phone(data.siteConfig.phone)" v-if="data.show">
					<floatBtn icon="icon-float-tel-o" iSize="fs-22" title="电话"></floatBtn>
				</view>
			</view>
		</page>
		<view class="content" v-if="data.show">
			<view id="banner" v-if="data.silders.data.length">
				<myswiper :lists="data.silders.data"></myswiper>
			</view>
			<view v-if="data.location.length">
				<swiper class="swiper bg-f mb8" :indicator-dots="data.location.length > 1 ? true :false" :vertical="false"
				 :autoplay="false" :duration="false" :circular="false" :style="data.location[0].length<=5 ? 'height: 180rpx;':'height: 350rpx;'">
					<swiper-item v-for="(item,index) in data.location" :key="index" :style="data.location[0].length<=5?'height:180rpx;':'height:350rpx;'">
						<view class="Nav_btn pb10">
							<view class="item" v-for="(v,index2) in item" :key="index2">
								<myform :ruleform="ruleform" :append="true" :vaildate="vaildate" :data="v" @callBack="goto(v.url,v.redirect_type)">
									<view slot="content">
										<view class="Nav_img">
											<image :src="v.cover" class="img" />
										</view>
										<view class="txt">{{ v.name }}</view>
									</view>
								</myform>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="pro-list mt8" v-if="data.lists.data.length">
				<view class="ass-title p15 pr0 bg-f" @click="goto('/pages/course/search/index',2)">
					<view class="name fs-16">推荐精选产品</view>
					<view class="icon iconfont icon-right fc-9 fs-13 pr15"></view>
				</view>
				<view class="porducts">
					<view class="pro-div" v-for="item in data.lists.data" :key="item.id">
						<myform :ruleform="{}" :append="true" :vaildate="{}" :data="item"
						 @callBack="goto(item.is_group ? '/pages/shop/product/show/index?id='+item.id :'/pages/shop/product/show/index?id='+item.id,1)">
							<view slot="content">
								<view class="pro-box bg-f lh-1_5">
									<view class="cms_cover">
										<image class="image" :src="item.firstCover" mode="aspectFill" />
									</view>
									<view class="cms_title Aname fs-14 nowrap">{{ item.name }}</view>
									<view class="cms_price ptb5">
										<view class="flex1 pr10 nowrap fs-12 price">
											<text>￥</text>
											<text class="fs-20">{{item.price.split(".")[0]}}</text>
											<text>.{{item.price.split(".")[1]}}</text>
											<text class="cprice ml5 fc-9" v-if="item.new_price">{{item.new_price}}</text>
										</view>
										<view class="fs-11 fc-9 pl5 pt3" v-if="item.self_num_ > 0">已售<text class="Arial">{{ item.self_num_ }}</text>件</view>
									</view>
								</view>
							</view>
						</myform>
					</view>
				</view>
				<!--  -->
			</view>
		</view>
	</view>
</template>

<script>
	

	
	import tuiCountdown from "xiaozhu/uniapp/thorui/components/countdown/countdown"
	export default {
		data() {
			return {
				formAction: '/shop/wapindex',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
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
			if (this.data.dis) this.data.query.distribution = this.data.dis.id;
			//this.data.query.shareImg = "/static/image/share.jpg";

			return this.shareSource(this, this.data.siteConfig.web_name);
		},
		onShow() {
			console.log(1);
			this.school = uni.getStorageSync("school");
		},
		onLoad(options) {
			this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		},
		components: {
			tuiCountdown
		}
	}
</script>
<style>
@import url("./index.css");
@import url("@/public/css/shop/app.css");
</style>