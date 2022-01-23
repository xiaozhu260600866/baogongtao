<!-- 调用

//文本(通用)
<weui-input v-model="ruleform.name" label="门店名称" type="text"></weui-input>
左边带icon
<weui-input  type="text" v-model="ruleform.userPass"  placeholder="请输入密码" myclass="test">
        <div slot="left">
            <div class="float_l iconfont icon-login-lock" style="padding-right: 30rpx"></div>
        </div>
</weui-input>
只有input 没有label
<weui-input v-model="ruleform.name"  type="text"></weui-input>
右边自定义
<weui-input  type="text"  placeholder="请输入姓名" label="姓名">
        <div slot="middle">123</div>
</weui-input>

//验证码
<weui-input v-model="ruleform.sms_code" type="sms" name="sms_code" placeholder="验证码" datatype="require" :phone="ruleform.username" action="sendSms.html"></weui-input>

//上传
 <weui-input v-model="ruleform.logo" label="上传LOGO" type="upload" upurl='article' allowUpLoadNum="1"></weui-input>

//select
 <weui-input v-model="ruleform.sendType" label="送货方式" dataname="value" type="select" :data="[
            {label:'普通',value:1},
            {label:'加急',value:2},
            {label:'自提',value:3},
            ]"></weui-input>

 //日期
 <weui-input v-model="ruleform.date" label="日期" type="date"></weui-input>

 //textarea
 <weui-input v-model="ruleform.remark" label="门店简介" type="textarea"></weui-input>

//checkbox
 <weui-input v-model="ruleform.sendType" label="送货方式" dataname="value" type="checkbox" :data="sendTypeArr"></weui-input>
注意必须要在data方法给数组才生效
data(){
    return {
        sendTypeArr:[
               {label:'普通',value:'普通'},
               {label:'加急',value:'加急'},
              {label:'自提',value:'自提'},
        ],
        ruleform:{sendType:[]}   //给的指必须是数组
    }
}

//radio 单选

 <weui-input v-model="ruleform.sendType" label="送货方式" dataname="value" type="radio" :data="sendTypeArr"></weui-input>
注意必须要在data方法给数组才生效
data(){
    return {
        sendTypeArr:[
               {label:'普通',value:'普通'},
               {label:'加急',value:'加急'},
              {label:'自提',value:'自提'},
        ],
        ruleform:{sendType:[]}   //给的指必须是数组
    }
}

//级联选择
<weui-input v-model="ruleform.needArr" label="需求类型" type="manyselect" :data=":[
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
                    ]
                }
            ]" @callback="needCallBack" dataname="value"></weui-input>

ruleform.needArr = [0,0] ;  //数组，默认第一个;
开关
<weui-input v-model="ruleform.radio" label="标题1" type="switch"></weui-input>

 -->
