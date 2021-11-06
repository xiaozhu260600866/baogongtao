<template>
	<view>
		<page ref="page"></page>
		<view v-if="data.show">
			<view class="top-custom main-bg" :style="{paddingTop:top+'px',height:height+'px',}">
				<view class="left"><text class="dxi-icon dxi-icon-left fc-white fs-18" @tap="back"></text></view>
				<view class="search-box">
					<text class="dxi-icon dxi-icon-search fc-9 mr10"></text>
					<input placeholder-class="phcolor fc-9" class="input fs-15" name="search" placeholder="请输入搜索内容" v-model="search" type="text" />
				</view>
			</view>
			<view><!-- :style="{marginTop: height+'px'}" -->
				<view class="title">推荐职位</view>
				<recruitLists :data="jobsLists" :type="1"></recruitLists>
			</view>
		</view>
	</view>
</template>

<script>
	import recruitLists from '@/components/recruitLists'
	export default {
		components:{recruitLists},
		data() {
			return {
				formAction: '/api/company/recruits',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				height: 64, //header高度
				top: 0, //标题图标距离顶部距离
				search:'',
				jobsLists:[{
					name:'PHP开发工程师',
					city:'江门',
					company:{
						name:'江门市东信科技有限公司',
						people_num: '1-50',
						status:'已上市'
					},
					work_place:'新会',
					salary: '10-15K',
					condititon:['1-3年','本科','周末双休','钣金工艺'],
					userInfo:{
						headerPic:'/static/images/logo.png',
						name:'林生',
						position:'经理',
					}
				},{
					name:'PHP开发工程师',
					city:'江门',
					company:{
						name:'江门市东信科技有限公司',
						people_num: '1-50',
						status:'已上市'
					},
					work_place:'新会',
					salary: '10-15K',
					condititon:['1-3年','本科','周末双休','钣金工艺'],
					userInfo:{
						headerPic:'/static/images/logo.png',
						name:'林生',
						position:'经理',
					}
				}]
			}
		},
		onLoad() {
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-BAIDU
			obj = swan.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-ALIPAY
			my.hideAddToDesktopMenu();
			// #endif
			uni.getSystemInfo({
				success: (res) => {
					this.width = obj.left || res.windowWidth;
					this.height = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44);
					this.top = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
					this.scrollH = res.windowWidth
				}
			});
			this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					
				});
			}
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>