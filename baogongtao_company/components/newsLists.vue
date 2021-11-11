<template>
	<view>
		<view class="news-pic_list mb12">
			<block v-for="(item,index) in lists" :key="index">
				<tui-list-cell :index="index" @click="detail(item)" :last="count==index">
					<view class="tui-news-flex" :class="['tui-flex-start']">
						<view class="tui-news-picbox" :class="['tui-w220 tui-h165']">

								<image :src="item.coverUrl" mode="widthFix" class="tui-block"></image>
						</view>
						<view class="tui-news-tbox tui-flex-column tui-flex-between" :class="['tui-h165 tui-pl-20']">
							<view class="tui-news-title">{{item.title}}</view>
							<view class="tui-sub-box">
								<view class="tui-sub-source">{{item.published_date}}</view>
								<view class="tui-sub-cmt">
									<view>{{item.views}}浏览</view>
								</view>
							</view>
						</view>
					</view>
				</tui-list-cell>
			</block>
		</view>
	</view>
</template>
<script>
import tuiListCell from "@/components/ThorUI/list-cell/list-cell"
export default {
	components: {
		tuiListCell
	},
	props: ['data'],
	data() {
		return {
			lists:this.data,
		}
	},
	watch:{
		data(val){
			this.lists = val;
		}
	},
	computed: {
		count() {
			return this.data.length - 1
		}
	},
	methods: {
		detail(item){
			this.linkTo('/pages/news/show/index?id=' + item.id,1)
		}
	}
}

</script>
<style>
.tui-news-flex {
	width: 100%;
	display: flex;
}

.tui-flex-start {
	align-items: flex-start !important;
}

.tui-flex-center {
	align-items: center !important;
}

.tui-flex-column {
	flex-direction: column !important;
}

.tui-flex-between {
	justify-content: space-between !important;
}

.tui-news-cell {
	display: flex;
	padding: 20rpx 30rpx;
}

.tui-news-tbox {
	flex: 1;
	width: 100%;
	box-sizing: border-box;
	display: flex;
}

.tui-news-picbox {
	display: flex;
	position: relative;
}

.tui-w220 {
	width: 220rpx;
}

.tui-h165 {
	height: 165rpx;
}

.tui-block {
	display: block;
}

.tui-w-full {
	width: 100%;
}

.tui-one-third {
	width: 33%;
}

.tui-news-title {
	width: 100%;
	font-size: 34rpx;
	word-break: break-all;
	word-wrap: break-word;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	box-sizing: border-box;
}

.tui-pl-20 {
	padding-left: 20rpx;
}

.tui-pt20 {
	padding-top: 20rpx;
}

.tui-sub-box {
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #999;
	box-sizing: border-box;
	line-height: 24rpx;
}

.tui-sub-source {
	font-size: 26rpx;
}

.tui-sub-cmt {
	font-size: 24rpx;
	line-height: 24rpx;
	display: flex;
	align-items: center;
}

.tui-tag {
	padding: 2rpx 6rpx !important;
	margin-left: 10rpx;
}

.tui-scale {
	transform: scale(0.6);
	transform-origin: center center;
}

.tui-btm-badge {
	position: absolute;
	right: 0;
	bottom: 0;
	font-size: 24rpx;
	color: #fff;
	padding: 2rpx 12rpx;
	background: rgba(0, 0, 0, 0.6);
	z-index: 20;
	transform: scale(0.8);
	transform-origin: 100% 100%;
}

.tui-video {
	position: absolute;
	z-index: 10;
	display: flex;
	align-items: center;
	justify-content: center;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	transform-origin: 0 0;
}

.tui-icon {
	background: rgba(0, 0, 0, 0.5);
	border-radius: 50%;
	padding: 26rpx;
}

.tui-icon-box .tui-icon {
	background: none;
	padding: 0;
	border-radius: 0;
}
</style>
