<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="dx-container">
          <tyt-page-header content="转账凭证" />
          <div class="dx-main">
            <div class="ptools pb0 clearfix">
              <div class="search-box f-left">
                <el-form :inline="true" :model="listQuery">
                  <el-form-item>
                    <el-input v-model="listQuery.name" placeholder="企业名称" />
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
                <el-table-column type="selection" align="center" width="55" :selectable="selectAble" />
                <el-table-column prop="name" label="企业名称" min-width="150">
                  <template slot-scope="scope">
                    {{ scope.row.get_company.name }}
                  </template>
                </el-table-column>
                <el-table-column label="转账图片" width="100" align="center">
                  <template slot-scope="scope">
                    <el-image style="width: 30px; height: 30px" :src="scope.row.fileUrl" :preview-src-list="[scope.row.fileUrl]" />
                  </template>
                </el-table-column>
                <el-table-column prop="amount" label="金额" align="center" width="100" />
                <el-table-column prop="created_at" label="创建日期" align="center" width="180" />
                <el-table-column prop="amount_completed" label="备注" />
                <!-- <el-table-column label="操作" align="center" width="60" fixed="right">
									<template slot-scope="scope">
										<el-dropdown @command="handleCommand">
											<el-button icon="el-icon-more" circle size="mini"></el-button>
											<el-dropdown-menu slot="dropdown">
												<el-dropdown-item><router-link :to="'/sales/order/show?id='+scope.row.id" class="fc-blue"><i class="el-icon-s-order"></i> 详情</router-link></el-dropdown-item>
												<el-dropdown-item v-if="scope.row.status<3"><router-link :to="'/sales/order/create?id='+scope.row.id" class="fc-blue"><i class="el-icon-edit"></i> 编辑</router-link></el-dropdown-item>
											    <el-dropdown-item v-if="scope.row.status<3" divided class="fc-danger" :command="getCommandData(scope.$index, scope.row,'delete')"><i class="el-icon-delete"></i> 删除</el-dropdown-item>
											</el-dropdown-menu>
										</el-dropdown>
									</template>
								</el-table-column> -->
              </el-table>

              <div class="list-bottom clearfix">
                <div class="f-left">
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
  </div>
</template>

<script>
import { transfers } from '@/api/company'
import { lists as customerLists } from '@/api/sales/customer'
import Pagination from '@/components/Pagination'
export default {
	components: { Pagination },
	data() {
		return {
			listsData: this.listsDefault(this),
		    listQuery: this.queryDefault(this),
		    selectLists: []
		}
	},
	mounted() {
		this.getListsData()
	},
	methods: {
		getListsData() {
			this.$set(this.listsData, 'listLoading', true)
			transfers(this.listQuery).then(res => {
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
