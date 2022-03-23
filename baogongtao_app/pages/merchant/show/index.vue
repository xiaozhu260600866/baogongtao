<template>
	<view>
		<page ref="page"></page>
		<view class="pb60" v-if="data.show">
			<view class="banner block-sec">
				<!-- cover -->
				<tyt-swiper :data="sliders" indicatorDotsActColor="#fff"></tyt-swiper>
			</view>
			<view class="block-sec company-info">
				<view class="head">
					<image class="img" :src="detail.logoMinUrl"></image>
				</view>
				<view class="info">
					<view class="name">{{detail.name}}</view>
					<view class="tag">
						<view class="item" v-if="detail.city">{{detail.city}}</view>
						<view class="item Arial">{{detail.scale?detail.scale:'暂无'}}</view>
						<view class="item">{{detail.industry?detail.industry:'暂无'}}</view>
					</view>
				</view>
			</view>
			<view class="block-sec detail-show">
				<dx-title name="企业简介" borderColor="#1e97ff" nameColor="#333" nameSize="16" nameBold="bold" line Lline></dx-title>
				<view class="con p12 fs-15">
					<!-- remark_company -->
					<view v-if="detail.remark_company">{{ detail.remark_company }}</view>
				
					<image :class="['img',cover]" :src="getSiteName + '/upload/images/logo/800_'+cover" v-if="cover" mode="widthFix" v-for="cover in detail.remark_pic_company.split(',')" @click="previewImage(v)"></image>
				</view>
			</view>
			<view class="block-sec bus-info">
				<dx-list-cell name="地址" iconName="location-fill" iconSize="18" iconColor="#1e97ff"
				 @click="location(detail.location_x,detail.location_y,detail.address)">
				　　<view slot="right" class="right-box">{{ detail.address }}</view>
				</dx-list-cell>
				<dx-list-cell name="联系人" iconName="user-fill2" iconSize="18" iconColor="#1e97ff">
				　　<view slot="right" class="right-box">{{ detail.charger_name }}</view>
				</dx-list-cell>
				<dx-list-cell name="联系电话" iconName="tel-fill2" iconSize="18" iconColor="#1e97ff"
				 @click="phone(detail.charger_phone)">
				　　<view slot="right" class="right-box">{{ detail.charger_phone }}</view>
				</dx-list-cell>
			</view>
			<view id="show_footer">
				<view class="left plr8">
					<button class="btn-item" hover-class="none" @click="goto('/pages/index/index',2)">
						<view class="icon dxi-icon dxi-icon-home4"></view>
						<view class="txt">首页</view>
					</button>
					<button class="btn-item share" hover-class="none" @click="$refs.shareStore.shareBtn = true">
						<view class="icon dxi-icon dxi-icon-share"></view>
						<view class="txt">分享</view>
					</button>
				</view>
				<view class="right pr5">
					<view class="r-nav">
						<view class="r-item r-item-primary" @click="phone(detail.charger_phone)">一键拨号</view>
					</view>
					<!-- <view class="r-nav">
						<view class="r-item r-item-red" @click="location(detail.location_x,detail.location_y,detail.address)">一键导航</view>
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import tytSwiper from '@/components/tytrock/components/swiper'
import dxTitle from "doxinui/components/title/title"
import dxListCell from "doxinui/components/list-cell/list-cell"
	export default {
		components:{tytSwiper,dxTitle,dxListCell},
		data() {
			return {
				formAction: '/api/company/detail',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				sliders: [],
				detail:{}
			}
		},
		onLoad() {
			this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					this.detail = msg.data.data;
					if(this.detail.cover){
						this.detail.cover.split(",").forEach(v=>{
							this.sliders.push({coverUrl:this.getSiteName + '/upload/images/logo/800_'+v});
						})
					}
				});
			},
			previewImage:function(url){
				uni.previewImage({
					urls: [url]
				})
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
			return this.shareSource(this, '包工淘');
		},
	}
</script>
<style lang="scss">
@import "index.scss";
</style>