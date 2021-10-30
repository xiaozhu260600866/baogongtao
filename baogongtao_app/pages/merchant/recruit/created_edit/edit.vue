<template>
	<view>
		<page ref="page"></page>
		<view class="pb60">
			<view class="bg-f edit">
				<weui-input v-model="ruleform.name" label="招聘岗位" type="text" name="name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.class_value" label="职位类别" placeholder="请选择" name="class_value" type="manyselect"
				 dataKey="positionCalss" changeField="value" datatype="require"></weui-input>
				<weui-input v-model="ruleform.experience" label="经验要求" placeholder="请选择" type="select" name="experience" dataKey="experienceArr"
				 changeField="value"></weui-input>
				<weui-input v-model="ruleform.salary" label="薪资范围" placeholder="请选择" name="salary" changeField="value" type="select"
				 dataKey="emolumentArr"></weui-input>
				<weui-input v-model="ruleform.salary_date" label="发薪日期" type="text" name="salary_date"></weui-input>
				<weui-input v-model="ruleform.education" label="学历" placeholder="请选择" type="select" name="education" dataKey="educationArr"
				 changeField="value"></weui-input>
				<weui-input v-model="ruleform.rest" label="休假情况" placeholder="如：周末双休、月休四天等" type="text" name="rest" datatype="require"></weui-input>
				<weui-input v-model="ruleform.cost" myclass="textarea" label="工时费" placeholder="工序+工时费(小时/天算)" type="textarea" name="cost"></weui-input>
				<weui-input v-model="ruleform.require" myclass="textarea" label="要求" placeholder="如：年龄要求，性别要求等" type="textarea" name="require"
				 datatype="require"></weui-input>
				<weui-input v-model="ruleform.live" myclass="textarea" label="吃住情况" placeholder="如：包吃住或有补贴" type="textarea" name="live"
				 datatype="require"></weui-input>
				<weui-input v-model="ruleform.prepare" myclass="textarea" label="面试准备" placeholder="面试需要提供什么材料" type="textarea" name="prepare"
				 datatype="require"></weui-input>
			</view>
			<dxftButton type="primary" size="lg" @click="linkTo('/pages/merchant/recruit/created_edit/lists',1)">提交</dxftButton>
		</view>
	</view>
</template>

<script>
import dxftButton from "doxinui/components/button/footer-button"
export default {
	components: {dxftButton},
		data() {
			return {
				vaildate: {},
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				experienceArr:[
					{label:'不限',value: '不限'},
					{label:'1年以内',value: '1年以内'},
					{label:'1-3年',value: '1-3年'},
					{label:'3-5年',value: '3-5年'},
					{label:'5-10年',value: '5-10年'},
					{label:'10年以上',value: '10年以上'},
				],
				educationArr:[
					{label:'不限',value: '不限'},
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
			//this.ajax();
		},
		methods: {
			
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>