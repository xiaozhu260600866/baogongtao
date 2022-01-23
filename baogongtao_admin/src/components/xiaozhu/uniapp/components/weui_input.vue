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
<weui-input v-model="ruleform.sendType" label="送货方式" name="sendType" changeField="value" type="checkbox" dataKey="sendTypeArr" :radioType="true"></weui-input>
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

<weui-input v-model="ruleform.sendType" label="送货方式" name="sendType" changeField="value" type="radio" dataKey="sendTypeArr" :radioType="true"></weui-input>
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
  <view>
    <!-- 开关 -->
    <view v-if="type == 'switch'" :class="['dx-cell','dx-cell_switch',myclass]">
      <view class="dx-cell_bd">
        <view v-if="label" class="dx-label">{{ label }}</view>
      </view>
      <view class="dx-cell_ft">
        <switch class="switch" :checked="currentValue ? true : false" @change="changeRadio($event)" />
      </view>
    </view>
    <!-- 开关结束 -->

    <!-- 定位 -->
    <view v-if="type == 'location'" :class="['dx-cell',myclass]">
      <view :class="['dx-cell_hd']">
        <view v-if="label" class="dx-label">{{ label }}<span v-if="isRequire" class="star">*</span></view>
      </view>
      <view :class="['dx-cell_bd']">
        <input
          class="dx-input"
          type="text"
          placeholder="请选择您的位置信息"
          :disabled="disabled"
          :value="currentValue"
          @input="updateVal"
        >
      </view>
      <view class="dx-cell_ft">
        <view :class="['dx-nav',navClass ? navClass : 'dx-btn-green']" @click="changeLocation">定位</view>
      </view>
    </view>
    <!-- 定位结束 -->

    <!-- 文本 -->
    <view v-if="type == 'text' || type == 'textarea' || type == 'password' || type == 'number' || type == 'digit' || type == 'txt'" :class="['dx-cell',myclass]">
      <input
        v-if=" currentValue != undefined"
        class="dx-input"
        :placeholder="placeholder ? placeholder :'请输入'+label"
        :disabled="disabled"
        :value="currentValue"
        hidden
      >
      <view :class="['dx-cell_hd']">
        <slot name="left" />
        <view v-if="label" class="dx-label">{{ label }}<span v-if="isRequire" class="star">*</span></view>
      </view>
      <view :class="['dx-cell_bd']">
        <input
          v-if="type == 'text' && currentValue != undefined"
          class="dx-input"
          :placeholder="placeholder ? placeholder :'请输入'+label"
          :placeholder-class="placeholderClass"
          :disabled="disabled"
          :value="currentValue"
          :focus="focus"
          :maxlength="maxlength ? maxlength: 100"
          @input="updateVal"
        >
        <input
          v-if="type == 'number' && currentValue != undefined"
          class="dx-input"
          :placeholder="placeholder ? placeholder :'请输入'+label"
          :disabled="disabled"
          :value="currentValue"
          :focus="focus"
          :placeholder-class="placeholderClass"
          type="number"
          :maxlength="maxlength ? maxlength: 100"
          @input="updateVal"
        >
        <input
          v-if="type == 'digit' && currentValue != undefined"
          class="dx-input"
          :placeholder="placeholder ? placeholder :'请输入'+label"
          :placeholder-class="placeholderClass"
          :disabled="disabled"
          :value="currentValue"
          :focus="focus"
          type="digit"
          :maxlength="maxlength ? maxlength: 100"
          @input="updateVal"
        >
        <input
          v-if="type == 'password' && currentValue != undefined"
          class="dx-input"
          :placeholder="placeholder ? placeholder :'请输入'+label"
          :placeholder-class="placeholderClass"
          type="password"
          :disabled="disabled"
          @input="updateVal"
        >
        <textarea
          v-if="type == 'textarea'"
          maxlength="-1"
          class="dx-text"
          :placeholder="placeholder ? placeholder :'请输入'+label"
          :placeholder-class="placeholderClass"
          :disabled="disabled"
          :value="currentValue"
          @input="updateVal"
        />
        <view v-if="type == 'txt'" class="dx-txt">{{ currentValue }}</view>
        <slot name="middle" />
      </view>
      <view v-if="arrow" class="dx-cell_ft dx_ft-access" />
      <slot name="right" />
    </view>
    <!-- 文本结束 -->

    <!-- 发送验证码 -->
    <view v-if="type == 'sms'" :class="['dx-cell',myclass]">
      <view :class="['dx-cell_hd']">
        <slot name="left" />
        <view v-if="label" class="dx-label">{{ label }}<span v-if="isRequire" class="star">*</span></view>
      </view>
      <view :class="['dx-cell_bd']">
        <input class="dx-input" :placeholder="placeholder ? placeholder :'请输入'+label" :disabled="disabled" :focus="focus" @input="bingPhoneCode">
        <slot name="middle" />
      </view>
      <view class="dx-cell_ft">
        <view :class="['dx-nav',navClass ? navClass : 'dx-btn-green']" @click="toSms">{{ smsTitle }}</view>
      </view>
    </view>
    <!-- 发送验证码结束 -->

    <!-- 多选 -->
    <view v-if="type == 'checkbox'" :class="['dx-cell', myclass, radioType ? 'radioType' : '']">

      <view :class="['dx-cell_hd']">
        <slot name="left" />
        <view v-if="label" class="dx-label">{{ label }}<span v-if="isRequire" class="star">*</span></view>
      </view>
      <view :class="['dx-cell_bd']">

        <checkbox-group :class="row == true ? 'row_group' : 'col_group'" @change="checkboxChange">
          <!-- 横向报局 -->
          <input
            v-if=" currentValue != undefined"
            class="dx-input"
            :placeholder="placeholder ? placeholder :'请输入'+label"
            :disabled="disabled"
            :value="currentValue"
            hidden
          >
          <label v-for="item in data" v-if="!row" :class="['dx-cell dx-check_label', Labelleft ? 'label_left' : '']">
            <view class="dx-cell_hd dx-checkbox">
              <checkbox v-if="!item.checked" :value="changeField == 'value' ? item.value :item.label" color="#3CC51F" />
              <checkbox v-else :value="changeField == 'value' ? item.value :item.label" checked="true" color="#3CC51F" />
            </view>
            <view class="dx-cell__bd">{{ item.label }}</view>
          </label>
          <!-- 竖向报局 -->
          <label v-for="item in data" v-if="row" :class="['dx-cell dx-check_label', Labelleft ? 'label_left' : '']">
            <view v-if="item.icon" class="dx-cell_hd">
              <span :class="item.icon" />
            </view>
            <view class="dx-cell_bd">{{ item.label }} </view>
            <view class="dx-cell_ft dx-checkbox">
              <checkbox v-if="!item.checked" :value="changeField == 'value' ? item.value :item.label" color="#3CC51F" />
              <checkbox v-else :value="changeField == 'value' ? item.value :item.label" checked="true" color="#3CC51F" />
            </view>
          </label>
        </checkbox-group>
      </view>
      <slot name="right" />
    </view>
    <!-- 多选结束 -->

    <!-- 单选 -->
    <view v-if="type == 'radio'" :class="['dx-cell',myclass]">
      <view class="dx-cell_hd">
        <slot name="left" />
        <view v-if="label" class="dx-label">{{ label }}<span v-if="isRequire" class="star">*</span></view>
      </view>
      <view class="dx-cell_bd">
        <radio-group :class="row == true ? 'row_group' : 'col_group'" @change="radioChange">
          <!-- 横向报局 -->
          <input
            v-if=" currentValue != undefined"
            class="dx-input"
            :placeholder="placeholder ? placeholder :'请输入'+label"
            :disabled="disabled"
            :value="currentValue"
            hidden
          >
          <label v-for="(item,key) in data" v-if="!row" :key="item.label" :class="['dx-cell dx-check_label', Labelleft ? 'label_left' : '']">
            <view class="dx-cell_hd dx-checkbox">
              <!-- 未选中 -->
              <radio v-if="item.checked" :value="changeField == 'value' ? item.value :item.label" color="#3CC51F" checked="true" />
              <radio v-else :value="changeField == 'value' ? item.value :item.label" color="#3CC51F" />
            </view>
            <view class="dx-cell_bd">
              <!-- #ifndef MP-WEIXIN -->
              <slot :name="'icon_'+key" />
              <!-- #endif -->
              {{ item.label }}
            </view>
          </label>
          <!-- 竖向报局 -->
          <label v-for="(item,key) in data" v-if="row" :class="['dx-cell dx-check_label', Labelleft ? 'label_left' : '']">
            <view v-if="item.icon" class="dx-cell_hd">
              <span :class="item.icon" />
            </view>
            <view class="dx-cell_bd">
              <!-- #ifndef MP-WEIXIN -->
              <slot :name="'icon_'+key" />
              <!-- #endif -->
              {{ item.label }}
            </view>
            <view class="dx-cell_hd dx-checkbox">
              <radio v-if="item.checked" :value="changeField == 'value' ? item.value :item.label" color="#3CC51F" checked="true" />
              <radio v-else :value="changeField == 'value' ? item.value :item.label" color="#3CC51F" />
            </view>

          </label>
        </radio-group>
      </view>
      <slot name="right" />
    </view>
    <!-- 单选结束 -->

    <!-- select -->
    <view v-if="type == 'select'" :class="['dx-cell','dx-select',myclass]">
      <view class="dx-cell_hd">
        <slot name="left" />
        <view v-if="label" class="dx-label">{{ label }}<span v-if="isRequire" class="star">*</span></view>
      </view>
      <view class="dx-cell_bd">
        <input
          v-if=" currentValue != undefined"
          class="dx-input"
          :placeholder="placeholder ? placeholder :'请选择'+label"
          :disabled="disabled"
          :value="currentValue"
          hidden
        >
        <div v-if="disabled" class="dx-label">{{ currentValue }}</div>
        <div v-else>
          <picker :value="selectKey" class="order-picker" :range="data" range-key="label" @change="selectRes">
            <view v-if="currentValue" class="picker picker-value">
              {{ currentValue }}
            </view>
            <view v-else class="picker picker-label">
              {{ placeholder ? placeholder : '请选择'+label }}
            </view>
          </picker>
        </div>
      </view>
      <view v-if="!disabled" class="dx-cell_ft dx_ft-access" />
      <slot name="right" />
    </view>
    <!-- select结束 -->

    <!-- select -->
    <view v-if="type == 'emptySelect'" :class="['dx-cell','dx-select',myclass]" @click="toClick">
      <view class="dx-cell_hd">
        <slot name="left" />
        <view v-if="label" class="dx-label">{{ label }}<span v-if="isRequire" class="star">*</span></view>
      </view>
      <view class="dx-cell_bd">
        <input
          v-if=" currentValue != undefined"
          class="dx-input"
          :placeholder="placeholder ? placeholder :'请选择'+label"
          :disabled="disabled"
          :value="currentValue"
          hidden
        >
        <div v-if="disabled" class="dx-label">{{ currentValue }}</div>
        <div v-else>
          <view v-if="currentValue" class="picker picker-value">
            {{ currentValue }}
          </view>
          <view v-else class="picker picker-label">
            {{ placeholder ? placeholder : '请选择'+label }}
          </view>
        </div>
      </view>
      <view v-if="!disabled" class="dx-cell_ft dx_ft-access" />
      <slot name="right" />
    </view>
    <!-- select结束 -->

    <!-- manyselect -->
    <view v-if="type == 'manyselect'" :class="['dx-cell','dx-select',myclass]" @click="chooseFclass">
      <input
        v-if=" currentValue != undefined"
        class="dx-input"
        :placeholder="placeholder ? placeholder :'请输入'+label"
        :disabled="disabled"
        :value="currentValue"
        hidden
      >
      <view class="dx-cell_hd">
        <slot name="left" />
        <view v-if="label" class="dx-label">{{ label }}<span v-if="isRequire" class="star">*</span></view>
      </view>
      <view class="dx-cell_bd">
        <!-- <view class="dx-label">
					{{ manyselectValue ?manyselectValue :'请选择'+label }}
				</view> -->
        <view v-if="manyselectValue" class="picker picker-value">
          {{ manyselectValue }}
        </view>
        <view v-else class="picker picker-label">
          {{ placeholder ? placeholder : '请选择'+label }}
        </view>
      </view>
      <view v-if="!disabled" class="dx-cell_ft dx_ft-access" />
      <slot name="right" />
    </view>
    <!-- manyselect结束 -->

    <!-- 多张图片上传 -->
    <view v-if="type == 'upload'" :class="['dx-cell','dx-upload_img',myclass]">
      <input
        v-if=" currentValue != undefined"
        class="dx-input"
        :placeholder="placeholder ? placeholder :'请输入'+label"
        :disabled="disabled"
        :value="currentValue"
        hidden
      >
      <view v-if="label" class="dx-cell_hd">
        <view v-if="label" class="dx-label">{{ label }}<span v-if="isRequire" class="star">*</span></view>
      </view>
      <view class="dx-cell_bd">
        <div :class="['upload-img',myclass]">
          <div v-if="currentValue && currentValue.length<allowUpLoadNum && !disabled" class="uploadvalue">
            <div class="upload" data-thumbsize="300" :data-upurl="upurl" :data-allowuploadnum="allowUpLoadNum" :data-type="uploadtype" @click="uploadImage">
              <p class="add-icon" />
              <p v-if="txtType == 'imgTxt'" class="imgTxt">{{ imgTxt }}</p>
            </div>
          </div>
          <div v-for="(item,index) in currentValue" class="il-item">
            <image v-if="currentValue" :src="loading ? '' :getSiteName+'/upload/images/'+upurl+'/'+item" lazy-load="true" mode="aspectFill" data-name="pic" :class="['img',loading]" @click="largeImage(getSiteName+'/upload/images/'+upurl+'/'+item)" />
            <div v-if="!disabled" class="del" data-name="pic" :data-key="index" @click="delImage">
              <p class="del-icon" />
            </div>
          </div>
        </div>
      </view>
    </view>
    <!-- 多张图片上传结束 -->
    <!-- 多视频上传 -->
    <view v-if="type == 'uploadVideo'" :class="['dx-cell','dx-upload_video',myclass]">
      <input
        v-if=" currentValue != undefined"
        class="dx-input"
        :placeholder="placeholder ? placeholder :'请输入'+label"
        :disabled="disabled"
        :value="currentValue"
        hidden
      >
      <view v-if="label" class="dx-cell_hd">
        <view v-if="label" class="dx-label">{{ label }}<span v-if="isRequire" class="star">*</span></view>
      </view>
      <view class="dx-cell_bd">
        <div :class="['upload-video',myclass]">
          <div v-if="currentValue && currentValue.length<allowUpLoadNum && !disabled" class="uploadvalue">
            <div class="upload" data-thumbsize="300" :data-upurl="upurl" :data-allowuploadnum="allowUpLoadNum" :data-type="uploadtype" @click="uploadVideo">
              <p class="iconfont icon-xiaozhu-video" />
              <p v-if="txtType == 'videoTxt'" class="videoTxt">{{ videoTxt }}</p>
            </div>
          </div>
          <div v-for="(item,index) in currentValue" class="il-item">
            <!-- <video id="myVideo" :src="getSiteName+'/upload/video/'+upurl+'/'+videoSrc" enable-danmu danmu-btn controls></video> -->
            <view class="video-group" @click="openVideoDiag(item)">
              <image class="cover" :src="getSiteName+'/upload/video/'+upurl+'/'+item.videoCover" mode="aspectFill" />
              <text class="icon iconfont icon-pro-play" />
            </view>
            <div v-if="!disabled" class="del" data-name="pic" :data-key="index" @click="delImage">
              <p class="del-icon" />
            </div>
          </div>
        </div>
      </view>
    </view>

    <!-- 视频弹出层 -->
    <!-- <dx-diag :tbPadding="0" :lrPadding="0" width="100%" myclass="video-diag" ref="videoDiag">
			{{getSiteName+'/upload/video/'+upurl+'/'+videoSrc}}
			<view>连接{{videoSrc}}</view>
			<video class="w-b100" x5-video-player-type="h5" :webkit-playsinline="true" :playsinline="true" :controls="true"  :src="getSiteName+'/upload/video/'+upurl+'/'+videoSrc" v-if="videoSrc"></video>
			<video class="w-b100" :src="getSiteName+'/upload/video/'+upurl+'/'+videoSrc" enable-danmu danmu-btn controls></video>
		</dx-diag> -->
    <div v-if="videoDiag==true" class="video-diag">
      <div class="overlay" />
      <div class="video-diag-box">
        <video v-if="videoDiag2==true" class="this-video" :src="getSiteName+'/upload/video/'+upurl+'/'+videoSrc" enable-danmu danmu-btn controls />
        <div class="off-icon btm-off" @click="videoDiag=false;videoDiag2=false"><span class="iconfont icon-xiaozhu-OFF fw-bold" /></div>
      </div>
    </div>
    <!-- 多视频上传结束 -->

    <!-- 日期 -->
    <view v-if="type == 'date'" :class="['dx-cell','dx-dateTime',myclass]">
      <view class="dx-cell_hd">
        <slot name="left" />
        <view v-if="label" class="dx-label">{{ label }}<span v-if="isRequire" class="star">*</span></view>
      </view>
      <view class="dx-cell_bd">
        <picker :value="currentValue" class="date-picker" mode="date" :start="startDate || '1980-03-26' " :end="endDate|| '2030-12-01'" @change="bindDateChange">
          <view v-if="currentValue" class="picker picker-value">
            {{ currentValue }}
          </view>
          <view v-else class="picker picker-label">
            {{ placeholder ? placeholder : '请选择'+label }}
          </view>
        </picker>
      </view>
      <view class="dx-cell_ft dx_ft-access" />
      <slot name="right" />
    </view>
    <!-- 日期结束 -->

    <!-- 时间 -->
    <view v-if="type == 'time'" :class="['dx-cell','dx-dateTime',myclass]">
      <view class="dx-cell_hd">
        <slot name="left" />
        <view v-if="label" class="dx-label">{{ label }}<span v-if="isRequire" class="star">*</span></view>
      </view>
      <view class="dx-cell_bd">
        <picker :value="currentValue" class="date-picker" mode="time" start="00:00" end="23:59" @change="bindTimeChange">
          <view v-if="currentValue" class="picker picker-value">
            {{ currentValue }}
          </view>
          <view v-else class="picker picker-label">
            {{ placeholder ? placeholder : '请选择'+label }}
          </view>
        </picker>
      </view>
      <view class="dx-cell_ft dx_ft-access" />
      <slot name="right" />
    </view>
    <!-- 时间结束 -->

    <!-- 多选择层 -->
    <div v-if="condition" class="ms_diag">
      <view class="ms_title">
        <view class="cancel" @click="chooseFclass">取消</view>
        <view class="true" @click="comfirm">确定</view>
      </view>
      <picker-view class="ms_select" :value="selectManyKey" @change="bindChange">
        <picker-view-column>
          <view v-for="(parent,key) in data" class="ms_item" wx:key="item">{{ parent.label }}</view>
        </picker-view-column>
        <picker-view-column>
          <view v-for="(son,key2) in data[selectManyKey[0]].children" v-if="data[selectManyKey[0]].children" class="ms_item" wx:key="item">{{ son.label }}</view>
        </picker-view-column>
      </picker-view>
    </div>
    <view v-if="condition" class="share-overlay" @click="chooseFclass" />
  </view>

