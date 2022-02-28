<template>
	<div>
		<div class="list-box">
			<el-table v-loading="listsData.listLoading" :data="listsData.data" border style="width: 100%">
				<template slot="empty">
					<div class="empty-div">
						<div><svg-icon icon-class="dx-empty" /></div>
						<p>暂无</p>
					</div>
				</template>
				<el-table-column prop="userName" label="姓名" align="center" />
				<el-table-column v-if="type==1" prop="name" label="用人单位" align="center" />
				<el-table-column prop="sign_date" label="签署日期" align="center" width="220" />
				<el-table-column label="有效期" align="center">
					<template slot-scope="scope">
						{{ scope.row.start_date }} - {{ scope.row.end_date }}
					</template>
				</el-table-column>
				<el-table-column label="状态" align="center">
					<template slot-scope="scope">
						<sign-status :status="scope.row.status" />
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="150">
					<template slot-scope="scope">
						<el-button v-if="scope.row.status>0" size="mini" type="primary" @click="handleShow(scope.row)"><i class="el-icon-s-order" /> 查看合同</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="list-bottom clearfix">
				<div class="f-left" />
				<div class="f-right">
					<pagination v-show="listsData.total>0" :total="listsData.total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListsData" />
					</div>
				</div>
			</div>

			<el-dialog v-if="showVisible" :visible.sync="showVisible" title="合同详情" width="800px" top="5vh">
				<div class="sign-detail">
					<div v-html="signData.content" />
					<div class="sign">
						<el-row>
							<el-col :span="12">
								<div class="line">甲方（盖章）：</div>
								<div class="line">日期：{{ signData.signDateCn }}</div>
							</el-col>
							<el-col :span="12">
								<div class="line sign-img">乙方（签字）：<el-image class="img" :src="signData.signUrl" style="height: 20px" fit="contain" /></div>
								<div class="line">日期：{{ signData.signDateCn }}</div>
							</el-col>
						</el-row>
					</div>
					<div class="jia-stamp"><el-image :src="signData.employerStampPath" class="stamp-path-img" mode="widthFix" /></div>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click="formVisible = false">关闭</el-button>
				</div>
			</el-dialog>

		</div>
	</template>

	<script>
		import { signs, sign } from '@/api/user'
		import Pagination from '@/components/Pagination'
		import SignStatus from '@/views/user/components/SignStatus'
		export default {
			components: { Pagination, SignStatus },
			props: {
				type: {
					type: Number,
					default: 2
				},
				userId: {
					type: Number,
					default: ''
				}
			},
			data() {
				return {
					listQuery: this.queryDefault(this),
					listsData: this.listsDefault(this),
					showVisible: false,
					signData: ''
				}
			},
			mounted() {
				this.listQuery.type = this.type
				this.listQuery.user_id = this.user_id
				this.getListsData()
			},
			methods: {
				getListsData() {
					signs(this.listQuery).then(res => {
						this.listsData = res.data.lists
					})
				},
				searchForm() {
					if (this.listQuery.class_id) this.listQuery.class_id = this.listQuery.class_id.pop()
						this.getListsData()
				},
				handleShow(row) {
					sign({ id: row.id }).then(res => {
						this.signData = res.data.data
						this.showVisible = true
					})
				}
			}
		}
	</script>

	<style>
		.sign-detail{padding: 15px;padding-bottom: 100px;position: relative;}
		.sign-detail .sign{position: absolute;bottom: 20px;left: 15px;right: 15px;}
		.sign-detail .line{margin-bottom: 10px;}
		.sign-img{position: relative;}
		.sign-img .img{position: absolute;top: 0;left: 100px;text-align: left;}
		.el-image__inner{width: auto;}
		.jia-stamp{position: absolute;bottom: 40px;left: 100px; z-index: 9}
		.jia-stamp .stamp-path-img{height: 100px;}
	</style>
