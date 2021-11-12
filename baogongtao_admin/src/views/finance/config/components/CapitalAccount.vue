<template>
  <div>
    <p align="right" class="mt0"><el-button type="primary" @click="handelCreate()"><i class="el-icon-plus" /> 新增</el-button></p>
    <el-table v-loading="listsData.loading" :data="listsData.lists" border style="width: 100%" row-key="id" @selection-change="selsChange">
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="typeName" label="账号类型" align="center" width="120" />
      <el-table-column prop="bank" label="银行名称" align="center" width="150" />
      <el-table-column prop="account" label="银行账号" align="center" width="180" />
      <el-table-column label="状态" align="center" width="100">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" active-text="" inactive-text="" @change="changeStatus(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" align="center" width="100" />
      <el-table-column label="操作" align="center" width="60">
        <template slot-scope="scope">
          <el-dropdown @command="handleCommand">
            <el-button icon="el-icon-more" circle size="mini" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="getCommandData(scope.$index, scope.row,'edit')"><i class="el-icon-edit" /> 编辑</el-dropdown-item>
              <el-dropdown-item divided class="fc-danger" :command="getCommandData(scope.$index, scope.row,'delete')"><i class="el-icon-delete" /> 删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
      </el-table-column>
    </el-table>
    <div class="list-bottom clearfix">
      <div class="f-left"><el-button type="danger" :disabled="this.selectLists.length===0" @click="selectDelete"><i class="el-icon-delete-solid" /> 批量删除</el-button></div>
      <div class="f-right" />
    </div>

    <el-dialog v-if="formVisible" :visible.sync="formVisible" :title="formTitle" width="700px">
      <el-form ref="form" :model="formData" :inline="true" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="账号类型" prop="type">
              <el-select v-model="formData.type" placeholder="请选择">
                <el-option v-for="item in captialAccountTypes" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号名称" prop="name" :rules="[{ required: true, message: '账号名称不能为空'},]">
              <el-input v-model="formData.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="银行名称" prop="bank">
              <el-input v-model="formData.bank" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="银行账号" prop="account">
              <el-input v-model="formData.account" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="sort">
              <el-input v-model="formData.sort" type="number" placeholder="0" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-switch v-model="formData.status" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible=false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { multipleAttributes } from '@/api/base'
import { capitalAccounts, capitalAccountStore, capitalAccountDelete } from '@/api/finance/base'
export default {
	props: {
		type: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			captialAccountTypes: [],
			formVisible: false,
			formTitle: '',
			formData: {},
			listsData: this.listsData(this),
			selectLists: []
		}
	},
	watch: {
		type(val) {
			this.formData.type = val
		}
	},
	mounted() {
		this.getData()
		multipleAttributes({ types: [5] }).then(res => {
			this.captialAccountTypes = res.data.data[5]
		})
	},
	methods: {
		getData() {
			capitalAccounts({}).then(res => {
				this.listsData = res.data
			})
		},
		handelCreate() {
			this.formTitle = '新增'
			this.formVisible = true
			this.formData = { id: '', type: 1, name: '', bank: '', account: '', status: 1 }
		},
		changeStatus(row) {
			capitalAccountStore({ id: row.id, status: row.status }).then(res => {

			})
		},
		getCommandData(index, row, command) {
            return {
                'index': index,
                'row': row,
                'command': command
            }
        },
		handleCommand(command) {
			if (command.command == 'edit') {
				const row = command.row
				this.formData.id = row.id
				this.$set(this.formData, 'name', row.name)
				this.$set(this.formData, 'type', row.type)
				this.$set(this.formData, 'bank', row.bank)
				this.$set(this.formData, 'account', row.account)
				this.$set(this.formData, 'status', row.status)
				this.$set(this.formData, 'sort', row.sort)
				this.formTitle = '修改'
				this.formVisible = true
			}
			if (command.command == 'delete') {
				this.tytConfirm({ msg: '确认要删除该资金账号吗？' }, this).then(obj => {
	    			capitalAccountDelete({ id: command.row.id }).then(res => {
	    				obj.instance.confirmButtonLoading = false
						this.$message.success(res.msg)
						this.listsData.lists.splice(command.index, 1)
						obj.done()
					})
		    	}).catch(obj => { obj.instance.confirmButtonLoading = false })
			}
		},
		selsChange: function(sels) {
			this.selectLists = sels
		},
		selectDelete() {
			this.tytConfirm({ msg: '确认要删除所选行的资金账号吗？' }, this).then(obj => {
	            capitalAccountDelete({ id: this.selectLists2IdStr(this.selectLists) }).then(res => {
    				obj.instance.confirmButtonLoading = false
					this.$message.success(res.msg)
					this.getData()
					obj.done()
				})
	        }).catch(obj => { obj.instance.confirmButtonLoading = false; obj.done() })
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					capitalAccountStore(this.formData).then(res => {
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
		close() {
			this.$emit('close')
		}
	}
}
</script>
