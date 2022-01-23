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
										<el-input v-model="listQuery.nickName" placeholder="呢称" />
									</el-form-item>
									<el-form-item>
										<el-button type="primary" @click="searchForm('form')"><i
												class="el-icon-search" /> 搜索</el-button>
									</el-form-item>
								</el-form>
							</div>
						</div>
						<div class="list-box">

							<el-table v-loading="listsData.listLoading" :data="listsData.data" border
								style="width: 100%" @sort-change="sortAction" @selection-change="selsChange">
								<el-table-column type="selection" align="center" width="55" :selectable="selectAble" />
								<el-table-column prop="nickName" label="呢称" min-width="150"></el-table-column>
								<el-table-column label="图片" align="center" width="80">
									<template slot-scope="scope">
										<img :src="scope.row.avatarUrl" alt="" width="30px">
									</template>
								</el-table-column>
								<el-table-column label="上级" align="center" width="80">
									<template slot-scope="scope">
										{{scope.row.dis ? scope.row.dis.name :''}}
									</template>
								</el-table-column>
								<el-table-column prop="created_at" label="创建时间" align="center" width="150" />
								<el-table-column label="操作" align="center" width="60" fixed="right">
									<template slot-scope="scope">
										<el-dropdown @command="handleCommand">
											<el-button icon="el-icon-more" circle size="mini" />
											<el-dropdown-menu slot="dropdown">
												<el-dropdown-item  class="fc-danger"
													:command="getCommandData(scope.$index, scope.row,'delete')"><i
														class="el-icon-delete" /> 删除</el-dropdown-item>
											</el-dropdown-menu>
										</el-dropdown>
									</template>
								</el-table-column>
							</el-table>
							<div class="list-bottom clearfix">
								<div class="f-left">
									<el-button type="danger" :disabled="this.selectLists.length===0"
										@click="selectDelete"><i class="el-icon-delete-solid" /> 批量删除</el-button>
								</div>
								<div class="f-right">
									<pagination v-show="listsData.total>0" :total="listsData.total"
										:page.sync="listQuery.page" :limit.sync="listQuery.limit"
										@pagination="getListsData" />
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
		WechatLists,
		Wechatdel
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
			getListsData() {
				this.$set(this.listsData, 'listLoading', true)
				WechatLists(this.listQuery).then(res => {
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
