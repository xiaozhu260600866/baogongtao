<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<dx-tabs-date @change="search"></dx-tabs-date>
		<view v-if="data.show">
			<view class="upAdown sign_block">
				<view class="title">上下班打卡</view>
				<view class="item" v-for="(item,key) in data.lists.data">
					<view class="dateAtime Arial">
						<view class="time">{{item.type == 0 ? '08:00' : '18:00'}}</view>
						<view class="date">{{item.date}}</view>
					</view>
					<view class="rinfo" :class="status == 0?'':'fc-red'">
						<view class="type">{{item.type == 0 ? '上班' : '下班'}}</view>
						<view class="status">
							<text>{{status == 0?'正常':'迟到'}}打卡</text>
							<text class="Arial">{{ item.created_at.split(" ")[1].split(":")[0] }}:{{ item.created_at.split(" ")[1].split(":")[1] }}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="duty-count">
				<view class="dc-item" v-for="(item,key) in data.lists.data">
					<!-- <view class="title">客户：{{ item.user_name }}</view>签{{item.type == 0 ? '到' :'退'}} -->
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
			</view>
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