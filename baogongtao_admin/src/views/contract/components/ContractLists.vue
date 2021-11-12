<template>
  <div class="dx-main">
    <div class="list-box">
      <div class="ptools p0 clearfix">
        <div class="search-box f-left">
          <el-form :inline="true" :model="listQuery">
            <el-form-item>
              <el-input v-model="listQuery.name" placeholder="合同名称" />
            </el-form-item>
            <el-form-item>
              <el-select v-model="listQuery.status" clearable placeholder="状态" style="width:120px;">
                <el-option v-for="item in statusArr" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchForm('form')"><i class="el-icon-search" /> 搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="f-right">
          <el-button type="primary" @click="handelCreate"><i class="el-icon-plus" /> 新增合同</el-button>
        </div>
      </div>
      <el-table v-loading="listLoading" :data="listData.data" border style="width: 100%" @selection-change="selectChange">
        <template v-if="!listLoading" slot="empty">
          <div class="empty-div">
            <div><svg-icon icon-class="dx-empty" /></div>
            <p>暂无合同</p>
          </div>
        </template>
        <el-table-column type="selection" align="center" width="55" />
        <el-table-column prop="name" label="合同名称" />
        <el-table-column prop="started_date" align="center" label="开始日期" width="150" />
        <el-table-column prop="ended_date" align="center" label="结束日期" width="150" />
        <el-table-column align="center" label="合同图片" width="150">
          <template slot-scope="scope">
            <el-image v-for="img in scope.row.picMinUrl" style="height: 30px;width: 30px;" :src="img" :preview-src-list="scope.row.picUrl" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="合同附件" width="150">
          <template slot-scope="scope">
            <el-link v-for="(file,index) in scope.row.fileUrlArr" :href="file.url" target="_blank" style="padding:0 5px;">附件{{ index+1 }}</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" label="合同状态" width="150">
          <template slot-scope="scope">
            <contract-status :data="scope.row" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="right" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handelEdit(scope.$index, scope.row)"><i class="el-icon-edit" /> 编辑</el-button>
            <el-button size="mini" type="danger" @click="handelDelete(scope.$index, scope.row)"><i class="el-icon-delete" /> 删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="list-bottom mt10 clearfix">
        <div class="f-left">
          <el-dropdown @command="handleSelectCommand">
            <el-button type="primary">
              批量操作<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="1" :disabled="this.selectLists.length===0">设为待签</el-dropdown-item>
              <el-dropdown-item :command="2" :disabled="this.selectLists.length===0">设为已签</el-dropdown-item>
              <el-dropdown-item :command="3" :disabled="this.selectLists.length===0">设为到期</el-dropdown-item>
              <el-dropdown-item divided command="del" :disabled="this.selectLists.length===0" class="fc-danger">批量删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <el-button type="danger" @click="selectDelete" :disabled="this.selectLists.length===0"><i class="el-icon-delete-solid"></i> 批量删除</el-button> -->
        </div>
        <div class="f-right">
          <pagination v-show="listData.total>0" :total="listData.total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getArticleLists(2)" />
        </div>
      </div>

      <el-dialog v-if="formVisible" :visible.sync="formVisible" :title="formTitle + '合同'" width="1000px" top="5vh">
        <el-form ref="formData" :model="formData" label-width="100px">
          <el-row>
            <el-col :xs="24">
              <el-form-item label="所属企业" prop="company_id" :rules="[{ required: true, message: '请选择所属企业'}]">
                <el-input v-model="formData.company_name" type="text" placeholder="请选择所属企业" readonly :clearable="true"><el-button slot="append" :disabled="company.id?true:false" @click="companySelVisible=true">选择</el-button></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24">
              <el-form-item label="合同名称" prop="name" :rules="[{ required: true, message: '请输入合同名称'}]">
                <el-input v-model="formData.name" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="开始日期" prop="started_date" :rules="[{ required: true, message: '请选择开始日期'}]">
                <el-date-picker v-model="formData.started_date" type="date" value-format="yyyy-MM-dd" placeholder="选择开始日期" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="结束日期" prop="ended_date" :rules="[{ required: true, message: '请选择结束日期'}]">
                <el-date-picker v-model="formData.ended_date" type="date" value-format="yyyy-MM-dd" placeholder="选择结束日期" />
              </el-form-item>
            </el-col>
            <el-col :xs="24">
              <el-form-item label="合同图片">
                <tyt-upload :file-list="formData.picArr" path-name="contract" :thumbsize="[300]" />
              </el-form-item>
            </el-col>
            <el-col :xs="24">
              <el-form-item label="附件">
                <tyt-upload-file :file-list="fileList" path-name="contract" :length="3" />
                <!-- <el-upload class="upload-demo" :action="uploadFileUrl" :data="uploadFileData" :on-remove="handleRemove" :on-success="uploadFileSuccess" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
								<el-button size="small" type="primary">点击上传</el-button>
							</el-upload> -->
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="状态" prop="status">
                <el-select v-model="formData.status" placeholder="请选择">
                  <el-option v-for="item in statusArr" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="formVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('formData')">提 交</el-button>
        </div>
      </el-dialog>

      <company-select :visible="companySelVisible" :length="1" @close="companySelVisible=false" @select="companySelected" />
    </div>
  </div>
</template>

