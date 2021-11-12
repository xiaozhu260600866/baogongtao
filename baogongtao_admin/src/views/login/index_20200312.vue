<template>
  <div class="login-main">
    <div class="login-body" :style="'background:url('+bgImg+')'">
      <div class="wrap">
        <div class="login-side">
          <div class="content">
            <div class="login-form">
              <p class="logo"><img :src="logo"></p>
              <p class="form-desc">请输入账号和密码登录系统</p>
              <el-form ref="loginForm" :model="formData">
                <el-form-item prop="username" :rules="[{ required: true, message: '登录账号不能为空'}]">
                  <el-input v-model="formData.username" placeholder="账号" prefix-icon="el-icon-user-solid" />
                </el-form-item>
                <el-form-item prop="password" :rules="[{ required: true, message: '登录密码不能为空'}]">
                  <el-input v-model="formData.password" :type="passwordType" placeholder="密码" prefix-icon="el-icon-lock" @keyup.enter.native="handleLogin" />
                  <span class="show-pwd" @click="showPwd"><svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /></span>
                </el-form-item>
                <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin">登录系统</el-button>
              </el-form>
            </div>
          </div>
          <div class="bottom">
            <p align="center"><a href="https://www.baogongtao.com" target="_blank">技术支持：广东包工淘科技有限公司</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
	name: 'Login',
	data() {
		return {
    		passwordType: 'password',
    		loading: false,
			formData: {},
    		bgImg: process.env.VUE_APP_BASE_URL + 'images/login.jpg',
      		logo: process.env.VUE_APP_BASE_URL + 'images/logo.png'
    	}
	},

	methods: {

	    showPwd() {
			if (this.passwordType === 'password') {
				this.passwordType = ''
			} else {
				this.passwordType = 'password'
			}
			this.$nextTick(() => {
				this.$refs.password.focus()
			})
	    },

	    handleLogin() {
	    	this.$refs.loginForm.validate(valid => {
		        if (valid) {
		          this.loading = true
		          this.$store.dispatch('user/login', this.formData)
		            .then(() => {
		            	this.$router.push({ path: '/login' || '/', query: this.otherQuery })
		            	this.loading = false
		            })
		            .catch(() => {
		              this.loading = false
		            })
		        } else {
		          console.log('error submit!!')
		          return false
		        }
		    })
	    }
	}
}
</script>

<style lang="scss">
$dark_gray:#889aa4;
.login-main{height: 100vh;min-height: 100vh;-webkit-box-flex: 1;-ms-flex: 1;flex: 1;-webkit-box-orient: vertical;-webkit-box-direction: normal;-ms-flex-direction: column;flex-direction: column;overflow-y: auto;}
.login-body{background-size: cover;background-repeat: no-repeat;background-position: 50%;}
.wrap{position: relative;width: 100%;height: 100vh;max-width: 1280px;margin: 0 auto;}

@media only screen and (min-width: 1024px){
	.login-side{width: 33.33333%;}
}
@media only screen and (min-width: 1440px){
	.login-side{width: calc(400px + (100vw - 1440px)/2);}
}

.login-side {
	position: fixed;right: 0;top: 0;height: 100vh;min-width: 320px;background-color: #fff;z-index: 11;
	.content {
	    display: flex;height: calc(100vh - 34px);padding-bottom: 105px;justify-content: center;align-items: center;
	    .logo{
	    	text-align: center;
	    	img{height: 80px;}
	    }
	    .login-form {
		    width: 360px;padding:0 20px;margin: 0 auto;
		    .form-desc{color: #8492a6;margin: 20px 0;text-align: center;}
			.el-input--medium .el-input__inner{height: 44px;line-height: 44px;}
			.el-button--primary{width: 100%;height: 44px;background-color: #3388ff;border-color: #3388ff;}
			.el-button--primary:hover{background-color: #103c75;border-color: #103c75;}
			.el-button--primary:active{background-color: #1e3d65;border-color: #1e3d65;}

			.show-pwd {position: absolute;right: 10px;top: 7px;font-size: 16px;color: $dark_gray;cursor: pointer;user-select: none;}
		}
	}
	.bottom{
		position: absolute;bottom: 20px;left: 0;right: 0;
		a{color: #8492a6;font-size: 12px;}
	}
}

</style>
