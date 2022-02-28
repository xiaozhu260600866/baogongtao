<template>
	<view>
		<page ref="page"></page>
		<view>
			<dx-tabs-date></dx-tabs-date>
			<view class="order_lists">
				<view class="order_item block-sec" v-for="parent in orderLists">
					<view class="order_t ">
						<view class="left">
							<view class="p">订单编号：<text class="Arial">{{parent.created_at}}</text></view>
							<view class="p">下单日期：<text class="Arial">{{parent.order_no}}</text></view>
						</view>
						<view class="amount">
							<view class="price fs-20">+ {{parent.price}}</view>
						</view>
					</view>
					<orderPro :data="parent.products"></orderPro>
					<view class="order_count">共<text class="Arial plr3">{{parent.num}}</text>件商品
						实付：￥<text class="Arial fs-16">{{ parent.amount}}</text>
					</view>
					<view class="order_info bd-te plr15 ptb10 fs-15 fc-6">
						<view class="item">{{parent.getUser.name}}<text class="Arial pl8">{{parent.getUser.phone}}</text></view>
						<view class="item">地址：{{parent.getUser.address}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import orderPro from "@/components/orderPro"
	import dxTabsDate from "doxinui/components/tabs/tabs_date"
	export default {
		components:{orderPro,dxTabsDate},
		data() {
			return {
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
					getUser:{
						name:'东信科技',
						phone:'13380951183',
						address:'江门市蓬江区建设路82号金山大厦'
					},
					num: 3,
					amount: 239.00,
					status: 2,
					sendType: 1,
					price:215.1,
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
					getUser:{
						name:'陈先生',
						phone:'13359882263',
						address:'江门市蓬江区建设路82号金山大厦'
					},
					num: 3,
					amount: 139.00,
					status: 2,
					sendType: 2,
					price:115.1,
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
					getUser:{
						name:'梁小姐',
						phone:'13388696696',
						address:'江门市蓬江区建设路82号金山大厦'
					},
					num: 1,
					amount: 100.00,
					status: 1,
					price:90,
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