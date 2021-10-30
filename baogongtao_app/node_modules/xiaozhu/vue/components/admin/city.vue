<!-- 引用 
<dx-city v-model="ruleForm.city" :required="true"></dx-city>
-->
<template>
	<section>
		<el-form-item label="所在城市"  prop="city" :rules="required ? [{ required: true, message: '省市不能为空'},] :[]">
			<el-select v-model="ruleForm.county_a" placeholder="请选择省份" @change="selectRes">
				<el-option :label="v.label" :value="v.label" v-for="v in cityArr"></el-option>
			</el-select>
			<el-select v-model="ruleForm.county_b" placeholder="请选择城市" v-if="cityArr[selectKey] && cityArr[selectKey].children && cityArr[selectKey].children.length" @change="selectRes2()">
				<el-option :label="v.label" :value="v.label" v-for="v in cityArr[selectKey].children" ></el-option>
			</el-select>
		</el-form-item>
	</section>
</template>
<script type="text/javascript">
import cityJs from "../../../wechatapp/js/citys.js";
export default {
	props:['value','required'],
	data() {
		return {
			ruleForm:{},
			selectKey: -1,
			cityArr: cityJs
		}
	},
	methods:{
		selectRes(res){
			this.cityArr.forEach((v,i)=>{
				if(res == v.label){
					this.selectKey = i;
				}
			});
			this.currentValue = this.ruleForm.county_a;
			
			this.$set(this.ruleForm,'county_b',"");
		},
		selectRes2(v){
			var county_a = this.ruleForm.county_a;
			county_a += ","+this.ruleForm.county_b;
			this.currentValue = county_a;
		}
	},
	watch:{
		currentValue(val){
			console.log(val);
		}
	},
	computed: {
		currentValue: {
			// 动态计算currentValue的值
			get: function() {
				if(this.value && !this.ruleForm.county_a){
				   this.$set(this.ruleForm,'county_b',this.value.split(",")[1]);	
				   this.$set(this.ruleForm,'county_a',this.value.split(",")[0]);	
				   this.cityArr.forEach((v,i)=>{
						if(this.ruleForm.county_a == v.label){
							this.selectKey = i;
						}
					});	
				}
				return this.value;
			},
			set: function(val) {
				this.$emit('input', val);
			}
		}
	}
}

</script>
