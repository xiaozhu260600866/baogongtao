<template>
	<button class="dxi-btn" :class="[type?'dxi-btn-'+type:'',size?'dxi-btn-'+size:'',round?'is-round':'',block?'is-block':'',plain?'is-plain':'',selfDisabled?'is-disabled':'',fixed?'fixed':'']" :disabled="selfDisabled" @tap="handleClick" @getuserinfo="bindgetuserinfo" :form-type="formType">
		<text :class="['iconfont',icon]" v-if="icon"></text>
		<text :class="['iconfont','icon-time-o']" v-if="loading"></text>
		<text><slot></slot></text>
	</button>
</template>

<script>
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
			}
		},
		data(){
			return {
				selfDisabled: this.disabled
			}
		},
		mounted(){
			if(this.loading){
				this.selfDisabled = true;
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
.dxi-btn{display: inline-block;line-height: 1;white-space: nowrap;cursor: pointer;background: #fff;border: 1px solid #dcdfe6;color: #606266;-webkit-appearance: none;text-align: center;box-sizing: border-box;outline: none;margin: 0;transition: .1s;font-weight: 500;-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;padding: 24upx 40upx;font-size: 15px;border-radius: 8upx;}

.fixed{position: fixed;bottom: 0;left: 0;width: 100%;}

/* 按钮 */
.dxi-btn .iconfont{margin-right: 10upx;}

/* 长按钮 */
.dxi-btn.is-block{display: block;}

/* 大小 */
.dxi-btn-lg{padding: 30upx 40upx;font-size: 17px;border-radius: 10upx}
.dxi-btn-medium{padding: 20upx 40upx;font-size: 14px;border-radius: 8upx}
.dxi-btn-small{padding: 18upx 30upx;font-size: 13px;border-radius: 6upx}
.dxi-btn-mini{padding: 14upx 30upx;font-size: 12px;border-radius: 6upx}

/* 圆角大小 */
.dxi-btn.is-round{border-radius: 50upx;padding: 24upx 46upx;}
.dxi-btn-medium.is-round{padding: 20upx 40upx}
.dxi-btn-small.is-round{padding: 18upx 30upx}
.dxi-btn-mini.is-round{padding: 14upx 30upx}

/* 状态 */

/* ===== 常规组合:start ===== */
	/* 默认 */
	.dxi-btn:focus,.dxi-btn:hover {color:#409eff;border-color:#c6e2ff;background-color:#ecf5ff}
	.dxi-btn:active {color:#3a8ee6;border-color:#3a8ee6;outline:none}

	/* 蓝色 primary */
	.dxi-btn-primary {color:#fff;background-color:#409eff;border-color:#409eff}
	.dxi-btn-primary:focus,.dxi-btn-primary:hover {background:#66b1ff;border-color:#66b1ff;color:#fff}
	.dxi-btn-primary:active {outline:none}

	/* 绿色 success*/
	.dxi-btn-success {color:#fff;background-color:#67c23a;border-color:#67c23a}
	.dxi-btn-success:focus,.dxi-btn-success:hover {background:#85ce61;border-color:#85ce61;color:#fff}
	.dxi-btn-success:active {outline:none}

	/* 橙色 warning*/
	.dxi-btn-warning {color:#fff;background-color:#e6a23c;border-color:#e6a23c}
	.dxi-btn-warning:focus,.dxi-btn-warning:hover {background:#ebb563;border-color:#ebb563;color:#fff}
	.dxi-btn-warning:active {outline:none}

	/* 红色 danger*/
	.dxi-btn-danger {color:#fff;background-color:#f56c6c;border-color:#f56c6c}
	.dxi-btn-danger:focus,.dxi-btn-danger:hover {background:#f78989;border-color:#f78989;color:#fff}
	.dxi-btn-danger:active {outline:none}

	/* 灰色 info*/
	.dxi-btn-info {color:#fff;background-color:#909399;border-color:#909399}
	.dxi-btn-info:focus,.dxi-btn-info:hover {background:#a6a9ad;border-color:#a6a9ad;color:#fff}
	.dxi-btn-info:active {outline:none}
/* ===== 常规组合:end ===== */

/* ===== 朴素组合:start ===== */
	/* 默认 */
	.dxi-btn.is-plain:focus,.dxi-btn.is-plain:hover {background:#fff;border-color:#409eff;color:#409eff}
	.dxi-btn.is-plain:active {background:#fff;outline:none}
	.dxi-btn.is-active,.dxi-btn.is-plain:active {border-color:#3a8ee6;color:#3a8ee6}
	
	/* 蓝色 */
	.dxi-btn-primary.is-plain {color:#409eff;background:#ecf5ff;border-color:#b3d8ff}
	.dxi-btn-primary.is-plain:focus,.dxi-btn-primary.is-plain:hover {background:#409eff;border-color:#409eff;color:#fff}
	.dxi-btn-primary.is-plain:active {background:#3a8ee6;border-color:#3a8ee6;color:#fff;outline:none}
	
	/* 绿色 */
	.dxi-btn-success.is-plain {color:#67c23a;background:#f0f9eb;border-color:#c2e7b0}
	.dxi-btn-success.is-plain:focus,.dxi-btn-success.is-plain:hover {background:#67c23a;border-color:#67c23a;color:#fff}
	.dxi-btn-success.is-plain:active {background:#5daf34;border-color:#5daf34;color:#fff;outline:none}
	/* 橙色 */
	.dxi-btn-warning.is-plain {color:#e6a23c;background:#fdf6ec;border-color:#f5dab1}
	.dxi-btn-warning.is-plain:focus,.dxi-btn-warning.is-plain:hover {background:#e6a23c;border-color:#e6a23c;color:#fff}
	.dxi-btn-warning.is-plain:active {background:#cf9236;border-color:#cf9236;color:#fff;outline:none}
	
	/* 红色 */
	.dxi-btn-danger.is-plain {color:#f56c6c;background:#fef0f0;border-color:#fbc4c4}
	.dxi-btn-danger.is-plain:focus,.dxi-btn-danger.is-plain:hover {background:#f56c6c;border-color:#f56c6c;color:#fff}
	.dxi-btn-danger.is-plain:active {background:#dd6161;border-color:#dd6161;color:#fff;outline:none}
	
	/* 灰色 */
	.dxi-btn-info.is-plain {color:#909399;background:#f4f4f5;border-color:#d3d4d6}
	.dxi-btn-info.is-plain:focus,.dxi-btn-info.is-plain:hover {background:#909399;border-color:#909399;color:#fff}
	.dxi-btn-info.is-plain:active {background:#82848a;border-color:#82848a;color:#fff;outline:none}
/* ===== 朴素组合:end ===== */

/* ===== 禁用组合:start ===== */
	/* 常规 */
	.dxi-btn.is-disabled,
	.dxi-btn.is-disabled:focus,
	.dxi-btn.is-disabled:hover,
	.dxi-btn.is-disabled[disabled] {
		color:#c0c4c;
		cursor:not-allowed;
		background-image:none;
		background-color:#fff;
		border-color:#ebeef5
	}
	.dxi-btn.is-disabled {
		background-color:transparent
	}
	.dxi-btn.is-disabled.is-plain,
	.dxi-btn.is-disabled.is-plain:focus,
	.dxi-btn.is-disabled.is-plain:hover{
		background-color:#fff;
		border-color:#ebeef5;
		color:#c0c4cc
	}
	
	
	/* 蓝色 */
	.dxi-btn-primary.is-disabled,
	.dxi-btn-primary.is-disabled:active,
	.dxi-btn-primary.is-disabled:focus,
	.dxi-btn-primary.is-disabled:hover,
	.dxi-btn-primary.is-disabled[disabled]{
		color:#fff;
		background-color:#a0cfff;
		border-color:#a0cfff
	}
	.dxi-btn-primary.is-plain.is-disabled,
	.dxi-btn-primary.is-plain.is-disabled:active,
	.dxi-btn-primary.is-plain.is-disabled:focus,
	.dxi-btn-primary.is-plain.is-disabled:hover {
		color:#8cc5ff;
		background-color:#ecf5ff;
		border-color:#d9ecff
	}
	
	/* 绿色 */
	.dxi-btn-success.is-disabled,
	.dxi-btn-success.is-disabled:active,
	.dxi-btn-success.is-disabled:focus,
	.dxi-btn-success.is-disabled:hover,
	.dxi-btn-success.is-disabled[disabled]{
		color:#fff;
		background-color:#b3e19d;
		border-color:#b3e19d
	}
	.dxi-btn-success.is-plain.is-disabled,
	.dxi-btn-success.is-plain.is-disabled:active,
	.dxi-btn-success.is-plain.is-disabled:focus,
	.dxi-btn-success.is-plain.is-disabled:hover {
		color:#a4da89;
		background-color:#f0f9eb;
		border-color:#e1f3d8
	}
	
	/* 橙色 */
	.dxi-btn-warning.is-disabled,
	.dxi-btn-warning.is-disabled:active,
	.dxi-btn-warning.is-disabled:focus,
	.dxi-btn-warning.is-disabled:hover,
	.dxi-btn-warning.is-disabled[disabled]{
		color:#fff;
		background-color:#f3d19e;
		border-color:#f3d19e
	}
	.dxi-btn-warning.is-plain.is-disabled,
	.dxi-btn-warning.is-plain.is-disabled:active,
	.dxi-btn-warning.is-plain.is-disabled:focus,
	.dxi-btn-warning.is-plain.is-disabled:hover {
		color:#f0c78a;
		background-color:#fdf6ec;
		border-color:#faecd8
	}
	
	/* 红色 */
	.dxi-btn-danger.is-disabled,
	.dxi-btn-danger.is-disabled:active,
	.dxi-btn-danger.is-disabled:focus,
	.dxi-btn-danger.is-disabled:hover,
	.dxi-btn-danger.is-disabled[disabled]{
		color:#fff;
		background-color:#fab6b6;
		border-color:#fab6b6
	}
	.dxi-btn-danger.is-plain.is-disabled,
	.dxi-btn-danger.is-plain.is-disabled:active,
	.dxi-btn-danger.is-plain.is-disabled:focus,
	.dxi-btn-danger.is-plain.is-disabled:hover {
		color:#f9a7a7;
		background-color:#fef0f0;
		border-color:#fde2e2
	}
	
	/* 灰色 */
	.dxi-btn-info.is-disabled,
	.dxi-btn-info.is-disabled:active,
	.dxi-btn-info.is-disabled:focus,
	.dxi-btn-info.is-disabled:hover,
	.dxi-btn-info.is-disabled[disabled]{
		color:#fff;
		background-color:#c8c9cc;
		border-color:#c8c9cc
	}
	.dxi-btn-info.is-plain.is-disabled,
	.dxi-btn-info.is-plain.is-disabled:active,
	.dxi-btn-info.is-plain.is-disabled:focus,
	.dxi-btn-info.is-plain.is-disabled:hover {
		color:#bcbec2;
		background-color:#f4f4f5;
		border-color:#e9e9eb
	}
/* ===== 禁用组合:end ===== */

</style>