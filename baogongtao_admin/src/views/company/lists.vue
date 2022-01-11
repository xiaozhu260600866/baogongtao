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
              <div class="f-right">
                <el-button type="success" @click="handelDownload"><i class="el-icon-download" /> 下载模板
                </el-button>
                <el-upload
                  style="display: inline-block;"
                  class="upload-demo"
                  :action="uploadUrl"
                  :data="uploadData"
                  accept=".xlsx"
                  :multiple="false"
                  :show-file-list="false"
                  :before-upload="beforeUpload"
                  :on-success="successUpload"
                >
                  <el-button type="primary"><i class="el-icon-upload" /> 批量上传企业</el-button>
                </el-upload>
                <router-link to="/company/create/">
                  <el-button type="primary"><i class="el-icon-plus" /> 新增企业</el-button>
                </router-link>
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
                    <div class="list-col-img">
                      <el-image
                        class="list-img"
                        :src="scope.row.logoMinUrl"
                        :alt="scope.row.name"
                      />
                      <router-link :to="'/company/show?id='+scope.row.id" class="fc-blue">
                        <div class="list-txt">{{ scope.row.name }}</div>
                      </router-link>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="city" label="所在地" align="center" width="100" />
                <el-table-column prop="charger_name" label="负责人姓名" align="center" width="120" />
                <el-table-column prop="charger_phone" label="负责人电话" align="center" width="120" />
                <el-table-column label="账号状态" align="center" width="100">
                  <template slot-scope="scope">
                    <el-switch
                      v-model="scope.row.account_status"
                      :active-value="1"
                      :inactive-value="0"
                      active-text=""
                      inactive-text=""
                      @change="changeStatus(scope.row)"
                    />
                  </template>
                </el-table-column>
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
                <el-table-column prop="end_date" label="到期日期" align="center" width="120" />
                <el-table-column label="企业状态" align="center" width="80">
                  <template slot-scope="scope">
                    <company-status :data="scope.row" />
                  </template>
                </el-table-column>

                <el-table-column label="操作" align="right" width="100">
                  <template slot-scope="scope">
                    <el-dropdown @command="handleCommand">
                      <el-button icon="el-icon-more" circle size="mini" />
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                          <router-link :to="'/company/show?id='+scope.row.id" class="fc-blue">
                            <i class="el-icon-s-order" /> 详情
                          </router-link>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <router-link :to="'/company/edit?id='+scope.row.id" class="fc-blue">
                            <i class="el-icon-edit" /> 编辑
                          </router-link>
                        </el-dropdown-item>
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
		lists,
		del,
		store as companyStore
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
			getListsData() {
				lists(this.listQuery).then(res => {
					this.listsData = res.data.lists
				})
			},
			changeStatus(row) {
				store({
					id: row.user_id,
					status: row.account_status
				}).then(res => {
					// this.listsData = res.data.lists;
				})
				// console.log(row);
			},
			changeStatus2(row) {
				companyStore({
					id: row.id,
					shop_status: row.shop_status
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
						del({
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
					del({
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
