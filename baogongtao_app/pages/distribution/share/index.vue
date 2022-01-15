<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="team-group">
				<view class="team-item block-sec flex-middle" v-for="item in lists">
					<view class="info flex1 lh-1_2 fs-16">
						<view class="fw-bold">{{item.timer}}</view>
						<view class="mt8">{{item.name}}</view>
					</view>
					<view class="price fs-14 pl15">+<text class="fs-20 plr3">{{item.amount}}</text>元</view>
				</view>
			</view>
			<hasMore :parentData="data" source="nodata"></hasMore>
		</view>
	</view>
</template>

<script>
import dxTabsDate from "doxinui/components/tabs/tabs_date"
	export default {
		components:{dxTabsDate},
		data() {
			return {
				formAction: '/api/dis/team',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				lev:0,
				searchType:'today',
				countShow:false,
				countData:{},
				lists:[{
					name:'小朱',
					amount:60.00,
					timer: '2021年8月',
				},{
					name:'东信科技-梅',
					amount:55.00,
					timer: '2021年7月',
				}]
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			
			this.postAjax("/api/dis/dis-count",{searchType:this.searchType,token:uni.getStorageSync('token')}).then(msg=>{
				this.countShow = true;
				this.countData = msg.data;
			});
		},
		onShareAppMessage() {
			this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
			
		},
		methods: {
			chageDate(e){
				 if(e.start_date){
					 this.postAjax("/api/dis/dis-count",{created_at_start:e.start_date,created_at_end:e.end_date,token:uni.getStorageSync('token')}).then(msg=>{
					 	this.countShow = true;
					 	this.countData = msg.data;
					 });
				 }else{
					 this.postAjax("/api/dis/dis-count",{searchType:e.prop,token:uni.getStorageSync('token')}).then(msg=>{
					 	this.countShow = true;
					 	this.countData = msg.data;
					 });
				 }
			},
			ajax() {
				this.getAjax(this,{lev:this.lev,token:uni.getStorageSync('token')}).then(msg => {
					this.postAjax("/api/dis/dis-count",{searchType:this.searchType,token:uni.getStorageSync('token')}).then(msg=>{
						this.countShow = true;
						this.countData = msg.data;
					});
				});
			},
			changeLev: function(lev) {
				this.lev = lev;
				this.ajax();
			},
		}
	}
</script>
<style>
@import "./index.css";
</style>