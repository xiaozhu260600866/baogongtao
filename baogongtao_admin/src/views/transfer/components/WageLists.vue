<template>
  <div class="dx-main">
    <div class="ptools pb0 clearfix">
      <div class="search-box f-left">
        <el-form :inline="true" :model="listQuery">
          <!-- <el-form-item>
						<el-input v-model="listQuery.company_name" type="text" placeholder="所有企业" readonly :clearable="true"><el-button slot="append" @click="companySelVisible=true">选择</el-button></el-input>
					</el-form-item> -->
          <el-form-item>
            <el-input v-model="listQuery.name" placeholder="姓名" />
          </el-form-item>
          <el-form-item>
            <el-select v-model="listQuery.status" multiple placeholder="所有状态">
              <el-option v-for="item in statusArr" :key="item.value" :label="item.name" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item style="width:120px;">
            <el-select v-model="listQuery.timer" placeholder="时间范围">
              <el-option v-for="item in timers" :key="item.value" :label="item.name" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchForm('form')"><i class="el-icon-search" /> 搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="f-right">
        <el-button type="success" @click="handelDownload"><i class="el-icon-download" /> 下载模板</el-button>
        <el-upload style="display: inline-block;" class="upload-demo" :action="uploadUrl" :data="uploadData" accept=".xlsx" :multiple="false" :show-file-list="false" :before-upload="beforeUpload" :on-success="successUpload">
          <el-button type="primary"><i class="el-icon-upload" /> 上传批量发放</el-button>
        </el-upload>
      </div>
    </div>

    <div class="list-box">
      <div class="dx-info-box mb10">
        <span><b>已发放总额：</b><b class="fs-16 fc-danger">{{ statisticsData.data[2]?statisticsData.data[2]:0 }}</b>元</span>
        <el-divider direction="vertical" />
        <span><b>待发放总额：</b><b class="fs-16 fc-danger">{{ statisticsData.data[1]?statisticsData.data[1]:0 }}</b>元</span>
        <el-divider direction="vertical" />
        <span><b>本月已发总额：</b><b class="fs-16 fc-danger">{{ statisticsData.months[2]?statisticsData.months[2]:0 }}</b>元</span>
        <el-divider direction="vertical" />
        <span><b>本年已发总额：</b><b class="fs-16 fc-danger">{{ statisticsData.years[2]?statisticsData.years[2]:0 }}</b>元</span>
      </div>

      <el-table v-loading="listsData.listLoading" :data="listsData.data" border style="width: 100%" @sort-change="sortAction" @selection-change="selsChange">
        <template slot="empty">
          <div class="empty-div">
            <div><svg-icon icon-class="dx-empty" /></div>
            <p>暂无</p>
          </div>
        </template>
        <el-table-column type="selection" align="center" width="55" :selectable="selectAble" />
        <el-table-column label="姓名" align="center" width="80">
          <template slot-scope="scope">
            {{ scope.row.userObj.name }}
          </template>
        </el-table-column>
        <el-table-column label="电话号码" align="center" width="150">
          <template slot-scope="scope">
            {{ scope.row.userObj.phone }}
          </template>
        </el-table-column>
        <el-table-column prop="amount" :label="type==2?'个人所得':'工资'" align="center" width="120" />
        <el-table-column prop="bank_cardno" label="银行卡号" align="center" />
        <el-table-column prop="bank_name" label="开户行" align="center" />
        <el-table-column label="状态" align="center" width="120">
          <template slot-scope="scope">
            <transaction-status :data="scope.row" />
            <p v-if="scope.row.status==1 && scope.row.caixin_status!=1" class="fc-danger">{{ scope.row.caixin_message }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" />
        <el-table-column prop="created_at" label="添加时间" align="center" width="180" />
        <el-table-column label="操作" align="center" width="80" fixed="right">
          <template slot-scope="scope">
            <el-dropdown @command="handleCommand">
              <el-button icon="el-icon-more" circle size="mini" />
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="fc-danger" :command="getCommandData(scope.$index, scope.row,'delete')"><i class="el-icon-delete" /> 删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="list-bottom clearfix">
        <div class="f-left">
          <el-dropdown @command="handleSelectCommand">
            <el-button type="primary">
              批量操作<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item :command="1" :disabled="this.selectLists.length===0">设为待发放</el-dropdown-item> -->
              <el-dropdown-item :command="2" :disabled="this.selectLists.length===0">发放</el-dropdown-item>
              <el-dropdown-item divided command="del" :disabled="this.selectLists.length===0" class="fc-danger">批量删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <el-button type="danger" @click="selectDelete" :disabled="this.selectLists.length===0"><i class="el-icon-delete-solid"></i> 批量删除</el-button> -->
        </div>
        <div class="f-right">
          <pagination v-show="listsData.total>0" :total="listsData.total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListsData" />
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { lists, statistics, store, updates, del } from '@/api/transaction'
import { Loading } from 'element-ui'
import Pagination from '@/components/Pagination'
import TransactionStatus from './TransactionStatus'
import CompanySelect from '@/views/company/components/CompanySelect'
export default {
	components: { Pagination, TransactionStatus, CompanySelect },
	props: {
		operator: {
			type: Number,
			default: 0
		},
		type: {
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
			statusArr: [
				{ name: '待发放', value: 1 },
				{ name: '已发放', value: 2 },
				{ name: '已完成', value: 3 }
			],
			timers: [
				{ name: '今日', value: 'today' },
				{ name: '昨日', value: 'yesterday' },
				{ name: '本月', value: 'thismonth' },
				{ name: '本年', value: 'thisyear' },
				{ name: '上年', value: 'prevyear' }
			],
			companySelVisible: false,

			uploadUrl: process.env.VUE_APP_BASE_API + '/transaction/wage-upload',
			uploadData: {
				type: this.type,
				token: this.$store.getters.token
			}
		}
	},
	mounted() {
		this.getListsData()
		this.getStatistics()
	},
	methods: {
		getListsData() {
			this.listQuery.type = this.type
			lists(this.listQuery).then(res => {
				this.listsData = res.data.lists
			})
		},
		selectAble(row, index) {
			if (row.status >= 2) return false
			else return true
		},
		getStatistics() {
			statistics(this.listQuery).then(res => {
				this.statisticsData = res.data
				console.log(this.statisticsData)
			})
		},

	    handelDownload() {
	    	if (this.type == 2) window.open(process.env.VUE_APP_BASE_URL + 'upload/file/自由职业者个人所得发放模板.xlsx')
	    	else if (this.type == 3) window.open(process.env.VUE_APP_BASE_URL + 'upload/file/员工工资发放模板.xlsx')
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
	    getCommandData(index, row, command) {
            return {
                'index': index,
                'row': row,
                'command': command
            }
        },
		handleCommand(command) {
			if (command.command == 'delete') {
				this.tytConfirm({ msg: '确认要删除该记录吗？' }, this).then(obj => {
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
				this.$confirm('确认要删除所选记录吗？').then(res => {
		            del({ id: this.selectLists2IdStr(this.selectLists) }).then(res => {
						this.$message.success(res.msg)
						this.getListsData()
					})
		        }).catch(res => {})
			} else if (command == 2) {
				this.tytConfirm({ msg: '此操作会将所选记录向银行下发代发工资指令，将会产生实际资金转账，请确认是否操作？' }, this).then(obj => {
	    			updates({ id: this.selectLists2IdStr(this.selectLists), status: command }).then(res => {
	    				obj.instance.confirmButtonLoading = false
						this.$message.success(res.msg)
						this.getListsData()
						obj.done()
					}).catch(res => {
						obj.instance.confirmButtonLoading = false
					})
		    	}).catch(obj => { obj.instance.confirmButtonLoading = false })
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
			this.getListsData()
			this.getStatistics()
		},
		sortAction(e) {
			this.listQuery.order_filed = e.prop
			this.listQuery.order_by = e.order == 'ascending' ? 'ASC' : 'DESC'
			// console.log(this.listQuery)
			this.getListsData()
		},
	    companySelected(data) {
			if (data.length) {
	    		this.listQuery.company_id = data[0].id
	    		this.listQuery.company_name = data[0].name
	    	} else {
	    		this.listQuery.company_id = ''
	    		this.listQuery.company_name = ''
	    	}
	    	this.companySelVisible = false
		}
	}
}
</script>
