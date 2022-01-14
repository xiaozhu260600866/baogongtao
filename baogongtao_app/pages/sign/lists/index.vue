<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<dx-tabs-date @change="search"></dx-tabs-date>
		<view v-if="data.show">
			
			<view class="duty-count">
				<view class="dc-item" v-for="(item,key) in data.lists.data">
					<!-- <view class="title">客户：{{ item.user_name }}</view>签{{item.type == 0 ? '到' :'退'}} -->
					<view class="title">{{item.type == 0 ? '上班' : '下班'}}</view>
					<view class="mark">地址：{{ item.address }}</view>
					<view class="mark">时间：<text class="Arial">{{ item.created_at }}</text></view>
					<view class="mark" v-if="item.remark">备注：{{ item.remark }}</view>
					<view class="imgs">
						<view class="img-item" v-for="v in getCover(item)">
							<image class="img" :src="v.cover" mode="aspectFill" @click="previewImage(v.cover)" />
						</view>
					</view>
				</view>
			</view>
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
				lists:[
					{
						customerName: '东信',
						address:'江门市蓬江区建设路82号',
						created_at: '2021-07-27 17:07:12',
						remark: '很好',
						picsMinArr:['https://boss.doxinsoft.com/images/pc/news-pt01.jpg','https://boss.doxinsoft.com/images/pc/news-pt02.jpg','https://boss.doxinsoft.com/images/pc/news-pt03.jpg','https://boss.doxinsoft.com/images/pc/news-pt01.jpg']
					}
				]
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
<style scoped="" lang="scss">
@import "./index.scss";
</style>