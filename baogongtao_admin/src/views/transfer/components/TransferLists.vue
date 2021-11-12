<template>
  <div class="dx-main">
    <div class="ptools pb0 clearfix">
      <div class="search-box f-left">
        <el-form :inline="true" :model="listQuery">
          <!-- <el-form-item>
						<el-input placeholder="任务名称" v-model="listQuery.name"></el-input>
					</el-form-item> -->
          <el-form-item>
            <el-select v-model="listQuery.status" multiple placeholder="所有状态">
              <el-option v-for="item in statusArr" :key="item.value" :label="item.name" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker v-model="listQuery.date" type="date" placeholder="转账日期" value-format="yyyy-MM-dd" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchForm('form')"><i class="el-icon-search" /> 搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="f-right">
        <el-button v-if="operator>0" type="primary" @click="handelCreate"><i class="el-icon-plus" /> 新增转账记录</el-button>
      </div>
    </div>

    <div class="list-box">
      <div class="dx-info-box mb10">
        <span><b>累计总额：</b><b class="fs-16 fc-danger">{{ statisticsData.data[2]?statisticsData.data[2]:0 }}</b>元</span>
        <el-divider direction="vertical" />
        <span><b>本月合计：</b><b class="fs-16 fc-danger">{{ statisticsData.months[2]?statisticsData.months[2]:0 }}</b>元</span>
        <el-divider direction="vertical" />
        <span><b>本年合计：</b><b class="fs-16 fc-danger">{{ statisticsData.years[2]?statisticsData.years[2]:0 }}</b>元</span>
      </div>

      <el-table v-loading="listsData.listLoading" :data="listsData.data" border style="width: 100%" @sort-change="sortAction" @selection-change="selsChange">
        <template slot="empty">
          <div class="empty-div">
            <div><svg-icon icon-class="dx-empty" /></div>
            <p>暂无</p>
          </div>
        </template>
        <el-table-column type="selection" align="center" width="55" />
        <el-table-column prop="companyName" label="转账企业" />
        <el-table-column prop="amount" label="转账金额" align="center" width="150" />
        <el-table-column prop="pay_date" label="转账日期" align="center" width="120" />
        <el-table-column prop="complete_date" label="完成日期" align="center" width="120" />
        <el-table-column label="状态" align="center" width="80">
          <template slot-scope="scope">
            <transaction-status :data="scope.row" />
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" width="100" />
        <el-table-column label="操作" align="center" width="80" fixed="right">
          <template slot-scope="scope">
            <el-dropdown @command="handleCommand">
              <el-button icon="el-icon-more" circle size="mini" />
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="getCommandData(scope.$index, scope.row,'show')"><i class="el-icon-s-order" /> 详情</el-dropdown-item>
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
              <el-dropdown-item v-if="operator>1" :command="1" :disabled="this.selectLists.length===0">设为待支付</el-dropdown-item>
              <el-dropdown-item v-if="operator>1" :command="2" :disabled="this.selectLists.length===0">设为已付款</el-dropdown-item>
              <el-dropdown-item v-if="operator>1" :command="3" :disabled="this.selectLists.length===0">设为已完成</el-dropdown-item>
              <el-dropdown-item v-if="operator>2" divided command="del" :disabled="this.selectLists.length===0" class="fc-danger">批量删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <el-button type="danger" @click="selectDelete" :disabled="this.selectLists.length===0"><i class="el-icon-delete-solid"></i> 批量删除</el-button> -->
        </div>
        <div class="f-right">
          <pagination v-show="listsData.total>0" :total="listsData.total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListsData" />
        </div>
      </div>

    </div>

    <el-dialog :visible.sync="formVisible" :title="formTitle + '转账记录'" width="1000px" top="5vh">
      <el-form ref="formData" :model="formData" label-width="120px">
        <el-row>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="所属企业" prop="user_id" :rules="[{ required: true, message: '请选择所属企业'}]">
              <el-input v-model="formData.company_name" type="text" placeholder="请选择所属企业" readonly :clearable="true"><el-button slot="append" @click="companySelVisible=true">选择</el-button></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="转账金额" prop="amount" :rules="[{validator: checkMoney, trigger: 'blur'}]">
              <el-input v-model="formData.amount" style="width:200px;"><template slot="append">元</template></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="状态" prop="status" :rules="[{ required: true, message: '请选择状态'}]">
              <el-select v-model="formData.status" placeholder="请选择">
                <el-option v-for="item in statusArr" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="formData.status>1" :xs="24" :sm="12" :lg="12">
            <el-form-item label="转账日期" prop="pay_date" :rules="[{ required: true, message: '请选择转账日期'}]">
              <el-date-picker v-model="formData.pay_date" type="date" value-format="yyyy-MM-dd" placeholder="选择转账日期" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="转账图片">
              <tyt-upload :length="1" :file-list="formData.picArr" path-name="transaction" :thumbsize="[300]" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="转账备注" prop="remark">
              <el-input v-model="formData.remark" type="textarea" :autosize="{ minRows: 4, maxRows: 8}" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('formData')">提 交</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="showVisible" title="转账记录详情" width="1000px" top="5vh">
      <el-form ref="form" label-width="120px">
        <el-row>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="企业名称：">{{ detailData.companyName }}</el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="转账金额：">{{ detailData.amount }} 元</el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="状态："><transaction-status :data="detailData" /></el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="转账日期：">{{ detailData.pay_date }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注：">{{ detailData.remark }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="转账图片：">
              <el-image style="max-width: 100%;" :src="detailData.picUrl" lazy />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showVisible = false">关闭</el-button>
      </div>
    </el-dialog>

    <company-select :visible="companySelVisible" :length="1" @close="companySelVisible=false" @select="companySelected" />
  </div>
</template>

<script>
import { lists, store, updates, del, statistics } from '@/api/transaction'
import Pagination from '@/components/Pagination'
import TytUpload from '@/components/Tytrock/components/UploadImg'
import CompanySelect from '@/views/company/components/CompanySelect'
import TransactionStatus from './TransactionStatus'
export default {
	components: { Pagination, TytUpload, CompanySelect, TransactionStatus },
	props: {
		operator: {
			type: Number,
			default: 0
		},
		companyId: {
			type: Number,
			default: 0
		},
		userId: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			selectLists: [],
		    listQuery: this.queryDefault(this),
			listsData: this.listsDefault(this),
			statisticsData: {},
			types: [],
			statuses: [],
			formVisible: false,
			formTitle: '',
			formData: {
		    	type: 1,
		    	category: 1,
		    	user_id: '',
		    	picArr: [],
		    	amount: '',
		    	pay_date: this.getNowDate(),
		    	remark: '',
		    	status: 1
			},
			statusArr: [
				{ name: '待支付', value: 1 },
				{ name: '已付款', value: 2 },
				{ name: '已完成', value: 3 }
			],
			companySelVisible: false,
			detailData: {},
			showVisible: false
		}
	},
	mounted() {
		this.listQuery.type = 1
		this.getListsData()
		this.getStatistics()
	},
	methods: {
		getListsData() {
			if (this.company_id) this.listQuery.company_id = this.company_id
			if (this.user_id) this.listQuery.user_id = this.user_id
			lists(this.listQuery).then(res => {
				this.listsData = res.data.lists
			})
		},
		getStatistics() {
			statistics(this.listQuery).then(res => {
				this.statisticsData = res.data
			})
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
			if (command.command == 'show') {
				this.detailData = command.row
				this.showVisible = true
			} else if (command.command == 'edit') {
				this.formTitle = '修改'
				this.formData.id = command.row.id
				this.formData.user_id = command.row.user_id
				this.formData.company_name = command.row.companyName
		    	this.formData.amount = command.row.amount
		    	this.formData.picArr = command.row.picUrlArr
		    	this.formData.status = command.row.status
		    	this.formData.pay_date = command.row.pay_date
		    	this.formData.remark = command.row.remark
				this.formVisible = true
			} else if (command.command == 'delete') {
				this.tytConfirm({ msg: '确认要删除该转账记录吗？' }, this).then(obj => {
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
		handleSelectCommand(command) {
	        if (command == 'del') {
	        	this.$confirm('确认要删除所选转账记录吗？').then(res => {
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
		/*
		selectDelete(){
			this.$confirm('确认要删除所选企业吗？').then(res => {
	            del({id:this.selectLists2IdStr(this.selectLists)}).then(res => {
					this.$message.success(res.msg);
					this.getListsData();
				})
	        }).catch(res => {});
		},
		*/
		searchForm() {
			this.getListsData()
			this.getStatistics()
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
		submitForm(formName) {
	    	this.$refs[formName].validate((valid) => {
				if (valid) {
					const picObj = this.formData.picArr
					if (picObj.length) {
						const picArr = []
						picObj.forEach(v => {
						    picArr.push(v.response)
						})
						this.formData.pic_str = picArr.join(',')
					} else this.formData.pic_str = ''

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
	    		this.formData.user_id = data[0].user_id
	    		this.formData.company_name = data[0].name
	    	} else {
	    		this.formData.user_id = ''
	    		this.formData.company_name = ''
	    	}
	    	this.companySelVisible = false
		}
	}
}
</script>
