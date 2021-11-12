<template>
	<view class="cash-list" :class="[myclass,type==3?'plr15':'p10']">
		<!-- 用户取领的状态 --> 
		<view class="list_item" :class="[v.status > 0?'used':'']" v-for="v in data" v-if="type == 1">
			<view class="list_box" @click="linkTo('/pages/user/coupon/show/index?id='+v.id,1)">
				<view class="item_img">
					<image class="img" :src="v.getCover" mode="aspectFill"></image>
				</view>
				<view class="item_right">
					<view class="w-b100 coupon-title fs-16 lh-20 wrap2">{{ v.name }}</view>
					<view class="w-b100 ir-bottom fc-6 fs-13 lh-20 mt5">
						<view class="tips">{{v.remark}}</view>
						<view class="tips wrap2" v-if="v.merchant_names">使用商家：{{v.merchant_names}}</view>
						<view class="time Arial">{{ v.start_date }}~{{ v.end_date }}</view>
					</view>
				</view>
				<view class="status">
					<view class="nav yes">去使用</view>
				</view>
			</view>
			<view class="status-icon">
				<image class="img" src="/static/images/used-state.png" v-if="v.status == 1"></image>
				<image class="img" src="/static/images/date-state.png" v-if="v.status == 2"></image>
			</view>
		</view>
		<!-- 商家看到用户取领的状态 --> 
		<view class="list_item" :class="[v.status > 0?'used':'']" v-for="v in data" v-if="type == 2">
			<view class="list_box">
				<view class="item_img">
					<image class="img" :src="v.getCover" mode="aspectFill"></image>
				</view>
				<view class="item_right">
					<view class="w-b100 coupon-title fs-16 lh-20 wrap2 fc-0">{{ v.name }}</view>
					<view class="w-b100 ir-bottom fc-6 fs-13 lh-20 mt5">
						<view class="tips">{{v.get_coupon.abstract}}</view>
						<view class="tips wrap2" v-if="v.get_user.username">领取用户：{{v.get_user.username}}</view>
						<view class="time">领取时间：<text class="Arial">{{ v.created_at }}</text></view>
						<view class="time" v-if="v.created_at != v.updated_at">核销时间：<text class="Arial">{{ v.updated_at }}</text></view>
					</view>
				</view>
				<view class="status-icon">
					<image class="img" src="/static/images/used-state.png" v-if="v.status ==1"></image>
				</view>
			</view>
			
		</view>
		<!-- 商家发布优惠券 --> 
		<view class="list_item list_item3" v-for="v in data" v-if="type == 3">
			<view class="list_box" @click="linkTo('/pages/merchant/coupon/show/index?id='+v.id,1)">
				<view class="item_img">
					<image class="img" :src="v.getCover" mode="aspectFill"></image>
				</view>
				<view class="item_right">
					<view class="w-b100 coupon-title fs-16 lh-20 wrap2">{{ v.name }}</view>
					<view class="w-b100 ir-bottom fc-6 fs-13 lh-20 mt5">
					<!-- 	<view class="tips">{{v.getCoupon.abstract}}</view> -->
						<view class="Arial">{{v.created_at}}</view>
						<view v-if="v.location">距离<text class="Arial">{{v.location}}</text>千米</view>
					</view>
				</view>
			</view>
			<view class="navG flex-right pt12" v-if="edit">
				<dx-button size="small" round myclass="plr25 mr10" @click="del(v)">删除</dx-button>
				<dx-button type="primary" round size="small" myclass="plr25" @click="linkTo('/pages/merchant/coupon/created_edit/edit?id='+v.id,1)">编辑</dx-button>
			</view>
			<view class="status circle" v-if="v.isEx == 0">
				<!-- <view class="nav fill">免费领取</view> -->
				<image class="icon" src="/static/images/get-icon.jpg" mode="widthFix"></image>
			</view>
			<view class="status-icon" v-if="v.isEx == 1">
				<image class="img" src="/static/images/yes-state.png"></image>
			</view>
		</view>
	</view>
</template>
<script>
import dxButton from "doxinui/components/button/button"
export default {
	components: {dxButton},
	props: ['data','type','myclass','edit'],
	data() {
		return {
		}
	},
	methods: {
		del(v){
			this.getConfirm("是否删除？",msg=>{
				
				this.postAjax("/api/company/coupon-del",{id:v.id,token:uni.getStorageSync('token')}).then(msg=>{
					 this.getParent(this).ajax();
				});
			})
		},
	}
}

</script>
<style lang="scss">
.cash-list .list_item{position: relative;border-radius: 12rpx;overflow: hidden;background-color: #fff;margin-bottom: 24rpx;color: #333;}
.cash-list .list_box{display: flex;}
.cash-list .list_item:last-child{margin-bottom: 0;}
.cash-list .item_left{width: 180rpx;padding: 20rpx 0;display: flex;align-items: center;justify-content: center;flex-wrap: wrap;text-align: center;background-color: #33c45d;position: relative;background-image: linear-gradient(to bottom right, #57C734 , #33c45d);}
.cash-list .item_img .img{width: 200rpx;height: 100%;display: flex;}
.cash-list .item_left::before{content: '';display: block;border-left: dotted #fff 14rpx;position: absolute;top: -8rpx;bottom: -8rpx;left: -8rpx;}
.cash-list .item_right{display: flex;flex-wrap: wrap;align-content: space-between;position: relative;z-index: 2;padding: 20rpx 10rpx 20rpx 20rpx;flex: 1;z-index: 2;min-height: 160rpx;}
.cash-list .ir-bottom{align-items: center;line-height: 1.6;}
.cash-list .ir-bottom .time{font-family: Calibri;}
.cash-list .status{position: relative;display: flex;align-items: center;z-index: 2;}
.cash-list .status .icon{width: 200rpx;}
.cash-list .status .nav{font-size: 24rpx;color: #33C45D;border: 1rpx #33C45D solid;border-radius: 64rpx;width: 128rpx;height: 56rpx;line-height: 54rpx;text-align: center;margin-right: 20rpx;}
.cash-list .status .nav.no{color: #999;border-color: #ddd;background-color: #f5f5f5;}
.cash-list .status .nav.fill{color: #fff;background-color: #33C45D;}
.cash-list .status-icon{position: absolute;top: 0;right: 0;z-index: 1;}
.cash-list .status-icon .img{width: 180rpx;height: 180rpx;}


.list_item3{margin-bottom: 0!important;padding: 30rpx 0;border-bottom: 1rpx #f5f5f5 solid;border-radius: 0;}
.list_item3 .item_img .img{border-radius: 8rpx;}
.list_item3 .item_right{padding: 0 0 0 24rpx;}
.list_item3 .status .nav{margin-right: 0!important;height: 140rpx;line-height: 62rpx;width: 140rpx;font-size: 36rpx;display: flex;justify-content: center;align-items: center;line-height: 1.2;padding: 0 20rpx;border-radius: 50%;letter-spacing: 2rpx;}
.list_item3 .status .nav.fill{background-color: #D6251F;border-color: #D6251F;}
</style>