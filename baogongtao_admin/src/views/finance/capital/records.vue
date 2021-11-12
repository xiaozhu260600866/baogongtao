<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="dx-container">
          <tyt-page-header content="资金流水" />
          <div class="dx-main">
            <div class="ptools pb0 clearfix">
              <!-- <div class="search-box f-left">
								<el-form :inline="true" :model="listQuery">
									<el-form-item>
										<el-input placeholder="产品名称" v-model="listQuery.name"></el-input>
									</el-form-item>
									<el-form-item>
										<el-button type="primary" @click="searchForm('form')"><i class="el-icon-search"></i> 搜索</el-button>
									</el-form-item>
								</el-form>
							</div>
							<div class="f-right">
								<router-link to="/sales/product/create/"><el-button type="primary"><i class="el-icon-plus"></i> 新增产品</el-button></router-link>
							</div> -->
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
                <el-table-column prop="no" label="流水号" align="center" width="150" />
                <el-table-column prop="categoryName" label="类型" align="center" width="100" />
                <el-table-column label="发生金额" align="center" width="150">
                  <template slot-scope="scope">
                    <span v-if="scope.row.category==1" class="fc-success">+{{ scope.row.amount }}</span>
                    <span v-if="scope.row.category==2" class="fc-danger">-{{ scope.row.amount }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="action_date" label="发生日期" align="center" width="150" :sortable="'custom'" />
                <el-table-column prop="sourceTypeName" label="来源" align="center" width="140" />
                <el-table-column prop="accountName" label="收/付款账户" align="center" width="150" />
                <el-table-column prop="remark" label="摘要" align="center" />
                <el-table-column prop="creator" label="操作员" align="center" width="120" />
                <el-table-column prop="created_at" label="操作时间" align="center" width="180" />
              </el-table>

              <div class="list-bottom clearfix">
                <div class="f-left" />
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
import { records } from '@/api/finance/capital'
import Pagination from '@/components/Pagination'
export default {
	components: { Pagination },
	data() {
		return {
			classes: [],
			classesArr: [],
			categories: [],
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
			records(this.listQuery).then(res => {
				this.listsData = res.data.lists
			})
		},
		handleEdit(index, row) {

		},
		handleDelete(index, row) {
			this.$confirm('确认要删除该产品吗？').then(res => {
	            del({ id: row.id }).then(res => {
					this.$message.success(res.msg)
					this.listsData.data.splice(index, 1)
				})
	        }).catch(res => {})
		},
		selsChange: function(sels) {
			// console.log(sels)
			this.selectLists = sels
		},
		selectDelete() {
			this.$confirm('确认要删除所选产品吗？').then(res => {
	            del({ id: this.selectLists2IdStr(this.selectLists) }).then(res => {
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
		}
	}
}
</script>

<style>
</style>
