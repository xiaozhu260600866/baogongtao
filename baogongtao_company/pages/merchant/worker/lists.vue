<template>
	<view>
		<page ref="page"></page>
		<view class="bg-f">
			<dx-list-cell arrow :name="item.name+'('+item.phone+')'" v-for="item in listsData" @click="showTransaction(item)">
			　　<view slot="right" style="font-size: 26rpx;">查看工资发放记录</view>
			</dx-list-cell>
		</view>
		<view class="pt20"><tyt-loadmore :visible="listLoadding" :nodata="true" :data="listsData" source="task"></tyt-loadmore></view>

		<view v-if="examining">
			<newsLists :data='newsData'></newsLists>
		</view>
	</view>
</template>

<script>
import { listsFromRole } from "@/api/user";
import dxListCell from "doxinui/components/list-cell/list-cell"
import tytLoadmore from "@/components/tytrock/components/loadmore"
import dxIcon from "doxinui/components/icon/icon"
export default {
	components:{
		dxListCell,
		tytLoadmore,
		dxIcon
	},
	data() {
		return {
			sysCompany: uni.getStorageSync('sysCompany'),
			listQuery: {role:12, limit:5, company_id:''},
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
			listsFromRole(this.listQuery).then((res)=>{
				this.listsData = res.data.lists.data;
				if(this.page == res.data.lists.last_page){
					this.listLoadding = false;
					this.pullUpOn = false
					
					if(reload==1) uni.stopPullDownRefresh();
				}
				this.page = this.page + 1;
			})
		},
		showTransaction(item){
			this.linkTo('transactions?user_id='+item.user_id,1)
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
.task_lists{padding: 20upx;}
.task_item{background-color: #fff;border-radius: 12upx;margin-bottom: 20upx;padding: 30upx;position: relative;}
.task_item .name{font-size: 36upx;padding-bottom: 16upx;padding-right: 140upx;}
.task_item .name text{color: #888;font-size: 30rpx;}
.task_item .price{font-size: 34upx;padding-bottom: 8upx;}
.task_item .gray{color: #999;font-size: 24upx;line-height: 40upx;}
.task_item .gray .iconfont{font-size: 24upx;padding-right: 12upx;}
.task_item .nav{margin: 0 30upx;margin-top: 16upx;}
.task_item .nav .dx-btn{width: 100%;}
.task_item .type{position: absolute;top: 40upx;right: 30upx;height: 40upx;line-height: 38upx;padding: 0 10upx;border: 1upx #55b4f6 solid;color: #55b4f6;font-size: 24upx;}
</style>