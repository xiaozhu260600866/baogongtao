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
								</el-form>
							</div>
						</div>
						<div class="list-box">
							<el-table v-loading="listsData.listLoading" :data="listsData.data" border
								style="width: 100%" @sort-change="sortAction" @selection-change="selsChange">
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
								<el-table-column prop="name" label="应聘姓名" align="center" width="100" />
								<el-table-column prop="phone" label="应聘电话" align="center" width="120" />
								<el-table-column label="应聘标题">
									<template slot-scope="scope">
										{{ scope.row.get_recruit ? scope.row.get_recruit.job_position : null }}
									</template>
								</el-table-column>
								<el-table-column label="应聘类别">
									<template slot-scope="scope">
										{{ scope.row.get_recruit ? scope.row.get_recruit.job_category : null }}
									</template>
								</el-table-column>
								<el-table-column label="是否录用">
									<template slot-scope="scope">
										{{ scope.row.recruited ? '是' : '否' }}
									</template>
								</el-table-column>
							

								<el-table-column label="操作" align="right" width="100">
									<template slot-scope="scope">
										<el-dropdown>
											<el-button icon="el-icon-more" circle size="mini" />
											<el-dropdown-menu slot="dropdown">
												<el-dropdown-item divided class="fc-danger"
													@click.native="del(scope.$index, scope.row)"><i
														class="el-icon-delete" /> 删除</el-dropdown-item>
												<el-dropdown-item class="fc-danger" @click.native="recruit(scope.row)">
													<i class="el-icon-edit" /> 录用
												</el-dropdown-item>
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
		<el-dialog :visible.sync="formVisibleGarrison" title="录用" width="1000px" top="5vh">
			<el-form ref="formData" :model="formData" label-width="120px">
				<div style="display: flex;">
					<el-form-item label="派驻公司" prop="company_id" :rules="[{ required: true, message: '企业不能为空'},]">
						<el-select v-model="formData.company_id" placeholder="招聘类型" filterable>
							<el-option v-for="item in companys" :key="item.id" :label="item.name" :value="item.id" />
						</el-select>
					</el-form-item>
					<el-form-item label="签到类别" prop="sign_type">
						<el-radio v-model="formData.sign_type" :label="0">固定</el-radio>
						<el-radio v-model="formData.sign_type" :label="1">外出</el-radio>
		
					</el-form-item>
					<el-form-item label="打卡地点" prop="sign_location" v-if="formData.sign_type == 0"
						:rules="[{ required: true, message: '企业不能为空'},]">
						<div style="display: flex;">
							<el-input v-model="formData.sign_location" class="CinputWidth" :disabled="true"></el-input>
							<el-button @click.prevent="chooseLocation()">定位</el-button>
						</div>
					</el-form-item>
				</div>
				<el-form-item label="姓名" prop="name" :rules="[{ required: true, message: '请输入姓名'}]">
					<el-input v-model="formData.name" />
				</el-form-item>
				<el-form-item label="电话" prop="phone" :rules="[{ required: true, message: '请输入电话'}]">
					<el-input v-model="formData.phone" />
				</el-form-item>
				<el-form-item label="身份证号" prop="idcardno" :rules="[{ required: true, message: '请输入身份证号'}]">
					<el-input v-model="formData.idcardno" />
				</el-form-item>
				
				<div style="display: flex;">
					<el-form-item label="上班时间" prop="work_start_time">
						<el-time-select v-model="formData.work_start_time" :picker-options="{
						    start: '06:00',
						    step: '00:15',
						    end: '18:30'
						  }" placeholder="选择时间">
						</el-time-select>
					</el-form-item>
					<el-form-item label="下班时间" prop="work_end_time">
						<el-time-select v-model="formData.work_end_time" :picker-options="{
						    start: '06:00',
						    step: '00:15',
						    end: '18:30'
						  }" placeholder="选择时间">
						</el-time-select>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="formVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitFormGarrison('formData')">提 交</el-button>
			</div>
		</el-dialog>
		<recruitCreateEdit ref="recruitCreateEdit" />
		<chooseLocation ref="chooseLocation" @callBack="locationCallBack"></chooseLocation>
	</div>
</template>

<script>
	import {
		recruitRecordLists,
		lists as companyLists,
		recruitRecordDel
	} from '@/api/company'
	import {
		store
	} from '@/api/user'
	import {
		Loading
	} from 'element-ui'
	import Pagination from '@/components/Pagination'
		import chooseLocation from "xiaozhu/vue/components/admin/chooseLocation";
	import CompanyStatus from './components/CompanyStatus'
	import recruitCreateEdit from './components/recruit_create_edit.vue'
	export default {
		components: {
			Pagination,
			CompanyStatus,
			recruitCreateEdit,
			chooseLocation
		},
		data() {
			return {
				formVisibleGarrison:false,
				formData:{},
				selectLists: [],
				companys:[],
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
			companyLists().then(res => {
				this.companys = res.data.lists
			})
			this.getListsData()
		},
		methods: {
			chooseLocation() {
				this.$refs.chooseLocation.ajax();
			},
			locationCallBack(res) {
				if (res.latlng) {
					this.$refs.chooseLocation.handleClose();
					this.formData.sign_location = res.poiaddress;
					this.formData.location_y = res.latlng.lng;
					this.formData.location_x = res.latlng.lat;
				}
			},
			submitFormGarrison(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.formData.dataType = "single";
						this.postAjax("/api/user/garrison", this.formData).then(res => {
							if (res.data.code == 0) {
								this.$message.success(res.data.msg)
								this.formVisibleGarrison = false
								this.getListsData()
							} else {
								return this.getError(res.data.msg)
							}
						})
					} else {
						console.log('error submit!!')
						return false
					}
				})
			},
			recruit(row){
				console.log(row.company_id)
				let data = row.get_worker;
				data.company_id = row.company_id;
				data.recruit_id = row.id;
				data.work_end_time = row.get_company.work_end_time_default;
				data.work_start_time =  row.get_company.work_start_time_default;
				this.formData = data;
				this.formVisibleGarrison = true;
			},
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
				recruitRecordLists(this.listQuery).then(res => {
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
						recruitRecordDel({
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
