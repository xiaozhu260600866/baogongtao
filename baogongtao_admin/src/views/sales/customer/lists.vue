<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="dx-container">
          <tyt-page-header :content="categoryName + '管理'" />
          <div class="dx-main">
            <div class="ptools pb0 clearfix">
              <div class="search-box f-left">
                <el-form :inline="true" :model="searchData">
                  <el-form-item>
                    <el-input v-model="searchData.name" :placeholder="categoryName + '名称'" suffix-icon="el-icon-search" />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="searchForm('form')">搜索</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div class="f-right">
                <el-button type="primary" @click="handelCreate()"><i class="el-icon-plus" /> 新增{{ categoryName }}</el-button>
              </div>
            </div>
            <div class="list-box">
              <el-table v-loading="listsData.listLoading" :data="listsData.data" border style="width: 100%" @selection-change="selsChange">
                <el-table-column type="selection" align="center" width="55" />
                <el-table-column prop="name" label="名称" />
                <el-table-column prop="contact" label="联系人" />
                <el-table-column prop="phone" label="联系电话" />
                <el-table-column label="操作" align="right" width="200">
                  <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit" /> 编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete" /> 删除</el-button>
                  </template>
                </el-table-column>
                </el-table-column>
              </el-table>

              <div class="list-bottom clearfix">
                <div class="f-left"><el-button type="danger" :disabled="this.selectLists.length===0" @click="selectDelete"><i class="el-icon-delete-solid" /> 批量删除</el-button></div>
                <div class="f-right">
                  <pagination v-show="listsData.total>0" :total="listsData.total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListsData" />
                </div>
              </div>

              <el-dialog v-if="formVisible" :visible.sync="formVisible" :title="formTitle" width="700px">
                <el-form ref="form" :model="formData" label-width="100px">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="客户名称" prop="name" :rules="[{ required: true, message: categoryName + '名称不能为空'},]">
                        <el-input v-model="formData.name" autocomplete="off" :placeholder="'请输入' + categoryName + '名称'" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="联系人" prop="contact">
                        <el-input v-model="formData.contact" type="text" autocomplete="off" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="联系电话" prop="phone">
                        <el-input v-model="formData.phone" type="text" autocomplete="off" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="传真" prop="fax">
                        <el-input v-model="formData.fax" type="text" autocomplete="off" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="Email" prop="email">
                        <el-input v-model="formData.email" type="text" autocomplete="off" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="地址" prop="address">
                        <el-input v-model="formData.address" autocomplete="off" style="width: 475px;" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="备注" prop="content">
                        <el-input v-model="formData.content"type="textarea" :rows="3" autocomplete="off" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="formVisible = false">取 消</el-button>
                  <el-button type="primary" @click="submitForm('form')">确 定</el-button>
                </div>
              </el-dialog>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { lists, store, del } from '@/api/sales/customer'
import Pagination from '@/components/Pagination'
export default {
	components: { Pagination },
	props: ['category'],
	data() {
		return {
			categoryName: this.category == 2 ? '供应商' : '客户',
			listsData: this.listsDefault(this),
		    listQuery: this.queryDefault(this),
			formVisible: false,
			formTitle: '',
			formData: {},
		    searchData: {},
		    selectLists: []
		}
	},
	mounted() {
		this.getListsData()
	},
	methods: {
		getListsData() {
			this.$set(this.listsData, 'listLoading', true)
			this.listQuery.category = this.category
			lists(this.listQuery).then(res => {
				this.listsData = res.data.lists
			})
		},
		handelCreate() {
			// this.$nextTick(() => {
				this.formTitle = '新增' + this.categoryName
				this.formVisible = true
				this.formData = { fid: 0, category: this.category, status: 1 }
			// });
		},
		handleEdit(index, row) {
			console.log(row)
			this.formData.id = row.id
			// this.formData.name = row.name
			this.$set(this.formData, 'name', row.name)
			this.$set(this.formData, 'contact', row.contact)
			this.$set(this.formData, 'phone', row.phone)
			this.$set(this.formData, 'address', row.address)
			this.$set(this.formData, 'content', row.content)
			this.formTitle = '修改' + this.categoryName
			this.formVisible = true
		},
		handleDelete(index, row) {
			this.$confirm('确认要删除该' + this.categoryName + '吗？').then(res => {
	            del({ id: row.id }).then(res => {
					this.$message.success(res.msg)
					this.listsData.data.splice(index, 1)
				})
	        }).catch(res => {})
		},
		selsChange: function(sels) {
			this.selectLists = sels
		},
		selectDelete() {
			this.$confirm('确认要删除所选' + categoryName + '吗？').then(res => {
	            del({ id: this.selectLists2IdStr(this.selectLists) }).then(res => {
					this.$message.success(res.msg)
					this.getListsData()
				})
	        }).catch(res => {})
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					store(this.formData).then(res => {
						this.$message.success(res.msg)
						this.getListsData()
						this.formVisible = false
					})
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		searchForm() {
			this.listQuery.name = this.searchData.name
			console.log(this.listQuery)
			this.getListsData()
		},
		resetForm(formName) {
			this.$refs[formName].resetFields()
		}
	}
}
</script>

<style>
</style>
