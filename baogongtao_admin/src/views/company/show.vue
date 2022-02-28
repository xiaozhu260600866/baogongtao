<template>
	<div class="app-container">
		<el-row v-loading="detailData.loading">
			<el-col :span="24">
				<div class="dx-container">
					<div class="p15"><el-page-header content="企业详情" @back="goBack" /></div>
				</div>
			</el-col>
			<el-col v-if="detailData.id" :span="24">
				<div class="dx-container mt5">
					<div class="dx-main">
						<div class="product-detail-info">
							<div class="info-left">
								<div class="cover"><el-image v-loading="detailData.loading" style="width: 100px; height: 100px" :src="detailData.logoMinUrl" lazy /></div>
								<p align="center">{{ detailData.name }}</p>
								<p align="center">
									<el-dropdown @command="handleCommand">
										<el-button size="mini" round>操作<i class="el-icon-arrow-down el-icon--right" /></el-button>
										<el-dropdown-menu slot="dropdown">
											<el-dropdown-item><router-link :to="'/company/edit?id='+detailData.id" class="fc-blue"><i class="el-icon-edit" /> 修改企业</router-link></el-dropdown-item>
											<el-dropdown-item divided command="del" class="fc-danger"><i class="el-icon-delete" /> 删除企业</el-dropdown-item>
										</el-dropdown-menu>
									</el-dropdown>
								</p>
							</div>
							<div class="info-right">
								<el-form ref="form" :inline="true" label-width="120px">
									<el-row>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="企业名称：">{{ detailData.name }}</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="所在地：">{{ detailData.province }} {{ detailData.city }} {{ detailData.area }}</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="企业固话：">{{ detailData.phone }}</el-form-item>
										</el-col>
										<el-col :span="24">
											<el-form-item label="地址：">{{ detailData.address }}</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="负责人姓名：">{{ detailData.charger_name }}</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="负责人电话：">{{ detailData.charger_phone }}</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="负责人email：">{{ detailData.charger_email }}</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="登录账号：">{{ detailData.username }}</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="账号状态："><user-status :data="detailData.get_user" /></el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="创建日期：">{{ detailData.created_at }}</el-form-item>
										</el-col>
									</el-row>
								</el-form>
							</div>
						</div>
					</div>
				</div>
			</el-col>

			<el-col :span="24">
				<div class="dx-container mt20">
					<div class="dx-main p20">
						<el-tabs v-model="showTab" style="min-height: 300px;" @tab-click="handleTabClick">
							<el-tab-pane name="task">
								<span slot="label"><i class="iconfont icon-task" /> 企业任务</span>
								<task-lists v-if="detailData.id" :operator="0" :company_id="detailData.id" />

							</el-tab-pane>
							<el-tab-pane name="contract">
								<span slot="label"><i class="iconfont icon-contract" /> 企业合同</span>
								<contract-lists v-if="showTab=='contract'" :company="detailData" />

							</el-tab-pane>
							<el-tab-pane name="worker">
								<span slot="label"><i class="iconfont icon-worker" /> 历史用工</span>
								<worker-lists v-if="showTab=='worker'" :company_id="detailData.id" />

							</el-tab-pane>
							<el-tab-pane name="sign">
								<span slot="label"><i class="iconfont icon-sign" /> 签署文件</span>
								<div v-if="showTab=='sign'">
									<div class="ptools pb0 clearfix">
										<div class="search-box f-left" />
										<div class="f-right">
											<el-upload style="display: inline-block;" class="upload-demo" :action="signUploadUrl" :data="signUploadData" accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP" :multiple="false" :show-file-list="false" :before-upload="beforeUpload" :on-success="successUpload">
												<el-button type="primary"><i class="el-icon-upload2" /> 上传签署文件</el-button>
											</el-upload>
										</div>
									</div>
									<div v-if="!detailData.worker_sign_file" class="empty-div text-center">
										<div><svg-icon icon-class="dx-empty" /></div>
										<p class="fc-9">暂未上传签署文件</p>
									</div>
									<div v-else class="text-center">
										<el-image v-loading="detailData.loading" style="max-width: 100%;" :src="detailData.workerSignFileUrl" lazy />
									</div>
								</div>
							</el-tab-pane>
							<el-tab-pane name="transfer">
								<span slot="label"><i class="iconfont icon-transfer" /> 转账记录</span>
								<transfer-lists v-if="showTab=='transfer'" :user_id="detailData.user_id" />
							</el-tab-pane>
							<el-tab-pane name="article2">
								<span slot="label"><i class="iconfont icon-news" /> 企业动态</span>
								<company-article v-if="showTab=='article2'" :company_id="detailData.id" :class_id="9" />
							</el-tab-pane>
							<el-tab-pane name="article3">
								<span slot="label"><i class="iconfont icon-hr" /> 企业招聘</span>
								<company-article v-if="showTab=='article3'" :company_id="detailData.id" :class_id="10" />
							</el-tab-pane>
							<el-tab-pane name="intro">
								<span slot="label"><i class="iconfont icon-intro" /> 企业资料</span>
								<el-form ref="form" :inline="true" label-width="120px">
									<el-row>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="营业执照：">
												<el-image style="width: 100px; height: 100px":src="detailData.licenseMinUrl" :preview-src-list="[detailData.licenseUrl]" />
											</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="法人身份证：">
												<el-image style="width: 100px; height: 100px":src="detailData.idcardMinUrl" :preview-src-list="[detailData.idcardUrl]" />
											</el-form-item>
										</el-col>
										<el-col :span="24">
											<el-form-item label="企业资质：">
												<el-image style="width: 100px; height: 100px":src="detailData.credentialsMinUrl" :preview-src-list="[detailData.credentialsUrl]" />
											</el-form-item>
										</el-col>
										<el-col :span="24">
											<el-form-item label="企业介绍：" />
										</el-col>
										<el-col :span="24">
											<div v-html="detailData.content" />
										</el-col>
									</el-row>
								</el-form>

							</el-tab-pane>
						</el-tabs>
					</div>
				</div>
			</el-col>
		</el-row>

	</div>
