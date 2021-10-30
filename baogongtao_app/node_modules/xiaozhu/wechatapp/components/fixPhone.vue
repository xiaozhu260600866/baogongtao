<template>
  <view style="position: fixed;z-index:999;right: 15px;bottom:10vh" @click="toTel">
    <image src="/image/phone.png" style="width:50px;height: 50px;"></image>
  </view>
</template>
<script>
export default {
  props: ['phone'],
  methods: {
    toTel() {
      wx.makePhoneCall({
        phoneNumber: this.phone //仅为示例，并非真实的电话号码
      })
    }
  }
}

</script>
<style>


</style>
