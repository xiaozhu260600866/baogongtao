<template>
	<div class="app-container">
		<el-row>
			<el-col :span="24">
				<div class="dx-container">
					<tyt-page-header content="打卡记录" />
					<div class="dx-main">
						<div class="ptools pb0 clearfix">
							<div class="search-box f-left">
								<el-form :inline="true" :model="listQuery">
									<el-form-item>
										<el-input v-model="listQuery.work_name" placeholder="姓名" />
									</el-form-item>
									<el-form-item>
										<el-input v-model="listQuery.work_phone" placeholder="电话" />
									</el-form-item>
									<el-form-item>
										<el-input v-model="listQuery.company_name" placeholder="派注公司" />
									</el-form-item>
									<el-form-item>
										<el-select v-model="listQuery.type" placeholder="打卡类型">
											<el-option label="外出打卡" value="1" />
											<el-option label="固定" value="0" />
										</el-select>
									</el-form-item>
									<el-form-item>
										<el-date-picker v-model="listQuery.start_date" type="date" value-format="yyyy-MM-dd" placeholder="选择打卡开始时间"/>
									</el-form-item>
									<el-form-item>
										<el-date-picker v-model="listQuery.end_date" type="date" value-format="yyyy-MM-dd" placeholder="选择打卡结束时间"/>
									</el-form-item>
									<el-form-item>
										<el-button type="primary" @click="searchForm('form')"><i class="el-icon-search" /> 搜索</el-button>
										<el-button type="primary" @click="exportExcel('form')"><i class="el-icon-search" /> 导出</el-button>
									</el-form-item>
								</el-form>
							</div>
						</div>
						<div class="list-box">

							<el-table v-loading="listsData.listLoading" :data="listsData.data" border style="width: 100%" @selection-change="selsChange">
								<el-table-column type="selection" align="center" width="55" :selectable="selectAble" />
								<el-table-column label="姓名" align="center" width="80">
									<template slot-scope="scope">
										{{ scope.row.getWork ? scope.row.getWork.name :'' }}
									</template>
								</el-table-column>
								<el-table-column label="电话" align="center" width="116">
									<template slot-scope="scope">
										{{ scope.row.getWork ? scope.row.getWork.phone :'' }}
									</template>
								</el-table-column>
								<el-table-column label="身份证" align="center" width="160">
									<template slot-scope="scope">
										{{ scope.row.getWork ? scope.row.getWork.idcardno :'' }}
									</template>
								</el-table-column>
								<el-table-column label="派注公司" align="center" min-width="80">
									<template slot-scope="scope">
										{{ scope.row.getWork ? scope.row.getWork.companyName :'' }}
									</template>
								</el-table-column>
								<el-table-column label="打卡类型" align="center" width="80">
									<template slot-scope="scope">
										<div v-if="scope.row.type == 0">
											上班
										</div>
										<div v-else-if="scope.row.type == 1">
											下班
										</div>
										<div v-else-if="scope.row.type == -1">
											外出打卡
										</div>
									</template>
								</el-table-column>
								<el-table-column label="上班打卡时间" align="center" width="100">
									<template slot-scope="scope">
										{{ scope.row.type == 0 ? scope.row.created_at : '' }}
									</template>
								</el-table-column>
								<el-table-column label="下班打卡时间" align="center" width="100">
									<template slot-scope="scope">
										{{ scope.row.type == 1 ? scope.row.created_at : '' }}
									</template>
								</el-table-column>
								<el-table-column label="外出打卡时间" align="center" width="100">
									<template slot-scope="scope">
										{{ scope.row.type == -1 ? scope.row.created_at : '' }}
									</template>
								</el-table-column>
								<el-table-column label="外出打卡地点" align="center" min-width="100">
									<template slot-scope="scope">
										{{ scope.row.type == -1 ? scope.row.address : '' }}
									</template>
								</el-table-column>
								<el-table-column label="外出打卡图片" align="center" width="80">
									<template slot-scope="scope">
										<a :href="getSiteName()+'/upload/images/sign/'+scope.row.cover" target="_blank"><img :src="getSiteName()+'/upload/images/sign/300_'+scope.row.cover" alt="" width="50" height="30" style="object-fit: cover;"></a>
									</template>
								</el-table-column>

								<el-table-column label="操作" align="center" width="60" fixed="right">
									<template slot-scope="scope">
										<el-dropdown @command="handleCommand">
											<el-button icon="el-icon-more" circle size="mini" />
											<el-dropdown-menu slot="dropdown">
												<el-dropdown-item
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
		signLists
	} from '@/api/base'

	import Pagination from '@/components/Pagination'
	export default {
		components: {
			Pagination
		},
		data() {
			return {
				listsData: this.listsDefault(this),
				listQuery: this.queryDefault(this),
				selectLists: [],
				customers: [],
				statusArr: [{
					name: '草稿',
					value: 0
				}, {
					name: '待审核',
					value: 1
				}, {
					name: '审核不通过',
					value: 2
				}, {
					name: '进行中',
					value: 3
				}, {
					name: '已完成',
					value: 8
				}]
			}
		},
		mounted() {
			this.getListsData()
		},
		methods: {
			exportExcel() {
				window.open(this.getSiteName() + '/api/base/excel')
			},
			getListsData() {
				this.$set(this.listsData, 'listLoading', true)
				signLists(this.listQuery).then(res => {
					this.listsData = res.data.lists
				})
			},
			handleEdit(index, row) {

			},
			handleDelete(index, row) {
				this.$confirm('确认要删除该销售单吗？').then(res => {
					del({
						id: row.id
					}).then(res => {
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
					Wechatdel({
						id: this.selectLists2IdStr(this.selectLists)
					}).then(res => {
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
					this.tytConfirm({
						msg: '确认要删除该销售单单吗？'
					}, this).then(obj => {
						Wechatdel({
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
	.el-table__expanded-cell {
		padding: 10px !important;
		background: #eee;
	}

	.expand-cell {
		border-right: none !important;
	}
</style>