</template>
<script>
import dxftButton from 'doxinui/components/button/footer-button'
import dxDiag from 'doxinui/components/diag/diag'

export default {
	components: { dxftButton, dxDiag },
	props: ['sourceType', 'startDate', 'endDate', 'errorMessage', 'dataKey', 'value', 'label', 'type', 'upurl', 'allowUpLoadNum', 'myclass', 'disabled', 'placeholder', 'changeField', 'uploadtype', 'name', 'datatype', 'navClass', 'imgTxt', 'txtType', 'focus', 'phone', 'action', 'radioType', 'row', 'labelleft', 'maxlength', 'arrow', 'videoTxt', 'placeholderClass'],
	data() {
		return {
			getSiteName: this.getSiteName(),
			chooseArr: [],
			data: [],
			chooseValue: '',
			check: false,
			manyselectValue: '',
			condition: false,
			isRequire: false,
			canSend: true,
			selectKey: 0,
			selectManyKey: [0, 0],
			smsTitle: '发送验证码',
			timer: '',
			videoSrc: '',
			videoDiag: false,
			videoDiag2: false
		}
	},
	onUnload() {
		clearInterval(this.timer)
	},
	computed: {
		currentValue: {
			// 动态计算currentValue的值

			get: function() {
				if (this.datatype) {
					if (this.datatype.indexOf('require') != -1 || this.datatype == 'array') {
						this.isRequire = true
					}
				} else {
					this.isRequire = false
				}
				/* 验证规则开始*/
				if (this.type == 'manyselect' && this.name == 'provinces') {
					var parent = this.$parent
				} else {
					var parent = this.getParent(this)
				}
				if (this.name && this.value == undefined) {
					if (this.type == 'upload' && this.allowUpLoadNum > 0 || this.type == 'checkbox' || this.type == 'uploadVideo' && this.allowUpLoadNum > 0) {
						this.$set(parent.ruleform, this.name, [])
					} else {
						this.$set(parent.ruleform, this.name, '')
					}
				}
				if (this.datatype && parent.vaildate && parent.vaildate[this.name] == undefined) {
					const label = this.label ? this.label : this.placeholder
					this.$set(parent.vaildate, this.name, {
						name: label,
						vaild: this.datatype,
						errorMessage: this.errorMessage || label
					})
				}
				/* 验证规则结束*/

				/* 如果是多选*/
				if (parent[this.dataKey] && parent[this.dataKey].length && this.type == 'checkbox') {
					if (this.name && this.value == undefined) {
						this.value = []
					}
					if (this.value.length > 0 && !this.check) {
						parent[this.dataKey].forEach((v, i) => {
							if (this.in_array(v.value, this.value)) {
								this.$set(parent[this.dataKey][i], 'checked', true)
							} else {
								this.$set(parent[this.dataKey][i], 'checked', false)
							}
						})
					}

					this.data = parent[this.dataKey]
					this.check = true
				}

				/* 如果是单选*/
				if (parent[this.dataKey] && parent[this.dataKey].length && (this.type == 'radio' || this.type == 'radioLists')) {
					console.log('uab')
					console.log(this.value)
					console.log(this.check)
					if (this.value) {
						console.log('uab2')
						parent[this.dataKey].forEach((v, i) => {
							if (v.value == this.value) {
								this.$set(parent[this.dataKey][i], 'checked', true)
							} else {
								this.$set(parent[this.dataKey][i], 'checked', false)
							}
						})
					}
					console.log(this.dataKey)
					this.data = parent[this.dataKey]
					this.check = true
				}

				if (this.type == 'date' && !this.value) {
					this.value = this.dateToString(new Date())
					parent.ruleform[this.name] = this.value
				}
				if (this.type == 'date' && this.value && this.value.indexOf('中国标准时间')) {
					this.value = this.dateToString(new Date(this.value))
					parent.ruleform[this.name] = this.value
				}

				if (this.type == 'select' && this.changeField == 'value') {
					this.data = parent[this.dataKey]
					for (var i = 0; i < parent[this.dataKey].length; i++) {
						if (parent[this.dataKey][i].value == this.value) {
							this.selectKey = i
							return parent[this.dataKey][i].label
						}
					}
				}

				if (this.type == 'select' && this.changeField == 'label') {
					for (var i = 0; i < parent[this.dataKey].length; i++) {
						if (parent[this.dataKey][i].value == this.value) {
							this.selectKey = i
						}
					}
					this.data = parent[this.dataKey]
				}

				if (this.type == 'manyselect') {
					if (this.value) {
						const v = this.value.split(',')
						if (v.length > 0 && !this.manyselectValue) {
							if (v.length == 2) {
								for (var i = 0; i < parent[this.dataKey].length; i++) {
									if (parent[this.dataKey][i].value == v[0]) {
										this.selectManyKey[0] = i
										this.manyselectValue = parent[this.dataKey][i].label
										parent[this.dataKey][i].children.forEach((children, key) => {
											if (children.value == v[1]) {
												this.selectManyKey[1] = key
												this.manyselectValue += '-' + children.label
											}
										})
									}
								}
								// this.manyselectValue = this.data[v[0]].label+"->"+this.data[v[0]].children[v[1]].label;
							} else {
								for (var i = 0; i < parent[this.dataKey].length; i++) {
									if (parent[this.dataKey][i].value == v[0]) {
										this.selectManyKey[0] = i
										this.manyselectValue = parent[this.dataKey][i].label
									}
								}
							// this.manyselectValue = this.data[v[0]].label;
							}
						}
					}
					this.data = parent[this.dataKey]
				}
				return this.value
			},
			set: function(val) {
				this.$emit('input', val)
			}
		}
	},
	methods: {
		openVideoDiag(item) {
			const src = this.getSiteName + '/upload/video/' + this.upurl + '/' + item.filename
			return this.goto('/pages/video/main?videoSrc=' + src, 1)
			// this.$refs.videoDiag.thisDiag = true;
			this.videoDiag = true
			setTimeout(() => {
				this.videoDiag2 = true
			}, 300)
			this.videoSrc = item.filename
		},
		toClick() {
			console.log(1)
			this.$emit('click')
		},
		largeImage(value) {
			uni.previewImage({
				current: value, // 当前显示图片的http链接
				urls: [value] // 需要预览的图片http链接列表
			})
		},
		updateVal(e) {
			this.currentValue = e.mp.detail.value
		},
		bingPhoneCode(e) {
			this.currentValue = e.mp.detail.value
		},
		toSms() {
			setTimeout(() => {
				var phoneReg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/
				if (!phoneReg.test(this.phone || !this.phone)) {
					this.getError('手机格式不正确')
					return false
				}
				if (this.canSend) {
					this.postAjax(this.action, { phone: this.phone }).then(msg => {
						if (msg.data.status == 2) {
							this.canSend = false
							var num = 60
							uni.setStorageSync('smsCode', msg.data.code)
							this.timer = setInterval(() => {
								num--
								if (num == 0) {
									clearInterval(this.timer)
									this.canSend = true
									this.smsTitle = '发送验证码'
								} else {
									this.smsTitle = num + '秒'
								}
							}, 1000)
						}
					})
				}
			}, 200)
		},
		scrollUploadCallBack(item) {
			this.$emit('callBack', item)
		},
		chooseFclass() {
			this.condition = !this.condition
		},
		changeRadio(event) {
			this.currentValue = !this.currentValue
			this.$emit('callBack', this.currentValue)
		},
		changeLocation() {
			console.log('00954')
			wx.chooseLocation({
				success: msg => {
					this.currentValue = msg.name
					this.$emit('callback', msg)
				}
			})
		},
		comfirm() {
			this.chooseFclass()
			const parentValue = this.data[this.selectManyKey[0]]
			if (!this.data[this.selectManyKey[0]].children || this.data[this.selectManyKey[0]].children.length == 0) {
				this.selectManyKey.splice(1, 1)
				this.manyselectValue = parentValue.label
				if (this.changeField == 'label') {
					this.currentValue = parentValue.label
				} else {
					this.currentValue = parentValue.value
				}

				this.$emit('callback', [parentValue])
			} else {
				const sonValue = parentValue.children[this.selectManyKey[1]]
				this.manyselectValue = parentValue.label + '->' + sonValue.label
				if (this.changeField == 'label') {
					this.currentValue = parentValue.label + ',' + sonValue.label
				} else {
					this.currentValue = parentValue.value + ',' + sonValue.value
				}

				this.$emit('callback', [parentValue, sonValue])
			}
		},
		bingInput(e) {
			this.currentValue = e.mp.detail.value
		},
		selectRes(e) {
			if (this.changeField == 'label') {
				this.currentValue = this.data[e.mp.detail.value].label
			} else {
				this.currentValue = this.data[e.mp.detail.value].value
			}
			this.getParent(this).vaildate = {}
			this.$emit('callback', this.data[e.mp.detail.value])
		},
		bindChange(e) {
			if (this.selectManyKey[0] != e.mp.detail.value[0]) {
				this.selectManyKey = [e.mp.detail.value[0], 0]
			} else {
				this.selectManyKey = e.mp.detail.value
			}
		},
		bindDateChange(e) {
			this.currentValue = e.mp.detail.value
			this.$emit('callback', this.currentValue)
		},
		bindTimeChange(e) {
			this.currentValue = e.mp.detail.value
		},
		checkboxChange(e) {
			const chooseArr = []
			this.chooseArr = e.mp.detail.value
			const parent = this.getParent(this)
			const chooseValue = []
			parent[this.dataKey].forEach((v, i) => {
				const value = this.changeField == 'label' ? v.label : v.value
				if (this.in_array(value, this.chooseArr)) {
					this.$set(parent[this.dataKey][i], 'checked', true)
				} else {
					this.$set(parent[this.dataKey][i], 'checked', false)
				}
				if (v.checked) {
					chooseArr.push(value)
					chooseValue.push(v)
				}
			})
			this.getParent(this).vaildate = {}
			this.currentValue = chooseArr
			this.$emit('checkboxCallBack', chooseValue)
		},
		radioChange(e) {
			this.chooseValue = e.mp.detail.value
			var chooseData = ''
			const parent = this.getParent(this)
			parent[this.dataKey].forEach((v, i) => {
				if (v.value == this.chooseValue) {
					this.$set(parent[this.dataKey][i], 'checked', true)
				} else {
					this.$set(parent[this.dataKey][i], 'checked', false)
				}
				if (v.checked) {
					this.chooseValue = v.value
					chooseData = v
				}
			})
			this.getParent(this).vaildate = {}
			this.$emit('radioCallBack', chooseData)
			this.currentValue = this.chooseValue
		},
		in_array(value, arr) {
			let res = false
			if (!arr) return false
			arr.forEach((v) => {
				if (v == value) {
					res = true
				}
			})
			return res
		},
		uploadVideo(event) {
			const name = event.mp.currentTarget.dataset.name
			const upurl = event.mp.currentTarget.dataset.upurl
			const thumbsize = event.mp.currentTarget.dataset.thumbsize
			const allowuploadnum = event.mp.currentTarget.dataset.allowuploadnum
			if (this.currentValue) {
				if (this.currentValue.length >= parseInt(allowuploadnum)) {
					this.getError('只允许上传' + allowuploadnum + '视频')
					return false
				}
			}
			const uploadUrl = this.getSiteName + '/ajax/app-upload-video'
			uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: res => {
						uni.showLoading({
							title: '视频上传中'
						})

						uni.uploadFile({ // 上传服务器
							url: uploadUrl, // 仅为示例，非真实的接口地址
							thumbsize: 300,
							filePath: res.tempFilePath,
							name: 'file',
							header: {
								// 'content-type': 'multipart/form-data'
							},
							formData: {
								'upurl': upurl
							},
							success: res => {
								uni.hideLoading()
								const data = JSON.parse(res.data)
								const file = data.filename
								const fileArr = this.currentValue
								fileArr.push({
									filename: file,
									videoCover: data.videoCover

								})
								// if (!this.currentValue) this.currentValue = [];
								this.currentValue = fileArr
								// this.postAjax("/ajax/image-resize", { type: upurl, value: file, size: [thumbsize] }, msg => {}, this);
								uni.hideLoading()
							},
							fail: function(res) {

							},
							complete: function(res) {

							}
						})
					}
			 })
		},
		uploadImage(event) {
			const name = event.mp.currentTarget.dataset.name
			const upurl = event.mp.currentTarget.dataset.upurl
			const thumbsize = event.mp.currentTarget.dataset.thumbsize
			const allowuploadnum = event.mp.currentTarget.dataset.allowuploadnum
			if (this.currentValue) {
				if (this.currentValue.length >= parseInt(allowuploadnum)) {
					this.getError('只允许上传' + allowuploadnum + '图片')
					return false
				}
			}
			const uploadUrl = this.getSiteName + '/ajax/app-upload-pic'
			let sourceType_ = ['album', 'camera']
			if (this.sourceType && this.sourceType == 1) {
				sourceType_ = ['camera']
			} else if (this.sourceType && this.sourceType == 2) {
				sourceType_ = ['album']
			}
			uni.chooseImage({
				count: 1, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: sourceType_, // 可以指定来源是相册还是相机，默认二者都有
				success: res => {
					var tempFilePaths = res.tempFilePaths
					uni.showLoading({
						title: '上传中'
					})
					uni.uploadFile({ // 上传服务器
						url: uploadUrl, // 仅为示例，非真实的接口地址
						thumbsize: 300,
						filePath: tempFilePaths[0],
						name: 'file',
						header: {
							// 'content-type': 'multipart/form-data'
						},
						formData: {
							'upurl': upurl
						},
						success: res => {
							const data = JSON.parse(res.data)
							const file = data.filename
							const fileArr = this.currentValue
							fileArr.push(file)
							// if (!this.currentValue) this.currentValue = [];
							this.currentValue = fileArr
							// this.postAjax("/ajax/image-resize", { type: upurl, value: file, size: [thumbsize] }, msg => {}, this);
							uni.hideLoading()
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
			const name = event.mp.currentTarget.dataset.name
			const key = event.mp.currentTarget.dataset.key
			const arr = this.currentValue
			wx.showModal({
				title: '提示',
				content: '是否真的删除?',
				success: res => {
					if (res.confirm) {
						arr.splice(key, 1)
						this.currentValue = arr
						console.log(this.currentValue)
					} else if (res.cancel) {

					}
				}
			})
		}
	}
}

</script>

<style scoped="">

@import url("../font/globalFont.css");
@import url("../../css/dx-input.css");

</style>
