<!-- 调用
//发送验证码
<weui-input v-model="ruleform.code" label="发送验证码" type="sms" name="code" action="/auth/sendSms" :phone="ruleform.username"></weui-input>

//文本(通用)
<weui-input v-model="ruleform.name" label="门店名称" type="text" name="name"></weui-input>
左边带icon 
<weui-input  type="text" v-model="ruleform.userPass"  placeholder="请输入密码" myclass="test" >
	<div slot="left">
		<div class="float_l iconfont icon-login-lock" style="padding-right: 30rpx"></div>
	</div>
</weui-input>
只有input 没有label 
<weui-input v-model="ruleform.name" type="text"></weui-input>
右边自定义
<weui-input  type="text"  placeholder="请输入姓名" label="姓名">
	<div slot="middle">123</div>    
</weui-input>


//上传
 <weui-input v-model="ruleform.logo" label="上传LOGO" type="upload" upurl='article' allowUpLoadNum="1" name="logo" datatype="require"></weui-input>
 //上传单图
 <weui-input v-model="ruleform.logo" label="上传LOGO" type="singleUpload" upurl='article' allowUpLoadNum="1" name="logo" datatype="require"></weui-input>

//select
 <weui-input v-model="ruleform.sendType" name="sendType" datatype="require" label="送货方式" changeField="value" type="select" :data="[
	{label:'普通',value:1},
	{label:'加急',value:2},
	{label:'自提',value:3},
]"></weui-input>

 //日期
 <weui-input v-model="ruleform.date" label="日期" type="date" name="date"></weui-input>

 //textarea
 <weui-input v-model="ruleform.remark" label="门店简介" type="textarea" name="remark"></weui-input>

//checkbox
 <weui-input v-model="ruleform.sendType" label="送货方式" name="sendType" changeField="value" type="checkbox" :data="sendTypeArr"></weui-input>
注意必须要在data方法给数组才生效
data(){
	return {
		sendTypeArr:[
			   {label:'普通',value:'普通'},
			   {label:'加急',value:'加急'},
			  {label:'自提',value:'自提'},        
		],
		//给的指必须是数组
	}
}

//radio 单选

 <weui-input v-model="ruleform.sendType" name="sendType"  label="送货方式" changeField="value" type="radio" :data="sendTypeArr"></weui-input>
注意必须要在data方法给数组才生效
data(){
	return {
		sendTypeArr:[
			   {label:'普通',value:'普通'},
			   {label:'加急',value:'加急'},
			  {label:'自提',value:'自提'},        
		],
		 //给的指必须是数组
	}
}

//级联选择
<weui-input v-model="ruleform.needArr" label="需求类型" name="needArr"   type="manyselect" :data=":[
	{label:'服务类',value:'0',children:[
		{label:'工商财税法律',value:'12'},
		{label:'咨询管理',value:'2'},
		{label:'数据信息',value:'3'},
		{label:'人力资源',value:'4'},
		{label:'电商营销',value:'5'},
		{label:'医疗健康',value:'6'},
	]},{
	label:'产品类',value:'11',children:[
		{label:'电子电工',value:'7'},
		{label:'五金管材',value:'8'},
		{label:'家电日用',value:'9'},
		{label:'机械设备',value:'10'}
	]}
]" @callback="needCallBack" changeField="value"></weui-input>

ruleform.needArr = [0,0] ;  //数组，默认第一个;
开关
<weui-input v-model="ruleform.radio" label="标题1" type="switch"></weui-input>



 -->
