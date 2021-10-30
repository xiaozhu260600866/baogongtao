<template>
	<view>
		<page ref="page"></page>
		<view>
			<view class="title">PHP开发工程师</view>
			<view class="talents">
				<view class="talents-item bg-f p15 mb8" v-for="item in talents">
					<view class="info flex-between">
						<view class="left">
							<view class="name fs-18 fw-bold fc-3">{{item.name}}</view>
							<view class="labG">
								<view class="lab Arial" v-if="item.year">{{item.year}}年</view>
								<view class="lab" v-if="item.education">{{item.education}}</view>
								<view class="lab" v-if="item.money">{{item.money}}</view>
							</view>
						</view>
						<view class="right">
							<image class="head" :src="item.headerPic" mode="aspectFill"></image>
						</view>
					</view>
					<view class="con flex-middle fs-15 fc-3 ptb15">
						<view class="company">{{item.company}}</view>
						<view class="dot"></view>
						<view class="position">{{item.position}}</view>
					</view>
					<view class="intro text-justify wrap2 fs-15 fc-6">{{item.intro}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				talents:[{
					name:'梁先生',
					year:7,
					education:'大专',
					money: '6~11K',
					headerPic: '/static/images/logo.png',
					company:'东信',
					position:'php',
					intro:'PHP+MySQL，thinkPHP框架，ECShop商城开源系统，dedecms内容管理系统，WordPress博客系统，WordPress博客系统'
				},{
					name:'梁先生',
					year:7,
					education:'大专',
					money: '6~11K',
					headerPic: '/static/images/logo.png',
					company:'东信',
					position:'php',
					intro:'PHP+MySQL，thinkPHP框架，ECShop商城开源系统，dedecms内容管理系统，WordPress博客系统，WordPress博客系统'
				}]
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