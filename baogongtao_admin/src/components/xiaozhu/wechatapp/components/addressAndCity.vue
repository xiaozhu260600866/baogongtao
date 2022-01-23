<template>
  <div>
    <weui-input v-model="ruleform.provinceCity" label="所在省市" name="provinces" type="manyselect" :data="cityData" change-field="value" @callback="provinceCityRes" />
    <weui-input v-model="ruleform.address" label="地址" type="text" name="address" datatype="require" />
  </div>
</template>
<script>
import cityJs from '../js/citys.js'
export default {
	props: ['value', 'label'],
	data() {
		return {
			getSiteName: this.getSiteName(),
			cityData: cityJs,
			ruleform: {
				provinceCity: this.forMat(0),
				address: this.forMat(1)
			}
		}
	},
	computed: {
		currentValue: {
			// 动态计算currentValue的值
			get: function() {
				console.log(this.value)
				console.log('10')
				return this.value
			},
			set: function(val) {
				this.$emit('input', val)
			}
		}
	},
	watch: {
		ruleform: {
			handler(curVal, oldVal) {
				/* var province = "";
				var city = "";
				if (this.ruleform.provinceCity && this.ruleform.provinceCity.length >= 2) {
					province = cityJs[this.ruleform.provinceCity[0]].label;
					if(cityJs[this.ruleform.provinceCity[0]].children){
						city = cityJs[this.ruleform.provinceCity[0]].children[this.ruleform.provinceCity[1]].label;
					}
				}else{
					province = cityJs[this.ruleform.provinceCity[0]].label;
				} */
				this.currentValue = this.ruleform.provinceCity + this.ruleform.address
				console.log(this.currentValue)
			},
			deep: true
		}
	},
	methods: {
		forMat(type) {
			console.log(this.value)
			console.log('q')
			var arr = [0, 0]
			var address = ''
			if (this.value) {
				if (this.value.indexOf('省') !== false && this.value.indexOf('市') !== false) {
					const provinceIndex = this.value.indexOf('省') + 1
					const province = this.value.substring(0, provinceIndex)
					const cityIndex = this.value.indexOf('市') + 1
					let city = this.value.substring(provinceIndex, cityIndex)
					address = this.value.substring(cityIndex)
					if (type == 1) return address
					arr[0] = province
					city = city.split(',')
					arr[1] = city[city.length - 1]
				}
			}

			return type == 0 ? arr.join(',') : address
		}
	}
}

</script>

<style scoped="">
@import url("font/globalFont.css");

.citypickers {
	position: fixed;
	height: 100%;
	width: 100%;
	min-height: 100%;
	background-color: red;
}

.weui-cell__ft .location-nav {
	border-radius: 5px;
	padding: 5px 10px;
}

._picker-view-column {
	text-align: center;
}

.citybody {
	position: fixed;
	bottom: 0px;
	left: 0;
	right: 0;
	background: white;
	z-index: 1000 !important;
	height: 300px;
	width: 100%;
}

.cityheader {
	height: 100px;
}

.city-cancel {
	float: left;
	margin: 20rpx;
	color: #818181;
	height: 60px;
	width: 100px;
}

.city-true {
	float: right;
	margin: 20rpx;
	color: #2FB42E;
	height: 60px;
	width: 100px;
	text-align: right
}

.section .picker {
	background-color: #fff;
	border-bottom: 1px #d9d9d9 solid;
	border-top: 1px #d9d9d9 solid;
	padding: 20rpx;
}

.card {
	padding: 10px;
}

.weui-cell_switch .weui-cell__bd {
	height: 2.58823529em;
	min-height: 2.58823529em;
	line-height: 2.58823529em;
}

.weui-cell_input {
	border-bottom: 1px solid #eee;
	padding-top: 10px !important;
	padding-bottom: 10px !important;
}

.weui-cell ._textarea {
	line-height: 20px;
}

.weui-cell {
	padding: 10px;
}

.mei-check {
	display: flex;
}

.mei-label::before {
	border: 0 !important;
}

.mei-label {
	padding: 5px 10px 5px 0 !important;
	width: 50%;
	box-sizing: border-box;
	display: flex !important;
	float: left;
}

.weui-check__hd_in-checkbox {
	display: flex;
}

.weui-icon-checkbox_circle,
.weui-icon-checkbox_success {
	margin: 0 !important;
}

.date-picker,
.order-picker {
	height: 2em;
	min-height: 2em;
	line-height: 2em;
}

.upload-img .uploadvalue {
	float: left;
}

.upload-img .uploadvalue button {
	width: 60px;
	height: 60px;
	border-radius: 0;
	background: #fff;
	border: 1px #d1d1d1 solid;
	line-height: 58px;
	padding: 0;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 8px 5px 0;
}

.upload-img .uploadvalue button .iconfont {
	color: #999;
	font-size: 40px;
}

.upload-img .value button {
	width: 60px;
	height: 60px;
	border-radius: 0;
	background: #fff;
	float: left;
	border: 1px #d1d1d1 solid;
	line-height: 58px;
	padding: 0;
	text-align: center;
}

.upload-img .value button .iconfont {
	color: #999;
	font-size: 40px;
}

.upload-img .imageLists {
	display: inline-block;
}

.upload-img .imageLists button {
	width: 80px;
	height: 80px;
	border-radius: 0;
	background: #fff;
	border: 1px #d1d1d1 solid;
	line-height: 78px;
	padding: 0;
	text-align: center;
	display: inline-block;
	align-items: center;
	justify-content: center;
	float: left;
	margin: 0 8px 5px 0;
}

.upload-img .imageLists button .iconfont {
	color: #999;
	font-size: 40px;
}

.upload-img .value button {
	width: 60px;
	height: 60px;
	border-radius: 0;
	background: #fff;
	float: left;
	border: 1px #d1d1d1 solid;
	line-height: 58px;
	padding: 0;
	text-align: center;
}

.upload-img .imageLists .il-item {
	position: relative;
	margin: 0 8px 5px 0;
	height: 80px;
	display: inline-block;
}

.upload-img .imageLists image {
	width: 80px;
	height: 80px;
	display: flex;
	float: left;
}

.upload-img .imageLists .del-img {
	position: absolute;
	width: 100%;
	bottom: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.8);
	height: 20px;
	line-height: 16px;
}

.share-overlay {
	position: fixed;
	top: 0px;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 100;
	width: 100%;
	height: 800px;
	background: #333;
	filter: alpha(opacity=70);
	-moz-opacity: 0.7;
	opacity: 0.7;
}

.upload-img .oneImages {
	position: absolute;
	top: 5px;
	right: 5px;
	bottom: 5px;
	left: 5px;
	z-index: 2;
}

.upload-img .oneImages .del-img {
	position: absolute;
	width: 100%;
	bottom: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.8);
	height: 20px;
	line-height: 20px;
}

</style>
