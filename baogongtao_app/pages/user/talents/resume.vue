<template>
	<view>
		<page ref="page"></page>
		<view class="pb60 resume">
			<view class="step1 bg-f" v-if="step == 1">
				<view class="dx-cell upload-head">
					<view class="dx-cell_hd flex1">
						<view class="dx-label fs-14">头像</view>
						<view class="fs-16 fc-8 mt10">真实的头像更能吸引HR的关注</view>
					</view>
					<view class="dx-cell_bd">
						<image class="img" :src="avatarUrl?avatarUrl:'https://bgt.doxinsoft.com/images/user.png'" mode="aspectFill"
						 @click="uploadAvatar"></image>
						<view style="height: 1upx;overflow:hidden;"><avatar @upload="avatarUploaded" ref="avatar"></avatar></view>
					</view>
				</view>
				<weui-input v-model="ruleform.name" label="姓名" placeholder="请填写真实姓名或填写如：王先生" type="text" name="name"
				 datatype="require"></weui-input>
				<weui-input v-model="ruleform.sex" label="性别" name="sex" changeField="value" type="radio" dataKey="sexsArr"
				 :radioType="true"></weui-input>
				<weui-input v-model="ruleform.birthday" label="出生年月" type="date" name="birthday" datatype="require"></weui-input>
				<weui-input v-model="ruleform.education" label="最高学历" type="select" name="education" dataKey="educationArr"
				 changeField="value"></weui-input>
				<weui-input v-model="ruleform.experience" label="工作经验" type="text" name="experience" ></weui-input>
				<dxftButton type="primary" size="lg" @click="submit(1)">下一步</dxftButton>
			</view>
			<view class="stpe2 bg-f" v-if="step == 2">
				<view class="tips flex-between flex-middle lh-1 fs-14 fc-red plr15 ptb12">
					<view>距离调薪职位又近了一步哦！</view>
					<view class="dxi-icon dxi-icon-off fs-12"></view>
				</view>
				<view class="fs-16 fc-9 plr15 ptb10">完善的简介更容易获得HR青睐！</view>
				<weui-input v-model="ruleform.position" label="期望职位" name="position" type="manyselect" dataKey="positionData" changeField="value"
				 datatype="require"></weui-input>
				<weui-input v-model="ruleform.industry" label="期望行业" name="industry" type="manyselect" dataKey="industryData" changeField="value"
				 datatype="require"></weui-input>
			<!-- 	<dx-address v-model="ruleform.work_place" labeltxt="工作城市"></dx-address> -->
				<div><dx-address v-model="ruleform.address" datatype="require" ref="address" :addressHidden="true"></dx-address></div>
				
				<weui-input v-model="ruleform.salary" label="薪资要求" name="salary" changeField="value" type="select" dataKey="emolumentArr"
				 datatype="require"></weui-input>
				<weui-input v-model="ruleform.apply_status" label="求职状态" name="apply_status" type="select" changeField="value" dataKey="applyStatusArr"
				 datatype="require"></weui-input>
				<weui-input v-model="ruleform.remark" myclass="textarea" label="个人职业标签(选填)" placeholder="让HR快速了解你" type="textarea"
				 name="remark"></weui-input>
				<dxftButton type="primary" size="lg" @click="submit(2)">提交</dxftButton>
			</view>
		</view>
	</view>
</template>

<script>
import dxftButton from "doxinui/components/button/footer-button"
import {userinfo} from "@/api/user";
import {attributes } from "@/api/base";
import avatar from "@/components/yq-avatar/yq-avatar.vue";
export default {
	components: {dxftButton,avatar},
		data() {
			return {
				sysUser: uni.getStorageSync('sysUser'),
				vaildate: {},
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				step: 2,
				avatarUrl:'',
				ruleform:{
					sex: 1,
					status: 1,
				},
				sexsArr: [
					{label: '男',value: 1},
					{label: '女',value: 2}
				],
				statusArr: [
					{label: '职场人',value: 1},
					{label: '学生',value: 2}
				],
				industryData:[],
				applyStatusArr:[
					{label:'离职-随时到岗',value: '离职-随时到岗'},
					{label:'在职-月内到岗',value: '在职-月内到岗'},
					{label:'在职-考虑机会',value: '在职-考虑机会'},
					{label:'在职-暂不考虑',value: '在职-暂不考虑'},
				],
				educationArr:[
					{label:'初中及以下',value: '初中及以下'},
					{label:'中专/中技',value: '中专/中技'},
					{label:'高中',value: '高中'},
					{label:'大专',value: '大专'},
					{label:'本科',value: '本科'},
					{label:'硕士',value: '硕士'},
					{label:'博士',value: '博士'},
				],
				emolumentArr:[
					{label:'不限',value: '不限'},
					{label:'1-3k',value: '1-3k'},
					{label:'3-6k',value: '3-6k'},
					{label:'6-8k',value: '6-8k'},
					{label:'8-10k',value: '8-10k'},
					{label:'10-15k',value: '10-15k'},
					{label:'15-20k',value: '15-20k'},
					{label:'20-30k',value: '20-30k'},
					{label:'面议',value: '面议'},
				],
				positionData:[
					{label:'技术员',value: '技术员'},
					{label:'文员',value: '文员'},
					{label:'机械工程师',value: '机械工程师'},
					{label:'行政管理',value: '行政管理'},
				]
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
			this.shareSource(this, '商城');
		},
		onLoad(options) {
			attributes({type:9,source:'app'}).then(res => {
				this.industryData = res.data.lists;
			})
			userinfo({token:uni.getStorageSync('token')}).then((res)=>{
				this.ruleform = res.data.user.get_user_info;
				
			})
			//this.ajax();
		},
		methods: {
			uploadAvatar(){
				this.$refs.avatar.fChooseImg(0,{
					selWidth: "300upx", selHeight: "300upx",
					expWidth: '260upx', expHeight: '260upx',
					canRotate: 'false'
				});
			},
			avatarUploaded(rsp) {
				//console.log(rsp)
				
				uni.uploadFile({
					url: this.$store.state.apiInterfaceUrl + '/base/upload',
					filePath: rsp.path,
					name: 'file',
					formData: {pathname:'user/' + this.sysUser.user_id,type:'image'},
					success: (uploadFileRes) => {
						let dataObj = JSON.parse(uploadFileRes.data);
						console.log(dataObj);
						if(dataObj.code!=0){
							return this.msgError(dataObj.msg);
						}
						this.ruleform.avatar = dataObj.data.fileName;
						this.avatarUrl = rsp.path; //更新头像方式一
						//rsp.avatar.imgSrc = rsp.path; //更新头像方式二
					}
				});
			},
			submit(step){
				this.ruleform.token = uni.getStorageSync('token');
				this.vaildForm(this, res => {	
					if(res){
						if(step ==2){
							this.postAjax("/api/auth/user/update", this.ruleform).then(msg => {
								if (msg.data.code == 0) {
									return this.goto("/pages/user/index/index",2);
								}
							});
						}else{
							this.step =2;
						}
						
					}
					
				})
			},
		}
	}
</script>
<style lang="scss">
@import "index.scss";
@import "xiaozhu/css/dx-input.css";
</style>