</template>

<script>
	import { detail, del } from '@/api/company'
	import { wrokers } from '@/api/user'
	import UserStatus from '@/views/user/components/UserStatus'
	import CompanyArticle from './components/CompanyArticle'
	import ContractLists from '@/views/contract/components/ContractLists'
	import WorkerLists from '@/views/worker/components/WorkerLists'
	import TaskLists from '@/views/task/components/TaskLists'
	import TransferLists from '@/views/transfer/components/TransferLists'
	import { Loading } from 'element-ui'
	export default {
		components: { UserStatus, CompanyArticle, ContractLists, WorkerLists, TaskLists, TransferLists },
		data() {
			return {
				detailQuery: { loading: true },
				detailData: { loading: true },
				showTab: 'task',
				signUploadUrl: process.env.VUE_APP_BASE_API + '/company/worker-sign-upload',
				signUploadData: {
					company_id: '',
					token: this.$store.getters.token
				}
			}
		},
		mounted() {
			this.detailQuery.id = this.$route.query.id
			this.getDetailData()
		},
		methods: {
			getDetailData() {
				detail(this.detailQuery).then(res => {
					this.detailData = res.data.data
					this.signUploadData.company_id = this.detailData.id
				})
			},
			handleCommand(command) {
				if (command == 'del') {
					this.$confirm('确认要删除该产品吗？').then(res => {
						del({ id: this.detailData.id }).then(res => {
							this.$message.success(res.msg)
							this.$store.dispatch('tagsView/delView', this.$route)
							this.$router.push({ path: '/sales/product/lists' })
						})
					}).catch(res => {})
				}
			},
			handleTabClick(tab, event) {

			},
			beforeUpload() {
				Loading.service({ text: '上传中...' })
			},
			successUpload(res) {
				// console.log(res)
				Loading.service().close()
				if (res.code == 0) {
					this.msgSuccess(res.msg, this)
					this.detailData = res.data.company
				} else {
					this.msgError(res.msg, this)
				}
			},
			goBack() {
				this.$router.go(-1)
			}

		}
	}
</script>

<style>

</style>