<template>
	<div>
		<!-- 如果是开关 -->
		<view :class="['weui-cell','weui-cell_input','weui-cell_switch',myclass]" v-if="type == 'switch'">
			<view class="weui-cell__bd">
				<view class="weui-label fs14">{{ label }}</view>
			</view>
			<view class="weui-cell__ft">
				<switch @change="changeRadio($event)" :checked="currentValue ? true : false" style="zoom: 60%;" />
			</view>
		</view>
		<!-- 如果是开关结束 -->
		<!-- 如果是定位 -->
		<view :class="['weui-cell','weui-cell_input',myclass]" v-if="type == 'location'">
			<view :class="['weui-cell__hd']">
				<view class="weui-label fs14">{{ label }}<span class="font_red" v-if="isRequire">*</span></view>
			</view>
			<view :class="['weui-cell__bd']">
				<input class="weui-input font_666 fs14 nowrap" type="text" v-model.lazy="currentValue" placeholder="请选择您的位置信息" :disabled="disabled">
			</view>
			<view class="weui-cell__ft">
				<a href="" :class="['fs12','location-nav',navClass ? navClass : 'dx-btn-green']" @click="changeLocation">定位</a>
			</view>
		</view>
		<!-- 如果是定位结束 -->
		<!-- 如果是文本 -->
		<view :class="['weui-cell','weui-cell_input',myclass]" v-if="type == 'text' || type == 'textarea' || type == 'password' || type == 'number' || type == 'digit' || type == 'txt'">
			<view :class="['weui-cell__hd']">
				<slot name="left" />
				<view class="weui-label fs14" v-if="label">{{ label }}<span class="font_red" v-if="isRequire">*</span></view>
			</view>
			<view :class="['weui-cell__bd']">
				<input class="weui-input font_666 fs14 nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" v-if="type == 'text' && currentValue != undefined" :disabled="disabled" v-model.lazy="currentValue" :value="currentValue" :focus="focus" />
				<input class="weui-input font_666 fs14 nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" v-if="type == 'number' && currentValue != undefined" :disabled="disabled" v-model.lazy="currentValue" :value="currentValue" :focus="focus" type="number" />
				<input class="weui-input font_666 fs14 nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" v-if="type == 'digit' && currentValue != undefined" :disabled="disabled" v-model.lazy="currentValue" :value="currentValue" :focus="focus" type="digit" />
				<input class="weui-input font_666 fs14 nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" v-model.lazy="currentValue" v-if="type == 'password' && currentValue != undefined" :disabled="disabled" type="password" />
				<textarea maxlength="-1" class="weui-text weui-input font_666 fs14 ptb5" :placeholder="placeholder ? placeholder :'请输入'+label" v-model.lazy="currentValue" v-if="type == 'textarea'" style="height:80px" :disabled="disabled" />
				<p v-if="type == 'txt'">{{currentValue }}</p>
				<slot name="middle" />
			</view>
			<slot name="right" />
		</view>
		<!-- 如果是文本结束 -->


		<!-- 如果是发送验证码开始 -->
		<view :class="['weui-cell','weui-cell_input',myclass]" v-if="type == 'sms'" >
			<view :class="['weui-cell__hd']">
				<slot name="left" />
				<view class="weui-label fs14" v-if="label">{{ label }}<span class="font_red" v-if="isRequire">*</span></view>
			</view>
			<view :class="['weui-cell__bd']">
				<input class="weui-input font_666 fs14 nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" :disabled="disabled"   :focus="focus" @input="bingPhoneCode"/>
				<slot name="middle" />
			</view>
			  <button class="dx-btn dx-btn-green" @click="toSms">{{ smsTitle }}</button>
		</view>
		<!-- 如果是发送验证码结束 -->


		<!-- 如果是多选 -->
		<view :class="['weui-cell','weui-cell_input',myclass,radioType ? 'radioType' : '']" v-if="type == 'checkbox'">
			<view :class="['weui-cell__hd']">
				<slot name="left" />
				<view class="weui-label fs14">{{ label }}<span class="font_red" v-if="isRequire">*</span></view>
			</view>
			<view :class="['weui-cell__bd']">
				<checkbox-group @change="checkboxChange">
					<!-- 横向报局 -->
					<label class="weui-cell mei-label weui-check__label" style="display:inline-block;padding-left: 0px" v-for="item in data" v-if="!radioType">
						<checkbox class="weui-check mei-check" :value="item.value" :checked="item.checked" />
						<view class="weui-cell__hd weui-check__hd_in-checkbox">
							<!-- 未选中 -->
							<icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!item.checked"></icon>
							<!-- 选中 -->
							<icon class="weui-icon-checkbox_success" type="success" size="23" v-else></icon>
						</view>
						<view class="weui-cell__bd fs15 font_666">{{item.label}}</view>
					</label>
					<!-- 竖向报局 -->
					<label class="weui-cell mei-label weui-check__label"  v-for="item in data" v-if="!radioType">
						<checkbox class="weui-check mei-check" :value="item.value" :checked="item.checked" />
						<view class="weui-cell__hd" v-if="item.icon">
							<span :class="item.icon"></span>
						</view>
						<view class="weui-cell__bd fs15 font_666">{{item.label}}</view>
						<view class="weui-cell__ft weui-check__hd_in-checkbox" >
							<!-- 未选中 -->
							<icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!item.checked"></icon>
							<!-- 选中 -->
							<icon class="weui-icon-checkbox_success" type="success" size="23" v-else></icon>
						</view>
					</label>


				</checkbox-group>
			</view>
			<slot name="right" />
		</view>
		<!-- 如果是多选结束 -->
		<!-- 如果是单选 -->
		<view :class="['weui-cell','weui-cell_input',myclass, radioType ? 'radioType' : '']" v-if="type == 'radio'">
			<view class="weui-cell__hd">
				<slot name="left" />
				<view class="weui-label fs14">{{ label }}<span class="font_red" v-if="isRequire">*</span></view>
			</view>
			<view class="weui-cell__bd">
				<radio-group @change="radioChange">
					<!-- 横向报局 -->
					<label class="weui-cell mei-label weui-check__label" style="display:inline-block;padding-left: 0px" v-for="item in data" v-if="!radioType">
						<checkbox class="weui-check mei-check" :value="item.value" :checked="item.checked" />
						<view class="weui-cell__hd weui-check__hd_in-checkbox" >
							<!-- 未选中 -->
							<icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!item.checked"></icon>
							<!-- 选中 -->
							<icon class="weui-icon-checkbox_success" type="success" size="23" v-else></icon>
						</view>
						<view class="weui-cell__bd fs15 font_666">{{item.label}}</view>
					</label>
					<!-- 竖向报局 -->
					<label class="weui-cell mei-label weui-check__label" v-for="item in data" v-if="radioType">
						<checkbox class="weui-check mei-check" :value="item.value" :checked="item.checked" />
						<view class="weui-cell__hd" v-if="item.icon">
							<span :class="item.icon"></span>
						</view>
						<view class="weui-cell__bd fs15 font_666">{{item.label}}</view>
						<view class="weui-cell__ft weui-check__hd_in-checkbox" >
							<!-- 未选中 -->
							<icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!item.checked"></icon>
							<!-- 选中 -->
							<icon class="weui-icon-checkbox_success" type="success" size="23" v-else></icon>
						</view>
						
					</label>
				</radio-group>
			</view>
			<slot name="right" />
		</view>
		<!-- 如果是单选结束 -->

		<!-- 如果是单选列表 -->
		<view :class="['weui-cell','weui-cell_input',myclass]" v-if="type == 'radioLists'" v-for="item in data">
			<view class="weui-cell__hd" >
				<slot name="left" />
				<view class="weui-label fs14">{{ item.label }}<span class="font_red" v-if="isRequire">*</span></view>
			</view>
			<view class="weui-cell__bd">
				<p class="price"><span class="fs12">￥</span>{{ item.value }}</p>
				
			</view>
			<div class="weui-cell__ft">
				<radio-group @change="radioChange" style="display: flex;justify-content: flex-end;">
					<label class="weui-cell mei-label weui-check__label" style="display:inline-block;padding-left: 0px" >
						<checkbox class="weui-check mei-check" :value="item.value" :checked="item.checked" />
						<view class="weui-cell__hd weui-check__hd_in-checkbox">
							<!-- 未选中 -->
							<icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!item.checked"></icon>
							<!-- 选中 -->
							<icon class="weui-icon-checkbox_success" type="success" size="23" v-else></icon>
						</view>
					</label>
				</radio-group>
			</div>
			<slot name="right" />
		</view>
		<!-- 如果是单选列表结束 -->



		<!-- 如果是manyselect -->
		<view :class="['weui-cell','weui-cell_input',myclass]" v-if="type == 'manyselect'" @click="chooseFclass">
			<view class="weui-cell__hd">
				<slot name="left" />
				<view class="weui-label fs14">{{ label }}<span class="font_red" v-if="isRequire">*</span></view>
			</view>
			<view class="weui-cell__bd">
				<div class="font_666 fs14 nowrap">
					{{ manyselectValue ?manyselectValue :'请选择'+label }}
				</div>
			</view>
			<view class="weui-cell__ft weui-cell__ft_in-access"></view>
			<slot name="right" />
		</view>
		<!-- 如果是select结束 -->
		<!-- 如果是select -->
		<view :class="['weui-cell','weui-cell_input',myclass]" v-if="type == 'select'">
			<view class="weui-cell__hd">
				<slot name="left" />
				<view class="weui-label fs14">{{ label }}<span class="font_red" v-if="isRequire">*</span></view>
			</view>
			<view class="weui-cell__bd text-right">
				<div v-if="disabled">
					<span class="fs14">{{ currentValue }}</span>
				</div>
				<div v-else>
					<picker :value="selectKey" class="order-picker" style="wdith:100%"  :range="data" range-key="label" @change="selectRes">
						<view class="picker fs14 font_666" v-if="currentValue">
							{{currentValue}}
						</view>
						<view class="picker fs14 font_666" wx:else>
							请选择{{ label }}
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
		<!-- 如果是日期 -->
		<view :class="['weui-cell','weui-cell_input',myclass]" v-if="type == 'date'">
			<view class="weui-cell__hd">
				<slot name="left" />
				<view class="weui-label fs14">{{ label }}<span class="font_red" v-if="isRequire">*</span></view>
			</view>
			<view class="weui-cell__bd">
				<picker :value="label" class="date-picker" style="width:100%" mode="date" @change="bindDateChange" start="2018-03-26" end="2019-09-01">
					<view class="picker fs14 font_666" v-if="currentValue">
						{{currentValue}}
					</view>
					<view class="picker fs14 font_666" wx:else>
						请选择{{ label }}
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
		<view :class="['weui-cell','weui-cell_input',myclass]" v-if="type == 'time'">
			<view class="weui-cell__hd">
				<slot name="left" />
				<view class="weui-label fs14">{{ label }}<span class="font_red" v-if="isRequire">*</span></view>
			</view>
			<view class="weui-cell__bd">
				<picker :value="label" class="date-picker" style="width:100%" mode="time" @change="bindTimeChange" start="00:00" end="23:59">
					<view class="picker fs14 font_666" v-if="currentValue">
						{{currentValue}}
					</view>
					<view class="picker fs14 font_666" wx:else>
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
		<!-- 如果是多张图片上传 -->
		<view :class="['weui-cell','weui-cell_input',myclass]" style="min-height: 160rpx" v-if="type == 'upload'">
			<view class="weui-cell__hd" v-if="label">
				<view class="weui-label fs14">{{ label }}<span class="font_red" v-if="isRequire">*</span></view>
			</view>
			<view class="weui-cell__bd">
				<div :class="['upload-img',myclass]">
					<div class="imageLists">
						<div class="il-item" v-for="item in currentValue">
							<img :src="loading ? '' :getSiteName+'/upload/images/'+upurl+'/'+item" v-if="currentValue" lazy-load="true" mode="aspectFill" data-name="pic" style="height:160rpx;width:160rpx" :class="loading">
							<p class="del-img text-center" @click="delImage" data-name="pic" :data-key="index">
								<span class="iconfont icon-xiaozhu-del fs12 fs-white"></span>
							</p>
						</div>
					</div>
					<div class="uploadvalue" v-if="currentValue && currentValue.length<allowUpLoadNum">

						<button hover-class="none" type="button" @click="uploadImage" data-thumbsize="300" :data-upurl="upurl" :data-allowuploadnum="allowUpLoadNum" :data-type="uploadtype">
							<text class="iconfont icon-release-addimg" style="font-size: 30px;color:#ccc"></text>
							<p class="imgTxt" v-if="txtType == 'imgTxt'">{{ imgTxt }}</p>
						</button>
					</div>
					<div class="clear"></div>
				</div>
			</view>
		</view>

		<!-- 如果是滚动图片上传 -->
		<div :class="['upload-img',myclass]" style="min-height: 160rpx" v-if="type == 'scrollUpload'">
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
		<view :class="['weui-cell','weui-cell_input',myclass]" style="min-height: 160rpx" v-if="type == 'singleUpload'">
			<view class="weui-cell__hd" v-if="label">
				<view class="weui-label fs14">{{ label }}<span class="font_red" v-if="isRequire">*</span></view>
			</view>
			<view class="weui-cell__bd">
				<div :class="['upload-img',myclass]">
					<div class="oneImages" v-for="item in currentValue">
						<img :src="getSiteName+'/upload/images/'+upurl+'/'+item" v-if="currentValue" lazy-load="true" mode="aspectFill" data-name="pic" style="height: 100%;width: 100%" >
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

		<div v-if="condition" class="citybody">
			<view class="cityheader">
				<view @click="chooseFclass" class="city-cancel"><span class="fs15">取消</span></view>
				<view @click="comfirm" class="city-true"><span class="fs15">确定</span></view>
			</view>
			<picker-view indicator-style="height: 50px;" style="width: 100%; height: 150px;" :value="selectManyKey" @change="bindChange">
				<picker-view-column>
					<view v-for="(parent,key) in data" wx:key="item" style="line-height: 50px;padding-left:40rpx;;font-size:15px;z-index: 1000 !important;">{{parent.label}}</view>
				</picker-view-column>
				<picker-view-column>
					<view v-if="data[selectManyKey[0]].children" v-for="(son,key2) in data[selectManyKey[0]].children" wx:key="item" style="line-height: 50px;padding-left:40rpx;;font-size:15px;z-index: 1000 !important;">{{son.label}}</view>
				</picker-view-column>
			</picker-view>
		</div>
		<view class="share-overlay" @click="chooseFclass" v-if="condition"></view>
	</div>
