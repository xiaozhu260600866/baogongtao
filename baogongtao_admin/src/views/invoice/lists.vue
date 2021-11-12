<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="dx-container">
          <tyt-page-header content="发票管理" />
          <div class="dx-main">
            <div class="ptools pb0 clearfix">
              <div class="search-box f-left">
                <el-form :inline="true" :model="listQuery">
                  <el-form-item>
                    <el-input v-model="listQuery.company_name" type="text" placeholder="所有企业" readonly :clearable="true"><el-button slot="append" @click="companySelVisible=true">选择</el-button></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select v-model="listQuery.status" multiple placeholder="所有状态">
                      <el-option v-for="item in statusArr" :key="item.value" :label="item.name" :value="item.value" />
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="searchForm('form')"><i class="el-icon-search" /> 搜索</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div class="f-right" />
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
                <el-table-column prop="companyName" label="企业名称" />
                <el-table-column prop="amount" label="金额" align="center" width="100" />
                <el-table-column prop="created_at" label="创建时间" align="center" width="160" />
                <el-table-column prop="examineDate" label="审核日期" align="center" width="120" />
                <el-table-column prop="completeDate" label="开票日期" align="center" width="120" />
                <el-table-column label="状态" align="center" width="120">
                  <template slot-scope="scope">
                    <invoice-status :data="scope.row" />
                  </template>
                </el-table-column>
                <!-- <el-table-column label="操作" align="center" width="80" fixed="right">
									<template slot-scope="scope">
										<el-dropdown @command="handleCommand">
											<el-button icon="el-icon-more" circle size="mini"></el-button>
											<el-dropdown-menu slot="dropdown">
												<el-dropdown-item :command="getCommandData(scope.$index, scope.row,'show')"><i class="el-icon-s-order"></i> 详情</el-dropdown-item>
												<el-dropdown-item :command="getCommandData(scope.$index, scope.row,'edit')"><i class="el-icon-edit"></i> 编辑</el-dropdown-item>
											    <el-dropdown-item divided class="fc-danger" :command="getCommandData(scope.$index, scope.row,'delete')"><i class="el-icon-delete"></i> 删除</el-dropdown-item>
											</el-dropdown-menu>
										</el-dropdown>
									</template>
								</el-table-column> -->
              </el-table>
              <div class="list-bottom clearfix">
                <div class="f-left">
                  <el-dropdown @command="handleSelectCommand">
                    <el-button type="primary">
                      批量操作<i class="el-icon-arrow-down el-icon--right" />
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-if="in_array(1,$store.getters.power)" :command="2" :disabled="this.selectLists.length===0">提交审核</el-dropdown-item>
                      <el-dropdown-item v-if="in_array(2,$store.getters.power)" :command="3" :disabled="this.selectLists.length===0">审核不通过</el-dropdown-item>
                      <el-dropdown-item v-if="in_array(2,$store.getters.power)" :command="4" :disabled="this.selectLists.length===0">审核通过</el-dropdown-item>
                      <el-dropdown-item v-if="in_array(1,$store.getters.power)" :command="5" :disabled="this.selectLists.length===0">设为已开票</el-dropdown-item>
                      <el-dropdown-item v-if="in_array(1,$store.getters.power)" :command="6" :disabled="this.selectLists.length===0">设为已寄出</el-dropdown-item>
                      <!-- <el-dropdown-item divided command="del" :disabled="this.selectLists.length===0" class="fc-danger">批量删除</el-dropdown-item> -->
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
        </div>
      </el-col>
    </el-row>

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
import { lists, updates } from '@/api/invoice'
import Pagination from '@/components/Pagination'
import InvoiceStatus from './components/InvoiceStatus'
import CompanySelect from '@/views/company/components/CompanySelect'
export default {
	components: { Pagination, InvoiceStatus, CompanySelect },
	data() {
		return {
			selectLists: [],
		    listQuery: this.queryDefault(this),
			listsData: this.listsDefault(this),
			types: [],
			statusArr: [
				{ name: '代开票', value: 1 },
				{ name: '待审核', value: 2 },
				{ name: '审核不通过', value: 3 },
				{ name: '审核通过', value: 4 },
				{ name: '已开票', value: 5 },
				{ name: '已寄出', value: 6 }
			],
			detailData: {},
			showVisible: false,
			companySelVisible: false
		}
	},
	mounted() {
		if (this.$store.getters.power[0] === 2) this.listQuery.status = [2]
		this.getListsData()
	},
	methods: {
		getListsData() {
			lists(this.listQuery).then(res => {
				this.listsData = res.data.lists
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
			if (command.command == 'show') {
				this.detailData = command.row
				this.showVisible = true
			}
		},

		selsChange: function(sels) {
			// console.log(sels)
			this.selectLists = sels
		},
		handleSelectCommand(command) {
        	this.$confirm('确认要批量变更所选状态吗？').then(res => {
	            updates({ id: this.selectLists2IdStr(this.selectLists), status: command }).then(res => {
					this.$message.success(res.msg)
					this.getListsData()
				})
	        }).catch(res => {})
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
	    companySelected(data) {
			if (data.length) {
	    		this.listQuery.user_id = data[0].user_id
	    		this.listQuery.company_name = data[0].name
	    	} else {
	    		this.listQuery.user_id = ''
	    		this.listQuery.company_name = ''
	    	}
	    	this.companySelVisible = false
		}
	}
}
</script>

<style>
</style>
