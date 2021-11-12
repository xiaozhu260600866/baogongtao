<template>
  <div>
    <div class="ptools pb0 clearfix">
      <div class="search-box f-left">
        <el-form :inline="true" :model="listQuery">
          <el-form-item v-if="role!=11" style="width: 100px;">
            <el-input v-model="listQuery.name" placeholder="姓名" />
          </el-form-item>
          <el-form-item v-if="role==6 || role==12" style="width: 150px;">
            <el-input v-model="listQuery.phone" placeholder="手机号码" />
          </el-form-item>
          <el-form-item v-if="role==6">
            <el-input v-model="listQuery.company" placeholder="派驻公司" />
          </el-form-item>
          <el-form-item v-if="role==12">
            <el-select v-model="listQuery.company_id" filterable placeholder="派驻公司">
              <el-option v-for="item in companys" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="role==6 || role==12">
            <el-select v-model="listQuery.sign_status" multiple placeholder="签约状态" style="width: 120px;">
              <el-option v-for="item in signStatuses" :key="item.value" :label="item.name" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchForm('form')"><i class="el-icon-search" /> 搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="f-right">
        <el-button v-if="role==2" type="primary" @click="handelCreate"><i class="el-icon-plus" /> 新增管理员</el-button>
        <el-button v-if="role==6" type="success" @click="handelDownload"><i class="el-icon-download" /> 下载模板</el-button>
        <el-button v-if="role==12" type="success" @click="selectDownloadWage"><i class="el-icon-download" /> 下载个人所得发放模板</el-button>
        <el-dropdown v-if="role==6">
          <el-button type="primary">上传员工<i class="el-icon-arrow-down el-icon--right" /></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-upload style="display: inline-block;" class="upload-demo" :action="uploadUrl" :data="uploadDataNew" accept=".xlsx" :multiple="false" :show-file-list="false" :before-upload="beforeUpload" :on-success="successUpload">
                <i class="el-icon-upload" /> 上传新签员工
              </el-upload>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-upload style="display: inline-block;" class="upload-demo" :action="uploadUrl" :data="uploadDataRenew" accept=".xlsx" :multiple="false" :show-file-list="false" :before-upload="beforeUpload" :on-success="successUpload">
                <i class="el-icon-upload" /> 上传续签员工
              </el-upload>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="list-box">
      <el-table v-loading="listsData.listLoading" :data="listsData.data" border style="width: 100%" @sort-change="sortAction" @selection-change="selsChange">
        <template slot="empty">
          <div class="empty-div">
            <div><svg-icon icon-class="dx-empty" /></div>
            <p>暂无</p>
          </div>
        </template>
        <el-table-column type="selection" align="center" width="55" />
        <el-table-column label="姓名" align="center" width="100">
          <template slot-scope="scope">
            <div v-if="role==12"><router-link :to="'/user/show?id='+scope.row.user_id" class="fc-blue"><div class="list-txt">{{ scope.row.name }}</div></router-link></div>
            <div v-else>{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="role==2" prop="username" label="登录账号" align="center" />
        <el-table-column v-if="role==2" prop="powerName" label="账户权限" align="center" width="220" />
        <el-table-column v-if="role==12 || role==6" prop="phone" label="电话号码" align="center" width="150" />
        <el-table-column v-if="role==12 || role==6" prop="idcardno" label="身份证号码" align="center" width="200" />
        <el-table-column v-if="role==6" label="合同期" align="center" width="200">
          <template slot-scope="scope">
            {{ scope.row.contract_start_date }} - {{ scope.row.contract_end_date }}
          </template>
        </el-table-column>
        <el-table-column v-if="role==12 || role==6" prop="employerName" label="签约公司" align="center" />
        <el-table-column v-if="role==6" prop="company" label="派驻公司" align="center" width="120" />
        <el-table-column v-if="role==12" prop="companyName" label="派驻公司" align="center" width="120" />
        <el-table-column v-if="role==6||role==12" label="签约状态" align="center" width="100">
          <template slot-scope="scope">
            <sign-status :status="scope.row.sign_status" :role="role" />
          </template>
        </el-table-column>
        <el-table-column v-if="role==12" label="认证状态" align="center" width="100">
          <template slot-scope="scope">
            <worker-status :data="scope.row" :role="12" />
          </template>
        </el-table-column>
        <el-table-column v-if="role==12 || role==6" label="绑定微信" align="center" min-width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.get_wechat_user" class="list-col-img">
              <el-image class="list-img" :src="scope.row.get_wechat_user.avatarUrl" :alt="scope.row.get_wechat_user.nickName" />
              <div class="list-txt">{{ scope.row.get_wechat_user.nickName }}</div>
            </div>
            <div v-else>-</div>
          </template>
        </el-table-column>
        <el-table-column label="账号状态" align="center" width="100">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.account_status" :active-value="1" :inactive-value="0" active-text="" inactive-text="" @change="changeStatus(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="加入时间" align="center" width="160" />
        <el-table-column label="操作" align="center" width="80" fixed="right">
          <template slot-scope="scope">
            <el-dropdown @command="handleCommand">
              <el-button icon="el-icon-more" circle size="mini" />
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><router-link v-if="role==12" :to="'/user/show?id='+scope.row.user_id" class="fc-blue"><i class="el-icon-s-order" /> 详情</router-link></el-dropdown-item>
                <el-dropdown-item v-if="role==2" :command="getCommandData(scope.$index, scope.row,'edit')"><i class="el-icon-edit" /> 编辑</el-dropdown-item>
                <el-dropdown-item v-if="role==2 || role==6" divided class="fc-danger" :command="getCommandData(scope.$index, scope.row,'delete')"><i class="el-icon-delete" /> 删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="list-bottom clearfix">
        <div class="f-left">
          <el-button v-if="role==2 || role==6" type="danger" :disabled="this.selectLists.length===0" @click="selectDelete"><i class="el-icon-delete-solid" /> 批量删除</el-button>
        </div>
        <div class="f-right">
          <pagination v-show="listsData.total>0" :total="listsData.total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListsData" />
        </div>
      </div>

    </div>

    <el-dialog :visible.sync="formVisible" :title="formTitle + roleName" width="1000px" top="5vh">
      <el-form ref="formData" :model="formData" label-width="120px">
        <el-row>
          <el-col v-if="formType=='create'" :span="12">
            <el-form-item label="登录账号" prop="username" :rules="[{ required: true, message: '请输入登录账号'}]">
              <el-input v-model="formData.username" />
            </el-form-item>
          </el-col>
          <el-col v-else :span="12">
            <el-form-item label="登录账号">
              {{ formData.username }} <el-button size="mini" type="primary" round @click="modifyUsername">更改账号</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name" :rules="[{ required: true, message: '请输入姓名'}]">
              <el-input v-model="formData.name" />
            </el-form-item>
          </el-col>
          <el-col v-if="formType=='create'" :span="12">
            <el-form-item label="登录密码" prop="password" :rules="[{ required: true, message: '请输入登录密码'}]">
              <el-input v-model="formData.password" />
            </el-form-item>
          </el-col>
          <el-col v-else :span="12">
            <el-form-item label="登录密码">
              <el-button size="mini" type="primary" round @click="modifyPwd">更改登录密码</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账户状态" prop="status">
              <el-switch v-model="formData.status" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账户权限" prop="status">
              <el-radio v-model="formData.power" :label="1" border size="medium">信息管理</el-radio>
              <el-radio v-model="formData.power" :label="2" border size="medium">审核员</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('formData')">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listsFromRole, store, del, signRemind } from '@/api/user'
import { lists as companyLists } from '@/api/company'
import { Loading } from 'element-ui'
import Pagination from '@/components/Pagination'
import SignStatus from '@/views/user/components/SignStatus'
import WorkerStatus from '@/views/user/components/WorkerStatus'
export default {
	components: { Pagination, SignStatus, WorkerStatus },
	props: {
		role: {
			type: Number,
			default: 2
		}
	},
	data() {
		return {
			signStatuses: [
				{ name: '未签约', value: 0 },
				{ name: '已签约', value: 1 },
				{ name: '过期', value: 2 }
			],
			companys: [],
			roleName: '',
			formVisible: false,
			formTitle: '',
			formType: '',
			formData: {
				id: '',
				role: this.role,
				name: '',
				username: '',
				password: '',
				status: 1,
				power: 0
			},
			selectLists: [],
		    listQuery: this.queryDefault(this),
			listsData: this.listsDefault(this),

			uploadUrl: process.env.VUE_APP_BASE_API + '/user/upload',
			uploadDataNew: {
				type: 'new',
				role: 6,
				token: this.$store.getters.token
			},
			uploadDataRenew: {
				type: 'renew',
				role: 6,
				token: this.$store.getters.token
			}
		}
	},
	mounted() {
		if (this.role == 2) this.roleName = '管理员'
		else if (this.role == 11) this.roleName = '企业'
		else if (this.role == 12) this.roleName = '会员'

		companyLists().then(res => {
			this.companys = res.data.lists
		})
		console.log(this.roleName)
		this.listQuery.role = this.role
		this.getListsData()
	},
	methods: {
		getListsData() {
			listsFromRole(this.listQuery).then(res => {
				this.listsData = res.data.lists
			})
		},
		changeStatus(row) {
			store({ id: row.user_id, status: row.status }).then(res => {
				// this.listsData = res.data.lists;
			})
			// console.log(row);
		},
		handelCreate() {
			this.formTitle = '新增'
			this.formType = 'create'
			this.formData = {
				id: '',
				role: this.role,
				name: '',
				username: '',
				password: '',
				status: 1,
				power: 0
			}
			this.$nextTick(() => {
                this.$refs['formData'].resetFields()
            })
			this.formVisible = true
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
				this.formTitle = '修改'
				this.formType = 'edit'
				this.formData.id = command.row.user_id
				this.formData.name = command.row.name
				this.formData.username = command.row.username
				this.formData.status = command.row.status
				this.formData.power = command.row.power
				this.formVisible = true
			} else if (command.command == 'delete') {
				this.tytConfirm({ msg: '确认要删除该用户吗？' }, this).then(obj => {
	    			del({ id: command.row.user_id }).then(res => {
	    				obj.instance.confirmButtonLoading = false
						this.$message.success(res.msg)
						this.listsData.data.splice(command.index, 1)
						obj.done()
					})
		    	}).catch(obj => { obj.instance.confirmButtonLoading = false })
			}
		},
		selsChange: function(sels) {
			// console.log(sels)
			this.selectLists = sels
		},
		selectDelete() {
			this.$confirm('确认要删除所选用户吗？').then(res => {
	            del({ id: this.selectLists2IdStr(this.selectLists) }).then(res => {
					this.$message.success(res.msg)
					this.getListsData()
				})
	        }).catch(res => {})
		},
		selectDownloadWage() {
			if (!this.selectLists.length) return this.$message.error('请勾选需要下载的行')
			const ids = this.selectLists2IdStr(this.selectLists)
			window.open(process.env.VUE_APP_BASE_API + '/user/download?action=wages&ids=' + ids + '&token=' + this.$store.getters.token)
		},
		searchForm() {
			this.getListsData()
		},
		sortAction(e) {
			this.listQuery.order_filed = e.prop
			this.listQuery.order_by = e.order == 'ascending' ? 'ASC' : 'DESC'
			// console.log(this.listQuery)
			this.getListsData()
		},
		submitForm(formName) {
	    	this.$refs[formName].validate((valid) => {
				if (valid) {
					store(this.formData).then(res => {
						this.$message.success(res.msg)
						this.formVisible = false
						this.getListsData()
					})
				} else {
					console.log('error submit!!')
					return false
				}
			})
	    },
	    modifyUsername() {
	    	this.$prompt('请输入用户名', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				closeOnClickModal: false,
				inputValue: this.formData.username
			}).then(({ value }) => {
				store({ id: this.formData.id, username: value }).then(res => {
					if (res.code == 0) {
						this.formData.username = value
						this.$message.success('操作成功')
					} else this.$message.error(res.msg)
				})
			}).catch(() => {

			})
		},
		modifyPwd() {
	    	this.$prompt('请输入新的登录密码', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				closeOnClickModal: false
			}).then(({ value }) => {
				store({ id: this.formData.id, password: value }).then(res => {
					if (res.code == 0) {
						this.$message.success('操作成功')
					} else this.$message.error(res.msg)
				})
			}).catch(() => {

			})
		},
	    handelDownload() {
	    	window.open(process.env.VUE_APP_BASE_URL + 'upload/file/员工上传模板.xlsx')
	    },
	    beforeUpload() {
	    	Loading.service({ text: '上传中...' })
	    },
	    successUpload(res) {
	    	// console.log(res)
	    	Loading.service().close()
	    	if (res.code == 0) {
	    		this.msgSuccess(res.msg, this)
	    		this.getListsData()
		    	signRemind({}).then(res => {

		    	})
	    	} else {
	    		this.msgError(res.msg, this)
	    	}
	    }
	}
}
</script>

<style>
</style>