</template>
<script>
export default {
	props: ['value', 'label', 'type', 'upurl', 'allowUpLoadNum', 'myclass', 'data', 'disabled', 'placeholder', 'changeField', 'uploadtype', 'name', 'datatype','navClass','imgTxt','txtType','focus','phone',"action",'radioType'],
	data() {
		return {
			getSiteName: this.getSiteName(),
			chooseArr: [],
			chooseValue: '',
			check: false,
			manyselectValue: '',
			condition: false,
			isRequire: false,
			canSend:true,
			selectKey:0,
			selectManyKey:[0,0],
			smsTitle:'发送验证码',
			timer:''

		}
	},
	onUnload(){
		clearInterval(this.timer);
	},
	methods: {
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
                    	this.postAjax(this.action,{phone:this.phone},msg=>{
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
			wx.chooseLocation({
				success: msg => {
					this.currentValue = msg.address;
					this.$emit('callback', msg);
				}
			});
		},
		comfirm() {
			this.chooseFclass();
			let parentValue = this.data[this.selectManyKey[0]];
			console.log(this.selectManyKey);
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
			if(this.changeField == 'label'){
				this.currentValue = this.data[e.mp.detail.value].label;
			}else{
				this.currentValue = this.data[e.mp.detail.value].value;
			}
			
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
			this.currentValue = e.mp.detail.value;
		},
		checkboxChange(e) {
			let chooseArr = [];
			this.chooseArr = e.mp.detail.value;
			this.data.forEach((v, i) => {
				if (this.in_array(v.value, this.chooseArr)) {
					this.$set(this.data[i], "checked", true);
				} else {
					this.$set(this.data[i], "checked", false);
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
			this.data.forEach((v, i) => {
				if (v.value == this.chooseValue) {
					this.$set(this.data[i], "checked", true);
				} else {
					this.$set(this.data[i], "checked", false);
				}
				if (v.checked) {
					this.chooseValue = v.value;
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
			let uploadUrl = this.getSiteName + '/ajax/app-upload-pic';
			wx.chooseImage({
				count: 1, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: res => {
					var tempFilePaths = res.tempFilePaths;
					wx.showLoading({
						title: '上传中',
					})
					wx.uploadFile({ //上传服务器
						url: uploadUrl, //仅为示例，非真实的接口地址
						thumbsize: 300,
						filePath: tempFilePaths[0],
						name: 'file',
						header: {
							'content-type': 'multipart/form-data'
						},
						formData: {
							'upurl': upurl,
						},
						success: res => {
							let data = JSON.parse(res.data);
							let file = data.filename;
							if (!this.currentValue) this.currentValue = [];
							this.currentValue.push(file);
							//this.postAjax("/ajax/image-resize", { type: upurl, value: file, size: [thumbsize] }, msg => {}, this);
							wx.hideLoading();
						},
						fail: function(res) {
							console.log(res);
						},
						complete: function(res) {
							console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
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
						console.log('用户点击取消')
					}
				}
			})
		},
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
				if (this.name && this.value == undefined) {
					if (this.type == 'upload' && this.allowUpLoadNum > 0) {
						this.$set(this.$parent.ruleform, this.name, []);
					} else {
						this.$set(this.$parent.ruleform, this.name, '');
					}

				}
				if (this.datatype && this.$parent.vaildate && this.$parent.vaildate[this.name] == undefined) {
					this.$set(this.$parent.vaildate, this.name, {
						name: this.label ? this.label : this.placeholder,
						vaild: this.datatype
					});

				}
				/*验证规则结束*/

				/*如果是多选*/
				if (this.data && this.data.length && this.type == "checkbox" && this.value.length > 0 && !this.check) {

					this.data.forEach((v, i) => {
						if (this.in_array(v.value, this.value)) {
							this.$set(this.data[i], "checked", true);
						} else {
							this.$set(this.data[i], "checked", false);
						}
					});
					this.check = true;
				}
				/*如果是单选*/
				if (this.data && this.data.length && (this.type == "radio" || this.type == "radioLists") && this.value && !this.check) {

					this.data.forEach((v, i) => {
						if (v.value == this.value) {
							this.$set(this.data[i], "checked", true);
						} else {
							this.$set(this.data[i], "checked", false);
						}
					});
					this.check = true;
				}


				if (this.type == "select" && this.changeField == 'value') {
					for (var i = 0; i < this.data.length; i++) {
						if (this.data[i].value == this.value) {
							this.selectKey = i;
							return this.data[i].label;
						}
					}
				}

				if (this.type == "select" && this.changeField == 'label') {
					for (var i = 0; i < this.data.length; i++) {
						if (this.data[i].value == this.value) {
							this.selectKey = i;
						}
					}
				}




				if(this.type == "manyselect"){
					if(this.value){

						let v = this.value.split(",");
						if(v.length > 0 && !this.manyselectValue){
							if(v.length ==2){
								for (var i = 0; i < this.data.length; i++) {
									if (this.data[i].value == v[0]) {
										this.selectManyKey[0]=i;
										this.manyselectValue = this.data[i].label;
										this.data[i].children.forEach((children,key)=>{
											if(children.value == v[1]){
												this.selectManyKey[1]=key;
												this.manyselectValue += "-"+children.label;
											}
										});
									}
								}

								//this.manyselectValue = this.data[v[0]].label+"->"+this.data[v[0]].children[v[1]].label;
							}else{
								for (var i = 0; i < this.data.length; i++) {
									if (this.data[i].value == v[0]) {
										this.selectManyKey[0]=i;
										this.manyselectValue = this.data[i].label;
									}
								}
								console.log(this.selectManyKey);

								//this.manyselectValue = this.data[v[0]].label;
							}
						}

					}
					

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
@import url("font/globalFont.css");
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

.weui-cell_input {border-bottom: 1px solid #eee;padding-top: 10px!important;padding-bottom: 10px!important;}.weui-cell ._textarea{line-height: 20px;}

.weui-cell {padding: 10px;}
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
