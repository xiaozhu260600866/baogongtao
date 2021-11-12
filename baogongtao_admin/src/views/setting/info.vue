<template>
  <div class="app-container">
    <el-row>
      <el-form ref="form" :model="formData" label-width="100px">
        <el-col :span="24">
          <div class="dx-container">
            <tyt-page-header content="信息项配置" />
            <div class="dx-main">
              <div class="list-box">
                <el-tabs v-model="tabActive" @tab-click="handleClick">
                  <el-tab-pane v-for="(item, index) in infos" :label="item.name" :name="item.remark" />
                </el-tabs>
                <Tinymce ref="editor" v-model="info.content" :height="300" />
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
import { infos, infoStore } from '@/api/base'
import Tinymce from '@/components/Tinymce'
export default {
	components: { Tinymce },
	data() {
		return {
			infos: [],
			tabActive: 'user_rule',
			info: {},
			formData: { id: '', content: '' }
		}
	},
	mounted() {
		this.getData()
	},
	methods: {
		handleClick(tab, event) {
			this.info = this.infos[tab.index]
			this.$refs.editor.hasChange = false
			this.$refs.editor.hasInit = true
	    },
		getData() {
			infos({}).then(res => {
				this.infos = res.data.lists
				this.info = this.infos[0]
			})
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.formData.id = this.info.id
					this.formData.content = this.info.content
					infoStore(this.formData).then(res => {
						this.$message.success(res.msg)
					})
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
