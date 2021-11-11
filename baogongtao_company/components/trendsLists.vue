<template>
	<view>
		<view :class="['trend-list',myclass]">
			<!-- 循环开始 -->
			<view :class="['list-item']" v-for="(v,key) in trendLists">
				<view class="top flex">
					<view class="head mr10">
						<image class="img" :src="v.headerPic" mode="aspectFill" />
					</view>
					<view class="info flex1">
						<view class="name fs-15">{{ v.nickname }}</view>
						<view class="flex">
							<view :class="['age lh-16',v.sex == 0 ? 'blue' : 'red']"><span :class="['iconfont',v.sex == 0 ?  'icon-men':'icon-women']"></span>{{v.age}}</view>
							<view class="city fs-12 fc-9 pl10 lh-20">{{v.city}}</view>
						</view>
					</view>
					<view class="data fs-12 fc-9 lh-26">{{ v.published_at }}</view>
				</view>
				<view class="con">
					<view class="rCon">
						{{v.content}}
					</view>
					<view class="image-group mt5" v-if="v.getCover">
						<view class="img-item" v-for="(cover,coverIndex) in v.getCover">
							<image class="img" :src="cover.img " mode="aspectFill" @click="previewImage(img,'article')" />
						</view>
					</view>
				</view>
				<view class="tabs mt15 mb20">
					<span class="p">#{{v.tabs}}#</span>
				</view>
				<view class="bottom flex-middle fc-6">
					<view class="item mr15">
						<span :class="['iconfont icon-trends-thumbs fs-17', thumbs==true ? 'fc-red' : '']" @click="thumbs = !thumbs"></span>
						<span class="num pl5">0</span>
					</view>
					<view class="item mr15">
						<span class="iconfont icon-trends-evalute fs-17"></span>
						<span class="num pl5">0</span>
					</view>
				</view>
				<view class="plcon mt10" v-if="v.evalute.length">
					<view class="pl-list fs-12" v-for="item in v.evalute">
						<view class="name" v-if="item.getUser.userName">{{ item.getUser.userName }}</view>
						<view class="dateil plr3" v-if="item.getUser.userName">回复</view>
						<view class="name">{{ item.userName }} ：</view>
						<view class="dateil">{{ item.getUser.content ? item.getUser.content : item.content }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	props: ['myclass'],
	data() {
		return {
			thumbs: false,
			trendLists:[
				{
					headerPic: '../static/women.jpg',
					nickname: '一杯清茶',
					content: '一个的生活，简单的同时也行清净',
					sex: 1,
					age: '30',
					city: '广东-广州',
					tabs: '一起旅行',
					getCover: [
						{img: '../static/women.jpg'},
						{img: '../static/women.jpg'},
						{img: '../static/women.jpg'},
						{img: '../static/women.jpg'},
						{img: '../static/women.jpg'},
						{img: '../static/women.jpg'},
						{img: '../static/women.jpg'},
						{img: '../static/women.jpg'},
						{img: '../static/women.jpg'},
					],
					evalute: [
						{
							id: 1,
							userName: '蒲公英',
							content: '小姐姐可以了解一下吗？',
							getUser: {
								userName: '',
								content: '',
							}
							
						},
						{
							id: 1,
							userName: '蒲公英',
							content: '小姐姐可以了解一下吗？',
							getUser: {
								userName: '一杯清茶',
								content: '可以吖',
							}
							
						}
					],
					published_at: '03-23 17:44',
					
				},
				{
					headerPic: '../static/men.jpg',
					nickname: '荒北游鱼',
					content: '一个的生活，简单的同时也行清净',
					sex: 0,
					age: '28',
					city: '广东-深圳',
					tabs: '日记',
					getCover: [
						{img: '../static/men.jpg'},
						{img: '../static/men.jpg'},
					],
					evalute: [
						
					],
					published_at: '03-22 10:13',
					
				}
			]
		}
	},
	methods: {
		
	}
}

</script>
<style>
.trend-list .list-item {padding: 30upx;position: relative;background: #fff;margin-bottom: 8px;overflow: hidden;width: 100%;}
.trend-list .head .img {width: 46px;height: 46px;display: flex;border-radius: 50%;}
.trend-list .info .age{height: 20px;line-height: 20px;padding: 0 5px;border-radius: 10px;color: #fff;font-size: 24upx;}
.trend-list .info .age.red{background: #ffa1ae;}
.trend-list .info .age.blue{background: #a3b4fc;}
.trend-list .info .age .iconfont{font-size: 20upx;padding-right: 3px;}
.trend-list .con .rCon {text-align: justify;line-height: 22px;padding: 15px 0 10px;}
.trend-list .con .image-group {display: flex;flex-wrap: wrap;}
.trend-list .con .image-group .img-item {margin: 0 3px 3px 0;}
.trend-list .con .image-group .img-item .img{width: 200upx;height: 200upx;display: flex;}
.trend-list .tabs .p{height: 24px;line-height: 24px;padding: 0 10px;background-color: #fef3dd;border-radius: 2px;color: #b6a88d;font-size: 12px;display: inline-block;}
.trend-list .pl-list{display: flex;flex-wrap: wrap;padding-bottom: 3px;}
.trend-list .pl-list .dateil{color: #333;}
</style>
