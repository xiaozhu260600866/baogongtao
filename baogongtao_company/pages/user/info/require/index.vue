<template>
	<view class="pb50">
		<page :parentData="data" :formAction="formAction"></page>
		<view class="pb10">
			<view class="fill_in">
				<weui-input v-model="ruleform.height" label="身高" type="select" name="height"></weui-input>
				<weui-input v-model="ruleform.city" label="现居" type="select" name="city"></weui-input>
				<weui-input v-model="ruleform.constellation" label="星座" type="select" name="constellation"></weui-input>
				<weui-input v-model="ruleform.age" label="年龄" type="select" name="age"></weui-input>
				<weui-input v-model="ruleform.wages" label="月薪" type="select" name="wages"></weui-input>
			</view>
			<view class="fill_in">
				<weui-input v-model="ruleform.nativePlace" label="籍贯" type="select" name="nativePlace"></weui-input>
				<weui-input v-model="ruleform.education" label="学历" type="select" name="education"></weui-input>
				<weui-input v-model="ruleform.marryStaus" label="婚姻状况" type="select" name="marryStaus"></weui-input>
				<weui-input v-model="ruleform.profession" label="职业" type="select" name="profession"></weui-input>
			</view>
			<view class="fill_in">
				<weui-input v-model="ruleform.religion" label="对方宗教限制？" type="select" name="religion" dataKey="religionArr" changeField="value"></weui-input>
				<weui-input v-model="ruleform.children" label="介意对方有子女" type="select" name="children" dataKey="childrenArr" changeField="value"></weui-input>
				<weui-input v-model="ruleform.smoking" label="建议对方抽烟？" type="select" name="smoking" dataKey="smokingArr" changeField="value"></weui-input>
				<weui-input v-model="ruleform.drink" label="介意对方喝酒" type="select" name="drink" dataKey="drinkArr" changeField="value"></weui-input>
				<weui-input v-model="ruleform.plan" label="我的结婚计划" type="select" name="plan" dataKey="planArr" changeField="value"></weui-input>
			</view>
			<view id="footer-btn">
				<view class="f-dx-btn dx-btn-red">提交</view>
			</view>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				ruleform: {},
				religionArr: [
					{label: '不限',value: 0},
					{label: '基督教',value: 1},
					{label: '佛教',value: 2},
					{label: '伊斯兰教',value: 3},
					{label: '天主教',value: 4},
					{label: '道教',value: 5},
					{label: '其它宗教',value: 6},
				],
				childrenArr: [
					{label: '不限',value: 0},
					{label: '介意',value: 1},
					{label: '不介意',value: 2},
				],
				smokingArr: [
					{label: '不限',value: 0},
					{label: '介意',value: 1},
					{label: '完全不介意',value: 2},
					{label: '不介意偶尔抽',value: 3},
				],
				drinkArr: [
					{label: '不限',value: 0},
					{label: '介意',value: 1},
					{label: '完全不介意',value: 2},
					{label: '不介意偶尔喝酒',value: 3},
				],
				planArr: [
					{label: '不限',value: 0},
					{label: '半年内',value: 1},
					{label: '一年内',value: 2},
					{label: '两年内',value: 3},
					{label: '三年内',value: 4},
				],
			}
		},
		onLoad() {
			
		},
		methods: {
		}
	}
</script>
