<template>
	<view :class="['order_pro', myclass ? myclass : '']">
		<view class="order_info" v-for="(item,key) in data" @click="toProduct(item)">
			<view class="pro_img">
				<image class="img" :src="item.getProduct.firstCover" mode="aspectFill" />
			</view>
			<view class="pro_info">
				<view class="Titem">
					<view class="left">
						<view class="name">{{item.getProduct.name}}</view>
						<view class="specs" v-if="item.is_info">{{getAttribute(item.attribute)}}</view>
					</view>
					<view class="right">
						<view class="price">￥{{toFixed((item.amount) / item.num ) }}</view>
						<view class="num">x {{item.num}}</view>
					</view>
				</view>
				<view class="scount">小计：{{item.amount}}</view>
			</view>
		</view>
	</view>
</template>
<script type="text/javascript">
	export default {
		props: ['data', 'url', 'myclass',],
		data() {
			return {

			}
		},
		methods: {
			getAttribute(value) {
				let res = [];
				value.split(",").forEach((v, key) => {
					if (key != 0) {
						res.push(v)
					}
				})
				return res.join(',');
			},
			toProduct(item) {
				console.log(item);
				return this.goto(this.url + item.getProduct.id, 1)
			}
		}
	}
</script>
<style>
.order_pro {padding: 0 20upx;}
.order_info {display: flex;padding: 20upx 0;border-bottom: 1upx #F5F5F5 dashed;}
.order_info:last-child {border-bottom: 0;}
.order_info .pro_img {padding-right: 20upx;position: relative;}
.order_info .pro_img .zhu-group{position: absolute;top:0;z-index:9}
.order_info .pro_img .img {width: 140upx;height: 140upx;display: flex;border-radius: 6upx;}
.order_info .pro_info {flex: 1;overflow: hidden;display: flex;flex-wrap: wrap;align-content: space-between;}
.order_info .Titem {display: flex;justify-content: space-between;width: 100%;}
.order_info .Titem .left {flex: 1;overflow: hidden;}
.order_info .Titem .right {text-align: right;padding-left: 20upx;font-size: 28upx;line-height: 40upx;}
.order_info .Titem .name {font-size: 30upx;line-height: 40upx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
.order_info .Titem .specs {overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
.order_info .Titem .price {color: #333;}
.order_info .Titem .num {color: #666;}
.order_info .scount {color: #333;text-align: right;width: 100%;}
</style>
