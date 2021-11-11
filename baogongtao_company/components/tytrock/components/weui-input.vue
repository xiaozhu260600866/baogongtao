<template>
	<view>
		<!-- 如果是开关 -->
		<view :class="['weui-cell','weui-cell_input','weui-cell_switch',className]" v-if="type == 'switch'">
			<view class="weui-cell__bd">
				<view class="weui-label fs14">{{ label }}</view>
			</view>
			<view class="weui-cell__ft">
				<switch @change="changeRadio($event)" :checked="currentValue ? true : false" style="zoom: 60%;" />
			</view>
		</view>
		<!-- 如果是开关结束 -->
		<!-- 如果是定位 -->
		<view :class="['weui-cell','weui-cell_input',className]" v-if="type == 'location'">
			<view :class="['weui-cell__hd']">
				<view class="weui-label fs14"><span class="fc-red" v-if="isRequire">*</span>{{ label }}</view>
			</view>
			<view :class="['weui-cell__bd']">
				<input class="weui-input fc-6 fs14 nowrap" type="text" @input="updateVal" placeholder="请选择您的位置信息" :disabled="disabled"
				 :value="currentValue">
			</view>
			<view class="weui-cell__ft">
				<view :class="['fs12','location-nav',navClass ? navClass : 'dx-btn-green']" @click="changeLocation">定位</view>
			</view>
		</view>
		<!-- 如果是定位结束 -->
		<!-- 如果是文本 -->
		<view :class="['weui-cell','weui-cell_input',className]" v-if="type == 'text' || type == 'textarea' || type == 'password' || type == 'number' || type == 'digit' || type == 'txt' || type == 'tel'">
			<input class="weui-input fc-6 fs14 nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" v-if=" currentValue != undefined"
			 :disabled="disabled" :value="currentValue"  hidden/>
			<view :class="['weui-cell__hd']">
				<slot name="left" />
				<view class="weui-label fs14" v-if="label"><span class="fc-red" v-if="isRequire">*</span>{{ label }}</view>
			</view>
			<view :class="['weui-cell__bd']">
				<input class="weui-input fc-6 fs14 nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" v-if="type == 'text'"
				 :disabled="disabled" :value="currentValue" :focus="focus" @input="updateVal" />
				<input class="weui-input fc-6 fs14 nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" v-if="type == 'number'"
				 :disabled="disabled" @input="updateVal" :value="currentValue" :focus="focus" type="number" />
				 <input class="weui-input fc-6 fs14 nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" v-if="type == 'tel'"
				 :disabled="disabled" @input="updateVal" :value="currentValue" :focus="focus" type="tel" />
				<input class="weui-input fc-6 fs14 nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" v-if="type == 'digit'"
				 :disabled="disabled" @input="updateVal" :value="currentValue" :focus="focus" type="digit" />
				<input class="weui-input fc-6 fs14 nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" @input="updateVal"
				 v-if="type == 'password' && currentValue != undefined" :disabled="disabled" type="password" />
				<textarea maxlength="-1" class="weui-text weui-input fc-6 fs14 ptb5" :placeholder="placeholder ? placeholder :'请输入'+label"
				 @input="updateVal" v-if="type == 'textarea'" style="height:80px" :disabled="disabled" :value="currentValue" />
				<view v-if="type == 'txt'">{{currentValue }}</view>
				
				<slot name="middle" />
			</view> 
			<slot name="right" />
		</view>
		<!-- 如果是文本结束 -->
		<!-- 如果是发送验证码开始 -->
		<view :class="['weui-cell','weui-cell_input',className]" v-if="type == 'sms'" >
			<view :class="['weui-cell__hd']">
				<slot name="left" />
				<view class="weui-label fs14" v-if="label"><span class="fc-red" v-if="isRequire">*</span>{{ label }}</view>
			</view>
			<view :class="['weui-cell__bd']">
				<input class="weui-input fc-6 fs14 nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" :disabled="disabled"   :focus="focus" @input="bingPhoneCode"/>
				<slot name="middle" />
			</view>
			  <button class="dx-btn dx-btn-green" @click="toSms">{{ smsTitle }}</button>
		</view>
		<!-- 如果是发送验证码结束 -->
		
		<!-- 如果是多选 -->
		<view :class="['weui-cell','weui-cell_input',className,radioType ? 'radioType' : '']" v-if="type == 'checkbox'">
			<view :class="['weui-cell__hd']">
				<slot name="left" />
				<view class="weui-label fs14"><span class="fc-red" v-if="isRequire">*</span>{{ label }}</view>
			</view>
			<view :class="['weui-cell__bd']">
				<checkbox-group @change="checkboxChange">
					<!-- 横向报局 -->
					<input class="weui-input fc-6 fs14 nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" v-if=" currentValue != undefined"
					 :disabled="disabled" :value="currentValue"  hidden/>
					<label class="weui-cell mei-label weui-check__label" style="display:inline-block;padding-left: 0px" v-for="item in data" v-if="!radioType">
						<view class="weui-cell__hd weui-check__hd_in-checkbox">
							<checkbox :value="changeField == 'value' ? item.value :item.label" color="#FFCC33" style="transform:scale(0.7)" v-if="!item.checked"/>
							<checkbox :value="changeField == 'value' ? item.value :item.label" checked="true" color="#FFCC33" style="transform:scale(0.7)"  v-else/>
						</view>
						<view class="weui-cell__bd fs15 fc-6">{{item.label}}</view>
					</label>
					<!-- 竖向报局 -->
					<label class="weui-cell mei-label weui-check__label"  v-for="item in data" v-if="radioType">
						<view class="weui-cell__hd" v-if="item.icon">
							<span :class="item.icon"></span>
						</view>
						<view class="weui-cell__bd fs15 fc-6">{{item.label}}</view>
						<view class="weui-cell__ft weui-check__hd_in-checkbox" >
							<checkbox :value="changeField == 'value' ? item.value :item.label" color="#FFCC33" style="transform:scale(0.7)" v-if="!item.checked"/>
							<checkbox :value="changeField == 'value' ? item.value :item.label" checked="true" color="#FFCC33" style="transform:scale(0.7)"  v-else/>
						</view>
					</label>
				</checkbox-group>
			</view>
			<slot name="right" />
		</view>
		<!-- 如果是多选结束 -->
		<!-- 如果是单选 -->
		<view :class="['weui-cell','weui-cell_input',className, radioType ? 'radioType' : '']" v-if="type == 'radio'">
			<view class="weui-cell__hd" v-if="label">
				<slot name="left" />
				<view class="weui-label fs14"><span class="fc-red" v-if="isRequire">*</span>{{ label }}</view>
			</view>
			<view class="weui-cell__bd">
				<radio-group @change="radioChange">
					<!-- 横向报局 -->
					<input class="weui-input fc-6 fs14 nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" v-if=" currentValue != undefined"
					 :disabled="disabled" :value="currentValue"  hidden/>
					<label class="weui-cell mei-label weui-check__label" style="display:inline-block;padding-left: 0px" v-for="item in data" v-if="!radioType" :key="item.label">
					
						<view class="weui-cell__hd weui-check__hd_in-checkbox" >
							<!-- 未选中 -->
							<radio :value="item[changeField]" checked="true" v-if="item.checked"/>
							<radio :value="item[changeField]" v-else/>
						</view>
						<view class="weui-cell__bd fs15 fc-6">{{item.label}}</view>
					</label>
					<!-- 竖向报局 -->
					<label class="weui-cell mei-label weui-check__label" v-for="item in data" v-if="radioType">
						
						<view class="weui-cell__hd" v-if="item.icon">
							<span :class="item.icon"></span>
						</view>
						<view class="weui-cell__bd fs15 fc-6">{{item.label}}</view>
						<view class="weui-cell__ft weui-check__hd_in-checkbox" >
							<radio :value="changeField == 'value' ? item.value :item.label" checked="true" v-if="item.checked"/>
							<radio :value="changeField == 'value' ? item.value :item.label" v-else/>
						</view>
						
					</label>
				</radio-group>
			</view>
			<slot name="right" />
		</view>
		<!-- 如果是单选结束 -->
		
			<!-- 如果是select -->
		<view :class="['weui-cell','weui-cell_input',className]" v-if="type == 'select'">
			<view class="weui-cell__hd" v-if="label">
				<slot name="left" />
				<view class="weui-label fs14"><span class="fc-red" v-if="isRequire">*</span>{{ label }}</view>
			</view>
			<view class="weui-cell__bd">
				<input class="weui-input fc-6 fs14 nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" v-if=" currentValue != undefined"
				 :disabled="disabled" :value="currentValue"  hidden/>
				<div v-if="disabled">
					<span class="fs14">{{ currentValue }}</span>
				</div>
				<div v-else>
					<picker :value="selectKey" class="order-picker" style="wdith:100%"  :range="data" :range-key="selectLabel" @change="selectRes">
						<view class="picker fs14 fc-6" v-if="currentValue">
							{{currentValue}}
						</view>
						<view class="picker fs14 fc-6" v-else>
							{{placeholder?placeholder:'请选择'+label }}
						</view>
					</picker>
				</div>
			</view>
			<view class="weui-cell__ft" v-if="!disabled">
				<text class="weui-cell__ft_in-access"></text>
			</view>
			<slot name="right" />
		</view>
		<!-- 如果是select结束 -->
		
		<!-- 如果是manyselect -->
		<view :class="['weui-cell','weui-cell_input',className]" v-if="type == 'manyselect'" @click="chooseFclass">
			<input class="weui-input fc-6 fs14 nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" v-if=" currentValue != undefined"
			 :disabled="disabled" :value="currentValue"  hidden/>
			<view class="weui-cell__hd">
				<slot name="left" />
				<view class="weui-label fs14"><span class="fc-red" v-if="isRequire">*</span>{{ label }}</view>
			</view>
			<view class="weui-cell__bd">
				<div class="fc-6 fs14 nowrap">
					{{ manyselectValue ?manyselectValue :'请选择'+label }}
				</div>
			</view>
			<view class="weui-cell__ft weui-cell__ft_in-access"></view>
			<slot name="right" />
		</view>
		<!-- 如果是select结束 -->
		
		<!-- 如果是多张图片上传 -->
		<view :class="['weui-cell','weui-cell_input',className]" style="min-height: 160rpx" v-if="type == 'upload'">
			<input class="weui-input fc-6 fs14 nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" v-if=" currentValue != undefined"
			 :disabled="disabled" :value="currentValue"  hidden/>
			<view class="weui-cell__hd" v-if="label">
				<view class="weui-label fs14"><span class="fc-red" v-if="isRequire">*</span>{{ label }}</view>
			</view>
			<view class="weui-cell__bd">
				<div :class="['upload-img',className]">
					<div class="imageLists">
						<div class="il-item" v-for="item in currentValue">
							<img :src="uploadPath+item" v-if="currentValue" lazy-load="true" mode="aspectFill" data-name="pic" style="height:160rpx;width:160rpx" :class="loading">
							<p class="del-img text-center" @click="delImage" data-name="pic" :data-key="index">
								<span class="iconfont icon-xiaozhu-del fs12 fs-white"></span>
							</p>
						</div>
					</div>
					<div class="uploadvalue" v-if="currentValue && currentValue.length<allowUpLoadNum">
					
						<button hover-class="none" type="button" @click="uploadImage" data-thumbsize="300" :data-upurl="upurl" :data-allowuploadnum="allowUpLoadNum" :data-type="uploadtype">
							<!--  <input id="picul1" class="weui-uploader__input"  type="file" accept="image/*"> -->
							<text class="iconfont icon-release-addimg" style="font-size: 30px;color:#ccc"></text>
							<p class="imgTxt" v-if="txtType == 'imgTxt'">{{ imgTxt }}</p>
						</button>
					</div>
					<div class="clear"></div>
				</div>
			</view>
		</view>
		<!-- 如果是滚动图片上传 -->
		<div :class="['upload-img',className]" style="min-height: 160rpx" v-if="type == 'scrollUpload'">
			<div class="imageLists" style="display: flex;white-space: nowrap;">
				<scroll-view scroll-x="true">
					<button hover-class="none" type="button" @click="uploadImage" data-thumbsize="300" :data-upurl="upurl" :data-allowuploadnum="allowUpLoadNum" :data-type="uploadtype">
						<text class="iconfont icon-release-addimg" style="font-size: 30px;color:#ccc"></text>
						<p class="imgTxt" v-if="txtType == 'imgTxt'">{{ imgTxt }}</p>
					</button>
					<div class="il-item" v-for="item in currentValue">
						<img :src="loading ? '' :getSiteName+'/upload/images/'+upurl+'/'+item" v-if="currentValue" lazy-load="true" mode="aspectFill" data-name="pic" style="height:160rpx;width:160rpx" :class="loading" @click="scrollUploadCallBack(item)">
						<p class="del-img text-center" @click="delImage" data-name="pic" :data-key="index">
							<span class="iconfont icon-xiaozhu-del fs12 fs-white"></span>
						</p>
					</div>
					<slot name="img" />
				</scroll-view>
			</div>
		</div>
		<!-- 如果是滚动图片上传结束 -->

		<!-- 如果是单张图片上传 -->
		<view :class="['weui-cell','weui-cell_input',className]" style="min-height: 160rpx" v-if="type == 'singleUpload'">
			<view class="weui-cell__hd" v-if="label">
				<view class="weui-label fs14"><span class="fc-red" v-if="isRequire">*</span>{{ label }}</view>
			</view>
			<view class="weui-cell__bd">
				<div :class="['upload-img',className]">
					<div class="oneImages" v-for="item in currentValue">
						<img :src="uploadPath+item" v-if="currentValue" lazy-load="true" mode="aspectFill" data-name="pic" style="height: 100%;width: 100%" >
						<p class="del-img text-center" @click="delImage" data-name="pic" :data-key="index">
							<span class="iconfont icon-xiaozhu-del fs12 fs-white"></span>
						</p>
					</div>
					<div class="uploadvalue">
						<button hover-class="none" type="button" @click="uploadImage" data-thumbsize="300" :data-upurl="upurl" :data-allowuploadnum="allowUpLoadNum" :data-type="uploadtype">
							<text class="iconfont icon-release-addimg" style="font-size: 30px;color:#ccc"></text>
							<p class="imgTxt" v-if="txtType == 'imgTxt'">{{ imgTxt }}</p>
						</button>
					</div>
					<div class="clear"></div>
				</div>
			</view>
		</view>
		<!-- 如果是单张图片上传结束 -->
		<!-- 如果是日期 -->
		<view :class="['weui-cell','weui-cell_input',className]" v-if="type == 'date'">
			<view class="weui-cell__hd">
				<slot name="left" />
				<view class="weui-label fs14" v-if="label"><span class="fc-red" v-if="isRequire">*</span>{{ label }}</view>
			</view>
			<view class="weui-cell__bd text-right">
				<picker :value="selectKey" class="date-picker" style="width:100%"  mode="date" @change="bindDateChange" :start="startDate" :end="endDate">
					<view class="picker fs14 fc-6" v-if="currentValue">
						{{currentValue}}
					</view>
					<view class="picker fs14 fc-6" v-else>
						{{placeholder ? placeholder :'请输入'+label}}
					</view>
				</picker>
			</view>
			<view class="weui-cell__ft">
				<text class="weui-cell__ft_in-access"></text>
			</view>
			<slot name="right" />
		</view>
		<!-- 如果是日期结束 -->

		<!-- 如果是时间 -->
		<view :class="['weui-cell','weui-cell_input',className]" v-if="type == 'time'">
			<view class="weui-cell__hd">
				<slot name="left" />
				<view class="weui-label fs14"><span class="fc-red" v-if="isRequire">*</span>{{ label }}</view>
			</view>
			<view class="weui-cell__bd">
				<picker :value="currentValue" class="date-picker" style="width:100%" mode="time" @change="bindTimeChange" :start="startTime" :end="endTime">
					<view class="picker fs14 fc-6" v-if="currentValue">
						{{currentValue}}
					</view>
					<view class="picker fs14 fc-6" v-else>
						请选择{{ label }}
					</view>
				</picker>
			</view>
			<view class="weui-cell__ft">
				<text class="weui-cell__ft_in-access"></text>
			</view>
			<slot name="right" />
		</view>
		<!-- 如果是时间结束 -->
		
		<!-- 如果是点击触发 -->
		<view :class="['weui-cell','weui-cell_input',className]" v-if="type == 'clickback'">
			<view :class="['weui-cell__hd']">
				<slot name="left" />
				<view class="weui-label fs14" v-if="label"><span class="fc-red" v-if="isRequire">*</span>{{ label }}</view>
			</view>
			<view :class="['weui-cell__bd']" @click="clickBack">
				<input class="weui-input fc-6 fs14 nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" :disabled="true" :value="currentValue" :focus="focus" />
				<slot name="middle" />
			</view> 
			<view class="weui-cell__ft">
				<text class="weui-cell__ft_in-access"></text>
			</view>
			<slot name="right" />
		</view>
		<!-- 如果是点击触发结束 -->
		
		
		</view>
