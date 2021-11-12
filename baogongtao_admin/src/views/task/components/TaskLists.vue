<template>
  <div class="dx-main">
    <div class="ptools pb0 clearfix">
      <div class="search-box f-left">
        <el-form :inline="true" :model="listQuery">
          <el-form-item>
            <el-input v-model="listQuery.name" placeholder="任务名称" />
          </el-form-item>
          <el-form-item>
            <el-select v-model="listQuery.status" multiple placeholder="所有状态">
              <el-option v-for="item in statuses" :key="item.value" :label="item.name" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchForm('form')"><i class="el-icon-search" /> 搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="f-right">
        <el-button v-if="operator>0" type="success" @click="handelDownload"><i class="el-icon-download" /> 下载模板</el-button>
        <el-upload v-if="operator>0" style="display: inline-block;" class="upload-demo" :action="uploadUrl" :data="uploadData" accept=".xlsx" :multiple="false" :show-file-list="false" :before-upload="beforeUpload" :on-success="successUpload">
          <el-button type="primary"><i class="el-icon-upload" /> 批量上传任务</el-button>
        </el-upload>
        <el-button v-if="operator>0" type="primary" @click="handelCreate"><i class="el-icon-plus" /> 发布任务</el-button>
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
        <el-table-column label="任务名称" min-width="180">
          <template slot-scope="scope">
            <router-link :to="'/task/show?id='+scope.row.id" class="fc-blue"><div class="list-txt">{{ scope.row.name }}</div></router-link>
          </template>
        </el-table-column>
        <el-table-column prop="no" label="任务编号" align="center" width="150" />
        <el-table-column prop="typeName" label="任务类型" align="center" width="100" />
        <el-table-column prop="companyName" label="所属企业" align="center" min-width="180" />
        <el-table-column prop="budget" label="任务预算" align="center" width="100" />
        <el-table-column prop="started_date" label="开始日期" align="center" width="100" />
        <el-table-column prop="ended_date" label="结束日期" align="center" width="100" />
        <el-table-column label="状态" align="center" width="80">
          <template slot-scope="scope">
            <task-status :data="scope.row" />
          </template>
        </el-table-column>
        <el-table-column label="所在地" align="center" width="120">
          <template slot-scope="scope">{{ scope.row.province }} {{ scope.row.city }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="80" fixed="right">
          <template slot-scope="scope">
            <el-dropdown @command="handleCommand">
              <el-button icon="el-icon-more" circle size="mini" />
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><router-link :to="'/task/show?id='+scope.row.id" class="fc-blue"><i class="el-icon-s-order" /> 详情</router-link></el-dropdown-item>
                <el-dropdown-item v-if="operator>0" :command="getCommandData(scope.$index, scope.row,'edit')"><i class="el-icon-edit" /> 编辑</el-dropdown-item>
                <el-dropdown-item v-if="operator>2" divided class="fc-danger" :command="getCommandData(scope.$index, scope.row,'delete')"><i class="el-icon-delete" /> 删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="list-bottom clearfix">
        <div class="f-left">
          <el-dropdown v-if="operator>1" @command="handleSelectCommand">
            <el-button type="primary">
              批量操作<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="2" :disabled="this.selectLists.length===0">提交审核</el-dropdown-item>
              <el-dropdown-item :command="3" :disabled="this.selectLists.length===0">设为已发布</el-dropdown-item>
              <el-dropdown-item :command="4" :disabled="this.selectLists.length===0">设为服务中</el-dropdown-item>
              <el-dropdown-item :command="80" :disabled="this.selectLists.length===0">设为已完成</el-dropdown-item>
              <el-dropdown-item :command="88" :disabled="this.selectLists.length===0">设为已结算</el-dropdown-item>
              <el-dropdown-item :command="99" :disabled="this.selectLists.length===0">关闭任务</el-dropdown-item>
              <el-dropdown-item divided command="del" :disabled="this.selectLists.length===0" class="fc-danger">批量删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <el-button type="danger" @click="selectDelete" :disabled="this.selectLists.length===0" v-if="operator>2"><i class="el-icon-delete-solid"></i> 批量删除</el-button> -->
        </div>
        <div class="f-right">
          <pagination v-show="listsData.total>0" :total="listsData.total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListsData" />
        </div>
      </div>

    </div>

    <el-dialog :visible.sync="formVisible" :title="formTitle + '任务'" width="1000px" top="5vh">
      <el-form ref="formData" :model="formData" label-width="120px">
        <el-row>
          <el-col :xs="24">
            <el-form-item label="任务名称" prop="name" :rules="[{ required: true, message: '请输入任务名称'}]">
              <el-input v-model="formData.name" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="任务类型" prop="type" :rules="[{ required: true, message: '请选择任务类型'}]">
              <el-select v-model="formData.type" placeholder="请选择">
                <el-option v-for="item in types" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="所属企业" prop="company_id" :rules="[{ required: true, message: '请选择所属企业'}]">
              <el-input v-model="formData.company_name" type="text" placeholder="请选择所属企业" readonly :clearable="true"><el-button slot="append" @click="companySelVisible=true">选择</el-button></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="任务地区" prop="city" :rules="[{ required: true, message: '请选择任务地区'}]">
              <v-distpicker :province="formData.province" :city="formData.city" hide-area @selected="selectedPca" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="公开报名" prop="open">
              <el-switch v-model="formData.open" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>

          <el-col v-if="formData.open==1" :xs="24" :sm="12" :lg="12">
            <el-form-item label="报名开始时间" prop="open_started_date" :rules="[{ required: true, message: '请选择报名开始时间'}]">
              <el-date-picker v-model="formData.open_started_date" type="date" value-format="yyyy-MM-dd" placeholder="选择开始时间" />
            </el-form-item>
          </el-col>

          <el-col v-if="formData.open==1" :xs="24" :sm="12" :lg="12">
            <el-form-item label="报名结束时间" prop="open_ended_date" :rules="[{ required: true, message: '请选择结束时间'}]">
              <el-date-picker v-model="formData.open_ended_date" type="date" value-format="yyyy-MM-dd" placeholder="选择结束时间" />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="单人预算" prop="budget" :rules="[{validator: checkMoney, trigger: 'blur'}]">
              <el-input v-model="formData.budget" style="width:200px;"><template slot="append">元</template></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="开始日期" prop="started_date" :rules="[{ required: true, message: '请选择开始日期'}]">
              <el-date-picker v-model="formData.started_date" type="date" value-format="yyyy-MM-dd" placeholder="选择开始日期" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="封面图片">
              <tyt-upload :length="1" :file-list="formData.coverArr" path-name="task" :thumbsize="[300]" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="结束日期" prop="ended_date" :rules="[{ required: true, message: '请选择结束日期'}]">
              <el-date-picker v-model="formData.ended_date" type="date" value-format="yyyy-MM-dd" placeholder="选择结束日期" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="任务描述" prop="content">
              <el-input v-model="formData.content" type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入任务描述" />
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
</template>

<script>
import { lists, store, updates, del } from '@/api/task'
import { multipleAttributes } from '@/api/base'
import { Loading } from 'element-ui'
import Pagination from '@/components/Pagination'
import TytUpload from '@/components/Tytrock/components/UploadImg'
import CompanySelect from '@/views/company/components/CompanySelect'
import TaskStatus from './TaskStatus'
import VDistpicker from 'v-distpicker'
export default {
	components: { Pagination, TytUpload, CompanySelect, VDistpicker, TaskStatus },
	props: {
		operator: {
			type: Number,
			default: 0
		},
		companyId: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			selectLists: [],
		    listQuery: this.queryDefault(this),
			listsData: this.listsDefault(this),
			types: [],
			statuses: [],
			formVisible: false,
			formTitle: '',
			formData: {
				name: '',
		    	type: '',
		    	company_id: '',
		    	coverArr: [],
		    	open: 0,
		    	province: '',
		    	city: '',
		    	started_date: this.getNowDate(),
		    	ended_date: '',
		    	open_started_date: '',
		    	open_ended_date: '',
		    	budget: 0,
		    	content: '',
		    	status: 1
			},
			companySelVisible: false,

			uploadUrl: process.env.VUE_APP_BASE_API + '/task/upload-task',
			uploadData: {
				token: this.$store.getters.token
			}
		}
	},
	mounted() {
		multipleAttributes({ types: '1,2' }).then((res) => {
			this.types = res.data.data[1]
			this.statuses = res.data.data[2]
		})
		this.getListsData()
	},
	methods: {
		getListsData() {
			if (this.company_id) this.listQuery.company_id = this.company_id
			lists(this.listQuery).then(res => {
				this.listsData = res.data.lists
			})
		},
		handelDownload() {
	    	window.open(process.env.VUE_APP_BASE_URL + 'upload/file/任务上传模板.xlsx')
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
	    	} else {
	    		this.msgError(res.msg, this)
	    	}
	    },
		changeStatus(row) {
			store({ id: row.id, status: row.status }).then(res => {
				// this.listsData = res.data.lists;
			})
			// console.log(row);
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
				this.formData.id = command.row.id
				this.formData.name = command.row.name
				this.formData.company_id = command.row.company_id
				this.formData.company_name = command.row.companyName
		    	this.formData.type = command.row.type
		    	this.formData.coverArr = command.row.coverUrlArr
		    	this.formData.open = command.row.open
		    	this.formData.province = command.row.province
		    	this.formData.city = command.row.city
		    	this.formData.started_date = command.row.started_date
		    	this.formData.ended_date = command.row.ended_date
		    	this.formData.open_started_date = command.row.open_started_date
		    	this.formData.open_ended_date = command.row.open_ended_date
		    	this.formData.budget = command.row.budget
		    	this.formData.content = command.row.content
				this.formVisible = true
			} else if (command.command == 'delete') {
				this.tytConfirm({ msg: '确认要删除该任务吗？' }, this).then(obj => {
	    			del({ id: command.row.id }).then(res => {
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
			this.$confirm('确认要删除所选任务吗？').then(res => {
	            del({ id: this.selectLists2IdStr(this.selectLists) }).then(res => {
					this.$message.success(res.msg)
					this.getListsData()
				})
	        }).catch(res => {})
		},
		handleSelectCommand(command) {
			if (command == 'del') {
				this.$confirm('确认要删除所选任务吗？').then(res => {
		            del({ id: this.selectLists2IdStr(this.selectLists) }).then(res => {
						this.$message.success(res.msg)
						this.getListsData()
					})
		        }).catch(res => {})
			} else {
        		this.$confirm('确认要批量变更所选状态吗？').then(res => {
		            updates({ id: this.selectLists2IdStr(this.selectLists), status: command }).then(res => {
						this.$message.success(res.msg)
						this.getListsData()
					})
		        }).catch(res => {})
		    }
	    },
		searchForm() {
			if (this.listQuery.class_id) this.listQuery.class_id = this.listQuery.class_id.pop()
			this.getListsData()
		},
		sortAction(e) {
			this.listQuery.order_filed = e.prop
			this.listQuery.order_by = e.order == 'ascending' ? 'ASC' : 'DESC'
			// console.log(this.listQuery)
			this.getListsData()
		},

		handelCreate() {
			this.formTitle = '创建'
			this.$nextTick(() => {
                this.$refs['formData'].resetFields()
            })
			this.formVisible = true
		},
		selectedPca(data) {
			this.formData.province = data.province.value
			this.formData.city = data.city.value
			// this.formData.pca_code = data.province.code + ',' + data.city.code;
		},
		submitForm(formName) {
	    	this.$refs[formName].validate((valid) => {
				if (valid) {
					const coverObj = this.formData.coverArr
					if (coverObj.length) {
						const coverArr = []
						coverObj.forEach(v => {
						    coverArr.push(v.response)
						})
						this.formData.cover = coverArr.join(',')
					} else this.formData.cover = ''

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
	    companySelected(data) {
			if (data.length) {
	    		this.formData.company_id = data[0].id
	    		this.formData.company_name = data[0].name
	    	} else {
	    		this.formData.company_id = ''
	    		this.formData.company_name = ''
	    	}
	    	this.companySelVisible = false
		}
	}
}
</script>
