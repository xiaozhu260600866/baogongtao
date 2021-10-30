<template>
	<view>
		<page ref="page"></page>
		<view class="pb60">
			<view class="block-sec edit-write">
				<view class="edit-write-title">联系人信息</view>
				<view @click="uploadHeaderImg">
					<weui-input v-model="ruleform.pic" label="头像" type="txt" name="header" myclass="headerPic" >
						<view slot="right" class="slot-right flex1 flex-between flex-middle">
							<image :src="ruleform.pic" class="img"></image>
							<view class="dxi-icon dxi-icon-right fs-12 fc-9"></view>
						</view>
					</weui-input>
				</view>
				<weui-input v-model="ruleform.name" label="姓名" type="text" name="name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.phone" label="电话" type="number" name="phone" datatype="require"></weui-input>
			</view>
			<view class="block-sec edit-write">
				<view class="edit-write-title">公司信息</view>
				<weui-input v-model="ruleform.company_name" label="公司" type="text" name="company_name" datatype="require"></weui-input>
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
					<image class="w-b100" :src="getSiteName + '/upload/images/user/800_'+cover" v-for="cover in ruleform.remark_pic_company" mode="widthFix"></image>
				</view>
				<!-- 添加内容前显示 -->
				<view class="add-info" @click="goto('/pages/merchant/info/intro?type=company',1)" v-else>
					<view class="main-color fs-16">+添加公司简介</view>
					<view class="fs-14 fc-6">让客户更好的了解你</view>
				</view>
				
				<weui-input v-model="ruleform.banner" label="滚动图片" type="upload" upurl='user' allowUpLoadNum="5" name="banner"></weui-input>
			</view>
			<dxftButton type="primary" size="lg" @click="linkTo('/pages/merchant/info/index',1)">提交</dxftButton>
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
				ruleform:{
					remark_company:'',
					remark_pic_company:[],
				},
				industryData: [{
					label: '服务类',
					value: '服务类',
					children: [
						{label: '工商财税法律',value: '工商财税法律'},
						{label: '咨询管理',value: '咨询管理'},
						{label: '数据信息',value: '数据信息'},
						{label: '人力资源',value: '人力资源'},
						{label: '电商营销',value: '电商营销'},
						{label: '医疗健康',value: '医疗健康'},
					]
				}, {
					label: '产品类',
					value: '产品类',
					children: [
						{label: '电子电工',value: '7'},
						{label: '五金管材',value: '8'},
						{label: '家电日用',value: '9'},
						{label: '机械设备',value: '10'},
					]
				}],
			}
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>