<template>
	<view>
		<view class="task_info task_sec ptb10">
			<view class="status" v-if="status"><tui-tag plain>{{ data.statusName }}</tui-tag></view>
			<view class="task_name">{{ data.name }}</view>
			<view class="task_price fc-red">{{ data.budget_single }} 元</view>
			<view class="task_detail" v-if="!base">
				{{ data.content }}
			</view>
		</view>
		<view class="task_info task_sec" v-if="!base">
			<view class="weui-cell">
				<view class="weui-cell__hd">
					<text class="weui-label">所属企业</text>
				</view>
				<view class="weui-cell__bd">
					<text class="Arial">{{ data.companyName }}</text>
				</view>
			</view>
			<view class="weui-cell">
				<view class="weui-cell__hd">
					<text class="weui-label">所在地</text>
				</view>
				<view class="weui-cell__bd">
					<text class="Arial">{{ data.province }} {{ data.city }}</text>
				</view>
			</view>
			<!-- <view class="weui-cell">
				<view class="weui-cell__hd">
					<text class="weui-label">联系电话</text>
				</view>
				<view class="weui-cell__bd">
					<text class="Arial">{{ data.get_company.phone?data.get_company.phone:'' }}</text>
				</view>
				<view class="weui-cell__ft" v-if="data.get_company.phone">
					<text class="iconfont icon-tel-co"></text>
				</view>
			</view> -->
		</view>
		<view class="task_info task_sec" v-if="!base">
			<view class="weui-cell">
				<view class="weui-cell__hd">
					<text class="weui-label">有效时间</text>
				</view>
				<view class="weui-cell__bd">
					<text class="Arial">2020-04-14 ~ 2020-04-30</text>
				</view>
			</view>
			<view class="weui-cell">
				<view class="weui-cell__hd">
					<text class="weui-label">发布时间</text>
				</view>
				<view class="weui-cell__bd">
					<text class="Arial">{{ data.created_at }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import tuiTag from "@/components/ThorUI/tag/tag"
export default {
	components: { tuiTag },
	props:{
		data:{
			type: Object,
			default: {}
		},
		status: {
			type: Boolean,
			default: false
		},
		base: {
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
		}
	},
	onLoad() {
		
	},
	onShow(){
	},
	methods: {
	}
}
</script>

<style>
.task_sec{background-color: #fff;padding: 0 30upx;margin-bottom: 16upx;position: relative;}
.task_sec .status{position: absolute;top: 30upx;right: 30upx;}
.task_name{font-size: 36upx;padding-bottom: 16upx;}
.task_price{font-size: 34upx;padding-bottom: 16upx;}
.task_detail{font-size: 28upx;color: #333;line-height: 1.6;padding: 20upx 10upx;border-top: 1upx #f2f2f2 solid;}


.task_info .weui-cell{padding: 20upx 0;font-size: 30upx;line-height: 60upx;}
.task_info .weui-label{display: inline-block;width: 160upx;color: #666;}
.task_info .weui-cell::before{border-color: #eee;left: 0;}
.task_info .weui-cell__ft .iconfont{color: #FF4949;font-size: 36upx;}
</style>
