<template>
  <div class="app-container">
    <el-row v-loading="detailData.loading">
      <el-form ref="form" :model="formData" :inline="true" label-width="100px">
        <el-col :span="24">
          <div class="dx-container">
            <div class="p15"><el-page-header :content="pageTitle" @back="goBack" /></div>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="dx-container mt5">

            <div class="dx-title">
              <h1><i class="el-icon-s-unfold" /> 基本信息</h1>
            </div>
            <div class="dx-main">
              <div class="list-box mt20" style="position: relative;">

                <div class="photo" style="position: absolute;top: 0px;left:70%;z-index: 9">
                  <tyt-upload :length="1" :file-list="formData.photo" path-name="user" :thumbsize="[300]" default-text="点击上传照片" />
                </div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="姓名" prop="name" :rules="[{ required: true, message: '姓名不能为空'}]">
                      <el-input v-model="formData.name" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="性别" prop="name">
                      <el-radio-group v-model="formData.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="员工编号" prop="no">
                      <el-input v-model="formData.no" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="电话号码" prop="phone">
                      <el-input v-model="formData.phone" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="所在部门" prop="fid">
                      <el-cascader v-model="formData.department_id" :options="departmentsData" :props="{checkStrictly: true, expandTrigger: 'hover' ,value:'id',label:'name'}" placeholder="请选择所在部门" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="职务" prop="position">
                      <el-input v-model="formData.position" />
                    </el-form-item>
                  </el-col>

                </el-row>

              </div>
            </div>
          </div>
        </el-col>

        <el-col v-if="!formData.id" :span="24">
          <div class="dx-container mt20">
            <div class="dx-title">
              <h1><i class="el-icon-s-unfold" /> 账户信息</h1>
            </div>
            <div class="dx-main">
              <div class="list-box mt20">

                <el-row>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="登录账号" prop="username">
                      <el-input v-model="formData.username" type="text" :rules="[{ required: true, message: '登录账号不能为空'}]" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="登录密码" prop="password">
                      <el-input v-model="formData.password" type="text" :rules="[{ required: true, message: '登录密码不能为空'}]" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="账户状态" prop="status">
                      <el-switch v-model="formData.status" :active-value="1" :inactive-value="0" />
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
import { lists as dmpLists } from '@/api/hr/department'
import { detail, store } from '@/api/hr/user'
import TytUpload from '@/components/Tytrock/UploadImg'
export default {
	components: { TytUpload },
	data() {
		return {
			departmentsData: [],
			pageTitle: '添加人员',
			detailData: { loading: true },
			proCategory: [],
			suppliers: [],
			formData: { id: '', sex: 1, department_id: '', photo: [], status: 1 }
		}
	},
	mounted() {
		console.log(this.$store.getters)
		this.init()
	},
	methods: {
		init() {
			dmpLists(this.listQuery).then(res => {
				this.departmentsData = this.getTreeData(res.data.lists)
			})
			if (this.$route.query.id > 0) {
				this.detailData.id = this.$route.query.id
				this.pageTitle = '修改人员'
			}
			detail(this.detailData).then(res => {
				this.detailData = res.data
				if (res.data.data) {
					this.formData = res.data.data.get_user_info
					this.formData.photo = res.data.data.get_user_info.photoUrlArr
					this.formData.id = res.data.data.get_user_info.user_id
				}
			})
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.formData.photo.length) {
						const coverObj = this.formData.photo
						const coverArr = []
						coverObj.forEach(v => {
						    coverArr.push(v.response)
						})
						this.formData.photo = coverArr.join(',')
					}

					store(this.formData).then(res => {
						this.$message.success(res.msg)
						this.$router.push({ path: '/hr/archive/lists' })
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
