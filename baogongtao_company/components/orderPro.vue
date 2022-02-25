<template>
	<view class="order_pro" :class="[myclass]">
		<view class="order_row" v-for="(item,key) in data">
			<view class="opro_img">
				<image class="img" :src="item.getProduct.firstCover" mode="aspectFill" />
			</view>
			<view class="opro_info">
				<view class="Titem">
					<view class="left">
						<view class="name nowrap">{{item.getProduct.name}}</view>
						<view class="specs mt5" v-if="item.is_info">{{item.attribute}}</view>
					</view>
					<view class="right">
						<view class="price">￥{{toFixed(item.amount / item.num ) }}</view>
						<view class="num">x {{item.num}}<text class="fs-12 unit pl3">/ {{item.getProduct.unit}}</text></view>
					</view>
				</view>
				<view class="scount">小计：{{item.amount}}</view>
			</view>
		</view>
	</view>
</template>
<script type="text/javascript">
export default {
	props: ['data','url','myclass',"toOrder"],
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
		toProduct(item){
			console.log(item);
			return this.goto(this.url+item.getProduct.id,1)
		}
	}
}

</script>
<style>
.order_pro{padding: 0 20rpx;}
.order_row{display: flex;padding: 20rpx 0;border-bottom: 1rpx #F5F5F5 dashed;}
.order_row:last-child{border-bottom: 0;}
.order_row .opro_img{padding-right: 20rpx;}
.order_row .opro_img .img{width: 160rpx;height: 160rpx;display: flex;border-radius: 6rpx;}
.order_row .opro_info{flex: 1;overflow: hidden;display: flex;flex-wrap: wrap;align-content: space-between;}
.order_row .Titem{display: flex;justify-content: space-between;width: 100%;line-height: 40rpx;font-size: 30rpx;color: #333;}
.order_row .Titem .left{flex: 1;overflow: hidden;}
.order_row .Titem .right{text-align: right;padding-left: 20rpx;}
.order_row .Titem .name{font-size: 32rpx;}
.order_row .Titem .specs{overflow: hidden;white-space: nowrap;text-overflow: ellipsis;color: #666;}
.order_row .Titem .num{color: #666;}
.order_row .scount{text-align: right;width: 100%;}
</style>