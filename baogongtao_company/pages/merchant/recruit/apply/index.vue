<template>
	<view>
		<page ref="page"></page>
		<view>
			<view class="Ujobs_people plr15 bg-f">
				<view class="people_lists flex ptb10 bd-be" v-for="item in lists" @click="">
					<image class="head" mode="aspectFill" :src="item.headerPic"></image>
					<view class="right flex1 lh-1_2 ml15">
						<view class="name fs-16">{{item.name}}</view>
						<view class="num fs-14 fc-6 mt5">{{item.phone}}</view>
					</view>
					<view class="date Arial fs-14 fc-9">{{item.created_at}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists:[
					{headerPic: '/static/images/news/01.jpg',name:'东信科技',phone:'13380951183',created_at: '2021-08-09 08:33:53'},
					{headerPic: '/static/images/news/02.jpg',name:'东信科技',phone:'13380951183',created_at: '2021-08-09 08:33:53'},
					{headerPic: '/static/images/news/03.jpg',name:'东信科技',phone:'13380951183',created_at: '2021-08-09 08:33:53'},
				]
			}
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>