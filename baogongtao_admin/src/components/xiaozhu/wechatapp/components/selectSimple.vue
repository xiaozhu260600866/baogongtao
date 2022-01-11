<!--  调用

<selectSimple :data="selectData" v-model="selectType" @callBack="selectRes"></selectSimple> 
import selectSimple from "xiaozhu/wechatapp/components/selectSimple";
compoments:{
	 selectSimple
}		


-->


<template>
	<section>
		<div class="search-select">
			<picker :value="actIndex" class="order-picker fs12 font_grey" :range="data" @change="selectRes" range-key="label">
				{{ data[actIndex].label }}</picker>
			
			<i class="iconfont icon-bottom fs16 font_grey lh30" style="position:absolute;right:5px"></i>
		</div>
	</section>
</template>

<script type="text/javascript">
export default {
	props: ['value', 'label','data'],
	data() {
		return {
			actIndex: 0,
		}
	},
	methods:{
		selectRes(event) {
        	this.actIndex = event.mp.detail.value;
        	this.currentValue = this.data[this.actIndex].value;
        	this.$emit('callBack',this.data[this.actIndex]);
        },
	},
	computed: {
		currentValue: {
			// 动态计算currentValue的值
			get: function() {
				if(this.value){
					this.data.forEach((v,i)=>{
						if(v.value == this.value){
							this.actIndex = i;
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
<style type="text/css" scoped="">
.search-select {
	border: 1px #ddd solid;
	display: flex;
	border-radius: 5px;
	position: relative;
	margin: 0 5px;
	padding: 0 8px;
}

.search-select .order-picker {
	height: 30px;
	min-height: 30px;
	line-height: 30px;
	width: 100%;
	padding: 0 15px;
}

</style>
