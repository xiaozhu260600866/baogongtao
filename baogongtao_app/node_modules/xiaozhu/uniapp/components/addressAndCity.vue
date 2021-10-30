<template>
	<div>
		<input class="dx-input font_666 fs-14 nowrap" :value="currentValue" hidden />
		<view :class="['dx-cell','dx-cell_input','m-select',padding]">
			<view class="dx-cell_hd">
				<view :class="['dx-label',fontSize]">{{ labeltxt ? labeltxt: '省市区'}}</view>
			</view>
			<view class="dx-cell_bd" :class="[left?'text-left':'text-right']" v-if="!addressEmpty && lotusAddressData.townName == '蓬江区'">
				<div class="m-name" @click="showPicker">
					<span :class="['span','m-c6',fontSize]" v-if="labeltxt">{{lotusAddressData.provinceName ? lotusAddressData.provinceName + lotusAddressData.cityName + lotusAddressData.townName : '请选择'+labeltxt}}</span>
					<span :class="['span','m-c6',fontSize]" v-else>{{lotusAddressData.provinceName ? lotusAddressData.provinceName + lotusAddressData.cityName + lotusAddressData.townName : '请选择省市区'}}</span>
				</div>
			</view>
			
			<view class="dx-cell_bd" :class="[left?'text-left':'text-right']" v-else-if="addressEmpty && lotusAddressData.townName == '蓬江区' ">
				<div class="m-name" @click="showPicker">
					<span :class="['span','m-c6',fontSize]">{{ labeltxt ? '请选择'+labeltxt: '请选择省市区'}}</span>
				</div>
			</view>
			<view class="dx-cell_bd" :class="[left?'text-left':'text-right']" v-else-if="addressEmpty && lotusAddressData.townName != '蓬江区'">
				<div class="m-name" @click="showPicker">
					<span :class="['span','m-c6',fontSize]" v-if="labeltxt">{{lotusAddressData.provinceName ? lotusAddressData.provinceName + lotusAddressData.cityName + lotusAddressData.townName : '请选择'+labeltxt}}</span>
					<span :class="['span','m-c6',fontSize]" v-else>{{lotusAddressData.provinceName ? lotusAddressData.provinceName + lotusAddressData.cityName + lotusAddressData.townName : '请选择省市区'}}</span>
				</div>
			</view>
			<view class="dx-cell_ft dx_ft-access"></view>
		</view>
		<view :class="['dx-cell','dx-cell_input',padding]" v-if="!addressHidden">
			<view :class="['dx-cell_hd']">
				<view :class="['dx-label',fontSize]">地址<span class="star">*</span></view>
			</view>
			<view :class="['dx-cell_bd']">
				<input :class="['dx-input',fontSize]" placeholder="请输入地址" :value="lotusAddressData.address || '' " @input="updateVal" />
			</view>
		</view>
		<w-picker mode="region" :value="[lotusAddressData.provinceName,lotusAddressData.cityName,lotusAddressData.townName]" default-type="label" :hide-area="false" @confirm="onConfirm($event,'region')"
		 @cancel="onCancel" ref="region"></w-picker>

	</div>
</template>
<script>
	import wPicker from "./w-picker/w-picker.vue"
	export default {
		components: {
			wPicker
		},
		props: ['value', 'label', 'fontSize', 'padding','labeltxt','addressHidden','addressEmpty','left'],
		data() {
			return {
				check:false,
				lotusAddressData: {
					visible: false,
					provinceName:'广东省',
					cityName:'江门市',
					townName:'蓬江区',
					address:''
				},
				getSiteName: this.getSiteName(),
				ruleform: {
					provinceCity: '',
					address: ''
				}
			}
		},
		watch: {
			lotusAddressData: {
				handler(curVal, oldVal) {
					if(this.lotusAddressData.provinceName != curVal.provinceName){
						this.currentValue = "";
						this.currentValue = this.lotusAddressData.provinceName + this.lotusAddressData.cityName + this.lotusAddressData.townName +
							this.lotusAddressData.address;
						}
				},
				deep: true
			}
		},
		methods: {
			showPicker(){
				this.$refs['region'].show();
			},
			onConfirm(res,type){
				console.log(res.obj);
				this.lotusAddressData.provinceName = res.obj.province.label; //省
				this.lotusAddressData.cityName = res.obj.city.label; //市
				this.lotusAddressData.townName = res.obj.area.label; //区
				this.currentValue = "";
				this.currentValue = this.lotusAddressData.provinceName + this.lotusAddressData.cityName + this.lotusAddressData.townName +
					this.lotusAddressData.address;
			},
			onCancel(){
				
			},
			updateVal(e) {
				this.lotusAddressData.address = e.mp.detail.value;
				this.currentValue = "";
				this.currentValue = this.lotusAddressData.provinceName + this.lotusAddressData.cityName + this.lotusAddressData.townName +
					this.lotusAddressData.address;
			},
			forMat(type) {
				var arr = [0, 0];
				var address = "";
				if (this.value) {
					if (this.value.indexOf('省') !== false && this.value.indexOf('市') !== false) {
						let provinceIndex = this.value.indexOf('省') + 1;
						let province = this.value.substring(0, provinceIndex);
						let cityIndex = this.value.indexOf('市') + 1;
						let city = this.value.substring(provinceIndex, cityIndex);
					
						address = this.value.substring(cityIndex);
						console.log(address+'|');
						let res = this.inArrayCity(address);
						let townName = "";
						if (res) {
							townName = address.substring(0, res + 1);
							address = address.substring(res + 1);
						}
						if (type == 1) return address;
						return {
							province: province,
							city: city,
							town: townName
						}
					};

				}


			},
			inArrayCity(address) {
				
				if (address.indexOf("市") !== -1) {
					return address.indexOf("市");
				} else if (address.indexOf("镇") !== -1) {
					return address.indexOf("镇");
				} else if (address.indexOf("区") !== -1) {
					return address.indexOf("区");
				}else if (address.indexOf("县") !== -1) {
					return address.indexOf("县");
				}else if (address.indexOf("市辖区") !== -1) {
					return address.indexOf("市辖区");
				}else if (address.indexOf("州") !== -1) {
					return address.indexOf("州");
				}
				return -1;
			},

			openAddress() {
				this.lotusAddressData.visible = true;
			},
			choseValue(res) {
				//res数据源包括已选省市区与省市区code
				console.log(res);
				this.lotusAddressData.visible = res.visible; //visible为显示与关闭组件标识true显示false隐藏
				//res.isChose = 1省市区已选 res.isChose = 0;未选
				if (res.isChose) {
					this.lotusAddressData.provinceName = res.provice; //省
					this.lotusAddressData.cityName = res.city; //市
					this.lotusAddressData.townName = res.town; //区
					this.region = `${res.provice} ${res.city} ${res.town}`; //region为已选的省市区的值
				}
			},

		},
		computed: {
			currentValue: {
				// 动态计算currentValue的值
				get: function() {
					if (this.value && !this.check) {
						let data = this.forMat(0);
						this.lotusAddressData.provinceName = data.province;
						this.lotusAddressData.cityName = data.city;
						this.lotusAddressData.townName = data.town;
						let address = this.forMat(1);
						console.log(address +'32')
						if (address != "undefined" && address !='市辖区undefined') {
							this.lotusAddressData.address = this.forMat(1);
						}
						this.check = true;

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

<style scoped="">
	@import url("../../css/dx-input.css");
</style>
