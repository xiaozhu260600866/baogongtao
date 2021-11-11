<template>
	<view>
		<view :class="['pro_info m10 bdr10 p15']" v-for="item in data">
			<view class="order_info" >
				<view class="status"><tui-tag size="small" :type="item.status==2?'green':'danger'">{{ item.statusName }}</tui-tag></view>
				<view class="fs-14 fc-9" v-if="type==2">{{ item.remark?item.remark:'' }}</view>
				<view class="fs-14 fc-9" v-if="type==3">{{ item.remark?item.remark:'' }}</view>
			</view>
			<view class="order_group">
				<view class="llabel">金额：</view>
				<view class="price cbd Arial">{{ item.amount }}</view>
			</view>
		</view>
		
	</view>
</template>
<script>
import tuiTag from "@/components/ThorUI/tag/tag"
export default {
	components:{
		tuiTag
	},
	props: {
		type:{
			type: Number,
			default: 0
		},
		data:{
			type: Array,
			default: []
		}
	},
	data() {
		return {
		}
	},
	methods: {
		
	}
}

</script>
<style>
/* 列表 */
.pro_info{background: #fff;}
.pro_info .order_date{display: flex;justify-content: space-between;align-items: center;padding-bottom: 16upx;border-bottom: 1upx #eee solid;}
.pro_info .order_info{padding: 20upx 0;position: relative;padding-right: 100upx;}
.pro_info .order_info .status{position: absolute;top: 20upx;right: 0;}
.pro_info .del-icon{border-radius: 50%;width: 52upx;height: 52upx;line-height: 52upx;text-align: center;}


.order_group{display: flex;padding: 20upx 0 0 0;border-top: 1upx #eee solid;justify-content: space-between;font-size: 30upx;line-height: 60upx;}
.order_group .llabel{width: 160upx;color: #666;}


.btn-group{padding-top: 30upx;border-top: 1upx #eee solid;}
.btn-item{display: flex;justify-content: flex-end;}
.btn-item .btn-nav{height: 60upx;line-height: 58upx;border: 1upx #ddd solid;border-radius: 30upx;color: #555;font-size: 26upx;text-align: center;margin-left: 20upx;display: block;min-width: 160upx;padding: 0 24upx;}
.btn-item .btn-nav:last-child{background: #FE4543;border: 0;color: #fff;line-height: 60upx;}
.btn-item .obtn{border: 1upx #ddd solid!important;background: #fff!important;color: #555!important;}
.price{font-size: 36upx;font-weight: bold;}
</style>
