<template>
	<section>
			<dx-button :type="btnType" :block="btnBlock" formType="submit" @submit="formSubmit">{{name ? name : '提交' }}</dx-button>
			<slot name="content" />
	</section>
</template>

<script>
import dxButton from "doxinui/components/button/button"
export default {
	components: {
		dxButton
	},
	props:{
		formData:{
			type:Object,
			default:{}
		},
		vaildate:{
			type:Object,
			default:{}
		},
		className:{
			type:String,
			default:''
		},
		btnType:{
			type:String,
			default:'primary'
		},
		btnBlock:{
			type: Boolean,
			default: true
		},
		name:{
			type:String,
			default:''
		}
	},
	data() {
		return {
			
		}
	},
	methods: {
		formSubmit(e) {
			this.$emit("before");
			if(!this.vaildate) return this.$emit("callBack");
			this.vaildForm(res => {
				if (res) {
					this.$emit("callBack");
				}

			})
		},
		vaildForm(fun){
			let ruleform = this.formData;
			let vaildate = this.vaildate;
			let res = false;
			setTimeout(() => {
			    for (var v in vaildate) {
			        for (var r in ruleform) {
			            if (v == r) {
			                var name = vaildate[v].name;
			                var vaildArr = vaildate[v].vaild.split("|");
			                var value = ruleform[r];
			                for (var i = 0; i < vaildArr.length; i++) {
			                    let isChinaese = new RegExp("[\\u4E00-\\u9FFF]+", "g")
			                    if (vaildArr[i] == "require" || (isChinaese.test(value) && value.indexOf('请选择') != -1)) {
			                        if (!value) {
			                            this.msgToast(name);
			                            res = false;
			                            return fun(res);
			
			                        }
			                    } else if (vaildArr[i] == "phone") {
			                        var phoneReg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
			                        if (!phoneReg.test(value)) {
			                            this.msgToast("手机格式不正确");
			                            res = false;
			                            return fun(res);
			                            return false;
			                        }
			                    } else if (vaildArr[i] == "integer") {
			                        if (isNaN(value) == true) {
			                            this.msgToast(name + "请填写正确的数字");
			                            res = false;
			                            return fun(res);
			                            return false;
			                        }
			                    } else if (vaildArr[i] == "price") {
			                        var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
			                        if (!reg.test(value)) {
			                            this.msgToast(name + "请填写正确的金额");
			                            res = false;
			                            return fun(res);
			                            return false;
			                        }
			                    } else if (vaildArr[i] == "array") {
			                        if (value.length == 0) {
			                            this.msgToast(name + "必填");
			                            res = false;
			                            return fun(res);
			                            return false;
			                        }
			                    }
			                }
			
			            }
			        }
			    }
			    res = true;
			    return fun(res);
			}, 100)
		}
	}
}
</script>

<style></style>