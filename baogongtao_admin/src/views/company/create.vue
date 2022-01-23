<template>
  <div class="app-container">
    <el-row v-loading="detailData.loading">
      <el-form ref="form" :model="formData" label-width="150px">
        <el-col :span="24">
          <div class="dx-container">
            <div class="p15">
              <el-page-header :content="pageTitle" @back="goBack" />
            </div>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="dx-container mt5">

            <div class="dx-title">
              <h1><i class="el-icon-s-unfold" /> 基本信息</h1>
            </div>
            <div class="dx-main">
              <div class="list-box mt20">

                <el-row>
                  <el-col :span="24">
                    <el-form-item
                      label="企业名称"
                      prop="name"
                      :rules="[{ required: true, message: '请输入企业名称'}]"
                    >
                      <el-input v-model="formData.name" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="所在地" prop="province">
                      <v-distpicker
                        :province="formData.province"
                        :city="formData.city"
                        :area="formData.area"
                        @selected="selectedPca"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="企业地址" prop="address">
                      <el-input v-model="formData.address" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="12">
                    <el-form-item label="企业固话" prop="phone">
                      <el-input v-model="formData.phone" style="width: 200px;" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="12">
                    <el-form-item label="负责人姓名" prop="charger_name">
                      <el-input v-model="formData.charger_name" style="width: 200px;" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="12">
                    <el-form-item label="负责人联系电话" prop="charger_phone">
                      <el-input v-model="formData.charger_phone" style="width: 200px;" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="12">
                    <el-form-item label="负责人邮箱" prop="charger_email">
                      <el-input v-model="formData.charger_email" style="width: 200px;" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="LOGO">
                      <tyt-upload
                        :length="1"
                        :file-list="formData.logoArr"
                        path-name="logo"
                        :thumbsize="[300]"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="营业执照">
                      <tyt-upload
                        :length="1"
                        :file-list="formData.licenseArr"
                        path-name="logo"
                        :thumbsize="[300]"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="法人身份证">
                      <tyt-upload
                        :length="1"
                        :file-list="formData.idcardArr"
                        path-name="logo"
                        :thumbsize="[300]"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="企业资质">
                      <tyt-upload
                        :length="5"
                        :file-list="formData.credentialsArr"
                        path-name="logo"
                        :thumbsize="[300]"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="上班时间" prop="status">
                      <el-time-select
                        v-model="formData.work_start_time_default"
                        :picker-options="{
                          start: '06:00',
                          step: '00:15',
                          end: '18:30'
                        }"
                        placeholder="选择时间"
                      />
                    </el-form-item>
                    <el-form-item label="下班时间" prop="status">
                      <el-time-select
                        v-model="formData.work_end_time_default"
                        :picker-options="{
                          start: '06:00',
                          step: '00:15',
                          end: '18:30'
                        }"
                        placeholder="选择时间"
                      />
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :xs="24" :sm="12" :lg="8">
										<el-form-item label="企业状态" prop="status">
											<el-switch v-model="formData.status" :active-value="1" :inactive-value="0"></el-switch>
										</el-form-item>
									</el-col> -->
                </el-row>

              </div>
            </div>
          </div>
        </el-col>

        <el-col v-if="!formData.id" :span="24">
          <div class="dx-container mt5">

            <div class="dx-title">
              <h1><i class="el-icon-s-unfold" /> 账号信息</h1>
            </div>
            <div class="dx-main">
              <div class="list-box mt20">

                <el-row>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item
                      label="登录账号"
                      prop="username"
                      :rules="[{ required: true, message: '请输入企业登录账号'}]"
                    >
                      <el-input v-model="formData.username" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item
                      label="登录密码"
                      prop="password"
                      :rules="[{ required: true, message: '请输入企业登录密码'}]"
                    >
                      <el-input
                        v-model="formData.password"
                        type="password"
                        :show-password="true"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="账号状态" prop="account_status">
                      <el-switch
                        v-model="formData.account_status"
                        :active-value="1"
                        :inactive-value="0"
                        active-text=""
                        inactive-text=""
                      />
                    </el-form-item>
                  </el-col>
                </el-row>

              </div>
            </div>
          </div>
        </el-col>

        <el-col>
          <div class="dx-container mt5">

            <div class="dx-title">
              <h1><i class="el-icon-s-unfold" /> 打卡奖励</h1>
            </div>
            <div class="dx-main">
              <div class="list-box mt20">

                <el-row>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item
                      label="工作一个月一级"
                      prop="sign_commission"
                      :rules="[{ required: true, message: '请输入企业工作一个月'}]"
                    >
                      <el-input v-model="formData.sign_commission">
                        <template slot="append">元</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item
                      label="工作一个月二级"
                      prop="sign_commission_second"
                      :rules="[{ required: true, message: '请输入企业工作一个月'}]"
                    >
                      <el-input v-model="formData.sign_commission_second">
                        <template slot="append">元</template>
                      </el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item
                      label="满足多少天"
                      prop="sign_commission"
                      :rules="[{ required: true, message: '请输入企业工作一个月'}]"
                    >
                      <el-input v-model="formData.sign_commission_days">
                        <template slot="append">天</template>
                      </el-input>
                    </el-form-item>
                  </el-col>

                </el-row>

              </div>
            </div>
          </div>
        </el-col>

        <el-col :span="24" style="padding-bottom: 60px;">
          <div class="dx-container mt20">
            <div class="dx-title">
              <h1><i class="el-icon-s-unfold" /> 企业介绍</h1>
            </div>
            <div class="dx-main">
              <div class="list-box mt20">
                <Tinymce ref="editor" v-model="formData.content" :height="300" />
              </div>
            </div>
          </div>
        </el-col>

        <div class="fixed-btn">
          <el-button @click="resetForm('form')"><i class="el-icon-refresh-left" /> 重 置</el-button>
          <el-button type="primary" @click="submitForm('form')"><i class="el-icon-check" /> 提 交</el-button>
        </div>
      </el-form>
    </el-row>
  </div>
