<template>
	<view class="detail">
		<page ref="page"></page>
		<view v-if="pageshow">
			<view class="sign-pic">
				<!-- <image :src="detailData.get_company.workerSignFileUrl" mode="widthFix" style="width: 100%;"></image> -->
				<u-parse :content="content" />
				
				<view class="jia-path">
					甲方（盖章）：</image>
				</view>
				<view class="jia-date">
					日期：{{ startDate.year }}年{{ startDate.month }}月{{ startDate.date }}日
				</view>
				<view class="sign-path">
					乙方（签字）：<image :src="signFilePath" class="sign-path-img" mode="widthFix" v-if="signFilePath"></image>
				</view>
				<view class="sign-date">
					日期：{{ startDate.year }}年{{ startDate.month }}月{{ startDate.date }}日
				</view>
				<view class="jia-stamp"><image :src="dataDetail.employerStampPath" class="stamp-path-img" mode="widthFix"></image></view>
			</view>
			<view class="foot" v-if="dataDetail.status==0">
				<view class="sign" @click="signAct"><i class="iconfont icon-sign"></i> 签字</view>
				<view class="next main-bg" @click="confirm">确认签署</view>
			</view>
		</view>
		
		<view class="sign-panel" v-show="signShow">
			<view class="sign-panel-con"><catSignature canvasId="canvas1"  @closeSign="closeSign" @save="saveSign" :visible="signShow" ref="sign" /></catSignature></view>
		</view>
		
		<tui-modal :show="statementVisible" @cancel="statementVisible=false" :custom="true" :padding="0">
			<view class="tui-modal-custom">
				<view class="h1">您正在进行签署合同操作</view>
				<view>请您认证阅读<view class="a main-color" @click="linkTo('/pages/info/info?id=6',1)">《员工劳动合同告知声明》</view>，继续使用代表您已阅读并同意<view class="a main-color" @click="linkTo('/pages/info/info?id=6',1)">《员工劳动合同告知声明》</view>。</view>
				<view class="btn main-bg" @click="statementVisible=false">我知道了</view>
			</view>
		</tui-modal>
		
	</view>
</template>

<script>
import { sign, signConfirm } from "@/api/user";
import { info } from "@/api/base";
import tuiModal from "@/components/ThorUI/modal/modal"
import catSignature from "@/components/cat-signature/cat-signature"
import uParse from '@/components/gaoyia-parse/parse.vue'
export default {
	components:{
		tuiModal,
		catSignature,
		uParse
	},
	data() {
		return {
			sysUser: uni.getStorageSync('sysUser'),
			pageshow: false,
			dataDetail: {},
			content: '',
			sign_id: '',
			detailData: [],
			signShow: false,
			signFilename: '',
			signFilePath: '',
			signStatus: false,
			//dateObj:new Date(),
			startDate:{
				year: new Date().getFullYear(),
				month: new Date().getMonth(),
				date: new Date().getDate()
			},
			msgModal: true,
			confirmBtn: true,
			statementVisible: false,
		}
	},
	onLoad(options) {
		this.sign_id = options.id;
	},
	onShow(){
		this.statementVisible = true;
		this.pageshow = true;
		this.getData();
		//this.dateObj = new Date();
	},
	methods: {
		getData(){
			this.pageLoading(this);
			if(this.sign_id){
				sign({id:this.sign_id}).then((res)=>{
					this.dataDetail = res.data.data;
					if(this.dataDetail.status == 1){
						this.startDate.year = res.data.data.sign_date.substr(0,4);
						this.startDate.month = res.data.data.sign_date.substr(5,2);
						this.startDate.date = res.data.data.sign_date.substr(8,2);
						this.content = res.data.data.content;
						this.signFilePath = res.data.data.signUrl;
						this.pageLoading(this,false);
					}else{
						info({id:5, sign_id:this.sign_id}).then(res=>{
							this.content = res.data.data.content;
							this.pageLoading(this,false);
							
						})
					}
				})
			}
		},
		signAct(){
			this.$refs.sign.clear();
			this.signShow = true;
		},
		closeSign: function(_signed){
			console.log(_signed)
			if(_signed){
				this.signStatus = true;
				this.$refs.sign.save();
			}else this.signStatus = false;
			
			this.signShow = false;
		},
		saveSign: function(val){
			console.log(val)
			this.signFilePath = val;
			uni.uploadFile({
				url: this.$store.state.apiInterfaceUrl + '/user/sign-upload',
				filePath: val,
				name: 'file',
				formData: {
					token: uni.getStorageSync('token'),
				},
				success: (uploadFileRes) => {
					let res = JSON.parse(uploadFileRes.data);
					if(res.code == 0) this.signFilename = res.data.filename;
					else return this.msgError(res.msg);
				}
			});
			
		},
		renew(){
			return this.linkTo('/pages/user/sign/show',1);
		},
		confirm(){
			if(!this.confirmBtn) return
			if(!this.signStatus) return this.msgToast('请先签字');
			this.submitLoading(this)
			signConfirm({id:this.dataDetail.id, sign:this.signFilename}).then(res=>{
				this.submitLoading(this,false)
				if(res.code==0){
					this.confirmBtn = false;
					this.tytMessage(this,'success',res.msg)
					this.timeoutLinkTo(this,'success?id=' + this.dataDetail.id);
				}else this.msgToast(res.msg)
			})
		}
	},
	onPullDownRefresh(){
		this.getData();
	}
}
</script>

<style>
@import "./lists.css";
.wxParse .p{min-height: 30upx;margin-bottom: 15upx;}
.tui-modal-custom{position: relative;padding: 40upx 64upx 150upx 64upx;}
.tui-modal-custom .h1{font-size: 32upx;font-weight: bold;margin-bottom: 20upx;}
.tui-modal-custom .a{display: inline;}
.tui-modal-custom .btn{position: absolute;bottom: 0;left: 0;right: 0;height: 90upx;line-height: 90upx;color: #fff;}
.jia-stamp{position: absolute;bottom: 180upx;left: 160upx;}
.stamp-path-img{height: 200upx;width: 200upx;}
</style>
