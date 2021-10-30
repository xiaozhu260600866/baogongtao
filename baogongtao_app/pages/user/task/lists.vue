<template>
	<view>
		<page ref="page"></page>
		<tyt-tabs :tabs="tabbar" :isFixed="scrollTop>=0" :currentTab="currentTab" selectedColor="#55b4f6" sliderBgColor="#55b4f6" @change="changeStatus()"></tyt-tabs>
		<view :class="{'task-lists':scrollTop>=0}">
			<taskLists :data='listsData' self></taskLists>
			<view class="pt20"><tyt-loadmore :visible="listLoadding" :nodata="true" :data="listsData" :source="examining?'':'mytask'"></tyt-loadmore></view>
		</view>
	</view>
</template>

<script>
import { lists } from "@/api/task";
import tytTabs from "@/components/tytrock/components/tabs";
import taskLists from '@/components/taskLists';
import tytLoadmore from "@/components/tytrock/components/loadmore"
export default {
	components:{
		tytTabs,
		taskLists,
		tytLoadmore
	},
	data() {
		return {
			scrollTop: 0,
			tabbar: [{
				name: "进行中",
				value: 4
			}, {
				name: "已完成",
				value: 5
			}, {
				name: "已结束",
				value: 6
			}],
			currentTab: 0,
			listQuery: {status:4, user_id: uni.getStorageSync('sysUser').user_id?uni.getStorageSync('sysUser').user_id:0, limit:5},
			listsData: [],
			listLoadding: true,
			pullUpOn: true,
			page: 1,
			examining: true
		}
	},
	onLoad: function(){
		let that = this;
		//  高度自适应
		uni.getSystemInfo({
			success: function(res) {
				let calc = res.windowHeight;
				that.winHeight = calc;
			}
		});
		this.getListsData();
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	methods: {
		getListsData(reload=0){
			if(reload){
				this.page = 1;
				this.listLoadding = true;
				this.pullUpOn = true;
				this.listsData = [];
			}
			this.listQuery.page = this.page;
			lists(this.listQuery).then((res)=>{
				this.listsData = res.data.lists.data;
				if(this.page == res.data.lists.last_page){
					this.listLoadding = false;
					this.pullUpOn = false
					
					if(reload==1) uni.stopPullDownRefresh();
				}
				this.page = this.page + 1;
			})
		},
		changeStatus(e) {
			this.currentTab = e.index;
			this.listQuery.status = e.value;
			this.getListsData(1);
		},
	},
	onReachBottom: function() {
		if (!this.pullUpOn) return;
		this.listLoadding = true;
		this.getListsData();
	},
	onPullDownRefresh(){
		this.getListsData(1);
	}
}
</script>

<style>
@import "./lists.css";
</style>