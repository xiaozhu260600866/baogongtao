<template>
	<view>
		<page ref="page"></page>
		<view>
			<taskLists :data='listsData'></taskLists>
			<view class="pt20"><tyt-loadmore :visible="listLoadding" :nodata="true" :data="listsData" source="mytask"></tyt-loadmore></view>
		</view>
	</view>
</template>

<script>
import { lists } from "@/api/task";
import taskLists from '@/components/taskLists';
import tytLoadmore from "@/components/tytrock/components/loadmore"
export default {
	components:{
		taskLists,
		tytLoadmore
	},
	data() {
		return {
			listQuery: {apply:1, user_id: uni.getStorageSync('sysUser').user_id, limit:5},
			listsData: [],
			listLoadding: true,
			pullUpOn: true,
			page: 1,
		}
	},
	onLoad: function(){
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