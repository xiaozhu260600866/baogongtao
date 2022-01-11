<template>
	<div class="app-container">
		<el-row>
			<el-col :span="24">
				<el-col v-if="listsClass.classAction" :span="listsClass.classAction ? 6 : 0" class="pr10">
					<div class="dmp">
						<div class="dx-container">
							<div class="dx-main">
								<div class="list-box" style="padding: 0;">
									<new-class v-if="data[listsClass.prop]" :data="data[listsClass.prop]"
										:fields="listsClass.classData" :type="listsClass.classType"
										:form-action="listsClass.classAction" :class-children-hidden="false"
										:add-lev="listsClass.addLev" @clickCallBack="clickCallBack" />
								</div>
							</div>
						</div>
					</div>
				</el-col>
				<el-col :span="listsClass.classAction ? 18 : 24">
					<div class="dx-container">
						<tyt-page-header :content="title" />

						<div class="dx-main">
							<!-- 如果有搜索start -->
							<div v-if="searchFields.length" class="ptools pb0 clearfix">
								<div class="search-box f-left">
									<el-form :inline="true" :model="data.query" class="flex">
										<div class="flex1">
											<el-form-item v-for="v in searchFields" :label="v.label">
												<el-input v-if="!v.type || v.type == 'text'"
													v-model="data.query[v.prop]"
													:placeholder="v.placeholder ? v.placeholder : '请输入'+v.label" />
												<el-select v-else-if="v.type == 'select'" v-model="data.query[v.prop]"
													placeholder="请选择">
													<el-option v-for="q in data[v.datakey]" v-if="v.datakey"
														:label="q.label" :value="q.value" />
													<el-option v-for="q in v.data" v-if="v.data" :label="q.label"
														:value="q.value" />
												</el-select>
												<div v-else-if="v.type == 'betweenDate'">
													<el-date-picker v-model="data.query[v.prop+'_start'] " type="date"
														:placeholder="v.placeholder ? v.placeholder :'选择'+v.label+'开始范围' "
														value-format="yyyy-MM-dd" />~
													<el-date-picker v-model="data.query[v.prop+'_end'] " type="date"
														:placeholder="v.placeholder ? v.placeholder :'选择'+v.label+'结束范围'"
														value-format="yyyy-MM-dd" />
												</div>
												<div v-else-if="v.type == 'manyselect'">
													<el-cascader v-model="data.query[v.prop]" placeholder="请输入要搜索的分类"
														expand-trigger="hover" :options="data[v.datakey]"
														style="width:300px" />
												</div>
												<!-- <el-date-picker type="daterange" :placeholder="'选择'+v.label+'范围'" v-model="data.query[v.prop]" v-if="v.type == 'betweenDate'"> </el-date-picker> -->
												<el-button-group v-else-if="v.type == 'searchYear'">
													<el-button v-for="year in v.children"
														:type="data.query[v.prop] == year.prop ? 'primary' : '' "
														@click="data.query[v.prop] = year.prop;search();">
														{{ year.label }}
													</el-button>
												</el-button-group>
											</el-form-item>
											<el-form-item>
												<el-button v-if="searchFields" type="primary" click="search"
													@click="search"><i class="el-icon-search" /> 搜索</el-button>
												<el-button v-if="classAction" type="primary"
													@click="$refs.category.ajax()">
													类别管理</el-button>
												<el-button v-if="exportUrl" type="success" @click="exportExcel">导出
												</el-button>
												<el-button v-if="uploadData && uploadData.url" type="success"
													@click="upload">上传</el-button>
												<el-form-item>
													<slot name="header" />
												</el-form-item>
											</el-form-item>
										</div>
									</el-form>
								</div>
								<div class="f-right">
									<el-button v-if="canCreate" type="primary"
										@click.native="$refs.createEdit.ajax('',data,fields)">
										{{ createLabel ? createLabel :'新建' }}</el-button>
									<slot name="headerR" />
								</div>
							</div>
							<!-- 如果有搜索end -->
							<!-- 如果有tarbarsStart -->
							<div v-if="tarbars" class="list-box ">
								<el-tabs v-model="data.query[tarbars.prop]" @tab-click="$parent.ajax">
									<el-tab-pane v-for="v in tarbars.data"
										:label="v.count ? v.label+ '('+data[v.datakey]+')':v.label"
										:name="''+v.value" />
								</el-tabs>
							</div>
							<div>
								<slot name="tableTop" />
							</div>
							<!-- 如果有tarbarsEnd -->
							<div class="list-box">
								<el-table ref="multipleTable" v-loading="data.listLoading" :data="data.lists" border
									style="width: 100%" @selection-change="selsChange" @sort-change="sortChange">
									<el-table-column v-if="checkAll" type="selection" align="center" width="50" />
									<el-table-column v-for="(v,key) in tableFields" v-if="!v.hidden"
										v-show="v['hidden_'+v.prop]? canShow(v):true" :prop="v.prop" :label="v.label"
										:width="v.width" :align="v.align ? v.align:'left'" :min-width="v.minWidth"
										:sortable="v.sortable ? 'custom' : false">
										<template v-if="v.type || !v.type && v['append_table_'+v.prop]" scope="scope">
											<div v-if="v.type && v.type == 'editField'">
												<el-switch v-model="scope.row[v.prop]" on-text="" off-text=""
													:active-value="1" :inactive-value="0"
													@change="editField(scope.row,v.prop,v.url)" />
											</div>
											<div v-if="v.type && v.type == 'sort'">
												<el-input v-model="scope.row[v.prop]"
													@change="editField(scope.row,v.prop,v.url)" />
											</div>
											<div v-if="v.type && v.type == 'select'">
												<el-select v-model="scope.row[v.prop]" placeholder="请选择"
													@change="editField(scope.row,v.prop,v.url)">
													<el-option v-for="q in data[v.datakey]" v-if="v.datakey"
														:label="q.label" :value="q.value" />
													<el-option v-for="q in scope.row.data" v-if="scope.row.data"
														:label="q.label" :value="q.value" />
												</el-select>

											</div>
											<slot v-if="!v.type && v['append_table_'+v.prop]"
												:name="'append_table_'+v.prop" :row="scope.row"
												:$index="scope.$index" />
										</template>
									</el-table-column>
									<el-table-column v-if="!operateHide" label="操作"
										:width="operateWidth ? operateWidth : '160'">
										<template scope="scope">
											<div v-if="tableOperateButton">
												<el-dropdown>
													<el-button type="primary" size="mini">操作<i
															class="el-icon-arrow-down el-icon--right" /></el-button>
													<el-dropdown-menu slot="dropdown">
														<el-dropdown-item v-if="canEdit"
															@click.native="$refs.createEdit.ajax(scope.row,data,fields)">
															编辑</el-dropdown-item>
														<el-dropdown-item v-if="showInfo"
															@click.native="refs.createEdit.ajax(scope.row,data,fields,'info')">
															查看</el-dropdown-item>
														<el-dropdown-item v-if="scope.row.status!=1 && auditAction"
															@click.native="changeStatus(scope.$index, scope.row,'1')">
															审核通过
														</el-dropdown-item>
														<el-dropdown-item v-if="scope.row.status!=2 && auditAction"
															@click.native="changeStatus(scope.$index, scope.row,'2')">
															审核拒绝
														</el-dropdown-item>
														<slot name="operate" :row="scope.row" />
														<el-dropdown-item v-if="canDel"
															@click.native="handleDel(scope.$index,scope.row)">删除
														</el-dropdown-item>

													</el-dropdown-menu>
												</el-dropdown>
											</div>
											<div v-else class="cell_group">
												<el-button v-if="canEdit" type="primary" size="mini"
													@click.native="$refs.createEdit.ajax(scope.row,data,fields)">编辑
												</el-button>
												<el-button v-if="showInfo" type="primary" size="mini"
													@click.native="$refs.createEdit.ajax(scope.row,data,fields,'info')">
													查看</el-button>
												<el-button v-if="scope.row.status!=1 && auditAction" type="primary"
													size="mini" @click="changeStatus(scope.$index, scope.row,'1')">审核通过
												</el-button>
												<el-button v-if="scope.row.status!=2 && auditAction" type="primary"
													size="mini" @click="changeStatus(scope.$index, scope.row,'2')">审核拒绝
												</el-button>
												<div class="slot_btn">
													<slot name="operate" :row="scope.row" />
												</div>
												<el-button v-if="canDel" class="canDel" size="mini"
													@click.native="handleDel(scope.$index,scope.row)">删除
												</el-button>
											</div>
										</template>
									</el-table-column>
								</el-table>
								<div class="list-bottom clearfix">
									<div class="f-left flex">
										<el-button v-if="checkAll && canDel && !hiddenDelAll" type="danger"
											:disabled="this.sels.length===0 " @click="delAll"><i
												class="el-icon-delete-solid" />
											批量删除</el-button>
										<el-button v-if="putaway" type="danger" :disabled="this.sels.length===0 "
											@click="puawayAll(1)">批量上架</el-button>
										<el-button v-if="putaway" type="danger" :disabled="this.sels.length===0 "
											@click="puawayAll(0)">批量下架</el-button>
										<slot name="tableLeft" :row="sels" />
									</div>
									<div class="f-right">
										<el-pagination :current-page="data.thisPage" :page-sizes="[pageSize]"
											:page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
											:total="data.total" @size-change="handleSizeChange"
											@current-change="handleCurrentChange" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</el-col>

			</el-col>
		</el-row>
		<my-create-edit ref="createEdit" :fields="formFields" :data="data" :create-action="createAction"
			:edit-action="editAction" :create-edit-label="createEditLabel" :create-edit-diag-width="createEditDiagWidth"
			:length-diag="lengthDiag" @createBeforeCallBack="createBeforeCallBack"
			@submitBeforeCallBack="submitBeforeCallBack">
			<div slot="content" slot-scope="scope">
				<slot :name="scope.field" :row="scope.row" />
			</div>
		</my-create-edit>
		<my-status v-if="auditAction" ref="status" style="width:100%" :form-action="auditAction" />
		<uploadFile v-if="uploadData && uploadData.url" ref="upload" :action="uploadUrl()"
			:down-load-url="uploadData.downloadUrl" />

		<new-class v-if="classAction && classFields.length" ref="category" :diag="true" :data="data.category"
			:fields="classFields" :add-lev="classLev" :no="classno" :type="classType" :form-action="classAction"
			:class-children-hidden="classChildrenHidden" :canupload="canupload">
			<div v-for="field in classFields" :slot="'append_class_table_'+ field.prop" slot-scope="scope">
				<slot :name="'append_class_table_'+ field.prop" :row="scope.row" />
			</div>
		</new-class>
		<new-class v-if="classAction &&classFields.length == 0" ref="category" :diag="true" :data="data.category"
			:add-lev="classLev" :no="classno" :type="classType" :form-action="classAction"
			:class-children-hidden="classChildrenHidden" :canupload="canupload" />
		<!--  <my-class top="2%" ref="category" :no="classno" :type="classType" :formAction="classAction" :sizearr="300" v-if="classAction"
            :classChildrenHidden="classChildrenHidden" :canupload="canupload" :pageUrl="classUrl"></my-class> -->
	</div>
