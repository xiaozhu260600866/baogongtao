<template>
  <div class="app-container">
    <div class="dmp">
      <div class="dx-container">
        <div class="dx-header">
          <div style="padding: 4px 40px 4px 0;">
            <el-input v-model="listQuery.name" placeholder="搜索部门" prefix-icon="el-icon-search" />
            <div class="pointer" style="position: absolute;right: 10px;top: 15px;font-size: 26px;color: #666;font-weight: bold;" @click="handelCreateDmp"><i class="el-icon-plus" /></div>
          </div>
        </div>
        <div class="dx-main">
          <div class="list-box" style="padding: 0;">
            <el-table v-loading="departmentsData.listLoading" :data="departmentsData" :show-header="false" style="width: 100%" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :highlight-current-row="true" @cell-click="dmpClick">
              <el-table-column prop="name" label="名称" class-name="pointer" />
              <el-table-column label="操作" align="right" width="50">
                <template slot-scope="scope">
                  <el-dropdown @command="handleDmpCommand">
                    <i class="el-icon-more pointer" />
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="getDmpCommandData(scope.$index, scope.row,'edit')" class="fc-blue"><i class="el-icon-edit" /> 编辑</router-link></el-dropdown-item>
                      <el-dropdown-item divided class="fc-danger" :command="getDmpCommandData(scope.$index, scope.row,'delete')"><i class="el-icon-delete" /> 删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>

          </div>
        </div>
      </div>
    </div>
    <el-row class="users">

      <el-col :span="24">
        <div class="dx-container">
          <tyt-page-header content="人事档案" />
          <div class="dx-main">
            <div class="ptools pb0 clearfix">
              <div class="search-box f-left">
                <el-form :inline="true" :model="listQuery">
                  <el-form-item>
                    <el-cascader v-model="listQuery.department_id" :options="departmentsData" clearable :props="{ checkStrictly: true, expandTrigger: 'hover' ,value:'id',label:'name'}" placeholder="所有部门" style="width: 200px;" />
                  </el-form-item>
                  <el-form-item>
                    <el-input v-model="listQuery.name" placeholder="姓名" />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="searchForm('form')"><i class="el-icon-search" /> 搜索</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div class="f-right">
                <router-link to="/hr/archive/create"><el-button type="primary"><i class="el-icon-plus" /> 添加人员</el-button></router-link>
              </div>
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
                <el-table-column label="姓名">
                  <template slot-scope="scope">
                    {{ scope.row.name }}
                    <!-- <router-link :to="'/sales/product/show?id='+scope.row.id" class="fc-blue">{{ scope.row.name }}</router-link> -->
                  </template>
                </el-table-column>
                <el-table-column prop="position" label="职务" align="center" width="150" />
                <el-table-column prop="departmentName" label="部门" align="center" width="150" />
                <el-table-column prop="phone" label="手机" align="center" width="150" />
                <el-table-column prop="username" label="登录账号" align="center" width="150" />
                <el-table-column label="状态" align="center" width="100">
                  <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="changeStatus(scope.row)" />
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="60" fixed="right">
                  <template slot-scope="scope">
                    <el-dropdown @command="handleUserCommand">
                      <el-button icon="el-icon-more" circle size="mini" />
                      <el-dropdown-menu slot="dropdown">
                        <!-- <el-dropdown-item><router-link :to="'/sales/order/show?id='+scope.row.id" class="fc-blue"><i class="el-icon-s-order"></i> 查看详情</router-link></el-dropdown-item> -->
                        <el-dropdown-item><router-link :to="'/hr/archive/create?id='+scope.row.id" class="fc-blue"><i class="el-icon-edit" /> 修改资料</router-link></el-dropdown-item>
                        <el-dropdown-item v-if="scope.row.status<3" divided class="fc-danger" :command="getUserCommandData(scope.$index, scope.row,'delete')"><i class="el-icon-delete" /> 删除</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </el-table-column>
              </el-table>

              <div class="list-bottom clearfix">
                <div class="f-left"><el-button type="danger" :disabled="this.selectLists.length===0" @click="selectDelete"><i class="el-icon-delete-solid" /> 批量删除</el-button></div>
                <div class="f-right">
                  <pagination v-show="listsData.total>0" :total="listsData.total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListsData" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog v-if="dmpFormVisible" :visible.sync="dmpFormVisible" :title="dmpFormTitle" width="700px">
      <el-form ref="dmpform" :model="formDataDmp" :inline="true" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级部门" prop="fid">
              <el-cascader v-model="formDataDmp.fid" :options="departmentsData" :props="{ expandTrigger: 'hover',checkStrictly: true,value:'id',label:'name' }" clearable placeholder="不选择则为一级部门" />
              <div class="form-item-remark">不选择则为一级部门</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门名称" prop="name" :rules="[{ required: true, message: '部门名称不能为空'}]">
              <el-input v-model="formDataDmp.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="sort">
              <el-input v-model="formDataDmp.sort" type="number" placeholder="0" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dmpFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDmpForm('dmpform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { lists as dmpLists, store as dmpStore, del as dmpDel } from '@/api/hr/department'
import { lists, update, del } from '@/api/hr/user'
import Pagination from '@/components/Pagination'
export default {
	name: 'HrArchive',
	components: { Pagination },
	data() {
		return {
			classes: [],
			classesArr: [],
			departmentsData: [],
			formDataDmp: {},
			dmpFormVisible: false,
			dmpFormTitle: '',
			listsData: this.listsDefault(this),
		    listQuery: this.queryDefault(this),
		    selectLists: []
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		init() {
			this.getDepartmentData()
			this.getListsData()
		},
		getDepartmentData() {
			this.$set(this.departmentsData, 'listLoading', true)
			dmpLists(this.listQuery).then(res => {
				this.departmentsData = this.getTreeData(res.data.lists)
			})
		},
		handelCreateDmp() {
			this.dmpFormTitle = '新增部门'
			this.formDataDmp = { id: '', fid: 0, name: '', sort: '' }
			this.dmpFormVisible = true
		},
		getDmpCommandData(index, row, command) {
            return {
                'index': index,
                'row': row,
                'command': command
            }
        },
		handleDmpCommand(command) {
			if (command.command == 'edit') {
				this.dmpFormTitle = '修改部门'
				this.formDataDmp = command.row
				this.dmpFormVisible = true
			}
			if (command.command == 'delete') {
				this.tytConfirm({ msg: '确认要删除该部门吗？' }, this).then(obj => {
	    			dmpDel({ id: command.row.id }).then(res => {
	    				obj.instance.confirmButtonLoading = false
						this.$message.success(res.msg)
						this.getDepartmentData()
						obj.done()
					})
		    	}).catch(obj => { obj.instance.confirmButtonLoading = false })
			}
		},
		submitDmpForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					dmpStore(this.formDataDmp).then(res => {
						this.$message.success(res.msg)
						this.getDepartmentData()
						this.dmpFormVisible = false
					})
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		dmpClick(row, column, cell, event) {
			this.listQuery.department_id = row.id
			this.getListsData()
		},

		getListsData() {
			this.listQuery.role = 12
			lists(this.listQuery).then(res => {
				this.listsData = res.data.lists
			})
		},
		getUserCommandData(index, row, command) {
            return {
                'index': index,
                'row': row,
                'command': command
            }
        },
		handleUserCommand(command) {
			if (command.command == 'delete') {
				this.tytConfirm({ msg: '确认要删除该人员吗？' }, this).then(obj => {
	    			del({ id: command.row.id }).then(res => {
	    				obj.instance.confirmButtonLoading = false
						this.$message.success(res.msg)
						this.listsData.data.splice(command.index, 1)
						obj.done()
					})
		    	}).catch(obj => { obj.instance.confirmButtonLoading = false })
			}
		},
		changeStatus(row) {
			update({ id: row.id, status: row.status }).then(res => {
				// this.listsData = res.data.lists;
			})
			// console.log(row);
		},
		selsChange: function(sels) {
			// console.log(sels)
			this.selectLists = sels
		},
		selectDelete() {
			this.$confirm('确认要删除所选人员吗？').then(res => {
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

<style lang="scss" scoped>
.app-container{position: relative;}
.dmp{
	position: absolute;left: 20px;top: 20px;bottom: 10px;width: 300px;background: #f9fafc;z-index: 9;border: #ebebeb 1px solid;border-right: 0;
	.dx-container{
		border: none;
		.dx-header{background: #f9fafc;}
		.dx-main{background: #f9fafc;
			/deep/.el-table tr{background: #f9fafc;}
			/deep/.el-table__body tr.current-row>td{background-color: #5683ad !important;color: #fff !important;}
		}
	}
	.el-table td {
	    border-bottom: 1px solid #f2f2f2 !important;
	}
}
.users{
	left: 320px;position: absolute;right: 20px;top: 20px;bottom: 10px;background: #fff;border: #ebebeb 1px solid;
	.dx-container{border: none;}
}
</style>
