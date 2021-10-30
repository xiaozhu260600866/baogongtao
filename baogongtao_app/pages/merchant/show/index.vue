<template>
	<view>
		<page ref="page"></page>
		<view class="pb60">
			<view class="banner block-sec">
				<tyt-swiper :data="sliders" indicatorDotsActColor="#fff"></tyt-swiper>
			</view>
			<view class="block-sec detail-show">
				<dx-title name="商家简介" borderColor="#33c45d" nameColor="#333" nameSize="16" nameBold="bold" line Lline></dx-title>
				<view class="con p12 fs-15">
					<view v-if="detail.remark">{{ detail.remark }}</view>
					<image class="img" :src="detail.pic" mode="widthFix" @click="previewImage(detail.pic)"></image>
					<image class="img" :src="v" mode="widthFix" v-for="v in detail.remarkPicArr" @click="previewImage(v)"></image>
				</view>
			</view>
			<view class="block-sec bus-info">
				<dx-list-cell name="地址" iconName="location-fill" iconSize="18" iconColor="#33c45d"
				 @click="location(detail.location_x,detail.location_y,detail.address)">
				　　<view slot="right" class="right-box">{{ detail.address }}</view>
				</dx-list-cell>
			</view>
			<view id="show_footer">
				<view class="left plr8">
					<button class="btn-item" hover-class="none" @click="goto('/pages/index/main',2)">
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
						<view class="r-item r-item-primary" @click="phone(detail.phone)">一键拨号</view>
					</view>
					<view class="r-nav">
						<view class="r-item r-item-red" @click="location(detail.location_x,detail.location_y,detail.address)">一键导航</view>
					</view>
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
				sliders: [
					{coverUrl:'/static/images/news/01.jpg'},
					{coverUrl:'/static/images/news/01.jpg'},
				],
				detail:{
					remark:'经营南北干货，参茸海味,食疗食材',
					pic:'/static/images/news/01.jpg',
					remarkPicArr:['/static/images/news/02.jpg','/static/images/news/03.jpg'],
					address:'江门市蓬江区建设路82号金山大厦之二10楼1001室',
					location_x:'',
					location_y:'',
					phone:'13380951183'
				}
			}
		},
		onLoad() {
			
		},
		methods: {
			previewImage:function(url){
				uni.previewImage({
					urls: [url]
				})
			}
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>