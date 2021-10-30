<template>
	<view>
		<page ref="page"></page>
		<view class="sign-lists">
			<view class="sign-item" v-for="item in listsData" @click="detail(item)">
				<view class="status"><tui-tag size="small" :type="item.statusValue==1?'green':'danger'">{{ item.statusName }}</tui-tag></view>
				<view class="name">{{ item.name }}</view>
				<view class="task">有效期：{{ item.sign_date }} 至 {{ item.end_date }}</view>
				<view class="time">签署时间：{{ item.created_at }}</view>
			</view>
			<view class="pt20"><tyt-loadmore :visible="listLoadding" :nodata="true" :data="listsData" source="task"></tyt-loadmore></view>
		</view>
	</view>
</template>

<script>
import { signs } from "@/api/user";
import tytLoadmore from "@/components/tytrock/components/loadmore"
import tuiTag from "@/components/ThorUI/tag/tag"
export default {
	components:{
		tytLoadmore,
		tuiTag
	},
	data() {
		return {
			listQuery: {limit:5},
			listsData: [],
			listLoadding: true,
			pullUpOn: true,
			page: 1,
		}
	},
	onLoad() {
	
	},
	onShow(){
		this.getListsData(1);
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
			signs(this.listQuery).then((res)=>{
				this.listsData = res.data.lists.data;
				if(this.listsData.length<1){
					return this.linkTo('/pages/user/sign/show',1);
				}
				if(this.page == res.data.lists.last_page){
					this.listLoadding = false;
					this.pullUpOn = false
					
					if(reload==1) uni.stopPullDownRefresh();
				}
				this.page = this.page + 1;
			})
		},
		detail(item){
			return;
			return this.linkTo('/pages/user/sign/show?id=' + item.id,1);
			if(item.status == 1) this.linkTo('/pages/user/sign/show?id=' + item.id,1);
			else this.linkTo('/pages/user/sign/show',1);
		}
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