<script>
import { lists, store, del, changeStatus } from '@/api/contract'
import Pagination from '@/components/Pagination'
import TytUpload from '@/components/Tytrock/components/UploadImg'
import TytUploadFile from '@/components/Tytrock/components/UploadFile'
import CompanySelect from '@/views/company/components/CompanySelect'
import ContractStatus from './ContractStatus'
export default {
	components: { TytUpload, TytUploadFile, Pagination, CompanySelect, ContractStatus },
	props: {
		company: {
			type: Object,
			default: {}
		}
	},
	data() {
		return {
			listLoading: false,
			listData: this.listsDefault(this),
			listQuery: this.listQuery(this, 5),
			formVisible: false,
			formTitle: '',
			formData: {
				company_id: '',
				name: '',
				started_date: this.getNowDate(),
				ended_date: this.initDefaultDate(1, 'y'),
				picArr: [],
				status: 1
			},
			statusArr: [
				{ name: '待签', value: 1 },
				{ name: '已签', value: 2 },
				{ name: '到期', value: 3 }
			],
			selectLists: [],
			companySelVisible: false,

			fileList: [],
			uploadFileUrl: process.env.VUE_APP_BASE_API + '/base/upload',
			uploadFileData: {
				type: 'file',
				pathname: 'contract',
				token: this.$store.getters.token,
				respone: 'filename'
			}
		}
	},
	mounted() {
		if (this.company.id) this.listQuery.company_id = this.company.id
		this.getListsData()
	},
	methods: {
		getListsData() {
			this.listLoading = true
			lists(this.listQuery).then(res => {
				this.listData = res.data.lists
				this.listLoading = false
			})
		},
		searchForm() {
			this.getListsData()
		},
		handelCreate() {
			this.formTitle = '新增'
			this.formData.id = ''
			this.formData.name = this.company.id ? this.company.name : ''
			this.formData.company_name = this.company.id ? this.company.name : ''
			this.formData.company_id = this.company.id ? this.company.id : ''
	    	this.formData.picArr = []
	    	this.fileList = []
	    	this.formData.started_date = this.getNowDate()
	    	this.formData.ended_date = this.initDefaultDate(1, 'y')
	    	this.formData.status = 1
			this.formVisible = true
		},
		handelEdit(index, row) {
	    	this.formTitle = '编辑'
	    	this.formData.id = row.id
	    	this.formData.name = row.name
	    	this.formData.company_name = row.companyName
			this.formData.company_id = row.company_id
	    	this.formData.picArr = row.picUrlArr
	    	this.fileList = row.fileUrlArr
	    	this.formData.started_date = row.started_date
	    	this.formData.ended_date = row.ended_date
	    	this.formData.status = row.status
	    	this.formVisible = true
	    },
	    handelDelete(index, row) {
	    	this.tytConfirm({ msg: '确认要删除该合同吗？' }, this).then(obj => {
    			del({ id: row.id }).then(res => {
    				obj.instance.confirmButtonLoading = false
					this.$message.success(res.msg)
					this.listData.data.splice(index, 1)
					obj.done()
				})
	    	}).catch(obj => { obj.instance.confirmButtonLoading = false })
	    },
	    submitForm(formName) {
	    	this.$refs[formName].validate((valid) => {
				if (valid) {
					const picObj = this.formData.picArr
					if (picObj.length) {
						const picArr = []
						picObj.forEach(v => {
						    picArr.push(v.response)
						})
						this.formData.pic = picArr.join(',')
					} else this.formData.pic = ''

					const fileObj = this.fileList
					if (fileObj.length) {
						const fileArr = []
						fileObj.forEach(v => {
						    fileArr.push(v.response)
						})
						this.formData.file = fileArr.join(',')
					} else this.formData.file = ''

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
		selectChange(sels) {
			this.selectLists = sels
		},

		handleSelectCommand(command) {
			if (command == 'del') {
				this.$confirm('确认要删除所选记录吗？').then(res => {
		            del({ id: this.selectLists2IdStr(this.selectLists) }).then(res => {
						this.$message.success(res.msg)
						this.getListsData()
					})
		        }).catch(res => {})
			} else {
this.$confirm('确认要批量变更所选状态吗？').then(res => {
	            changeStatus({ id: this.selectLists2IdStr(this.selectLists), status: command }).then(res => {
					this.$message.success(res.msg)
					this.getListsData()
				})
	        }).catch(res => {})
}
	    },

		selectDelete() {
			this.$confirm('确认要删除所选合同吗？').then(res => {
	            del({ id: this.selectLists2IdStr(this.selectLists) }).then(res => {
					this.$message.success(res.msg)
					this.getListsData()
				})
	        }).catch(res => {})
		},

		companySelected(data) {
			if (data.length) {
	    		this.formData.company_id = data[0].id
	    		this.formData.company_name = data[0].name
	    		this.formData.name = data[0].name
	    	} else {
	    		this.formData.company_id = ''
	    		this.formData.company_name = ''
	    		this.formData.name = ''
	    	}
	    	this.companySelVisible = false
		},
		close() {
			this.$emit('close')
		},
		handleExceed(files, fileList) {
			this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
		},
		uploadFileSuccess(response, file) {
			console.log(response, file)
			this.fileList.push(file)
		},
		beforeRemove(file, fileList) {
			return this.$confirm(`确定移除 ${file.name}？`)
		}
	}
}
</script>
