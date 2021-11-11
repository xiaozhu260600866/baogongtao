<template>
	<view>
		<!-- <view class="Ltype">
				<scroll-view scroll-y>
			<view class="Ltype_box">
					<view class="Ltype_item" v-for="v in Ltype">
						<view class="name">{{ v.name }}</view>
					</view>
			</view>
				</scroll-view>
		</view> -->
		
		<scroll-view scroll-y scroll-with-animation class="Ltype" :scroll-top="scrollTop" :style="{height:height+'px'}">
			<view v-for="(v,key) in Ltype" :key="key" class="Ltype_item" :class="[currentTab==key ? 'active' : '']"
			 :data-current="key" @tap.stop="swichNav">
				<text class="name">{{v.name}}</text>
			</view>
		</scroll-view>
		
		<view class="Rtype">
			<view class="Rtype_item" v-for="item in Rtype">
				<view class="name">{{ item.name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				height: 0, //scroll-view高度
				currentTab: 0, //预设当前项的值
				childrenKey:-1,
				scrollTop: 0, //tab标题的滚动条位置
				value: 0,
				Ltype:[
					{name: '热门兼职',value: 0},
					{name: '服务行业',value: 1},
					{name: 'IT达人',value: 2},
					{name: '艺术设计师',value: 3},
					{name: '专业人才',value: 4},
					{name: '业务人员',value: 5},
					{name: '技工',value: 6},
					{name: '所有人都可以做',value: 7},
					{name: '热门兼职',value: 0},
					{name: '服务行业',value: 1},
					{name: 'IT达人',value: 2},
					{name: '艺术设计师',value: 3},
					{name: '专业人才',value: 4},
					{name: '业务人员',value: 5},
					{name: '技工',value: 6},
					{name: '所有人都可以做',value: 7},
					{name: '热门兼职',value: 0},
					{name: '服务行业',value: 1},
					{name: 'IT达人',value: 2},
					{name: '艺术设计师',value: 3},
					{name: '专业人才',value: 4},
					{name: '业务人员',value: 5},
					{name: '技工',value: 6},
					{name: '所有人都可以做',value: 7},
				],
				Rtype:[
					{name: '骑手/快递',value: 0},
					{name: '速记员',value: 1},
					{name: '洗车工',value: 2},
					{name: '搬运/装卸',value: 3},
					{name: '校对员',value: 4},
					{name: '全部类型',value: 5},
					{name: '促销/导购',value: 6},
					{name: '传单派发',value: 7},
					{name: '骑手/快递',value: 0},
					{name: '速记员',value: 1},
					{name: '洗车工',value: 2},
					{name: '搬运/装卸',value: 3},
					{name: '校对员',value: 4},
					{name: '全部类型',value: 5},
					{name: '促销/导购',value: 6},
					{name: '传单派发',value: 7},
				],
			}
		},
		
		onLoad: function(options) {
			uni.getSystemInfo({
				success: (res) => {
					let header = 92;
					// #ifdef H5
					header = 0;
					// #endif
					this.height = res.windowHeight
				}
			});
			this.ajax();
		
		},
		
		methods:{
			// 点击标题切换当前页时改变样式
			changeChildren(key,item){
				this.childrenKey = key;
				if(item){
					this.data.query.fclassForIndex = item.value;
				}else{
					this.data.query.fclassForIndex = this.data.lists[this.currentTab].value;
				}
				this.getLists();
			},
			swichNav: function(e) {
				let cur = e.currentTarget.dataset.current;
				if (this.currentTab == cur) {
					return false;
				} else {
					this.currentTab = cur;
					this.checkCor();
				}
				this.data.query.fclassForIndex = this.data.lists[this.currentTab].value;
				this.childrenKey = -1;
				console.log(this.data.query.fclassForIndex);
				this.getLists();
			},
			checkCor: function() {
				let that = this;
				//这里计算按照实际情况进行修改，动态数据要进行动态分析
				//思路：窗体高度/单个分类高度 200rpx 转px计算 =>得到一屏幕所显示的个数，结合后台传回分类总数进行计算
				//数据很多可以多次if判断然后进行滚动距离计算即可
				if (that.currentTab > 7) {
					that.scrollTop = 500
				} else {
					that.scrollTop = 0
				}
			},
		},
		
	}
</script>
