<template>
	<view>
		<page ref="page"></page>
		<view v-if="!examining">
			<taskLists :data='listsData'></taskLists>
			<view class="pt20"><tyt-loadmore :visible="listLoadding" :nodata="true" :data="listsData" source="task"></tyt-loadmore></view>
		</view>
		<view v-if="examining">
			<newsLists :data='newsData'></newsLists>
		</view>
	</view>
</template>

<script>
import { lists } from "@/api/task";
import { lists as articleLists } from "@/api/news";
import taskLists from '@/components/taskLists';
import newsLists from '@/components/newsLists';
import tytLoadmore from "@/components/tytrock/components/loadmore"
export default {
	components:{
		taskLists,
		newsLists,
		tytLoadmore
	},
	data() {
		return {
			listQuery: {status:3, limit:5},
			listsData: [],
			listLoadding: true,
			pullUpOn: true,
			page: 1,
			newsData: [],
			examining: true
		}
	},
	onLoad() {
		this.getListsData();
		this.getArticleLists();
	},
	onShow(){
		
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
		getArticleLists(){
			articleLists({status:1,class_id:2,limit:5}).then((res)=>{
				this.newsData = res.data.lists.data;
			})
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
