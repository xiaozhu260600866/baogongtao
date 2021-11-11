<template>
	<view class="pb50">
		<page ref="page"></page>
		<view class="rule" v-if="step==1">
			
			<view class="tit">实名认证使用协议</view>
			<view class="con"><u-parse :content="rule.content" /></view>
			
			<dx-footer-button type="primary" @click="step=2">我已阅读并同意以上协议</dx-footer-button>
		</view>
		<view v-else>
			<view class="Ttips">请如实上传身份证，保存后无法修改！</view>
			<view class="upload-IDcard">
				<view class="IDcard front" @click="scan=true">
					<image class="img" :src="idcardSrc"></image>
				</view>
			</view>
			<view class="IDcard-info bg-f" v-if="!formBtnDisabled">
				<weui-input v-model="formData.name" label="姓名：" type="text" name="name" disabled placeholder=" "></weui-input>
				<weui-input v-model="formData.idcardno" label="身份证号：" type="text" name="idcardno" disabled placeholder=" "></weui-input>
			</view>
			
			<view class="scan" v-if="scan">
				<camera device-position="back" flash="auto" @error="error" style="width: 100%; height: 500upx;">
					<cover-image src="/static/images/scan-frame/scan-img.png" class="scan-img"></cover-image>
				</camera>
				<view class="scan-text">请将身份证带人脸的一面放置白色框内</view>
				<view class="p20"><dx-button type="primary" block @click="takePhoto">拍照</dx-button></view>
				<view class="p20"><dx-button type="primary" block @click="selectPhoto">从相册选择</dx-button></view>
				<image mode="widthFix" class="photos-box" :src="src"></image>
			</view>
			
			<view class="m20">
				<dx-footer-button type="primary" :disabled="formBtnDisabled" @click="submit">提交</dx-footer-button>
			</view>
		</view>
	</view>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import { info } from "@/api/base";
import { authenticate } from "@/api/user";
import dxFooterButton from 'doxinui/components/button/footer-button.vue'
import dxButton from "doxinui/components/button/button"
import uParse from '@/components/gaoyia-parse/parse.vue'
import weuiInput from '@/components/tytrock/components/weui-input.vue'
export default {
	components: { uParse, dxFooterButton, dxButton, weuiInput },
	data() {
		return {
			rule: '',
			step: 1,
			idcardSrc: '/static/images/rza.jpg',
			scan: false,
			formData: {name:'', idcardno: '',birthday:'',nation:'',address:'',gender:''},
			formBtnDisabled: true,
		}
	},
	onLoad() {
		
	},
	onShow(){
		this.pageLoading(this)
		info({id:1}).then(res=>{
			this.rule = res.data.data;
			this.pageLoading(this,false);
		})
	},
	methods: {
		...mapMutations(['setUserInfo']),
		selectPhoto(){
			let that = this;
			uni.chooseImage({
			    count: 1,
			    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			    sourceType: ['album'], //从相册选择
			    success: function (res) {
					that.submitLoading(that,true,'正在分析身份证信息...')
			        console.log(res.tempFilePaths);
					that.idcardSrc = res.tempFilePaths[0]
					that.analysis(res.tempFilePaths[0]);
			    }
			});
		},
		takePhoto() {
			this.submitLoading(this,true,'正在分析身份证信息...')
			const ctx = uni.createCameraContext();
			let that = this;
			ctx.takePhoto({
				quality: 'high',
				success: (res) => {
					console.log(res);
					this.idcardSrc = res.tempImagePath
					that.analysis(res.tempImagePath);
					/*
					uni.uploadFile({
						url:that.$store.state.apiInterfaceUrl + '/user/idcard-upload',
						fileType: 'image',
						formData:{
							user_id: uni.getStorageSync('sysUser').user_id,
							token: that.$store.state.token,
							type: "image"
						},
						filePath: res.tempImagePath, 
						name: 'file',
						success: function(res){
							let resData = JSON.parse(res.data);
							if(resData.code == 0){
								that.formData.name = resData.data.data.name;
								that.formData.idcardno = resData.data.data.idcard;
								that.formData.birthday = resData.data.data.birthday;
								that.formData.address = resData.data.data.address;
								that.formData.gender = resData.data.data.gender;
								that.formData.nation = resData.data.data.nation;
								
								that.scan = false;
								that.submitLoading(that,false);
								that.formBtnDisabled = false;
							}else{
								that.scan = false;
								that.submitLoading(that,false);
								that.msgError(resData.msg);
								that.formBtnDisabled = true;
								that.idcardSrc = '/static/images/rza.jpg'
							}
						},
						fail: function(res){
							console.log('fail to upload image:'+res)
						},
					});
					*/
				}
			});
		},
		analysis(imagePath){
			var that = this;
			uni.uploadFile({
				url:that.$store.state.apiInterfaceUrl + '/user/idcard-upload',
				fileType: 'image',
				formData:{
					user_id: uni.getStorageSync('sysUser').user_id,
					token: that.$store.state.token,
					type: "image"
				},
				filePath: imagePath, 
				name: 'file',
				success: function(res){
					let resData = JSON.parse(res.data);
					if(resData.code == 0){
						that.formData.name = resData.data.data.name;
						that.formData.idcardno = resData.data.data.idcard;
						that.formData.birthday = resData.data.data.birthday;
						that.formData.address = resData.data.data.address;
						that.formData.gender = resData.data.data.gender;
						that.formData.nation = resData.data.data.nation;
						
						that.scan = false;
						that.submitLoading(that,false);
						that.formBtnDisabled = false;
					}else{
						that.scan = false;
						that.submitLoading(that,false);
						that.msgError(resData.msg);
						that.formBtnDisabled = true;
						that.idcardSrc = '/static/images/rza.jpg'
					}
				},
				fail: function(res){
					console.log('fail to upload image:'+res)
				},
			});
		},
		submit(){
			if(!this.formData.name || !this.formData.idcardno) return this.msgToast('请上传身份证');
			this.submitLoading(this);
			authenticate(this.formData).then(res=>{
				this.submitLoading(this,false);
				if(res.code==0){
					let userInfo = {
						data: res.data.worker
					}
					this.setUserInfo(userInfo);
					this.tytMessage(this,'success','提交成功');
					setTimeout(()=>{this.linkTo('/pages/user/authenticate/success')},1000);
				}else{
					this.msgToast(res.msg);
				}
			})
		}
	}
}
</script>

<style>
@import "./index.css";
</style>