<template>
  <div>
    <!-- 如果是开关 -->
    <div v-if="type == 'switch'" :class="['weui-cell','weui-cell_input',myclass]">
      <div class="weui-cell__hd">
        <slot name="left" />
        <div v-if="label" class="weui-label fs14" :style="labelWidth ? 'width:'+labelWidth+'px' : '' ">{{ label }}</div>
      </div>
      <div class="weui-cell__bd">
        <!--  <switch @change="openDate($event)" :checked="currentValue ? true : false" /> -->
        <wv-switch v-model="currentValue" :is-in-cell="false" />
      </div>
    </div>
    <!-- 如果是开关结束 -->
    <!-- 如果是发送验证码开始 -->
    <div v-if="type == 'sms'" :class="['weui-cell','weui-cell_input',myclass]">
      <div :class="['weui-cell__hd']">
        <slot name="left" />
        <div v-if="label" class="weui-label fs14">{{ label }}<span v-if="isRequire" class="font_red">*</span></div>
      </div>
      <div :class="['weui-cell__bd']">
        <input v-model="currentValue" class="weui-input font_666 fs14 nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" :disabled="disabled">
        <slot name="middle" />
      </div>
      <button class="dx-btn dx-btn-green" @click="toSms">{{ smsTitle }}</button>
    </div>
    <!-- 如果是发送验证码结束 -->

    <!-- 如果是发送验证码开始 -->
    <div v-if="type == 'location'" :class="['weui-cell','weui-cell_input',myclass]" style="padding-right:0;padding-left:0">
      <div :class="['weui-cell__hd']">
        <slot name="left" />
        <div v-if="label" class="weui-label fs14">{{ label }}<span v-if="isRequire" class="font_red">*</span></div>
      </div>
      <div :class="['weui-cell__bd']">
        <input v-model="currentValue" class="weui-input font_666 fs14 nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" :disabled="disabled">
        <slot name="middle" />
      </div>
      <button class="dx-btn dx-btn-blue" @click="chooseLoction">选择{{ label }}</button>
    </div>
    <!-- 如果是发送验证码结束 -->
    <!-- 如果是文本 -->
    <div v-if="type == 'txt' ||type == 'text' || type == 'textarea' || type == 'password'" :class="['weui-cell','weui-cell_input',myclass]" @click="clickCallBack">
      <div class="weui-cell__hd" :style="labelWidth ? 'width:'+labelWidth+'px' : '' ">
        <slot name="left" />
        <div v-if="label" class="weui-label fs14">{{ label }}<span v-if="isRequire" class="fc-red">*</span></div>
      </div>
      <div class="weui-cell__bd">
        <input v-if="type == 'text' && currentValue != undefined" v-model="currentValue" class="weui-input font_666 fs14 nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" :disabled="disabled">
        <input v-if="type == 'password' && currentValue != undefined" v-model="currentValue" class="weui-input font_666 fs14 nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" :disabled="disabled" type="password">
        <textarea v-if="type == 'textarea'" v-model="currentValue" class="weui-text weui-input font_666 fs14 ptb5" :placeholder="placeholder ? placeholder :'请输入'+label" style="height:80px" :disabled="disabled" />
        <p v-if="type == 'txt'">{{ currentValue }}</p>
        <slot name="middle" />
      </div>
      <slot name="right" />
    </div>
    <!-- 如果是文本结束 -->
    <!-- 如果是多选 -->
    <div v-if="type == 'checkbox'" :class="['weui-cell','weui-cell_input',myclass]">
      <div class="weui-cell__hd" :style="labelWidth ? 'width:'+labelWidth+'px' : '' ">
        <slot name="left" />
        <div class="weui-label fs14">{{ label }} <span v-if="isRequire" class="fc-red">*</span></div>
      </div>
      <div class="weui-cell__bd weui-cells_checkbox">
        <label v-for="(item,i) in data" class="weui-cell weui-check__label before" :for="item.label+i" :style="data.length<=2 ? 'display: inline-flex' : '' ">
          <div class="weui-cell__hd">
            <input v-model="currentValue" type="hidden">
            <input :id="item.label+i" type="checkbox" class="weui-check" :name="item.label" :checked="item.checked" @click="checkboxChange(item)">
            <i class="weui-icon-checked" />
          </div>
          <div class="">
            <span class="font_666 fs14">{{ item.label }}</span>
          </div>
        </label>
      </div>
      <slot name="right" />
    </div>
    <!-- 如果是多选结束 -->
    <!-- 如果是单选 -->
    <div v-if="type == 'radio'" :class="['weui-cell','weui-cell_input',myclass]">
      <div class="weui-cell__hd" :style="labelWidth ? 'width:'+labelWidth+'px' : '' ">
        <slot name="left" />
        <div class="weui-label fs14">{{ label }}<span v-if="isRequire" class="fc-red">*</span></div>
      </div>
      <div class="weui-cell__bd weui-cells_checkbox">
        <label v-for="(item,i) in data" class="weui-cell weui-check__label before" :for="item.label+i" :style="data.length<=2 ? 'display: inline-flex' : '' ">
          <div class="weui-cell__hd">
            <input v-model="currentValue" type="hidden">
            <input :id="item.label+i" type="checkbox" class="weui-check" :name="item.label" :checked="item.checked" @click="radioChange(item)">
            <i class="weui-icon-checked" />
          </div>
          <div class="">
            <span class="font_666 fs14">{{ item.label }}</span>
          </div>
        </label>
      </div>
      <slot name="right" />
    </div>
    <!-- 如果是单选结束 -->
    <!-- 如果是manyselect -->
    <view v-if="type == 'manyselect'" :class="['weui-cell','weui-cell_input',myclass]" @click="chooseFclass">
      <view class="weui-cell__hd" :style="labelWidth ? 'width:'+labelWidth+'px' : '' ">
        <slot name="left" />
        <view class="weui-label fs14">{{ label }}<span v-if="isRequire" class="fc-red">*</span></view>
      </view>
      <view class="weui-cell__bd">
        <div class="font_666 fs14 nowrap">{{ data[currentValue[0]].label }}{{ data[currentValue[0]].children ?'->'+data[currentValue[0]].children[currentValue[1]].label :'' }}</div>
      </view>
      <view class="weui-cell__ft weui-cell__ft_in-access" />
      <slot name="right" />
    </view>
    <!-- 如果是select结束 -->
    <!-- 如果是select -->
    <div v-if="type == 'select'" :class="['weui-cell','weui-cell_input', !disabled ? 'weui-cell_select' :'' ,myclass]" @click="!disabled ? diag=true:diag=false">
      <input v-model="currentValue" type="hidden">
      <div v-if="label" class="weui-cell__hd" :style="labelWidth ? 'width:'+labelWidth+'px' : '' ">
        <slot name="left" />
        <div class="weui-label fs14">{{ label }}<span v-if="isRequire" class="fc-red">*</span></div>
      </div>
      <div class="weui-cell__bd">
        <div v-if="disabled">
          <span class="fs14">{{ selectName }}</span>
        </div>
        <div v-else>
          <div v-if="selectName" class="picker fs14 font_666">
            {{ selectName }}
          </div>
          <div v-else class="picker fs14 font_666">
            {{ placeholder ? placeholder : '请选择'+label }}
          </div>
        </div>
      </div>
      <div v-if="!disabled" class="weui-cell__ft">
        <text class="weui-cell__ft_in-access" />
      </div>
      <slot name="right" />
    </div>
    <!-- 如果是select结束 -->
    <!-- 如果是日期 -->
    <div v-if="type == 'date'" :class="['weui-cell','weui-cell_input','weui-cell_select',myclass]" @click="$refs.picker.open()">
      <div class="weui-cell__hd" :style="labelWidth ? 'width:'+labelWidth+'px' : '' ">
        <slot name="left" />
        <input v-model="currentValue" type="hidden">
        <div class="weui-label fs14">{{ label }}<span v-if="isRequire" class="fc-red">*</span></div>
      </div>
      <div class="weui-cell__bd">
        <div v-if="currentValue" class="picker fs14 font_666">
          {{ currentValue }}
        </div>
        <div v-else class="picker fs14 font_666">
          请选择{{ label }}
        </div>
      </div>
      <div class="weui-cell__ft">
        <text class="weui-cell__ft_in-access" />
      </div>
      <slot name="right" />
    </div>
    <!-- 如果是日期结束 -->

    <!-- 如果是时间加日期 -->
    <div v-if="type == 'dateTime'" :class="['weui-cell','weui-cell_input','weui-cell_select',myclass]" @click="$refs.picker2.open()">
      <div class="weui-cell__hd" :style="labelWidth ? 'width:'+labelWidth+'px' : '' ">
        <slot name="left" />
        <input v-model="currentValue" type="hidden">
        <div class="weui-label fs14">{{ label }}<span v-if="isRequire" class="fc-red">*</span></div>
      </div>
      <div class="weui-cell__bd">
        <div v-if="currentValue" class="picker fs14 font_666">
          {{ currentValue }}
        </div>
        <div v-else class="picker fs14 font_666">
          请选择{{ label }}
        </div>
      </div>
      <div class="weui-cell__ft">
        <text class="weui-cell__ft_in-access" />
      </div>
      <slot name="right" />
    </div>
    <!-- 如果是时间日期结束 -->

    <!-- 如果是上传图片 -->
    <div v-if="type == 'upload'" :class="['weui-cell','weui-cell_input',myclass]" style="min-height: 80px">
      <div v-if="label" class="weui-cell__hd" :style="labelWidth ? 'width:'+labelWidth+'px' : '' ">
        <div class="weui-label fs14">{{ label }}<span v-if="isRequire" class="fc-red">*</span></div>
      </div>
      <div class="weui-cell__bd">
        <div class="upload-img">
          <ul id="uploaderFiles" class="weui-uploader__files">
            <li v-for="(item,index) in currentValue" class="weui-uploader__file" :style="' position: relative;background-image:url('+getSiteName+'/upload/images/'+upurl+'/300_'+item+')'">
              <p class="del-img text-center" data-name="pic" :data-key="index" @click="delImage(index,item)">

                <span class="iconfont icon-xiaozhu-del fs12 fs-white" />
              </p>
              <div style="width:100%;height:82%;" @click="toOpenPic(item)" />
            </li>
            <li v-if="progress >0 && progress <100" class="weui-uploader__file weui-uploader__file_status">
              <div class="weui-uploader__file-content">{{ progress }}%</div>
            </li>
          </ul>
          <div v-if="currentValue && currentValue.length<parseInt(allowUpLoadNum) && !getOptions('audit')" class="uploadvalue">
            <div class="weui-uploader__input-box" :data-id="currentValue.length" :data-num="parseInt(allowUpLoadNum)">
              <input v-show="currentValue.length<parseInt(allowUpLoadNum)" id="picul1" class="weui-uploader__input" type="file" accept="image/*" @change="uploadImage($event)">
            </div>
          </div>
          <div class="clear" />
        </div>
      </div>
    </div>
    <!-- 如果是上传图片 -->

    <!-- 如果是上传视频 -->
    <div v-if="type == 'upload_video'" :class="['weui-cell','weui-cell_input',myclass]" :style="'min-height: 80px;'+noBorder ? 'border-bottom:none' :''">
      <div v-if="label" class="weui-cell__hd" :style="labelWidth ? 'width:'+labelWidth+'px' : '' ">
        <div class="weui-label fs14">{{ label }}<span v-if="isRequire" class="fc-red">*</span></div>
      </div>
      <div class="weui-cell__bd">
        <div class="upload-img">
          <ul id="uploaderFiles" class="weui-uploader__files">
            <li v-for="(item,index) in currentValue" class="weui-uploader__file" :style="' position: relative;background-image:url('+getSiteName+'/upload/video/'+upurl+'/'+item.videoCover">
              <p class="del-img text-center" data-name="pic" :data-key="index" @click="delVideo(index,item)"><span class="iconfont icon-release-del2 fs12 fs-white" /></p>
              <img data-v-70e9b0f8="" src="https://resource.aijiatui.com/13632945694/company/website/04f5a86a9ee48e6ba143d7137caa56aa.png" class="play-icon" @click="toPay(item)">
            </li>
            <li v-if="progress >0 && progress <100" class="weui-uploader__file weui-uploader__file_status">
              <div class="weui-uploader__file-content">{{ progress }}%</div>
            </li>
          </ul>
          <div v-if="currentValue && currentValue.length<parseInt(allowUpLoadNum) && !getOptions('audit')" class="uploadvalue">
            <div class="weui-uploader__input-box" :data-id="currentValue.length" :data-num="parseInt(allowUpLoadNum)">
              <input v-show="currentValue.length<parseInt(allowUpLoadNum)" id="picul1" class="weui-uploader__input" type="file" accept="video/*" @change="uploadVideo($event)">
            </div>
          </div>
          <div class="clear" />
        </div>
      </div>
    </div>
    <!-- 如果是上传图片 -->

    <!-- 日期层出层 -->
    <wv-datetime-picker ref="picker" v-model="pickerValue" type="date" @confirm="dateCallBack" />
    <!-- 日期弹出层结束 -->
    <!-- 时间日期层出层 -->
    <wv-datetime-picker ref="picker2" v-model="pickerValue" type="datetime" @confirm="dateTimeCallBack" />
    <!-- 时间日期弹出层结束 -->
    <!-- select层出层 -->
    <wv-picker :visible.sync="diag" :columns="newSelectData" value-key="label" @confirm="confirmRes" />
    <!-- select层出层 -->
    <videoDiag ref="videoDiag" :src="videoSrc" />
    <picDiag ref="picDiag" :src="picSrc" />
    <locationDiag ref="locationDiag" @locationCallBack="locationCallBack" />
  </div>
