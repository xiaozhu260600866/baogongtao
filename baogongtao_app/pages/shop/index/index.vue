<template>
	<view>
		<page :parentData="data" :formAction="formAction" Fbottom="bottom:50px">
			<div slot="floatBtn">
				<floatBtn type="2" icon="icon-float-feedback-o" iSize="fs-25" openType="contact" title="咨询"></floatBtn>
				<div @click="phone(data.siteConfig.phone)" v-if="data.show">
					<floatBtn icon="icon-float-tel-o" iSize="fs-22" title="电话"></floatBtn>
				</div>
			</div>
		</page>
		<view class="content" v-if="data.show">
			<view id="banner" class="mt50" v-if="data.silders.data.length">
				<myswiper :lists="data.silders.data"></myswiper>
			</view>
			<view v-if="data.location.length">
				<swiper class="swiper bg-f" :indicator-dots="data.location.length > 1 ? true :false" :vertical="false" :autoplay="false"
				 :duration="false" :circular="false" :style="data.location[0].length<=4 ? 'height: 190rpx;' : 'height: 380rpx;'">
					<swiper-item v-for="(item,index) in data.location" :key="index">
						<view class="fun_button pb10">
							<view class="fun_button_con">
								<navigator hover-class="none" class="a ptb8" v-for="(v,index2) in item" :key="index2" @click="goto(v.url,1)">
									<view :class="['button-img']">
										<img :src=" v.cover " :class="['img']">
									</view>
									<view :class="['button-txt','pt5', 'fs-13','fc-3']"><text>{{v.name}}</text></view>
								</navigator>
								<view class="clear"></view>
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
				<div class="porducts">
					<div class="pro-div pb5" v-for="item in data.lists.data" :key="item.id">
						<myform :ruleform="{}" :append="true" :vaildate="{}" :data="item"
						 @callBack="goto(item.is_group ? '/pages/shop/product/show/index?id='+item.id :'/pages/shop/product/show/index?id='+item.id,1)">
							<div slot="content">
								<div class="pro-box bg-f">
									<div class="cms_cover">
										<image :src="item.firstCover" mode="aspectFill" />
									</div>
									<p class="cms_title Aname lh-20 fs-14 nowrap">{{ item.name }}</p>
									<div class="cms_price ptb5 lh-20">
										<view class="flex1 pr10 nowrap fc-9">
											<span class="fs-12 price">￥</span>
											<span class="fs-20 price">{{item.price.split(".")[0]}}</span>
											<span class="fs-12 price">.{{item.price.split(".")[1]}}</span>
											<span class="cprice fs-12 ml5" v-if="item.new_price">{{item.new_price}}</span>
										</view>
										<p class="fs-11 fc-9 pl5 lh-20 pt3" v-if="item.self_num_ > 0">已售<span class="Arial">{{ item.self_num_ }}</span>件</p>
									</div>
								</div>
							</div>
						</myform>
					</div>
				</div>
				<!--  -->
			</view>
		</view>
	</view>
</template>

<script>
	import "./index.css";

	import "@/public/css/shop/app.css"
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
