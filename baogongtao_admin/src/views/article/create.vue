<template>
  <div class="app-container">
    <el-row v-loading="detailData.loading">
      <el-form ref="form" :model="formData" label-width="100px">
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
              <div class="list-box mt20">

                <el-row>
                  <el-col :xs="24">
                    <el-form-item label="所属分类" prop="class_id">
                      <el-input placeholder="请输入内容" :value="classData.name" :disabled="true" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24">
                    <el-form-item label="文章标题" prop="title" :rules="[{ required: true, message: '文章标题不能为空'}]">
                      <el-input v-model="formData.title" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24">
                    <el-form-item label="封面图片">
                      <tyt-upload :length="1" :file-list="formData.cover" path-name="article" :thumbsize="[300,600]" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24">
                    <el-form-item label="简述">
                      <el-input v-model="formData.intro" type="textarea" :rows="3" placeholder="请输入简述" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="发布日期" prop="published_date">
                      <el-date-picker v-model="formData.published_date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="状态" prop="status">
                      <el-switch v-model="formData.status" :active-value="1" :inactive-value="0" />
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
              <h1><i class="el-icon-s-unfold" /> 文章内容</h1>
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
import { classes, detail, store, classDetail } from '@/api/article'
import TytUpload from '@/components/Tytrock/components/UploadImg'
import Tinymce from '@/components/Tinymce'
export default {
	name: 'ProductCreate',
	components: { TytUpload, Tinymce },
	data() {
		return {
			class_id: '',
			pageTitle: '新增文章',
			classData: {},
			detailData: { loading: true },
			formData: { id: '', class_id: '', title: '', cover: [], published_date: this.getNowDate(), status: 1, content: '' },
			classData: []
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		init() {
			if (this.$route.query.id > 0) {
				this.detailData.id = this.$route.query.id
				this.pageTitle = '编辑文章'
			} else if (this.$route.query.class_id > 0) {
				this.class_id = this.$route.query.class_id
				this.detailData.class_id = this.class_id
				this.formData.class_id = this.class_id
			}
			// classes().then(res => {
				// this.classData = this.getTreeData(res.data.lists)
				detail(this.detailData).then(res => {
					this.detailData = res.data
					if (res.data.data) {
						this.pageTitle = '编辑文章'
						this.class_id = res.data.data.class_id
						this.formData = res.data.data
						this.formData.cover = res.data.data.coverUrlArr
					}
					classDetail({ id: this.class_id }).then((res) => {
						this.classData = res.data.data
					})
				})
			// })
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					const coverObj = this.formData.cover
					const coverArr = []
					coverObj.forEach(v => {
					    coverArr.push(v.response)
					})
					this.formData.cover_str = coverArr.join(',')

					store(this.formData).then(res => {
						this.$message.success(res.msg)
						if (this.classData.type == 2) this.$router.push({ path: '/site/article/lists?class_id=' + this.class_id })
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
