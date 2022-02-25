<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="pb60">
			<!-- 配送 -->
			<view id="address" class="block-sec">
				<view class="add-info flex-middle p15">
					<view class="licon pr15">
						<span class="dxi-icon dxi-icon-location-fill2 fs-28 fc-blue"></span>
					</view>
					<view class="info flex1">
						<view class="name fs-16">
							<text>{{address.name}}</text>
							<text class="Arial pl10">{{address.phone}}</text>
						</view>
						<view class="add-detail fs-14 fc-6">地址：{{ address.province }} {{ address.city }} {{ address.area }} {{ address.address }}</view>
					</view>
				</view>
			</view>
			
			<!-- 产品 -->
			<orderPro :data="products" myclass="block-sec"></orderPro>
			
			<view class="block-sec orderDetail">
				<weui-input v-model="ruleform.shipping" label="送货方式" type="txt" name="shipping"></weui-input>
				<weui-input v-model="ruleform.pay_method" label="付款方式" type="txt" name="pay_method"></weui-input>
				<weui-input v-model="ruleform.remark" label="买家留言" type="txt" name="remark"></weui-input>
			</view>
			
			<view class="block-sec orderDetail" v-if="ruleform.status != 2">
				<weui-input label="快递公司" v-model="ruleform.express_name" type="txt" name="name"></weui-input>
				<weui-input label="快递单号" v-model="ruleform.express_no" type="txt" name="name"></weui-input>
				<weui-input label="发货时间" v-model="ruleform.express_at" type="txt" name="name"></weui-input>
			</view>
			<view id="order-footer">
				<view class="lprice fs-14 pl10"></view>
				<view class="rbtn">
					<!-- 待发货-->
					<view class="btn-item" v-if="ruleform.status == 2">
						<!-- 如果是邮寄 -->
						<view class="btn-nav ibtn" @click="$refs.expressDiag.express = true">发货</view>
						<!-- 如果是自提 -->
						<view class="btn-nav" @click="$refs.cancel.thisPrompt = true">核销</view>
					</view>
				</view>
			</view>
		</view>
		<express ref="expressDiag"></express>
		<dx-prompt content="是否确认核销订单" ref="cancel"></dx-prompt>
	</view>
</template>

<script>
	import orderPro from "@/components/orderPro"
	import express from "./layouts/express"
	import dxPrompt from "doxinui/components/diag/prompt"
	export default {
		components:{orderPro,express,dxPrompt},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{
					myAccount:9999.00,
					shipping:'邮寄',
					pay_method: '微信支付',
					remark: '买三送一',
					express_name:'韵达快递',
					express_no:'YD202202240005351',
					express_at: '2022-02-24 08:33:55',
					status: 2,
				},
				address:{
					name:'东信科技',
					phone: 13318639080,
					province:'广东省',
					city: '江门市',
					area:'蓬江区',
					address:'建设路82号金山大厦之2十楼1001室江门市东信科技有限公司',
					
				},
				teamHead:{
					community_address:'建设路美宜佳商家',
					community_company_name:'美宜佳',
					phone: 13318639080,
					getUser:{
						headerPic:'https://boss.doxinsoft.com/upload/images/product/300_saJsHFHtO4.jpg'
					},
					name:'美宜佳'
				},
				products:[{
					getProduct:{
						firstCover:'https://boss.doxinsoft.com/upload/images/product/300_LSOcjTpszM.jpeg',
						name:'宜兴紫砂壶 纯全手工泡茶壶 老紫泥办公茶具扁腹壶230毫升 刻绘款',
						unit:'个'
					},
					amount:100.00,
					num:1,
					is_info:0,
					attribute:'',
				}],
				shipping: [
					{label: '邮寄',value: 1},
					{label: '到店自提',value: 2},
					{label: '上门服务',value: 4},
				],
				pay_methods: [
					{label: '微信支付',value: 1},
					{label: '余额支付',value: 2},
				],
				
				expressArr:[
					{label:'顺丰速运',value:'顺丰速运'},
					{label:'中通快递',value:'中通快递'},
					{label:'申通快递',value:'申通快递'},
					{label:'韵达快递',value:'韵达快递'},
				]
				
			}
		},
		methods: {
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					
				});
			}
		},
		onLoad(options) {
			//this.ajax();
			
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
	}
</script>

<style scoped="" lang="scss">
@import './index.scss';
</style>
