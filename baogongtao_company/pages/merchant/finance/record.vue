<template>
	<view>
		<page ref="page"></page>
		<view>
			<view class="record-count flex-between plr15 pt8">
				<view class="left fs-15 fc-9 lh-34">
					<text>收</text>
					<text>￥{{income?income:'-'}}</text>
					<text class="pl10">支</text>
					<text>￥{{expend?expend:'-'}}</text>
				</view>
				<view class="right">
					<weui-input v-model="ruleform.record" name="record" changeField="value" type="select" dataKey="recordArr"></weui-input>
				</view>
			</view>
			<view class="team-group">
				<view class="team-item block-sec flex-middle p15" v-for="item in lists">
					<view class="info flex1 lh-1">
						<view class="fs-16">{{item.name}}</view>
						<view class="fs-14 Arial fc-7 mt8">{{item.created_at}}</view>
					</view>
					<view class="price fs-14 pl15" :class="item.status == 2?'':'fc-3'">
						<text>{{item.status == 2?'-':'+'}}</text>
						<text class="fs-20 plr3">{{item.amount}}</text>
						<text>元</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mpType: 'page', //用来分清父和子组件
				ruleform:{
					record: '全部类型',
				},
				lists:[{
					name:'商品收入',
					amount:60.00,
					status: 1,
					created_at: '2022-02-25 17:33:26',
				},{
					name:'提现',
					amount:55.00,
					status: 2,
					created_at: '2022-02-02 08:33:26',
				}],
				recordArr:[
					{label:'全部类型',value:'全部类型'},
					{label:'全部收入',value:'全部收入'},
					{label:'全部支出',value:'全部支出'},
					{label:'售后退款',value:'售后退款'},
					{label:'提现',value:'提现'},
				]
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