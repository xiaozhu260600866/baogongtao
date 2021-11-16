<template>
	<view>
		<page ref="page"></page>
		<view class="pb60">
			<view class="bg-f edit mb12">
				<view class="plr15 pt15 pb5 fw-bold">个人信息</view>
				<weui-input v-model="ruleform.name" label="姓名" type="text" name="name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.sex" label="性别" name="sex" changeField="value" type="radio" dataKey="sexsArr"
				 :radioType="true"></weui-input>
				<weui-input v-model="ruleform.work_status" label="身份" name="work_status" changeField="value" type="radio" dataKey="statusArr"
				 :radioType="true"></weui-input>
				<weui-input v-model="ruleform.working_date" label="参加工作年龄" type="number" name="working_date" datatype="require"></weui-input>
				<weui-input v-model="ruleform.birthday" label="出生日期" type="date" name="birthday" datatype="require"></weui-input>
				<weui-input v-model="ruleform.wechat" label="微信号" type="text" name="wechat"></weui-input>
				<weui-input v-model="ruleform.email" label="邮箱" type="text" name="email"></weui-input>
				<weui-input v-model="ruleform.education" label="学历" placeholder="请选择" type="select" name="education" dataKey="educationArr"
				 changeField="value"></weui-input>
			</view>
			<view class="bg-f edit">
				<view class="plr15 pt15 pb5 fw-bold">求聘信息</view>
				<weui-input v-model="ruleform.apply_status" label="求职状态" placeholder="请选择" name="apply_status" type="select"
				 changeField="value" dataKey="applyStatusArr"></weui-input>
				<weui-input v-model="ruleform.industry" label="行业" placeholder="请选择" name="industry" type="manyselect"
				 dataKey="industryData" changeField="value" datatype="require"></weui-input>
				<weui-input v-model="ruleform.salary" label="薪资范围" placeholder="请选择" name="salary" changeField="value" type="select"
				 dataKey="emolumentArr"></weui-input>
				<weui-input v-model="ruleform.advantage" myclass="textarea" label="个人优势" type="textarea" name="advantage" datatype="require"></weui-input>
				<weui-input v-model="ruleform.remark" myclass="textarea" label="备注" type="textarea" name="remark"></weui-input>
			</view>
			<dxftButton type="primary" size="lg" @click="submit()">提交</dxftButton>
		</view>
	</view>
</template>

<script>
import dxftButton from "doxinui/components/button/footer-button"
import {userinfo} from "@/api/user";
	import {attributes } from "@/api/base";
export default {
	components: {dxftButton},
		data() {
			return {
				vaildate: {},
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{
					sexs: 1,
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
			submit(){
				this.ruleform.token = uni.getStorageSync('token');
				this.vaildForm(this, res => {	
					if(res){
						this.postAjax("/api/auth/user/update", this.ruleform).then(msg => {
							if (msg.data.code == 0) {
								return this.goto("/pages/user/index/index",2);
							}
						});
					}
					
				})
			},
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>