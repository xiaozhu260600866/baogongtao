<template>
	<view>
		<page ref="page"></page>
		<view class="tabs"><dx-tabs-date :tabs="tabs" @change="change"></dx-tabs-date></view>
		<view class="bg-f lists">
			<dx-list-msg :name="item.workerName" :content="item.created_at" v-for="item in listsData">
			　　<view slot="right">
			　　　　<view class="right-box" style="color: #ff5500;font-size: 40rpx;font-weight: bold;">
			　　　　　　￥{{ item.amount }}
			　　　　</view>
			　　</view>
			</dx-list-msg>
		</view>
		<view class="pt20"><tyt-loadmore :visible="listLoadding" :nodata="true" :data="listsData"></tyt-loadmore></view>

		<view v-if="examining">
			<newsLists :data='newsData'></newsLists>
		</view>
	</view>
</template>

<script>
import { lists } from "@/api/transaction";
import dxListMsg from "doxinui/components/list-cell/list-msg"
import tytLoadmore from "@/components/tytrock/components/loadmore"
import dxIcon from "doxinui/components/icon/icon"
import dxTabsDate from "doxinui/components/tabs/tabs_date"
export default {
	components:{
		dxListMsg,
		tytLoadmore,
		dxIcon,
		dxTabsDate
	},
	data() {
		return {
			sysCompany: uni.getStorageSync('sysCompany'),
			listQuery: {role:12, limit:5, company_id:''},
			listsData: [],
			listLoadding: true,
			pullUpOn: true,
			page: 1,
			tabs: [
			　　　{name: "今日", value:'today'},
			　　　{name: "昨日", value:'yesterday'},
			　　　{name: "本月", value:'thismonth'},
			　　　{name: "上月", value:'prevmonth'},
			　　　{name: "日期",type:"date", value:'date'},
			],
		}
	},
	onLoad(options) {
		if(options.user_id){
			this.listQuery.user_id = options.user_id;
		}
		this.getListsData();
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
			this.listQuery.company_id = this.sysCompany.id;
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
		change(e){
			if(e.value != 'date'){
				if(e.start_date){
					this.listQuery.timer = 'custom';
					this.listQuery.start_date = e.start_date;
					this.listQuery.end_date = e.end_date;
				}else this.listQuery.timer = e.value;
				this.getListsData(1);
			}
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
.tabs{position: fixed;top: 0;left: 0;right: 0;z-index: 10;}
.lists{margin-top: 100rpx;}
</style>