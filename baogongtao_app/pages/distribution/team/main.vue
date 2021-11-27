<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
		<!-- 	<view class="plr15 pt10 fs-13 fc-7">邀请好友成为分享达人，推广购买后均可获得奖励</view>
			<view class="team-group">
				<view class="team-item block-sec flex" v-for="item in lists">
					<image class="head mr10" :src="item.headerPic"></image>
					<view class="info flex1 fs-13 fc-7 lh-1_6">
						<view class="fs-16 fw-bold fc-black">{{item.name}}</view>
						<view class="mt3">累计奖励：<text class="Arial main-color">￥{{item.amount}}</text></view>
						<view>上次奖励：<text class="Arial main-color" v-if="item.last_amount">￥{{item.last_amount}}</text><text v-else>--</text></view>
					</view>
				</view>
			</view> -->
			<!-- <dx-tabs-date  :height="50" :size="15" v-model="searchType" @change="chageDate"></dx-tabs-date> -->
			<view id="scroller">
				<view class="top plr15 ptb5 fs-14 fc-3 lh-26" v-if="countShow">
					<view class="group flex-between">
						<view>一级分销商：<text class="Arial">{{countData.topOne.length}}</text>人</view>
						<view>一级分销商的客户：<text class="Arial">{{countData.topClient}}</text>人</view>
					</view>
					<view class="group flex-between">
						<view>二级分销商：<text class="Arial">{{countData.topTwo}}</text>人</view>
						<view>二级分销商的客户：<text class="Arial">{{countData.topTwoClitent}}</text>人</view>
					</view>
					<view class="group flex-between">
						<view>直推客户：<text class="Arial">{{countData.myClient}}</text>人</view>
					</view>
				</view>
				<view class="order-classify bg-f mb8">
					<view :class="['nav-tab',lev == 0 ? 'selected' :'']" @click="changeLev(0)">一级</view>
					<view :class="['nav-tab',lev == 1 ? 'selected' :'']" @click="changeLev(1)">二级</view>
				</view>
				<view class="team-header fs-13 fc-9 plr15 ptb3 flex-between">
					<view>成员信息</view>
					<view>TA的佣金/成员</view>
				</view>
				<view class="order-list mb8 bg-f" v-for="item in data.lists">
					<view class="tInfo plr15 ptb10">
						<view class="img pr10">
							<image :src="item.getCover" />
						</view>
						<view class="rInfo">
							<view class="group fs-16">
								<view>{{item.name}}<text class="Arial pl8">{{item.phone}}</text></view>
								<view>收益：
									<text class="Arial fc-orange">{{item.amount}}</text>
								</view>
							</view>
							<view class="group fs-14 fc-9">
								<view class="Arial">{{item.created_at}}</view>
								<view><text class="Arial">{{item.clientNum}}</text>个客户</view>
							</view>
						</view>
						
					</view>
					<view class="infob fs-12 fc-9 plr15 ptb10 bd-te flex-right">
						<view class="dx-btn dx-btn-sm dx-btn-orange ml5" @click="goto('/pages/distribution/order-list/main?id='+item.id+'&dateSelect=today&status=-1',1)">订单</view>
						<view class="dx-btn dx-btn-sm dx-btn-orange ml5" @click="goto('/pages/distribution/down/client/main?id='+item.id,1)">客户</view>
						<view class="dx-btn dx-btn-sm dx-btn-orange ml5" @click="goto('/pages/distribution/down/dis/main?id='+item.id,1)">下级</view>
					</view>
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
					headerPic:'http://thirdwx.qlogo.cn/mmopen/vi_32/kzrmgBsECQibKiblwAxN7h9sY9YGlJEzibO4AShmpUzgAYvoNtC6XiaibwCuuZrDbM0TSWhzBhC79uYEwIwhJ3ibZX6Q/132',
					name:'东信科技-梅',
					amount:55.00,
					last_amount: 3.50,
				},{
					headerPic:'https://thirdwx.qlogo.cn/mmopen/vi_32/ricBHcHiaUya3OQNGBOI4u9wzEGtwV9MibOrLeZcgtbiaSP5S4ic7dsTCWF7iajM4jjib2T79OhpkC3AAIs8YajD7gWoQ/132',
					name:'小朱',
					amount:0,
					last_amount: 0,
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