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
      <button hover-class="none" :class="['plr0',myclass ? myclass : 'form-btn']" form-type="submit" open-type="getUserInfo" @click="bindGetUserInfo">
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
				source: uni.getStorageSync('source'),
				userInfo: {}
			}
		},
		mounted() {
			this.userInfo = uni.getStorageSync('userInfo')
		},
		methods: {
			bindGetUserInfo(e) {
				uni.getUserProfile({
				      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				      success: (res1) => {
				        console.log(res1)
						const res = res1.userInfo
						if (res.nickName.indexOf('&') != -1) {
							res.nickName = res.nickName.replace(/&/g, '*')
						}
						if (res.nickName.indexOf('#') != -1) {
							res.nickName = res.nickName.replace(/#/g, '*')
						}
						const openid = uni.getStorageSync('openid')
						res.openid = openid
						const userinfo = wx.getStorageSync('userInfo')
						if (!userinfo) {
							uni.setStorageSync('userInfo', { nickName: res.nickName, avatarUrl: res.avatarUrl, gender: res.gender })
							this.userInfo = res
						} else {
							userinfo.nickName = res.nickName
							userinfo.avatarUrl = res.avatarUrl
							userinfo.gender = res.gender
							uni.setStorageSync('userInfo', userinfo)
							this.userInfo = userinfo
						}

					    this.updateHistory()
						this.$emit('callBack')
				      }
				})
				return false
				if (e.mp.detail.userInfo) {
					this.getAuthPhoneNumber(e, msg => {
						console.log(res)
						if (res.nickName.indexOf('&') != -1) {
							res.nickName = res.nickName.replace(/&/g, '*')
						}
						if (res.nickName.indexOf('#') != -1) {
							res.nickName = res.nickName.replace(/#/g, '*')
						}
						const openid = uni.getStorageSync('openid')
						res.openid = openid
						if ('unionId' in msg.data) {
							uni.setStorageSync('unionid', msg.data.unionId)
							res.unionid = msg.data.unionId
						}
						uni.setStorageSync('userInfo', { nickName: res.nickName, avatarUrl: res.avatarUrl, gender: res.gender })
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
							this.formId(e.mp.detail.formId).then(msg => {
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
