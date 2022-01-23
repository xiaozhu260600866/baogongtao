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
                    <el-button type="info" @click="create">新建</el-button>
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
                <el-table-column prop="job_type" label="招聘类型" align="center" width="100" />
                <el-table-column prop="job_category" label="职位类型" align="center" width="120" />
                <el-table-column prop="job_position" label="职位名称" align="center" width="120" />

                <el-table-column prop="salary" label="薪资范围" align="center" width="120" />
                <el-table-column prop="job_tab" label="职位标签(福利待遇)" align="center" width="120" />
                <el-table-column prop="job_remark" label="职位描述" align="center" width="120" />
                <el-table-column prop="education" label="工作经验" align="center" width="120" />
                <el-table-column prop="age" label="年龄要求" align="center" width="120" />
                <el-table-column prop="job_showArea" label="职位展示区域" align="center" width="120" />
                <el-table-column prop="work_place" label="工作地址" align="center" width="120" />
                <el-table-column prop="contact_name" label="联系人姓名" align="center" width="120" />
                <el-table-column prop="contact_phone" label="联系号码" align="center" width="120" />

                <el-table-column label="操作" align="right" width="100">
                  <template slot-scope="scope">
                    <el-dropdown>
                      <el-button icon="el-icon-more" circle size="mini" />
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                          divided
                          class="fc-danger"
                          @click.native="del(scope.$index, scope.row)"
                        ><i
                          class="el-icon-delete"
                        /> 删除</el-dropdown-item>
                        <el-dropdown-item class="fc-danger" @click.native="edit(scope.row)">
                          <i class="el-icon-edit" /> 修改
                        </el-dropdown-item>
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
    <recruitCreateEdit ref="recruitCreateEdit" />
  </div>
</template>

<script>
	import {
		recruitLists,
		recruitDel
	} from '@/api/company'
	import {
		store
	} from '@/api/user'
	import {
		Loading
	} from 'element-ui'
	import Pagination from '@/components/Pagination'
	import CompanyStatus from './components/CompanyStatus'
	import recruitCreateEdit from './components/recruit_create_edit.vue'
	export default {
		components: {
			Pagination,
			CompanyStatus,
			recruitCreateEdit
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
			del(index, item) {
				this.handleCommand({
					command: 'delete',
					row: item,
					index: index
				})
			},
			edit(item) {
				this.$refs.recruitCreateEdit.ajax(item)
			},
			create() {
				this.$refs.recruitCreateEdit.ajax()
			},
			getListsData() {
				recruitLists(this.listQuery).then(res => {
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
