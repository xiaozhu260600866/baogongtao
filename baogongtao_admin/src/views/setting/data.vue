<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="dx-container">
          <tyt-page-header content="数据字典" />
          <div class="dx-main">
            <div class="list-box">
              <el-tabs v-model="tabActive" @tab-click="handleClick">
                <el-tab-pane v-for="(item, index) in tabs" :label="item.remark" :name="item.name">
                  <attribute-lists :type="item" />
                </el-tab-pane>
              </el-tabs>

            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { attributeTypes } from '@/api/base'
import AttributeLists from '@/views/components/AttributeLists'
export default {
	components: { AttributeLists },
	data() {
		return {
			tabs: [],
			tabActive: 'task_type',
			type: ''
		}
	},
	mounted() {
		this.getData()
	},
	methods: {
		handleClick(tab, event) {
	        console.log(tab, event)
	    },
		getData() {
			attributeTypes({ category: 1 }).then(res => {
				this.tabs = res.data.lists
				if (!this.tabActive) this.tabActive = this.tabs[0].name
			})
		},
		changeStatus(row) {
			// console.log(row)
			const data = { id: row.id, status: row.status }
			classStore(data).then(res => {
				this.$message.success(res.msg)
				console.log(res)
				// this.listsData = res.data.lists
			})
		},
		handleEdit(index, row) {
			console.log(row)
			this.formData.id = row.id
			this.formData.fid = row.fid
			// this.formData.name = row.name
			this.$set(this.formData, 'name', row.name)
			this.$set(this.formData, 'sort', row.sort)
			this.$set(this.formData, 'status', row.status)
			this.formTitle = '修改分类'
			this.formVisible = true
		},
		handleDelete(index, row) {
			const confirmTxt = row.children ? '该分类下有子分类，删除该分类将会把该分类下的子分类一并删除，确认要删除吗？' : '确认要删除该分类吗？'
			this.$confirm(confirmTxt).then(res => {
	            classDelete({ id: row.id }).then(res => {
					this.$message.success(res.msg)
					this.getData()
					// this.listsData.splice(index, 1);
				})
	        }).catch(res => {})
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					classStore(this.formData).then(res => {
						this.$message.success(res.msg)
						this.getData()
						this.formVisible = false
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
