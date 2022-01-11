<template>
  <div>
    <view class="input" style="padding-top:0">
      <view @click="open" style="">{{province}}-{{city}}-{{county}}</view>
    </view>
    <view v-if="condition" class="citypicker">
      <picker-view indicator-style="height: 50px;" style="width: 100%; height: 300px;" :value="value" @change="bindChange" class="citybody">
        <view class="cityheader">
          <view @click="open" class="city-cancel">取消</view>
          <view @click="open" class="city-true">确定</view>
        </view>
        <picker-view-column>
          <view v-for="item in provinces" wx:key="item" style="line-height: 50px;padding-left:10px;">{{item}}</view>
        </picker-view-column>
        <picker-view-column>
          <view v-for="item in citys" wx:key="item" style="line-height: 50px;padding-left:10px;">{{item}}</view>
        </picker-view-column>
        <picker-view-column>
          <view v-for="item in countys" wx:key="item" style="line-height: 50px;padding-left:10px;">{{item}}</view>
        </picker-view-column>
      </picker-view>
    </view>
  </div>
</template>
<script>
var tcity = require('@/public/js/citys.js');
export default {
  props: ['text'],
  data() {
    return {
      provinces: [],
      province: "广东省",
      citys: [],
      city: "江门市",
      countys: [],
      county: '市辖区',
      value: [0, 0, 0],
      values: [0, 0, 0],
      condition: false,
      cityData: {}
    }
  },
  monuted() {

  },
  methods: {
    ajax() {
      tcity.init(this);
      var cityData = this.cityData;
      const provinces = [];
      const citys = [];
      const countys = [];
      for (let i = 0; i < cityData.length; i++) {
        provinces.push(cityData[i].name);
      }
      for (let i = 0; i < cityData[0].sub.length; i++) {
        citys.push(cityData[0].sub[i].name)
      }
      for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
        countys.push(cityData[0].sub[0].sub[i].name)
      }
      this.provinces = provinces;
      this.citys = citys;
      this.countys = countys;
      this.province = cityData[0].name;
      this.city = cityData[0].sub[0].name;
      this.county = cityData[0].sub[0].sub[0].name;
    },
    open: function() {
      this.condition = !this.condition;
    },
    bindChange(e) {
      //console.log(e);
      var val = e.mp.detail.value
      var t = this.values;
      var cityData = this.cityData;

      if (val[0] != t[0]) {
        console.log('province no ');
        const citys = [];
        const countys = [];

        for (let i = 0; i < cityData[val[0]].sub.length; i++) {
          citys.push(cityData[val[0]].sub[i].name)
        }
        for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
          countys.push(cityData[val[0]].sub[0].sub[i].name)
        }
        this.province =  this.provinces[val[0]];
        this.city =  cityData[val[0]].sub[0].name;
        this.citys = citys;
        this.county = cityData[val[0]].sub[0].sub[0].name;
        this.countys =countys;
        this.values = val;
        this.value = [val[0], 0, 0];
        return;
      }
      if (val[1] != t[1]) {
        const countys = [];
        for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
          countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
        }
        this.city = this.citys[val[1]];
        this.county = cityData[val[0]].sub[val[1]].sub[0].name;
        this.countys = countys;
        this.values =val;
        this.value = [val[0], val[1], 0];
        return;
      }
      if (val[2] != t[2]) {
   		this.county = this.countys[val[2]],
   		this.values = val;
        return;
      }

    }
  }
}

</script>
<style scoped>
.citypickers {
  position: fixed;
  height: 100%;
  width: 100%;
  min-height: 100%;
  background-color: red;
}

.citypicker {}

.citybody {
  position: fixed;
  bottom: 0px;
  background: #fff;
  left: -10px;
  padding-left: 10px
}

.cityheader {
  position: absolute;
  top: 0px;
  width: 100%;
  z-index: 4;
  background: #ff721f;
}

.city-cancel {
  float: left;
  margin: 20rpx;
  color: #fff;
}

.city-true {
  float: right;
  margin: 20rpx;
  color: #fff
}

.section .picker {
  background-color: #fff;
  border-bottom: 1px #d9d9d9 solid;
  border-top: 1px #d9d9d9 solid;
  padding: 20rpx;
}

</style>