</template>
<script>
import videoDiag from './videoDiag'
import picDiag from './picDiag'
import locationDiag from './chooseLocationDiag'
export default {
  components: {
    videoDiag,
    picDiag,
    locationDiag
  },
  props: ['value', 'label', 'type', 'upurl', 'allowUpLoadNum', 'myclass', 'data', 'disabled', 'placeholder', 'dataname', 'uploadtype', 'name', 'datatype', 'codeTitle', 'labelWidth', 'noBorder', 'phone', 'action'],
  data() {
    return {
      getSiteName: this.getSiteName(),
      chooseArr: [],
      chooseValue: '',
      canSend: true,
      check: false,
      pickerValue: new Date(),
      diag: false,
      selectName: '',
      smsTitle: '发送验证码',
      videoSrc: '',
      picSrc: '',
      newSelectData: [],
      isRequire: false,
      progress: 0
    }
  },
  computed: {
    currentValue: {
      // 动态计算currentValue的值
      get: function() {
        /* 如果是多选*/

        if (this.datatype) {
          if (this.datatype.indexOf('require') != -1 || this.datatype == 'array') {
            this.isRequire = true
          }
        } else {
          this.isRequire = false
        }

        /* 验证规则开始*/
        if (this.name && this.value == undefined) {
          if (this.type == 'upload' || this.type == 'upload_video') {
            this.$set(this.$parent.ruleform, this.name, [])
          } else {
            this.$set(this.$parent.ruleform, this.name, '')
          }
        }
        if (this.datatype && this.$parent.vaildate && this.$parent.vaildate[this.name] == undefined) {
          this.$set(this.$parent.vaildate, this.name, {
            name: this.label ? this.label : this.placeholder,
            vaild: this.datatype
          })
        }
        /* 验证规则结束*/

        if (this.data && this.data.length && this.type == 'checkbox' && this.value.length > 0 && !this.check) {
          this.data.forEach((v, i) => {
            if (this.in_array(v.value, this.value)) {
              this.$set(this.data[i], 'checked', true)
            } else {
              this.$set(this.data[i], 'checked', false)
            }
          })
          this.check = true
        }

        /* 如果是单选*/
        if (this.data && this.data.length && this.type == 'radio' && this.value && !this.check) {
          this.data.forEach((v, i) => {
            if (v.value == this.value) {
              this.$set(this.data[i], 'checked', true)
            } else {
              this.$set(this.data[i], 'checked', false)
            }
          })
          this.check = true
        }
        /* 如果是日期*/
        if (this.type == 'date' || this.type == 'dateTime') {
          if (typeof this.value !== 'object') {
            if (this.value) {
                 var value = new Date(this.value.replace(new RegExp('-', 'gm'), '/'))
            } else {
                var value = new Date()
            }
            // let value = this.value ? new Date(this.value) : new Date();
             // alert(this.value);
            this.pickerValue = value
          } else {
            this.pickerValue = this.value
          }
        }

        /* 如果是select && this.dataname == 'value'*/
        if (this.type == 'select') {
          this.newSelectData = []
          this.newSelectData.push({ values: this.data })
          this.newSelectData[0].values.forEach((v, i) => {
            if (this.dataname == 'value') {
              if (v.value == this.value) {
                this.newSelectData[0].defaultIndex = i
                this.selectName = v.label
              }
            } else if (this.dataname == 'label') {
              if (v.label == this.value) {
                this.newSelectData[0].defaultIndex = i
                this.selectName = v.label
              }
            }
          })
        }
        return this.value
      },
      set: function(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    toSms() {
      setTimeout(() => {
         var phoneReg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/
                    if (!phoneReg.test(this.phone || !this.phone)) {
                        this.getError('手机格式不正确')
                        return false
                    }
                    if (this.canSend) {
                      this.postAjax(this.action, { phone: this.phone }, msg => {
                         if (msg.data.status == 2) {
                              this.canSend = false
                              var num = 60
                              localStorage.setItem('smsCode', msg.data.code)
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
    chooseLoction() {
        this.$refs.locationDiag.ajax()
    },
    locationCallBack(data) {
       // this.currentValue = data.poiaddress;
       this.$emit('callBack', data)
    },
    openImg(item) {
      window.open(this.getSiteName + '/upload/images/' + this.upurl + '/' + item)
    },
    toPay(item) {
       this.videoSrc = this.getSiteName + '/upload/video/' + this.upurl + '/' + item.filename
       console.log(this.videoSrc)
       this.$refs.videoDiag.ajax()
    },
    toOpenPic(item) {
      this.picSrc = this.getSiteName + '/upload/images/' + this.upurl + '/' + item
       this.$refs.picDiag.ajax()
    },
    clickCallBack() {
        this.$emit('clickCallBack')
    },
    confirmRes(picker) {
      this.selectName = picker.getValues()[0].label
      if (this.dataname == 'value') {
        this.currentValue = picker.getValues()[0].value
      } else {
        this.currentValue = picker.getValues()[0].label
      }

      this.$emit('callBack', { label: picker.getValues()[0].label, val: picker.getValues()[0].value })
    },
    dateCallBack(item) {
      this.currentValue = this.dateToString(item)
       this.$emit('callBack')
    },
    dateTimeCallBack(item) {
         this.currentValue = this.dateToString(item, 'dateTime')
    },
    checkboxChange(item) {
      const chooseArr = []
      item.checked = !item.checked
      this.data.forEach((v, i) => {
        if (v.checked) {
          chooseArr.push(v.value)
        }
      })
      this.currentValue = chooseArr
    },
    radioChange(item) {
      const chooseArr = []
      this.data.forEach((v, i) => {
        if (v.value == item.value) {
          item.checked = !item.checked
        } else {
          v.checked = false
        }
      })
      this.currentValue = item.value
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
    uploadImage(event) {
      const upurl = this.upurl
      const allowuploadnum = this.allowUpLoadNum

      const type = this.type
      if (this.currentValue) {
        if (this.currentValue.length >= parseInt(allowuploadnum)) {
          this.getError('只允许上传' + allowuploadnum + '图片')
          return false
        }
      }
      var file = event.currentTarget
      file = file.files[0]
     if (file.type.indexOf('image') != -1) {
      } else {
        this.getError('只允许上传图片')
        return false
      }
      var form = new FormData()
      form.append('file', file)
      form.append('upurl', upurl)
      form.append('thumbsize', 300)
      form.append('type', type)
      // 得到xhr对象
      var xhr = null
      if (XMLHttpRequest) {
        xhr = new XMLHttpRequest()
      } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
      }

      xhr.open('post', this.getSiteName + 'ajax/uploadpic', true) // 设置提交方式，url，异步提交
      /* 进度条*/
      xhr.upload.onprogress = evt => {
        var res = Math.round(evt.loaded / evt.total * 100)
       if (res < 100) {
           this.progress = res
        }
      }
      xhr.onload = () => {
        var data = JSON.parse(xhr.responseText) // 得到返回值
        /* 上传完成*/
        const file = data.filename
        if (!this.currentValue) this.currentValue = []
        this.currentValue.push(file)
        this.progress = 100
      }
      xhr.send(form)
      return false
    },

    uploadVideo(event) {
      const upurl = this.upurl
      const allowuploadnum = this.allowUpLoadNum

      const type = this.type
      if (this.currentValue) {
        if (this.currentValue.length >= parseInt(allowuploadnum)) {
          this.getError('只允许上传' + allowuploadnum + '视频')
          return false
        }
      }
      var file = event.currentTarget
      file = file.files[0]
      if (file.type.indexOf('mp4') || file.type.indexOf('video')) {
      } else {
        this.getError('只允许上传视频')
        return false
      }
      var form = new FormData()
      form.append('file', file)
      form.append('upurl', upurl)
      form.append('thumbsize', 300)
      form.append('type', type)
      // 得到xhr对象
      var xhr = null
      if (XMLHttpRequest) {
        xhr = new XMLHttpRequest()
      } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
      }

      xhr.open('post', this.getSiteName + 'ajax/uploadVideo', true) // 设置提交方式，url，异步提交
      /* 进度条*/
      xhr.upload.onprogress = evt => {
        var res = Math.round(evt.loaded / evt.total * 100)
        if (res < 100) {
           this.progress = res
        }
      }
      xhr.onload = () => {
        var data = JSON.parse(xhr.responseText) // 得到返回值
        /* 上传完成*/
        const file = data.filename
        if (!this.currentValue) this.currentValue = []
        this.currentValue.push({
            filename: file,
            videoCover: data.videoCover
        })
        this.progress = 100
      }
      xhr.send(form)
      return false
    },
    delImage(key, item) {
      if (this.getOptions('audit')) return false
      this.getConfirm('是否真的删除', () => {
        this.currentValue.splice(key, 1)
        this.postAjax('ajax/delPic', { filename: item, upurl: this.upurl }, msg => {

        }, 'notloading')
      })
    },
    delVideo(key, item) {
       if (this.getOptions('audit')) return false
       this.getConfirm('是否真的删除', () => {
        this.currentValue.splice(key, 1)
        this.postAjax('ajax/delVideo', { filename: item.filename, videoCover: item.videoCover, upurl: this.upurl }, msg => {

        }, 'notloading')
      })
    }

  }
}

</script>
<style>
@import url("font/globalFont.css");
@import url("./weui_input.css");

</style>
