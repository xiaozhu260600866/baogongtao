<template>
	<view>
		<page ref="page"></page>
		<view class="pb60">
			<view class="block-sec edit-write">
				<view class="edit-write-title">联系人信息</view>
				<view @click="uploadHeaderImg">
					<weui-input v-model="ruleform.logoMinUrl" label="头像" type="txt" name="header" myclass="headerPic" >
						<view slot="right" class="slot-right flex1 flex-between flex-middle">
							<image :src="ruleform.logoMinUrl" class="img"></image>
							<view class="dxi-icon dxi-icon-right fs-12 fc-9"></view>
						</view>
					</weui-input>
				</view>
				<weui-input v-model="ruleform.charger_name" label="姓名" type="text" name="charger_name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.charger_phone" label="电话" type="number" name="charger_phone" datatype="require"></weui-input>
			</view>
			<view class="block-sec edit-write">
				<view class="edit-write-title">公司信息</view>
				<weui-input v-model="ruleform.name" label="公司" type="text" name="name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.position" label="职位" type="text" name="position"></weui-input>
				<weui-input v-model="ruleform.address" label="地址" type="location" name="address" datatype="require" navClass="dx-btn-blue"
				 @callback="location"></weui-input>
				<weui-input v-model="ruleform.industry" label="行业" name="industry" type="manyselect" dataKey="industryData"
				 changeField="value" datatype="require"></weui-input>
			</view>
			<view class="block-sec edit-write">
				<view class="edit-write-title">
					<text>公司简介</text>
					<text class="main-color edit-nav" v-if="ruleform.remark_company || ruleform.remark_pic_company.length"
					 @click="goto('/pages/merchant/info/intro?type=company',1)">编辑</text>
				</view>
				<!-- 添加内容后显示 -->
				<view class="detail-info" v-if="ruleform.remark_company || ruleform.remark_pic_company.length">
					<view class="content" v-if="ruleform.remark_company">{{ruleform.remark_company}}</view>
					<image class="w-b100" :src="getSiteName + '/upload/images/logo/800_'+cover" v-for="cover in ruleform.remark_pic_company" mode="widthFix"></image>
				</view>
				<!-- 添加内容前显示 -->
				<view class="add-info" @click="goto('/pages/merchant/info/intro?type=company',1)" v-else>
					<view class="main-color fs-16">+添加公司简介</view>
					<view class="fs-14 fc-6">让客户更好的了解你</view>
				</view>
				
				<weui-input v-model="ruleform.cover" label="滚动图片" type="upload" upurl='logo' allowUpLoadNum="5" name="cover"></weui-input>
			</view>
			<dxftButton type="primary" size="lg" @click="submit()">提交</dxftButton>
		</view>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	import {userinfo, action, logout} from "@/api/user";
	import {attributes } from "@/api/base";
	export default {
		components: {dxftButton},
		data() {
			return {
				vaildate: {},
				formAction: '/api/company/store',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{
					remark_company:'',
					remark_pic_company:[],
				},
				
				industryData: [],
			}
		},
		onShow(){
			// attributes({type:9}).then(res => {
			// 	this.industryData = res.data.lists;
			// })
			// userinfo({token:uni.getStorageSync('token')}).then((res)=>{
			//    this.ruleform =res.data.company;
			//    this.ruleform.cover = this.ruleform.cover ? this.ruleform.cover.split(",") : [];
			//    this.ruleform.remark_pic_company = this.ruleform.remark_pic_company ? this.ruleform.remark_pic_company.split(",") : [];
			// })
		},
		onLoad() {
			attributes({type:9,source:'app'}).then(res => {
				this.industryData = res.data.lists;
			})
			userinfo({token:uni.getStorageSync('token')}).then((res)=>{
			   this.ruleform =res.data.company;
			   this.ruleform.cover = this.ruleform.cover ? this.ruleform.cover.split(",") : [];
			   this.ruleform.remark_pic_company = this.ruleform.remark_pic_company ? this.ruleform.remark_pic_company.split(",") : [];
			   
				
			})
		},
		methods: {
			location(e){
				console.log(e);
			},
			
			submit(){
				this.ruleform.token = uni.getStorageSync('token');
				this.vaildForm(this, res => {	
					this.postAjax(this.formAction, this.ruleform).then(msg => {
						if (msg.data.code == 0) {
							return this.goto("/pages/merchant/index/index");
						}
					});
				})
			},
			uploadHeaderImg(){
				let uploadUrl =  this.getSiteName+ '/api/company/upload-pic';
				 wx.chooseImage({
				     count: 1, // 默认9
				     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				     success: res => {
				         var tempFilePaths = res.tempFilePaths;
				         // wx.showLoading({
				         //     title: '上传中',
				         // })
				         wx.uploadFile({ //上传服务器
				             url: uploadUrl, //仅为示例，非真实的接口地址
				             filePath: tempFilePaths[0],
				             name: 'file',
				             header: {
				                 //'content-type': 'multipart/form-data'
				             },
				             formData: {
				                 'upurl': "logo",
				             },
				             success: res => {
								 let data = JSON.parse(res.data);
								 console.log(data.data);
								 let file = data.data.filename;
								 this.ruleform.logoMinUrl = this.getSiteName + "/upload/images/logo/" +file;
								 this.ruleform.logo = file;
								 console.log("success",res);
								
				                
				             },
				             fail: function(res) {
				                 console.log(res);
				             },
				             complete: function(res) {
				                 console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
				             }
				         })
				     }
				 })   
			}
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>