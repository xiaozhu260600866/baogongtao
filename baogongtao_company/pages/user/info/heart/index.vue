<template>
	<view class="pb50">
		<page :parentData="data" :formAction="formAction"></page>
		<view class="pb10">
			<view class="hearth-con bg-f">
				<weui-input v-model="ruleform.remark" type="textarea" name="remark" datatype="require" placeholder="请输入内容"></weui-input>
			</view>
			<view class="mtb30 mlr15 fs-12 fc-9 lh-20">请不要发布广告信息，暴力色情信息，攻击性言语，盗用资料等违法内容，谢谢配合</view>
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
			}
		},
		onLoad() {
			
		},
		methods: {
		}
	}
</script>
