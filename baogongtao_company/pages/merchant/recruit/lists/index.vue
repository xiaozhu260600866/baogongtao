<template>
	<view>
		<page ref="page"></page>
		<view>
			<view class="top-custom main-bg" :style="{paddingTop:top+'px',height:height+'px',}">
				<view class="left"><text class="dxi-icon dxi-icon-left fc-white fs-18" @tap="back"></text></view>
				<view class="search-box">
					<text class="dxi-icon dxi-icon-search fc-9 mr10"></text>
					<input placeholder-class="phcolor fc-9" class="input fs-15" name="search" placeholder="请输入搜索内容" v-model="search" type="text" />
				</view>
			</view>
			<view><!-- :style="{marginTop: height+'px'}" -->
				<view class="title">推荐职位</view>
				<recruitLists :data="jobsLists" :type="3"></recruitLists>
			</view>
		</view>
	</view>
</template>

<script>
	import recruitLists from '@/components/recruitLists'
	import { recruits as recruitList } from "@/api/company";
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
				jobsLists:[]
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
				this.getRecruitLists();
		},
		methods: {
			getRecruitLists(){
				recruitList({}).then(msg=>{
					this.jobsLists = msg.data.lists.data;
				});
			},
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>