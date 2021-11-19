<template>
	<view>
		<view class="task_lists">
			<view class="task_item" v-for="item in data">
				<view class="name">{{ item.name }}</view>
				<view class="price"><text class="Arial">{{ item.budget }}</text>元</view>
				<view class="gray"><text class="iconfont icon-location-o"></text>{{ item.companyName }}</view>
				<view class="gray"><text class="iconfont icon-location-o"></text>{{ item.province }} - {{ item.city }}</view>
				<view class="gray Arial"><text class="iconfont icon-time-o"></text>{{ item.started_date }} 至 {{ item.ended_date }}</view>
				<view class="nav">
					<tyt-navigator :wxAuth="true" @callBack="linkTo('/pages/user/task/show?id=' + item.id,1)" v-if="self">
						<view slot="content" class="plr30"><dx-button type="primary" size="medium" block round>查看任务</dx-button></view>
					</tyt-navigator>
					<tyt-navigator :wxAuth="true" @callBack="linkTo('/pages/task/show/index?id=' + item.id,1)" v-else>
						<view slot="content" class="plr30"><dx-button type="primary" size="medium" block round>查看任务</dx-button></view>
					</tyt-navigator>
				</view>
				<view class="type">{{ item.typeName }}</view>
			</view>
		</view>
		
	</view>
</template>
<script>
import dxButton from "doxinui/components/button/button"
export default {
	components: { dxButton },
	props: {
		data: {
			type: Array,
			default: [],
		},
		self: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
		}
	},
	methods: {
		detail(item){
			if(this.self) return this.linkTo('/pages/user/task/show?id=' + item.id,1);
			else return this.linkTo('/pages/task/show/index?id=' + item.id,1)
		}
	}
}

</script>
<style lang="scss">
.task_lists{padding: 20rpx;}
.task_item{background-color: #fff;border-radius: 12rpx;margin-bottom: 20rpx;padding: 30rpx;position: relative;}
.task_item .name{font-size: 36rpx;padding-bottom: 16rpx;padding-right: 140rpx;}
.task_item .price{font-size: 34rpx;padding-bottom: 8rpx;}
.task_item .gray{color: #999;font-size: 28rpx;line-height: 1.6;}
.task_item .gray .iconfont{font-size: 28rpx;padding-right: 12rpx;}
.task_item .nav{margin: 0 30rpx;margin-top: 16rpx;}
.task_item .nav .dx-btn{width: 100%;}
.task_item .type{position: absolute;top: 40rpx;right: 30rpx;height: 40rpx;line-height: 38rpx;padding: 0 10rpx;border: 1rpx $color-primary solid;color: $color-primary;font-size: 24rpx;}
</style>
