<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<dx-tabs-date @change="search"></dx-tabs-date>
		<view v-if="data.show">
			<view class="upAdown sign_block">
				<view class="item" v-for="(item,key) in data.lists.data">
					<!-- 如果是外出打卡 -->
					<block v-if="item.type < 0">
						<view class="dateAtime Arial">
							<view class="time">{{item.getHourAndTime}}</view>
							<view class="date">{{item.date}}</view>
						</view>
						<view class="rinfo">
							<view class="type">外出打卡</view>
							<view class="status fc-3">{{item.remark}}</view>
							<view class="status">{{item.address}}</view>
						</view>
						<view class="rimg">
							<image class="img" :src="getSiteName+'/upload/images/sign/'+item.cover" mode="aspectFill" @click="previewImage(getSiteName+'/upload/images/sign/'+item.cover)" />
						</view>
					</block>
					<!-- 如果是上下班打卡 -->
					<block v-else>
						<view class="dateAtime Arial">
							<view class="time">{{item.type == 0 ? item.getWork.work_start_time : item.getWork.work_end_time}}</view>
							<view class="date">{{item.date}}</view>
						</view>
						<view class="rinfo">
							<view class="type">{{item.type == 0 ? '上班' : '下班'}}</view>
							<view class="status">
								<text class="fc-red" v-if="item.type == 0 && item.getHourAndTime > item.getWork.work_start_time">迟到打卡</text>
								<text class="fc-red" v-else-if="item.type == 1 && item.getHourAndTime < item.getWork.work_end_time">早退打卡</text>
								<text v-else>正常打卡</text>
								<text class="Arial">({{ item.getHourAndTime }})</text>
							</view>
						</view>
					</block>
				</view>
			</view>
			<!-- <view class="duty-count">
				<view class="dc-item" v-for="(item,key) in data.lists.data">
					<view class="title">客户：{{ item.user_name }}</view>签{{item.type == 0 ? '到' :'退'}}
					<view class="title">{{item.type == 0 ? '上班' : '下班'}}</view>
					<view class="mark">地址：{{ item.address }}</view>
					<view class="mark">时间：<text class="Arial">{{ item.created_at.split(" ")[1].split(":")[0] }}:{{ item.created_at.split(" ")[1].split(":")[1] }}</text></view>
					<view class="mark" v-if="item.remark">备注：{{ item.remark }}</view>
					<view class="imgs">
						<view class="img-item" v-for="v in getCover(item)">
							<image class="img" :src="v.cover" mode="aspectFill" @click="previewImage(v.cover)" />
						</view>
					</view>
				</view>
			</view> -->
			<view class="text-center ptb50 fs-14 fc-9" v-if="data.lists.data.length == 0">暂无签到记录</view>
		</view>
	</view>
</template>

<script>
	import dxTabsDate from "doxinui/components/tabs/tabs_date"
	export default {
		components:{dxTabsDate},
		data() {
			return {
				formAction: '/api/user/sign-lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				searchType:'today',
				lists:[{
						customerName: '东信',
						address:'江门市蓬江区建设路82号',
						created_at: '2021-07-27 17:07:12',
						remark: '很好',
						picsMinArr:['https://boss.doxinsoft.com/images/pc/news-pt01.jpg','https://boss.doxinsoft.com/images/pc/news-pt02.jpg','https://boss.doxinsoft.com/images/pc/news-pt03.jpg','https://boss.doxinsoft.com/images/pc/news-pt01.jpg']}
				],
				status: 0,
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '包工淘');
		},
		onLoad(options) {
			this.ajax();
		},
		methods: {
			search(item){
				if(item.start_date){
					this.getAjax(this,
						{created_at_start:item.start_date,created_at_end:item.end_date}
					).then(msg => {
					});
				}else{
					this.searchType = item.prop;
					this.ajax();
				}
			},
			getCover(item){
				let res = [];
				let coverArr = item.cover.split(",");
				coverArr.forEach(v=>{
					if(v){
						res.push({cover:this.getSiteName+'/upload/images/sign/'+v});
					}
					
				})
				return res;
			},
			previewImage:function(url){
				uni.previewImage({
					urls: [url]
				})
			},
			ajax() {
				this.getAjax(this,{searchType:this.searchType,token:uni.getStorageSync('token')}).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
<style lang="scss">
@import "./index.scss";
</style>