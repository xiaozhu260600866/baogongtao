<template>
	<view>
		<page ref="page"></page>
		<view>
			<view class="news-pic_list mb12">
				<view class="list" v-for="item in listsData"> 
					<view class="item flex">
						<view class="limg mr15"><img class="img" :src="item.fileMinUrl" mode="acpectFill"></view>
						<view class="rtxt flex1">
							<view class="title fs-16 nowrap pt5">付款金额：{{item.amount}}</view>
							<view class="intro fs-13 wrap2 mt10" >备注：{{item.remark}}</view>
						</view>
						<view class="del"><dx-button size="mini" type="danger" @click="del(item)">删除</dx-button></view>
					</view>
				</view>
			</view>
			<view class="pt20"><tyt-loadmore :visible="listLoadding" :nodata="true" :data="listsData" source="mytask"></tyt-loadmore></view>
		</view>
		<dxftButton type="primary" @click="popupShow=true">上传转账凭证</dxftButton>
		
		<!--底部分享弹窗-->
		<tui-bottom-popup :show="popupShow" @close="popupClose">
			<view class="form">
				<view class="tui-popup-title">上传转账凭证</view>
				<view class="bg-f">
					<view :class="['weui-cell','weui-cell_input']">
						<view class="weui-cell__hd">
							<view class="weui-label fs14">凭证图片</view>
						</view>
						<view class="weui-cell__bd text-right">
							<image-upload v-model="imageData" @delete="deleteImage" @add="addImage" :server-url-delete-image="serverUrlDeleteImage" :server-url="serverUrl" :form-data="uploadImageData" :showUploadProgress="true" fileKeyName="file" :limit="1"></image-upload>
						</view>
					</view>
					<weui-input v-model="formData.amount" label="付款金额" type="text" name="amount"></weui-input>
					<weui-input v-model="formData.remark" label="备注" type="textarea" name="remark"></weui-input>
				</view>
				
				<view class="p20">
					<form-submit :vaildate="false" @callBack="submit"></form-submit>
				</view>
			</view>
		</tui-bottom-popup>
		<!--底部分享弹窗-->
	</view>
</template>

<script>
import { transfers, transferStore, transferDelete } from "@/api/company";
import tytLoadmore from "@/components/tytrock/components/loadmore"
import dxButton from "doxinui/components/button/button"
import dxftButton from "doxinui/components/button/footer-button"
import tuiBottomPopup from "@/components/ThorUI/bottom-popup/bottom-popup"
import weuiInput from "@/components/tytrock/components/weui-input.vue";
import imageUpload from "@/components/tytrock/components/image-upload"
import formSubmit from "@/components/tytrock/components/form-submit.vue";
export default {
	components:{
		tytLoadmore,
		dxftButton,
		tuiBottomPopup,
		weuiInput,
		imageUpload,
		formSubmit,
		dxButton
	},
	data() {
		return {
			listQuery: {user_id: uni.getStorageSync('sysCompany').user_id, limit:5},
			listsData: [],
			listLoadding: true,
			pullUpOn: true,
			page: 1,
			popupShow: false,
			formData: {file:'', amount:'', remark:''},
			imageData:[],
			uploadImageData: {
				token: this.$store.state.token,
				type: "image",
				pathname: 'transfer',
				thumbsize: "200"
			},
			serverUrl:  this.$store.state.apiInterfaceUrl + '/base/upload',
			serverUrlDeleteImage: this.$store.state.apiInterfaceUrl + '/base/upload-delete',
		}
	},
	onLoad: function(){
		this.getListsData();
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
			transfers(this.listQuery).then((res)=>{
				this.listsData = res.data.lists.data;
				if(this.page == res.data.lists.last_page){
					this.listLoadding = false;
					this.pullUpOn = false
					
					if(reload==1) uni.stopPullDownRefresh();
				}
				this.page = this.page + 1;
			})
		},
		popupClose: function() {
			this.popupShow = !this.popupShow
		},
		addImage(res){
			console.log(res)
			let uploadArr = res.currentImagesPath;
			let uploadStr = '';
			let imageName = '';
			for(let i=0; i<uploadArr.length;i++){
				let imageArr = uploadArr[i].split('/');
				imageName = imageArr[imageArr.length-1];
				//uploadStr += imageName + ',';
			}
			this.formData.file = imageName;
		},
		deleteImage(e){
			let imageArr = e.currentImage.split('/');
			let imageName = imageArr[imageArr.length-1];
			this.formData.file = '';
		},
		del(item){
			this.msgConfirm('确认要删除该付款凭证吗？').then(res=>{
				transferDelete({id:item.id}).then(res=>{
					this.tytMessage(this,'success',res.msg);
					this.getListsData(1);
				})
			})
		},
		submit(){
			if(!this.formData.file) return this.msgToast('请上传付款凭证');
			transferStore(this.formData).then(res=>{
				if(res.code == 0){
					this.popupShow = false;
					this.getListsData(1);
				}else return this.msgToast(res.msg);
			})
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
.news-pic_list .list{background-color: #fff;}
.news-pic_list .item{border-bottom: 1px solid #ebebeb;padding: 15px;position: relative;}
.news-pic_list .item .del{position: absolute;top: 30upx;right: 20upx;}
.news-pic_list .item .img{width: 95px;height: 72px;border-radius: 3px;display: flex;}
.news-pic_list .item .rtxt{color: #666;}
.news-pic_list .item .rtxt .title{color: #333;line-height: 1;font-weight: bold;}
.news-pic_list .item .rtxt .intro{color: #979797;line-height: 1.5;}

.form{background: #f2f2f2;}
.tui-share {
	position: relative;
	padding-bottom: env(safe-area-inset-bottom);
}

.tui-popup-title {
	font-size: 36upx;
	color: #7E7E7E;
	text-align: center;
	height: 80upx;
	line-height: 80upx;
	background: #eee;
}
</style>