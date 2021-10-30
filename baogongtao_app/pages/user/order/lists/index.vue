<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view >
			<view class="order-class bd-b bg-f">
				<view :class="['nav-tab',status == 1 ? 'cur' :'']" @click="status = 1">待确认</view>
				<view :class="['nav-tab',status == 2 ? 'cur' :'']" @click="status = 2">待开始</view>
				<view :class="['nav-tab',status == 3 ? 'cur' :'']" @click="status = 3">待进行</view>
				<view :class="['nav-tab',status == 4 ? 'cur' :'']" @click="status = 4">已完成</view>
			</view>
			<orderInfo></orderInfo>
			<hasMore :parentData="data" source="order"></hasMore>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	import orderInfo from '@/components/orderInfo'
	export default {
		components:{orderInfo},
		data() {
			return {
				status: 1
			}
		},
		methods: {
			
		}
	}
</script>
