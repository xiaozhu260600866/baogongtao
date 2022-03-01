<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<dx-tabs :tabs="[
				
				{value: 3,name: '待发货'},
				{value: 5,name: '已发货'},
				{value: 9,name: '已完成'}
			]" v-model="data.query.status" @change="ajax"  :height="100" :selectedSize="32" :size="32"></dx-tabs>
		</view>
		<view class="order_lists" v-if="data.show">
			<view class="order_item block-sec" v-for="parent in data.lists.data">
				<view class="order_t ">
					<view class="left">
						<view class="p">订单编号：<text class="Arial">{{parent.created_at}}</text></view>
						<view class="p">下单日期：<text class="Arial">{{parent.order_no}}</text></view>
					</view>
					<view class="del">
						<view class="del-icon dxi-icon dxi-icon-del" @click="delOrder(parent)"></view>
					</view>
				</view>
				<orderPro :data="parent.products"></orderPro>
				<view class="order_count">共<text class="Arial plr3">{{parent.num}}</text>件商品
					实付：￥<text class="Arial fs-16 fc-red">{{ parent.amount}}</text>
				</view>
				<view class="btn-group">
					<!-- 待发货 -->
					<view class="btn-item">
						<view class="btn-nav" @click="goto('/pages/merchant/order/detail?id='+parent.id,1)">订单详情</view>
						<!-- 如果是邮寄显示 -->
						<view class="btn-nav" @click="ruleform = parent;$refs.expressDiag.thisDiag= true" v-if="parent.shipping == 1 && parent.status ==3" >发货</view>
						<!-- 如果是到店自提显示 -->
						<view class="btn-nav" @click="row= parent;$refs.cancel.thisPrompt = true" v-if="parent.shipping == 2 && parent.status ==3">核销</view>
						<view class="btn-nav" @click="row= parent;$refs.cancel.thisPrompt = true" v-if="parent.status ==5">完成</view>
					</view>
				
					
				</view>
			</view>
		</view>
		<dx-diag title="请填写物流信息" :titBold="false" ref="expressDiag" @callBack="express = false" myclass="expressDiag">
			<view class="express">
				<weui-input v-model="ruleform.express_name" label="快递" name="express_name" changeField="value" type="select" dataKey="expressArr"
				 left datatype="require"></weui-input>
				<weui-input v-model="ruleform.express_no" label="单号" type="text" name="express_no" datatype="require"></weui-input>
			</view>
			<view class="btn">
				<dx-button type="primary" size="lg" block @click="submit">确认</dx-button>
			</view>
		</dx-diag>
		<dx-prompt content="是否确认核销订单" ref="cancel"  @confirmCallBack="finish()"></dx-prompt>
	</view>
</template>

<script>
	import dxTabs from "doxinui/components/tabs/tabs"
	import orderPro from "@/components/orderPro"
	import dxButton from "doxinui/components/button/button"
	import dxPrompt from "doxinui/components/diag/prompt"
	import dxDiag from "doxinui/components/diag/diag"
	export default {
		components:{dxTabs,orderPro,dxButton,dxPrompt,dxDiag},
		data() {
			return {
				formAction: '/admin/shop/order/lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				row:{},
				orderLists:[{
					order_no:'2021032215332102',
					created_at:'2021-03-22 15:33:21',
					products:[{
						getProduct:{
							firstCover:'https://boss.doxinsoft.com/upload/images/product/300_LSOcjTpszM.jpeg',
							name:'宜兴紫砂壶 纯全手工泡茶壶 老紫泥办公茶具扁腹壶230毫升 刻绘款',
							unit:'个'
						},
						amount:200.00,
						num:2,
						is_info:0,
						attribute:'',
					},{
						getProduct:{
							firstCover:'https://boss.doxinsoft.com/upload/images/product/300_k3uBHMtTuT.jpeg',
							name:'特步男鞋春季新款夏季网面透气运动鞋男网鞋跑步鞋运动休闲鞋子官方旗 黑白（网面） ',
							unit:'个'
						},
						amount:139.00,
						num:1,
						is_info:1,
						attribute:'40',
					}],
					num: 3,
					amount: 239.00,
					status: 2,
					sendType: 1,
				},{
					order_no:'2021032215332102',
					created_at:'2021-03-22 15:33:21',
					products:[{
						getProduct:{
							firstCover:'https://boss.doxinsoft.com/upload/images/product/300_k3uBHMtTuT.jpeg',
							name:'特步男鞋春季新款夏季网面透气运动鞋男网鞋跑步鞋运动休闲鞋子官方旗 黑白（网面） ',
							unit:'个'
						},
						amount:139.00,
						num:1,
						is_info:1,
						attribute:'40',
					}],
					num: 3,
					amount: 239.00,
					status: 2,
					sendType: 2,
				},{
					order_no:'2021032109272601',
					created_at:'2021-03-21 09:27:26',
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
					num: 1,
					amount: 100.00,
					status: 1,
				}],
				expressArr:[
					{label:'顺丰速运',value:'顺丰速运'},
					{label:'中通快递',value:'中通快递'},
					{label:'申通快递',value:'申通快递'},
					{label:'韵达快递',value:'韵达快递'},
				]
			}
		},
		methods: {
			submit(){
				if(!this.ruleform.express_name){
					return this.getError("请输入快递号");
				}
				if(!this.ruleform.express_no){
					return this.getError("请输入单号");
				}
				this.ruleform.type = 2;
				this.postAjax("/admin/shop/order/modify",this.ruleform).then(msg=>{
					if(msg.data.status == 2){
						this.ajax();
					}
				})
				
			},
			finish(){
				this.postAjax("/admin/shop/order/change-order-status",{id:this.row.id,status:9}).then(msg=>{
					if (msg.data.status == 2) {
						this.ajax();
					}
				})
			},
			delOrder(item) {
				uni.showModal({
					title: '提示',
					content: '您确定要删除这个订单吗',
					success: res => {
						if (res.confirm) {
							this.postAjax('/ajax/mydel', {
								id: item.id,
								tablename: 'shop_orders'
							}).then(msg => {
								if (msg.data.status == 2) {
									this.ajax();
								}
							});
						}
					}
				})
			},
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					
				});
			}
		},
		onLoad(options) {
			this.ajax();
			
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
