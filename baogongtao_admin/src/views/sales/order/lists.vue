<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="dx-container">
          <tyt-page-header content="销售单列表" />
          <div class="dx-main">
            <div class="ptools pb0 clearfix">
              <div class="search-box f-left">
                <el-form :inline="true" :model="listQuery">
                  <el-form-item>
                    <el-input v-model="listQuery.name" placeholder="销售单名称/编号" />
                  </el-form-item>
                  <el-form-item>
                    <el-select v-model="listQuery.customer_id" clearable placeholder="客户">
                      <el-option v-for="item in customers" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
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
                <router-link to="/sales/order/create"><el-button type="primary"><i class="el-icon-plus" /> 新增销售单</el-button></router-link>
              </div>
            </div>
            <div class="list-box">

              <el-table v-loading="listsData.listLoading" :data="listsData.data" border style="width: 100%" @sort-change="sortAction" @selection-change="selsChange">
                <el-table-column type="expand" style="padding:0;">
                  <template slot-scope="props">
                    <el-table :data="props.row.get_items" size="mini" style="width: 100%" class="expand-tb" cell-class-name="expand-cell" header-cell-class-name="expand-cell">
                      <el-table-column label="产品名称">
                        <template slot-scope="scope">
                          {{ scope.row.get_item.name }}
                        </template>
                      </el-table-column>
                      <el-table-column label="型号" width="120">
                        <template slot-scope="scope">
                          {{ scope.row.get_item.model }}
                        </template>
                      </el-table-column>
                      <el-table-column prop="price_sale" label="销售单价" width="100" />
                      <el-table-column prop="price_sale_actual" label="实际售价" width="100" />
                      <el-table-column prop="num" label="数量" width="100" />
                      <el-table-column prop="num_completed" label="已出货" width="100" />
                      <el-table-column label="未出货" width="100">
                        <template slot-scope="scope">
                          {{ scope.row.num - scope.row.num_completed }}
                        </template>
                      </el-table-column>
                      <el-table-column prop="amount" label="小计" width="120" />
                      <el-table-column prop="remark" label="备注" width="100" />
                    </el-table>
                  </template>
                </el-table-column>
                <template slot="empty">
                  <div class="empty-div">
                    <div><svg-icon icon-class="dx-empty" /></div>
                    <p>暂无</p>
                  </div>
                </template>
                <el-table-column type="selection" align="center" width="55" :selectable="selectAble" />
                <el-table-column prop="name" label="销售单名称" min-width="150">
                  <template slot-scope="scope">
                    <p class="mt0 mb0"><router-link :to="'/sales/order/show?id='+scope.row.id" class="fc-blue"><div class="list-txt">{{ scope.row.name }}</div></router-link></p>
                    <p class="mt0 mb0 fc-9">{{ scope.row.no }}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="customerName" label="客户" align="center" />
                <el-table-column prop="amount" label="金额" align="right" width="100" />
                <el-table-column prop="amount_completed" label="已收" align="right" width="100" />
                <el-table-column prop="amount_uncomplete" label="未收" align="right" width="100" />
                <el-table-column prop="num" label="总量" align="center" width="80" />
                <el-table-column prop="numCompleted" label="已出货" align="center" width="80" />
                <el-table-column label="未出货" align="center" width="80">
                  <template slot-scope="scope">
                    {{ scope.row.num - scope.row.numCompleted }}
                  </template>
                </el-table-column>
                <el-table-column prop="action_date" label="开单日期" align="center" sortable width="110" />
                <el-table-column prop="delivery_date" label="交货日期" align="center" sortable width="110" />
                <el-table-column prop="saler" label="销售员" align="center" width="100" />
                <el-table-column label="状态" align="center" width="80">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.status===0" type="info">{{ scope.row.statusName }}</el-tag>
                    <el-tag v-if="scope.row.status===1" type="warning">{{ scope.row.statusName }}</el-tag>
                    <el-tag v-if="scope.row.status===2" type="danger">{{ scope.row.statusName }}</el-tag>
                    <el-tag v-if="scope.row.status===3">{{ scope.row.statusName }}</el-tag>
                    <el-tag v-if="scope.row.status===8" type="success">{{ scope.row.statusName }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" align="center" width="150" />
                <el-table-column label="操作" align="center" width="60" fixed="right">
                  <template slot-scope="scope">
                    <el-dropdown @command="handleCommand">
                      <el-button icon="el-icon-more" circle size="mini" />
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item><router-link :to="'/sales/order/show?id='+scope.row.id" class="fc-blue"><i class="el-icon-s-order" /> 详情</router-link></el-dropdown-item>
                        <el-dropdown-item v-if="scope.row.status<3"><router-link :to="'/sales/order/create?id='+scope.row.id" class="fc-blue"><i class="el-icon-edit" /> 编辑</router-link></el-dropdown-item>
                        <el-dropdown-item v-if="scope.row.status<3" divided class="fc-danger" :command="getCommandData(scope.$index, scope.row,'delete')"><i class="el-icon-delete" /> 删除</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </el-table-column>
              </el-table>

              <div class="list-bottom clearfix">
                <div class="f-left"><el-button type="danger" :disabled="this.selectLists.length===0" @click="selectDelete"><i class="el-icon-delete-solid" /> 批量删除</el-button></div>
                <div class="f-right">
                  <pagination v-show="listsData.total>0" :total="listsData.total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListsData" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { lists, del } from '@/api/sales/order'
import { lists as customerLists } from '@/api/sales/customer'
import Pagination from '@/components/Pagination'
export default {
	components: { Pagination },
	data() {
		return {
			listsData: this.listsDefault(this),
		    listQuery: this.queryDefault(this),
		    selectLists: [],
		    customers: [],
		    statusArr: [{ name: '草稿', value: 0 }, { name: '待审核', value: 1 }, { name: '审核不通过', value: 2 }, { name: '进行中', value: 3 }, { name: '已完成', value: 8 }]
		}
	},
	mounted() {
		customerLists({}).then(res => {
			this.customers = res.data.lists
		})
		this.getListsData()
	},
	methods: {
		getListsData() {
			this.$set(this.listsData, 'listLoading', true)
			lists(this.listQuery).then(res => {
				this.listsData = res.data.lists
			})
		},
		handleEdit(index, row) {

		},
		handleDelete(index, row) {
			this.$confirm('确认要删除该销售单吗？').then(res => {
	            del({ id: row.id }).then(res => {
					this.$message.success(res.msg)
					this.listsData.data.splice(index, 1)
				})
	        }).catch(res => {})
		},
		selectAble(row, index) {
			if (row.status >= 3) return false
			else return true
		},
		selsChange: function(sels) {
			// console.log(sels)
			this.selectLists = sels
		},
		selectDelete() {
			this.$confirm('确认要删除所选销售单吗？').then(res => {
	            del({ id: this.selectLists2IdStr(this.selectLists) }).then(res => {
					this.$message.success(res.msg)
					this.getListsData()
				})
	        }).catch(res => {})
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
				this.tytConfirm({ msg: '确认要删除该销售单单吗？' }, this).then(obj => {
	    			del({ id: command.row.id }).then(res => {
	    				obj.instance.confirmButtonLoading = false
						this.$message.success(res.msg)
						this.listsData.data.splice(command.index, 1)
						obj.done()
					})
		    	}).catch(obj => { obj.instance.confirmButtonLoading = false })
			}
		},
		searchForm() {
			this.listsData.loading = true
			this.getListsData()
		},
		sortAction(e) {
			this.listQuery.order_filed = e.prop
			this.listQuery.order_by = e.order == 'ascending' ? 'ASC' : 'DESC'
			// console.log(this.listQuery)
			this.getListsData()
		}
	}
}
</script>

<style lang="scss">
.el-table__expanded-cell{
	padding: 10px !important;background:#eee;
}
.expand-cell{border-right: none !important;}
</style>
