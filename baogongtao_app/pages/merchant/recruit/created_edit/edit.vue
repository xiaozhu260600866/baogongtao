<template>
	<view>
		<page ref="page"></page>
		<view class="pb60">
			<view class="bg-f edit">
				<weui-input v-model="ruleform.job_position" label="招聘岗位" type="text" name="job_position" datatype="require"></weui-input>
				<weui-input v-model="ruleform.work_place" label="工作区域" type="text" name="work_place" datatype="require"></weui-input>
				<weui-input v-model="ruleform.job_category" label="职位类别" placeholder="请选择" name="job_category" type="manyselect"
				 dataKey="positionCalss" changeField="label" datatype="require"></weui-input>
				<weui-input v-model="ruleform.experience" label="经验要求" placeholder="请选择" type="select" name="experience" dataKey="experienceArr"
				 changeField="label"></weui-input>
				<weui-input v-model="ruleform.salary" label="薪资范围" placeholder="请选择" name="salary" changeField="label" type="select"
				 dataKey="emolumentArr"></weui-input>
				<weui-input v-model="ruleform.salary_date" label="发薪日期" type="text" name="salary_date"></weui-input>
				<weui-input v-model="ruleform.education" label="学历" placeholder="请选择" type="select" name="education" dataKey="educationArr"
				 changeField="label"></weui-input>
				<weui-input v-model="ruleform.home_date" label="休假情况" placeholder="如：周末双休、月休四天等" type="text" name="home_date" datatype="require"></weui-input>
				<weui-input v-model="ruleform.work_hour" myclass="textarea" label="工时费" placeholder="工序+工时费(小时/天算)" type="textarea" name="work_hour"></weui-input>
				<weui-input v-model="ruleform.need" myclass="textarea" label="要求" placeholder="如：年龄要求，性别要求等" type="textarea" name="need"
				 datatype="require"></weui-input>
				<weui-input v-model="ruleform.live" myclass="textarea" label="吃住情况" placeholder="如：包吃住或有补贴" type="textarea" name="live"
				 datatype="require"></weui-input>
				<weui-input v-model="ruleform.interview" myclass="textarea" label="面试准备" placeholder="面试需要提供什么材料" type="textarea" name="interview"
				 datatype="require"></weui-input>
			</view>
			<dxftButton type="primary" size="lg" @click="submit()">提交</dxftButton>
		</view>
	</view>
</template>

<script>
import dxftButton from "doxinui/components/button/footer-button"
import {attributes } from "@/api/base";
export default {
	components: {dxftButton},
		data() {
			return {
				vaildate: {},
				formAction: '/api/company/recruit-store',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				positionCalss:[],
				experienceArr:[
				
				],
				educationArr:[
					
				],
				emolumentArr:[
					
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
			attributes({type:10,source:'app'}).then(res => {
				this.positionCalss = res.data.lists;
			})
			attributes({type:11,source:'app'}).then(res => {
				this.experienceArr = res.data.lists;
			})
			attributes({type:12,source:'app'}).then(res => {
				this.emolumentArr = res.data.lists;
			})
			attributes({type:13,source:'app'}).then(res => {
				this.educationArr = res.data.lists;
			})
			if(options.id){
				this.ajax();
			}
			//this.getError("aaaqq")
			//this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this,{token:uni.getStorageSync('token')}).then(msg => {
					   this.ruleform = msg.data.data;
				});
			},
			submit(){
				this.ruleform.token = uni.getStorageSync('token');
				this.ruleform.company_id = uni.getStorageSync("sysCompany").id;
				this.vaildForm(this, res => {	
					if(res){
						this.postAjax(this.formAction, this.ruleform).then(msg => {
							if (msg.data.code == 0) {
								return this.goto("/pages/merchant/index/index");
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