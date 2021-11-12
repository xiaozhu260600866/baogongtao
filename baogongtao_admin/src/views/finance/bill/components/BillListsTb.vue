<template>
  <div class="list-box">
    <div class="dx-info-box mb10">
      <span><b>未{{ billName }}款总额：</b><b class="fs-16 fc-danger">{{ totalAmount }}</b>元</span>
      <el-divider direction="vertical" />
      <span><b>应{{ billName }}总额：</b><b class="fs-16 fc-danger">{{ todayAmount }}</b>元</span>
    </div>

    <el-table v-loading="listsData.listLoading" :data="listsData.data" border style="width: 100%" @sort-change="sortAction" @selection-change="selsChange">
      <template slot="empty">
        <div class="empty-div">
          <div><svg-icon icon-class="dx-empty" /></div>
          <p>暂无</p>
        </div>
      </template>
      <el-table-column type="selection" align="center" width="55" :selectable="selectAble" />
      <el-table-column label="客户名称" min-width="180">
        <template slot-scope="scope">
          <el-link type="primary" @click="showDetail(scope.row)">{{ scope.row.customerName }}</el-link>
        </template>
      </el-table-column>
      <el-table-column :label="'应' + billName + '金额'" align="center" width="120">
        <template slot-scope="scope">
          {{ amountFormat(scope.row.amount) }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="amount_completed" :label="'已' + billName + '金额'" align="center" width="120" />
      <el-table-column :label="'未' + billName + '金额'" align="center" width="120">
        <template slot-scope="scope">
          {{ amountFormat(scope.row.amount - scope.row.amount_completed) }}
        </template>
      </el-table-column>
      <el-table-column prop="ought_date" :label="'应' + billName + '日期'" align="center" width="120" :sortable="'custom'" />
      <el-table-column prop="completed_date" :label="(category==2?'付款':'到帐') + '日期'" align="center" width="100" />
      <el-table-column label="状态" align="center" width="90">
        <template slot-scope="scope">
          <bill-status :data="scope.row" />
        </template>
      </el-table-column>
      <el-table-column prop="saler" label="销售人员" align="center" width="80" />
      <el-table-column prop="sourceTypeName" label="来源" align="center" width="120" />
      <el-table-column prop="createdDate" label="添加日期" align="center" width="100" />
      <el-table-column prop="remark" label="备注" align="center" width="100" />
      <el-table-column label="操作" align="center" width="60" fixed="right">
        <template slot-scope="scope">
          <el-dropdown @command="handleCommand">
            <el-button icon="el-icon-more" circle size="mini" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="getCommandData(scope.$index, scope.row,'show')"><i class="el-icon-s-order" /> 详情</el-dropdown-item>
              <!-- <el-dropdown-item v-if="scope.row.status<3"><router-link :to="'/sales/order/create?id='+scope.row.id" class="fc-blue"><i class="el-icon-edit"></i> 编辑</router-link></el-dropdown-item> -->
              <el-dropdown-item v-if="scope.row.status==0" divided class="fc-danger" :command="getCommandData(scope.$index, scope.row,'delete')"><i class="el-icon-delete" /> 删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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

    <bill-detail :id="detailId" :visible="detailVisible" @close="billDetailClose" />

  </div>
</template>

<script>
import { datas, lists, del } from '@/api/finance/bill'
import Pagination from '@/components/Pagination'
import BillStatus from '@/views/finance/bill/components/BillStatus'
import BillDetail from '@/views/finance/bill/components/BillDetail'
export default {
	name: 'PurchaseListsTb',
	components: { BillStatus, BillDetail, Pagination },
	props: {
		category: {
			type: Number,
			default: 0
		},
		query: {
			type: Object,
			default: []
		},
		reflash: {
			type: Number,
			default: 0
		},
		auto: {
			type: Boolean,
			default: false
		}

	},
	data() {
		return {
			billName: this.category == 2 ? '付' : '收',
			listsData: this.listsDefault(this),
			listQuery: this.query,
			totalAmount: '',
			todayAmount: '',
		    detailVisible: false,
		    detailId: 0,
		    selectLists: []
		}
	},
	watch: {
		reflash(val) {
			this.getListsData()
		}
	},
	mounted() {
		if (this.auto) this.getListsData()
	},
	methods: {
		getListsData() {
			this.$set(this.listsData, 'listLoading', true)
			this.listQuery.category = this.category
			datas({ data: 'receivable_total_amount,receivable_today_amount' }).then(res => {
				this.totalAmount = this.amountFormat(res.data.receivable_total_amount)
				this.todayAmount = this.amountFormat(res.data.receivable_today_amount)
			})
			lists(this.listQuery).then(res => {
				this.listsData = res.data.lists
			})
		},
		selectAble(row, index) {
			if (row.status > 0) return false
			else return true
		},
		showDetail(row) {
			this.detailId = row.id
			this.detailVisible = true
		},
		billDetailClose(updated) {
			console.log(updated)
			this.detailVisible = false
			if (updated) this.getListsData()
		},
		sortAction(e) {
			this.listQuery.order_filed = e.prop
			this.listQuery.order_by = e.order == 'ascending' ? 'ASC' : 'DESC'
			// console.log(this.listQuery)
			this.getListsData()
		},
		selsChange: function(sels) {
			// console.log(sels)
			this.selectLists = sels
		},
		selectDelete() {
			this.$confirm('确认要删除所选的应' + this.billName + '账单吗？').then(res => {
	            del({ id: this.selectLists2IdStr(this.selectLists) }).then(res => {
					this.$message.success(res.msg)
					this.getListsData()
				})
	        }).catch(res => {})
		},
		handleEdit(index, row) {

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
				this.showDetail(command.row)
			} else if (command.command == 'delete') {
				// this.$emit('delAction', command);
				this.tytConfirm({ msg: '确认要删除该应' + this.billName + '账单吗？' }, this).then(obj => {
	    			del({ id: command.row.id }).then(res => {
	    				obj.instance.confirmButtonLoading = false
						this.$message.success(res.msg)
						// this.listsData.data.splice(command.index, 1);
						this.getListsData()
						obj.done()
					}).catch(() => { obj.done() })
		    	})
			}
		}
	}
}
</script>
