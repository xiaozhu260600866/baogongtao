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
						<view slot="content"><dx-button type="primary" block round size="mini">查看任务</dx-button></view>
					</tyt-navigator>
					<tyt-navigator :wxAuth="true" @callBack="linkTo('/pages/task/show/index?id=' + item.id,1)" v-else>
						<view slot="content"><dx-button type="primary" block round size="mini">查看任务</dx-button></view>
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
<style>
.task_lists{padding: 20upx;}
.task_item{background-color: #fff;border-radius: 12upx;margin-bottom: 20upx;padding: 30upx;position: relative;}
.task_item .name{font-size: 36upx;padding-bottom: 16upx;padding-right: 140upx;}
.task_item .price{font-size: 34upx;padding-bottom: 8upx;}
.task_item .gray{color: #999;font-size: 24upx;line-height: 40upx;}
.task_item .gray .iconfont{font-size: 24upx;padding-right: 12upx;}
.task_item .nav{margin: 0 30upx;margin-top: 16upx;}
.task_item .nav .dx-btn{width: 100%;}
.task_item .type{position: absolute;top: 40upx;right: 30upx;height: 40upx;line-height: 38upx;padding: 0 10upx;border: 1upx #55b4f6 solid;color: #55b4f6;font-size: 24upx;}
</style>