</template>

<script>
	import {
		classes,
		detail,
		store
	} from '@/api/company'
	import TytUpload from '@/components/Tytrock/components/UploadImg'
	import Tinymce from '@/components/Tinymce'
	import VDistpicker from 'v-distpicker'
	export default {
		name: 'CompanyCreate',
		components: {
			TytUpload,
			Tinymce,
			VDistpicker
		},
		data() {
			return {
				pageTitle: '新增企业',
				detailData: {
					loading: true
				},
				formData: {
					id: '',
					class_id: '',
					name: '',
					logoArr: [],
					licenseArr: [],
					idcardArr: [],
					credentialsArr: [],
					logo: '',
					status: 1,
					account_status: 1,
					content: ''
				},
				classData: []
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				detail(this.detailData).then(res => {
					this.detailData = res.data
					if (res.data.data) {
						this.formData = res.data.data
						this.formData.logoArr = res.data.data.logoUrlArr
						this.formData.licenseArr = res.data.data.licenseUrlArr
						this.formData.idcardArr = res.data.data.idcardUrlArr
						this.formData.credentialsArr = res.data.data.credentialsUrlArr
					}
				})

				if (this.$route.query.id > 0) {
					this.detailData.id = this.$route.query.id
					this.pageTitle = '修改企业'
				}
			},
			selectedPca(data) {
				this.formData.province = data.province.value
				this.formData.city = data.city.value
				this.formData.area = data.area.value
				this.formData.pca_code = data.province.code + ',' + data.city.code + ',' + data.area.code
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						const logoObj = this.formData.logoArr
						if (logoObj.length) {
							const logoArr = []
							logoObj.forEach(v => {
								logoArr.push(v.response)
							})
							this.formData.logo_str = logoArr.join(',')
						} else this.formData.logo_str = ''

						const licenseObj = this.formData.licenseArr
						if (licenseObj.length) {
							const licenseArr = []
							licenseObj.forEach(v => {
								licenseArr.push(v.response)
							})
							this.formData.license_str = licenseArr.join(',')
						} else this.formData.license_str = ''

						const idcardObj = this.formData.idcardArr
						if (idcardObj.length) {
							const idcardArr = []
							idcardObj.forEach(v => {
								idcardArr.push(v.response)
							})
							this.formData.idcard_str = idcardArr.join(',')
						} else this.formData.idcard_str = ''

						const credentialsObj = this.formData.credentialsArr
						if (credentialsObj.length) {
							const credentialsArr = []
							credentialsObj.forEach(v => {
								credentialsArr.push(v.response)
							})
							this.formData.credentials_str = credentialsArr.join(',')
						} else this.formData.credentials_str = ''

						store(this.formData).then(res => {
							this.$message.success(res.msg)
							this.$store.dispatch('tagsView/delView', this.$route)
							this.$router.push({
								path: '/company/show?id=' + res.data.data.id
							})
						})
					} else {
						console.log('error submit!!')
						return false
					}
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields()
			},
			goBack() {
				this.$router.go(-1)
			}
		}
	}
</script>

<style>
</style>
