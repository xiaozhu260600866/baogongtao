<template>
  <div class="app-container">
    <el-row v-loading="formData.loading" style="margin-bottom: 60px;">
      <el-form ref="form" :model="formData" label-width="100px">
        <el-col :span="24">
          <div class="dx-container mt5">
            <tyt-page-header content="基本配置" />
            <div class="dx-main">
              <div class="list-box mt20">

                <el-row>
                  <el-col :span="16">
                    <el-form-item label="系统名称" prop="system_name" :rules="[{ required: true, message: '请填写系统名称'}]">
                      <el-input v-model="formData.system_name" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- <el-row>
									<el-col :span="24">
										<el-form-item label="LOGO">
											<tyt-upload :length="1" :fileList="formData.system_logo" path-name="system" :thumbsize="[300]"></tyt-upload>
										</el-form-item>
									</el-col>
								</el-row> -->
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="地址" prop="contact_address" :rules="[{ required: true, message: '请填写地址'}]">
                      <el-input v-model="formData.contact_address" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="联系电话" prop="contact_phone" :rules="[{ required: true, message: '请填写联系电话'}]">
                      <el-input v-model="formData.contact_phone" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="SEO关键字" prop="seo_keywords" :rules="[{ required: true, message: '请填写SEO关键字'}]">
                      <el-input v-model="formData.seo_keywords" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="SEO简介" prop="seo_description" :rules="[{ required: true, message: '请填写SEO简介'}]">
                      <el-input v-model="formData.seo_description" />
                    </el-form-item>
                  </el-col>
                </el-row>
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
import { multipleAttributes } from '@/api/base'
import { info, store } from '@/api/setting/system'
import TytUpload from '@/components/Tytrock/components/UploadImg'
export default {
	components: { TytUpload },
	data() {
		return {
			formData: { loading: true },
			timePicker: {
			    start: '08:00',
			    step: '00:30',
			    end: '22:30'
			}
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		init() {
			info({}).then(res => {
				this.formData = res.data.data
				// this.formData.system_logo = res.data.data.logo_for_element
			})
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// this.formData.system_logo = this.formData.system_logo?this.formData.system_logo.response:'';

					store(this.formData).then(res => {
						this.$message.success(res.msg)
						// this.$router.push({ path: '/setting/system' })
					})
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		resetForm(formName) {
	        this.$refs[formName].resetFields()
	    }
	}
}
</script>

<style>
</style>