</template>
<script>
	export default {
		components: {
			'my-create-edit': resolve => require(['xiaozhu/elementAdmin/components/create_edit'], resolve),
			'my-status': resolve => require(['xiaozhu/elementAdmin/components/status.vue'], resolve),
			// "my-class": resolve => require(['xiaozhu/elementAdmin/components/class.vue'], resolve),
			'new-class': resolve => require(['xiaozhu/elementAdmin/components/new_class/2020new_class.vue'], resolve),
			'uploadFile': resolve => require(['xiaozhu/elementAdmin/components/uploadFile.vue'], resolve)
		},
		props: ['data', 'globalData', 'operateWidth', 'operateHide'],
		data() {
			return {
				sels: [], // 列表选中列,
				fields: '',
				tableFields: [],
				putaway: false,
				searchFields: [],
				formFields: [],
				checkAll: '',
				createAction: '',
				delAction: '',
				delAllAction: '',
				editAction: '',
				auditAction: '',
				classAction: '',
				pageSize: 15,
				tableName: '',
				canCreate: false,
				canEdit: false,
				showInfo: false,
				tarbars: {},
				listsClass: {},
				title: '',
				classType: 0,
				exportUrl: '',
				canupload: true,
				canDel: true,
				classUrl: '',
				classFields: [],
				siteName: this.getSiteName(),
				createEditLabel: '100px',
				createEditDiagWidth: '800px',
				tableOperateButton: false,
				uploadData: {},
				classChildrenHidden: false,
				hiddenDelAll: false,
				classno: false,
				classLev: 2,
				createLabel: '',
				operateHide: false,
				lengthDiag: false
			}
		},
		mounted() {
			this.title = this.$route.meta.title
			if (this.$route.meta.params) {
				for (const key2 in this.$route.meta.params) {
					this.$set(this.data.query, key2, '' + this.$route.meta.params[key2])
				}
			}
			console.log(this.data.query)

			var args = new Object()
			var url = window.location.href
			var url = url.substr(url.indexOf('?') + 1)
			var pairs = url.split('&') // 在逗号处断开
			for (var i = 0; i < pairs.length; i++) {
				var pos = pairs[i].indexOf('=') // 查找name=value
				if (pos == -1) { // 如果没有找到就跳过
					continue
				}
				var argname = pairs[i].substring(0, pos) // 提取name
				var value = pairs[i].substring(pos + 1) // 提取value
				args[argname] = unescape(value) // 存为属性
			}
			for (const key2 in args) {
				this.$set(this.data.query, key2, '' + args[key2])
			}

			this.tableFields = this.globalData.data.tableFields
			this.searchFields = this.globalData.data.searchFields
			this.formFields = this.globalData.data.formFields
			this.checkAll = this.globalData.data.checkAll

			this.createAction = this.globalData.data.createAction
			this.editAction = this.globalData.data.editAction
			this.auditAction = this.globalData.data.auditAction
			this.tableName = this.globalData.data.tableName
			this.pageSize = parseInt(this.globalData.data.pageSize)
			this.canCreate = this.globalData.data.canCreate
			this.canEdit = this.globalData.data.canEdit
			this.tarbars = this.globalData.data.tarbars
			this.classAction = this.globalData.data.classAction
			this.classType = this.globalData.data.classType
			this.delAction = this.globalData.data.delAction
			this.delAllAction = this.globalData.data.delAllAction
			this.showInfo = this.globalData.data.showInfo
			this.putaway = this.globalData.data.putaway
			this.exportUrl = this.globalData.data.exportUrl
			if (this.globalData.data.tableOperateButton != undefined) {
				this.tableOperateButton = this.globalData.data.tableOperateButton
			}
			if (this.globalData.data.tableOperateButton != undefined) {
				this.tableOperateButton = this.globalData.data.tableOperateButton
			}
			if (this.globalData.data.listsClass != undefined) {
				this.listsClass = this.globalData.data.listsClass
			}
			if (this.globalData.data.uploadData != undefined) {
				this.uploadData = this.globalData.data.uploadData
			}
			if (this.globalData.data.createLabel != undefined) {
				this.createLabel = this.globalData.data.createLabel
			}
			if (this.globalData.data.classLev != undefined) {
				this.classLev = this.globalData.data.classLev
			}
			if (this.globalData.data.classChildrenHidden != undefined) {
				this.classChildrenHidden = this.globalData.data.classChildrenHidden
			}
			if (this.globalData.data.classno != undefined) {
				this.classno = this.globalData.data.classno
			}

			if (this.globalData.data.createEditLabel != undefined) {
				this.createEditLabel = this.globalData.data.createEditLabel
			}

			if (this.globalData.data.createEditDiagWidth != undefined) {
				this.createEditDiagWidth = this.globalData.data.createEditDiagWidth
			}

			if (this.globalData.data.canupload != undefined) {
				this.canupload = this.globalData.data.canupload
			}
			if (this.globalData.data.classUrl != undefined) {
				this.classUrl = this.globalData.data.classUrl
			}
			if (this.globalData.data.classFields != undefined) {
				this.classFields = this.globalData.data.classFields
			}
			if (this.$route.meta.roles && this.$route.meta.roles[0]) {
				// this.canDel = this.checkPermission([this.$route.meta.roles[0] + '.del', 'admin'])
			}
			if (this.$route.meta.roles && this.$route.meta.roles[0]) {
				// this.canCreate = this.checkPermission([this.$route.meta.roles[0] + '.create', 'admin'])
			}
			if (this.$route.meta.roles && this.$route.meta.roles[0]) {
				// this.canEdit = this.checkPermission([this.$route.meta.roles[0] + '.edit', 'admin'])
			}
			if (this.globalData.data.canDel != undefined) {
				this.canDel = this.globalData.data.canDel
			}
			if (this.globalData.data.lengthDiag != undefined) {
				this.lengthDiag = this.globalData.data.lengthDiag
			}
		},
		methods: {
			clickCallBack(item) {
				this.$parent.data.query.fclass = item.id
				this.$parent.ajax()
			},
			upload() {
				this.$refs.upload.ajax()
			},
			canShow(v) {
				return this.$emit('hidden_' + v.prop, v)
			},
			editField(row, field, url) {
				this.postAjax(url, {
					id: row.id,
					field: field,
					value: row[field]
				}, msg => {
					if (msg.data.status == 3) {
						row[field] = 0
					}
					if (msg.data.status == 2) {
						this.ajax()
					}
				})
			},
			uploadUrl() {
				return this.urlApendOpenid(this.siteName + this.uploadData.url)
			},
			exportExcel() {
				let url = this.urlApendOpenid(this.exportUrl, this)
				let field = []
				this.tableFields.forEach(msg => {
					field.push({
						label: msg.label,
						prop: msg.prop
					})
				})
				field = JSON.stringify(field)
				url += '&field=' + field
				window.open(this.siteName + url)
			},
			puawayAll(putaway) {
				this.postAjax(this.putaway, {
					data: this.sels,
					putaway: putaway
				}).then(msg => {
					if (msg.data.status == 2) {
						this.ajax()
					}
				})
			},
			search() {
				this.data.nextPage = 1
				this.$parent.ajax()
			},
			createBeforeCallBack(row) {
				this.$emit('createBeforeCallBack', row)
			},
			submitBeforeCallBack(row) {
				this.$emit('submitBeforeCallBack', row)
			},
			ajax() {
				this.$parent.ajax()
			},
			selsChange: function(sels) {
				this.sels = sels
			},
			sortChange(res) {
				this.data.query.orderBy = res.prop
				if (res.order == 'ascending') {
					this.data.query.orderByValue = 'desc'
				} else {
					this.data.query.orderByValue = 'asc'
				}
				this.ajax()
			},
			handleSizeChange(val) {
				this.data.nextPage = val
				this.ajax()
			},
			handleCurrentChange(val) {
				this.data.nextPage = val
				this.ajax()
			},
			handleDel(index, item) {
				const delAction = this.delAction ? this.delAction : '/ajax/mydel'
				this.getConfirm('此操作将永久删除该文件, 是否继续?', () => {
					this.postAjax(delAction, {
						id: item.id,
						tablename: this.tableName
					}, msg => {
						if (msg.data.status == 2) {
							this.data.lists.splice(index, 1)
							return this.getSuccess('删除成功')
						} else {
							// this.getError(msg.data.message);
						}
					})
				})
				// this.del_vuex(item, index, this, delAction)
			},
			delAll() {
				/* 批量删除*/
				const delAllAction = this.delAllAction ? this.delAllAction : ''
				this.deleteAll(this, delAllAction)
			},
			changeStatus(index, item, status) {
				this.$refs.status.ajax({
					id: item.id,
					status: status
				})
			}
		}
	}
</script>
<style>
	.el-table td:last-child .cell {
		display: flex !important;
	}

	.Hright .el-form-item:last-child {
		margin-right: 0;
	}

	.slot_btn>div {
		display: flex;
		margin-left: 10px;
	}

	.slot_btn .el-dropdown {
		margin-left: 10px;
	}

	.slot_btn .el-dropdown:first-child {
		margin-left: 0;
	}

	.canDel {
		margin-left: 10px;
	}

	.cell .slot_btn:first-child>div {
		margin-left: 0;
	}

	.cell .canDel:first-child {
		margin-left: 0;
	}

	.cell .cell_group {
		display: flex;
	}
</style>
