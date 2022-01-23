<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="dx-container">
          <tyt-page-header content="企业管理" />
          <div class="dx-main">
            <div class="ptools pb0 clearfix">
              <div class="search-box f-left">
                <el-form :inline="true" :model="listQuery">
                  <el-form-item>
                    <el-input v-model="listQuery.keywords" placeholder="企业名称" />
                  </el-form-item>
                  <el-form-item>
                    <el-select
                      v-model="listQuery.validity"
                      clearable
                      placeholder="有效期限"
                      style="width:150px;"
                    >
                      <el-option
                        v-for="item in validityArr"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="searchForm('form')"><i
                      class="el-icon-search"
                    /> 搜索</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="list-box">
              <el-table
                v-loading="listsData.listLoading"
                :data="listsData.data"
                border
                style="width: 100%"
                @sort-change="sortAction"
                @selection-change="selsChange"
              >
                <template slot="empty">
                  <div class="empty-div">
                    <div>
                      <svg-icon icon-class="dx-empty" />
                    </div>
                    <p>暂无</p>
                  </div>
                </template>
                <el-table-column type="selection" align="center" width="55" />
                <el-table-column label="企业名称">
                  <template slot-scope="scope">
                    {{ scope.row.get_company ? scope.row.get_company.name : null }}
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="卡券名称" align="center" width="100" />
                <el-table-column prop="price" label="价格" align="center" width="120" />
                <el-table-column prop="price_full" label="满多少元" align="center" width="120" />

                <el-table-column prop="start_date" label="开始时间" align="center" width="120" />
                <el-table-column prop="end_date" label="结束时间" align="center" width="120" />
                <el-table-column label="商城状态" align="center" width="100">
                  <template slot-scope="scope">
                    <el-switch
                      v-model="scope.row.shop_status"
                      :active-value="1"
                      :inactive-value="0"
                      active-text=""
                      inactive-text=""
                      @change="changeStatus2(scope.row)"
                    />
                  </template>
                </el-table-column>
                <el-table-column prop="remark" label="简介" align="center" width="120" />
                <el-table-column label="操作" align="right" width="100">
                  <template slot-scope="scope">
                    <el-dropdown @command="handleCommand">
                      <el-button icon="el-icon-more" circle size="mini" />
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                          divided
                          class="fc-danger"
                          :command="getCommandData(scope.$index, scope.row,'delete')"
                        ><i
                          class="el-icon-delete"
                        /> 删除</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </el-table-column>
              </el-table>
              <div class="list-bottom clearfix">
                <div class="f-left">
                  <el-button
                    type="danger"
                    :disabled="this.selectLists.length===0"
                    @click="selectDelete"
                  ><i class="el-icon-delete-solid" /> 批量删除</el-button>
                </div>
                <div class="f-right">
                  <pagination
                    v-show="listsData.total>0"
                    :total="listsData.total"
                    :page.sync="listQuery.page"
                    :limit.sync="listQuery.limit"
                    @pagination="getListsData"
                  />
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
	import {
		couponLists,
		couponDel,
		couponStore
	} from '@/api/company'
	import {
		store
	} from '@/api/user'
	import {
		Loading
	} from 'element-ui'
	import Pagination from '@/components/Pagination'
	import CompanyStatus from './components/CompanyStatus'

	export default {
		components: {
			Pagination,
			CompanyStatus
		},
		data() {
			return {
				selectLists: [],
				listQuery: this.queryDefault(this),
				listsData: this.listsDefault(this),
				validityArr: [{
						name: '七天内到期',
						value: 1
					},
					{
						name: '一个月内到期',
						value: 2
					},
					{
						name: '三个月内到期',
						value: 3
					}
				],

				uploadUrl: process.env.VUE_APP_BASE_API + '/company/upload',
				uploadData: {
					token: this.$store.getters.token
				}
			}
		},
		mounted() {
			this.getListsData()
		},
		methods: {
			changeStatus2(row) {
				couponStore({
					id: row.id,
					shop_status: row.shop_status,
					adminUpdate: 1
				}).then(res => {
					// this.listsData = res.data.lists;
				})
				// console.log(row);
			},
			getListsData() {
				couponLists(this.listQuery).then(res => {
					this.listsData = res.data.lists
				})
			},
			changeStatus(row) {
				store({
					id: row.user_id,
					status: row.account_status,
					adminUpdate: 1
				}).then(res => {
					// this.listsData = res.data.lists;
				})
				// console.log(row);
			},
			handelDownload() {
				window.open(process.env.VUE_APP_BASE_URL + 'upload/file/企业上传模板.xlsx')
			},
			beforeUpload() {
				Loading.service({
					text: '上传中...'
				})
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
					this.tytConfirm({
						msg: '确认要删除该企业吗？'
					}, this).then(obj => {
						recruitDel({
							id: command.row.id
						}).then(res => {
							obj.instance.confirmButtonLoading = false
							this.$message.success(res.msg)
							this.listsData.data.splice(command.index, 1)
							obj.done()
						})
					}).catch(obj => {
						obj.instance.confirmButtonLoading = false
					})
				}
			},

			selsChange: function(sels) {
				// console.log(sels)
				this.selectLists = sels
			},
			selectDelete() {
				this.$confirm('确认要删除所选企业吗？').then(res => {
					recruitDel({
						id: this.selectLists2IdStr(this.selectLists)
					}).then(res => {
						this.$message.success(res.msg)
						this.getListsData()
					})
				}).catch(res => {})
			},
			searchForm() {
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