</template>
<script>
export default {
	props: ['dataKey','value', 'label', 'type', 'upurl', 'allowUpLoadNum', 'className',  'disabled', 'placeholder', 'changeField', 'uploadtype', 'name', 'datatype','navClass','imgTxt','txtType','focus','phone',"action",'radioType','fromStartDate','fromEndDate','fromStartTime','fromEndTime','uploadAction','uploadPath','selectLabel','startKey'],
	data() {
		return {
			chooseArr: [],
			data:[],
			chooseValue: '',
			check: false,
			manyselectValue: '',
			condition: false,
			isRequire: false,
			canSend:true,
			selectKey:0,
			selectManyKey:[0,0],
			smsTitle:'发送验证码',
			timer:'',
			startDate:'',
			endDate:'',
			startTime:'',
			endTime:'',

		}
	},
	onUnload(){
		clearInterval(this.timer);
	},
	methods: {
		updateVal(e){
			this.currentValue = e.mp.detail.value;
		},
		bingPhoneCode(e){
			this.currentValue = e.mp.detail.value;
		},
		toSms(){
			setTimeout(()=>{
				 var phoneReg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
                    if (!phoneReg.test(this.phone || !this.phone)) {
                        this.getError("手机格式不正确");
                        return false;
                    }
                    if(this.canSend){
						this.postAjax(this.action,{phone:this.phone}).then(msg=>{
							 if (msg.data.status == 2) {
							       this.canSend = false;
							       var num = 60;
							       wx.setStorageSync('smsCode', msg.data.code);
							       this.timer = setInterval(() => {
							           num--;
							           if (num == 0) {
							               clearInterval(this.timer);
							               this.canSend = true;
							               this.smsTitle = "发送验证码";
							           } else {
							               this.smsTitle = num + "秒";
							           }
							       }, 1000)
							
							 }
						});
                    }

			},200);
		},
		scrollUploadCallBack(item){
				this.$emit("callBack",item);
		},
		chooseFclass() {
			this.condition = !this.condition;
		},
		changeRadio(event) {
			this.currentValue = !this.currentValue;
		},
		changeLocation() {
			uni.chooseLocation({
				success: msg => {
					
					this.currentValue = msg.name;
					this.$emit('callback', msg);
				}
			});
		},
		comfirm() {
			this.chooseFclass();
			let parentValue = this.data[this.selectManyKey[0]];
			
			if (!this.data[this.selectManyKey[0]].children || this.data[this.selectManyKey[0]].children.length == 0) {
				this.selectManyKey.splice(1, 1);
				this.manyselectValue = parentValue.label;
				this.currentValue = parentValue.label;
				this.$emit('callback', [parentValue]);
			} else {
				let sonValue = parentValue.children[this.selectManyKey[1]];
				this.manyselectValue = parentValue.label + "->" + sonValue.label;
				this.currentValue = parentValue.label + "," + sonValue.label;
				this.$emit('callback', [parentValue, sonValue]);
			}

		},
		bingInput(e) {
			this.currentValue = e.mp.detail.value;
		},
		selectRes(e) {
			this.currentValue = this.data[e.mp.detail.value][this.changeField];
			
			//console.log(this.currentValue)
			this.$emit('callback', this.data[e.mp.detail.value]);

		},
		bindChange(e) {
			if (this.selectManyKey[0] != e.mp.detail.value[0]) {
				this.selectManyKey = [e.mp.detail.value[0], 0];
			} else {
				this.selectManyKey = e.mp.detail.value;
			}


		},
		bindDateChange(e) {
			this.currentValue = e.mp.detail.value;
		},
		bindTimeChange(e){
			console.log(e)
			this.currentValue = e.mp.detail.value;
		},
		checkboxChange(e) {
			 let chooseArr = [];
			this.chooseArr = e.mp.detail.value;
			let parent = this.getParent(this);
			parent[this.dataKey].forEach((v, i) => {
				if (this.in_array(v.value, this.chooseArr)) {
					this.$set(parent[this.dataKey][i], "checked", true);
				} else {
					this.$set(parent[this.dataKey][i], "checked", false);
				}
				if (v.checked) {
					chooseArr.push(v.value);
				}

			});
			this.currentValue = chooseArr;
		},
		radioChange(e) {
			this.chooseValue = e.mp.detail.value;
			var chooseData = "";
			let parent = this.getParent(this);
			parent[this.dataKey].forEach((v, i) => {
				if (v[this.changeField] == this.chooseValue) {
					this.$set(parent[this.dataKey][i], "checked", true);
				} else {
					this.$set(parent[this.dataKey][i], "checked", false);
				}
				if (v.checked) {
					this.chooseValue = v[this.changeField];
					chooseData = v;
				}

			});
			this.$emit("radioCallBack",chooseData);
			this.currentValue = this.chooseValue;
		},
		in_array(value, arr) {
			let res = false;
			if (!arr) return false;
			arr.forEach((v) => {
				if (v == value) {
					res = true;
				}
			});
			return res;
		},
		uploadImage(event) {
		
			let name = event.mp.currentTarget.dataset.name;
			let upurl = event.mp.currentTarget.dataset.upurl;
			let thumbsize = event.mp.currentTarget.dataset.thumbsize;
			let allowuploadnum = event.mp.currentTarget.dataset.allowuploadnum;
			if (this.currentValue) {
				if (this.currentValue.length >= parseInt(allowuploadnum)) {
					this.getError("只允许上传" + allowuploadnum + "图片");
					return false;
				}

			}
			let uploadUrl = this.uploadAction;
			uni.chooseImage({
				count: 1, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: res => {
					var tempFilePaths = res.tempFilePaths;
					uni.showLoading({
						title: '上传中',
					})
					uni.uploadFile({ //上传服务器
						url: uploadUrl, //仅为示例，非真实的接口地址
						thumbsize: 300,
						filePath: tempFilePaths[0],
						name: 'file',
						header: {
							//'content-type': 'multipart/form-data'
						},
						formData: {
							'upurl': upurl,
						},
						success: res => {
							let data = JSON.parse(res.data);
							let file = data.filename;
							let fileArr = this.currentValue;
							fileArr.push(file);
							//if (!this.currentValue) this.currentValue = [];
							this.currentValue=fileArr;
							
							//this.postAjax("/ajax/image-resize", { type: upurl, value: file, size: [thumbsize] }, msg => {}, this);
							uni.hideLoading();
						},
						fail: function(res) {
							
						},
						complete: function(res) {
							
						}
					})
				}
			})
		},
		delImage(event) {
			let name = event.mp.currentTarget.dataset.name;
			let key = event.mp.currentTarget.dataset.key;
			wx.showModal({
				title: '提示',
				content: "是否真的删除?",
				success: res => {
					if (res.confirm) {
						this.currentValue.splice(key, 1);
					} else if (res.cancel) {
						
					}
				}
			})
		},
		clickBack(){
			this.$emit('clickBack');
		}
	},
	computed: {
		currentValue: {
			// 动态计算currentValue的值
		
			get: function() {
				
				if (this.datatype) {
					if (this.datatype.indexOf('require') != -1 || this.datatype == "array") {
						this.isRequire = true;
					}
				} else {
					this.isRequire = false;
				}
				
				/*验证规则开始*/
				if(this.type == 'manyselect' && this.name == 'provinces'){
					var parent = this.$parent;
				}else{
					var parent = this.getParent(this);
				}
				
				if (this.datatype && parent.vaildate && parent.vaildate[this.name] == undefined) {
					this.$set(parent.vaildate, this.name, {
						name: this.placeholder,
						vaild: this.datatype
					});

				}
				/*验证规则结束*/

				/*如果是多选*/
				if (parent[this.dataKey] && parent[this.dataKey].length && this.type == "checkbox") {
					if(this.value.length > 0 && !this.check){
						parent[this.dataKey].forEach((v, i) => {
							if (this.in_array(v.value, this.value)) {
								this.$set(parent[this.dataKey][i], "checked", true);
							} else {
								this.$set(parent[this.dataKey][i], "checked", false);
							}
						});
					}
					this.data = parent[this.dataKey];
					this.check = true;
				} 
				/*如果是单选*/
				
				if (parent[this.dataKey] && parent[this.dataKey].length && (this.type == "radio" || this.type == "radioLists") ) {
					if(this.value && !this.check){
						parent[this.dataKey].forEach((v, i) => {
							if (v.value == this.value) {
								this.$set(parent[this.dataKey][i], "checked", true);
							} else {
								this.$set(parent[this.dataKey][i], "checked", false);
							}
						});
					}
					console.log(this.dataKey);
					this.data = parent[this.dataKey];
					this.check = true;
					
				}
				
				if(this.type == "date" && !this.value){
					if(this.startKey) this.selectKey = this.startKey;
						
				}
				if(this.type == 'date' && !this.fromStartDate){
					const date = new Date();
		            let year = date.getFullYear();
		            let month = date.getMonth() + 1;
		            let day = date.getDate();

		            let startYear = year - 60;
		            let endYear = year + 2;
		            month = month > 9 ? month : '0' + month;;
		            day = day > 9 ? day : '0' + day;
		            this.startDate = `${startYear}-${month}-${day}`;
		            this.endDate = `${endYear}-${month}-${day}`;
				}else{
					this.startDate = this.fromStartDate;
		            this.endDate = this.fromEndDate;
				}
				
				if(this.type == 'time'){
					this.startTime = this.fromStartTime?this.fromStartTime:'00:00';
				    this.endTime = this.fromEndTime?this.fromEndTime:'23:59';
					//console.log(this.startTime)
				}
				
				if (this.type == "select" && this.changeField) {
					
					this.data = parent[this.dataKey];
					//console.log(this.data);
					for (var i = 0; i < parent[this.dataKey].length; i++) {
						if (parent[this.dataKey][i][this.changeField] == this.value) {
							this.selectKey = i;
							return parent[this.dataKey][i][this.selectLabel];
						}
					}
					if(!this.selectKey && this.startKey) this.selectKey = this.startKey;
				}

				if (this.type == "select" && this.changeField == 'label') {
					
					for (var i = 0; i < parent[this.dataKey].length; i++) {
						if (parent[this.dataKey][i][this.changeField] == this.value) {
							this.selectKey = i;
						}
					}
					if(!this.selectKey && this.startKey) this.selectKey = this.startKey;
					this.data = parent[this.dataKey];
				}
				
				if(this.type == "manyselect"){
					if(this.value){
						
						let v = this.value.split(",");
						if(v.length > 0 && !this.manyselectValue){
							if(v.length ==2){
								for (var i = 0; i < parent[this.dataKey].length; i++) {
									if (parent[this.dataKey][i].value == v[0]) {
										this.selectManyKey[0]=i;
										this.manyselectValue = parent[this.dataKey][i].label;
										parent[this.dataKey][i].children.forEach((children,key)=>{
											if(children.value == v[1]){
												this.selectManyKey[1]=key;
												this.manyselectValue += "-"+children.label;
											}
										});
									}
								}

								//this.manyselectValue = this.data[v[0]].label+"->"+this.data[v[0]].children[v[1]].label;
							}else{
								for (var i = 0; i < parent[this.dataKey].length; i++) {
									if (parent[this.dataKey][i].value == v[0]) {
										this.selectManyKey[0]=i;
										this.manyselectValue = parent[this.dataKey][i].label;
									}
								}
								

								//this.manyselectValue = this.data[v[0]].label;
							}
						}

					}
					
					this.data = parent[this.dataKey];
					
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
.citypickers {position: fixed;height: 100%;width: 100%;min-height: 100%;background-color: red;}
.weui-cell__ft .location-nav {border-radius: 5px;padding: 5px 10px;}
._picker-view-column {text-align: center;}
.citybody {position: fixed;bottom: 0px;left: 0;right: 0;background: white;z-index: 1000 !important;height: 300px;width: 100%;}
.cityheader {height: 100px;}
.city-cancel {float: left;margin: 20rpx;color: #818181;height: 60px;width: 100px;}
.city-true {float: right;margin: 20rpx;color: #2FB42E;height: 60px;width: 100px;text-align: right}
.section .picker {background-color: #fff;border-bottom: 1px #d9d9d9 solid;border-top: 1px #d9d9d9 solid;padding: 20rpx;}
.card {padding: 10px;}
.weui-cell_switch .weui-cell__bd{height:2.58823529em;min-height:2.58823529em;line-height:2.58823529em;}

.weui-cell_input {padding-top: 10px;padding-bottom: 10px;}
.weui-cell ._textarea{line-height: 20px;}

.weui-cell {padding: 20upx 30upx;display: flex;}
.mei-check {display: flex;}
.mei-label::before {border: 0!important;}
.mei-label {padding: 5px 10px 5px 0!important;width: 50%;box-sizing: border-box;display: flex!important;float: left;}

.weui-check__hd_in-checkbox {display: flex;}
.weui-icon-checkbox_circle,
.weui-icon-checkbox_success {margin: 0!important;}
.date-picker,
.order-picker {height: 2em;min-height: 2em;line-height: 2em;}

.upload-img .uploadvalue{float: left;}
.upload-img .uploadvalue button {width: 60px;height: 60px;border-radius: 0;background: #fff;border: 1px #d1d1d1 solid;line-height: 58px;padding: 0;text-align: center;display: flex;align-items: center;justify-content: center;margin: 0 8px 5px 0;}
.upload-img .uploadvalue button .iconfont {color: #999;font-size: 40px;}
.upload-img .value button {width: 60px;height: 60px;border-radius: 0;background: #fff;float: left;border: 1px #d1d1d1 solid;line-height: 58px;padding: 0;text-align: center;}
.upload-img .value button .iconfont {color: #999;font-size: 40px;}

.upload-img .imageLists {display: inline-block;}
.upload-img .imageLists button {width: 80px;height: 80px;border-radius: 0;background: #fff;border: 1px #d1d1d1 solid;line-height: 78px;padding: 0;text-align: center;display: inline-block;align-items: center;justify-content: center;float: left;margin: 0 8px 5px 0;}
.upload-img .imageLists button .iconfont {color: #999;font-size: 40px;}
.upload-img .value button {width: 60px;height: 60px;border-radius: 0;background: #fff;float: left;border: 1px #d1d1d1 solid;line-height: 58px;padding: 0;text-align: center;}
.upload-img .imageLists .il-item {position: relative;margin: 0 8px 5px 0;height: 80px;display: inline-block;}
.upload-img .imageLists image {width: 80px;height: 80px;display: flex;float: left;}
.upload-img .imageLists .del-img {position: absolute;width: 100%;bottom: 0;left: 0;background: rgba(0, 0, 0, 0.8);height: 20px;line-height: 16px;}
.share-overlay {position: fixed;top: 0px;right: 0;bottom: 0;left: 0;z-index: 100;width: 100%;height: 800px;background: #333;filter: alpha(opacity=70);-moz-opacity: 0.7;opacity: 0.7;}

.upload-img .oneImages{position: absolute;top: 5px;right: 5px;bottom: 5px;left: 5px;z-index: 2;}
.upload-img .oneImages .del-img{position: absolute;width: 100%;bottom: 0;left: 0;background: rgba(0, 0, 0, 0.8);height: 20px;line-height: 20px;}


.radioType{flex-wrap: wrap;padding-bottom: 0!important;}
.radioType>.weui-cell__hd{width: 100%;border-bottom: 1px #eee solid!important;padding-bottom: 12px;}
.radioType .weui-check__label{width: 100%;padding: 10px 0!important;border-bottom: 1px #eee solid;}
.radioType .weui-check__label:last-child{border-bottom: 0;}
.radioType .weui-check__label .iconfont{display: inline-block;width: 30px;}
.radioType .weui-check__label .weui-cell__bd{color: #333;}


</style>
