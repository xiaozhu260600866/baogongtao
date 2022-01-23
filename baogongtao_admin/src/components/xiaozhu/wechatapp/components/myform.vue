'plr0',<!-- 使用
  <myform :ruleform="ruleform" :vaildate="vaildate" @callBack="formSubmit">
        <div slot="content">
            <view id="footer-btn" slot="content">
                <button class="f-sub-btn fs16" type="default" form-type="submit">提交</button>
            </view>
        </div>
  </myform>
  js
  formSubmit(){
     处理验证后的业务逻辑
  }
   -->
<template>
  <section>
    <form v-if="userInfo" report-submit="true" class="wxform block w-b100" @submit="formSubmit">
      <button hover-class="none" :class="['plr0',myclass ? myclass : 'form-btn']" form-type="submit">
        <span v-if="!append">{{ title ? title : '提交' }}</span>
        <slot name="content" />
      </button>
    </form>
    <div v-else class="wxform block w-b100">
      <button hover-class="none" :class="['plr0',myclass ? myclass : 'form-btn']" form-type="submit" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">
        <span v-if="!append">{{ title ? title : '提交' }}</span>
        <slot name="content" />
      </button>
    </div>
  </section>
</template>
<style scoped="">
.wxform button{border-radius: 0;}
.form-btn{background-color: transparent;padding: 0;text-align: left;}
</style>
<script type="text/javascript">
    export default {
        props: ['ruleform', 'vaildate', 'v', 'parentData', 'url', 'myclass', 'title', 'append'],
        data() {
            return {
                getSiteName: this.getSiteName(),
                source: wx.getStorageSync('source'),
                userInfo: {}
            }
        },
        mounted() {
            this.userInfo = wx.getStorageSync('userInfo')
        },
        methods: {
            bindGetUserInfo(e) {
                if (e.mp.detail.userInfo) {
                    this.getAuthPhoneNumber(e, msg => {
                        const res = e.mp.detail.userInfo
                        const openid = wx.getStorageSync('openid')
                        res.openid = openid
                        wx.setStorageSync('userInfo', res)
                        this.userInfo = res
                        this.$emit('callBack')
                    })
                } else {
                    this.getError('授权失败')
                }
            },
            formSubmit(e) {
                this.$emit('before')
                console.log('b')
                this.vaildForm(this, res => {
                    if (res) {
                        if (e.mp.detail && e.mp.detail.formId) {
                            this.formId(e.mp.detail.formId, msg => {
                                console.log('xiaozhuaa')
                                this.$emit('callBack')
                            })
                        } else {
                            this.$emit('callBack')
                        }
                    }
                })
            }
        }
    }
</script>
