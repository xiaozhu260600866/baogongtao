<!--  调用

<selectSimple :data="selectData" v-model="selectType" @callBack="selectRes"></selectSimple> 
import selectSimple from "xiaozhu/uniapp/components/selectSimple";
compoments:{
	 selectSimple
}		


-->


<template>
	<div class="search-select">
		<picker :value="actIndex" class="order-picker fs-14 text-center" :range="data" @change="selectRes" range-key="label">
			{{ data[actIndex].label }}</picker>
		<!-- <i class="iconfont icon-xiaozhu-down fs-16 lh30" style="position:absolute;right:5px"></i> -->
	</div>
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
@import url("../font/globalFont.css");
.search-select {border: 2upx #ddd solid;display: flex;border-radius: 10upx;position: relative;margin: 0 10upx;padding: 0 40upx 0 16upx;}
.search-select .order-picker {height: 60upx;min-height: 60upx;line-height: 60upx;width: 100%;padding: 0;}
.search-select:before{content: " ";display: inline-block;height: 10upx;width: 10upx;border-width: 0 3upx 3upx 0;border-color: #666;border-style: solid;transform: matrix(1,0.9,-1,0.9,0,0);position: relative;position: absolute;top: 50%;margin-top: -10upx;right: 28upx;}
</style>
