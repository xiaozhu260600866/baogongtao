<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="dx-container">
          <tyt-page-header content="产品类别" />
          <div class="dx-main">
            <div class="ptools clearfix">
              <div class="f-right">
                <el-button type="primary" @click="handelCreate()"><i class="el-icon-plus" /> 新增分类</el-button>
              </div>
            </div>
            <div class="list-box">
              <el-table :data="listsData" border style="width: 100%" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column prop="name" label="名称" />
                <el-table-column label="状态" align="center" width="100">
                  <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" active-text="" inactive-text="" @change="changeStatus(scope.row)" />
                  </template>
                </el-table-column>
                <el-table-column prop="sort" label="排序" align="center" width="80" />
                <el-table-column label="操作" align="right" width="200">
                  <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit" /> 编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete" /> 删除</el-button>
                  </template>
                </el-table-column>
                </el-table-column>
              </el-table>

              <el-dialog v-if="formVisible" :visible.sync="formVisible" :title="formTitle" width="700px">
                <el-form ref="form" :model="formData" :inline="true" label-width="100px">
                  <el-form-item label="上级分类" prop="fid">
                    <el-cascader v-model="formData.fid" :options="listsData" :props="{ expandTrigger: 'hover',checkStrictly: true,value:'id',label:'name' }" clearable placeholder="不选择则为一级分类" />
                    <div class="form-item-remark">不选择则为一级分类</div>
                  </el-form-item>
                  <el-form-item label="分类名称" prop="name" :rules="[{ required: true, message: '名称不能为空'},]">
                    <el-input v-model="formData.name" />
                  </el-form-item>
                  <el-form-item label="排序" prop="sort">
                    <el-input v-model="formData.sort" type="number" placeholder="0" />
                  </el-form-item>
                  <el-form-item label="状态" prop="status">
                    <el-switch v-model="formData.status" :active-value="1" :inactive-value="0" />
                  </el-form-item>
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
import { classes, classStore, classDelete } from '@/api/shop/product'
export default {
			data() {
				return {
					listsData: [],
					formVisible: false,
					formTitle: '',
					formData: { id: '', fid: 0, name: '', sort: '', status: 1 }
				}
			},
			mounted() {
				this.getData()
			},
			methods: {
				getData() {
					classes().then(res => {
						console.log(res)
						this.listsData = this.getTreeData(res.data.lists)
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
				handelCreate() {
					// this.$nextTick(() => {
						this.formTitle = '新增分类'
						this.formVisible = true
						this.formData = { fid: 0, status: 1 }
						// this.$refs['form'].resetFields()
						/*
						this.formData.id = ''
						this.formData.fid = 0
						this.$set(this.formData,"name",'')
						this.$set(this.formData,"sort",'')
						this.$set(this.formData,"status",1)
						*/
					// });
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
