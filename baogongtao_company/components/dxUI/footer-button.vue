<template>
	<view class="ft-btn">
		<dx-button :type="type" :plain="plain" :disabled="disabled" :icon="iocn" :round="round" block @click="handleClick" @getuserinfo="bindgetuserinfo" :form-type="formType">
			<slot></slot>
		</dx-button>
	</view>
</template>

<script>
	import dxButton from "./button.vue"
	export default{
		props:{
			type: {
				type: String, //Stirng,Object,Boolean,Array
				default: ''
			},
			size: {
				type: String,
				default: ''
			},
			round: {
				type: Boolean,
				default: false
			},
			block: {
				type: Boolean,
				default: false
			},
			plain: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			icon: {
				type: String,
				default: ''
			},
			fixed: {
				type: Boolean,
				default: false
			},
			loading: {
				type: Boolean,
				default: false
			},
			formType: {
				type: String,
				default: ''
			}
		},
		components: {
			dxButton
		},
		data(){
			return {
			}
		},
		methods:{
			handleClick() {
				if (this.selfDisabled) {
					return false;
				}
				this.$emit('click', {})
			},
			bindgetuserinfo({
				detail = {}
			} = {}) {
				this.$emit('getuserinfo', detail);
			},
		}
	}
</script>
<style>
.ft-btn{position: fixed;bottom: 0;left: 0;background-color: #fff;border-top: 1upx #f5f5f5 solid;width: 100%;padding: 12upx 20upx}
.ft-btn .dxi-btn{margin: 0;}
</style>