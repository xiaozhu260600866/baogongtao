<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="dx-container">
          <div class="dx-tools">
            <el-button v-if="$store.getters.role===1" type="danger" size="mini" @click="handleDelete"><i class="el-icon-remove-outline" /> 删除该用户</el-button>
          </div>
          <div class="p15"><el-page-header content="账户详情" @back="goBack" /></div>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="dx-container mt5">
          <div v-if="detailData.id" class="dx-main">
            <div class="product-detail-info">
              <div class="info-left">
                <div class="cover"><el-image style="width: 100px; height: 100px;border-radius: 50%;border: #eee 1px solid;" :src="detailData.get_wechat_user.avatarUrl" /></div>
                <p align="center">{{ detailData.name }}</p>
                <p align="center"><user-status :data="detailData" /></p>
                <!-- <p align="center">
									<el-dropdown @command="handleCommand">
										<el-button size="mini" round>操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
										<el-dropdown-menu slot="dropdown">
											<el-dropdown-item><router-link :to="'/sales/product/create?id='+detailData.id" class="fc-blue"><i class="el-icon-edit"></i> 编辑产品</router-link></el-dropdown-item>
											<el-dropdown-item divided command="del" class="fc-danger"><i class="el-icon-delete"></i> 删除产品</el-dropdown-item>
										</el-dropdown-menu>
									</el-dropdown>
								</p> -->
              </div>
              <div class="info-right" style="min-height: 220px;">
                <el-form ref="form" :inline="true" label-width="100px">
                  <el-row>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="姓名：">{{ detailData.get_worker.name }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="性别：">{{ detailData.get_worker.sexName }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="认证状态："><worker-status :data="detailData.get_worker" /></el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="出生年月：">{{ detailData.get_worker.birthday }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="身份证号码：">{{ detailData.get_worker.idcardno }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="签约状态："><sign-status :status="detailData.get_worker.sign_status" :role="12" /></el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="手机号码：">{{ detailData.get_worker.phone }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="加入时间：">{{ detailData.created_at }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="签约公司：">{{ detailData.get_worker.employerName }}</el-form-item>
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
            <el-tabs v-model="showTab" @tab-click="handleClick">
              <el-tab-pane name="task">
                <span slot="label"><i class="iconfont icon-task" /> 任务记录</span>
                <el-table :data="taskLists.data" empty-text="暂无" border style="width: 100%">
                  <el-table-column label="任务名称">
                    <template slot-scope="scope">
                      {{ scope.row.get_task.name }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="companyName" label="企业名称" />
                  <el-table-column prop="salary" label="工资" align="center" width="120" />
                  <el-table-column label="开始时间" align="center" width="120">
                    <template slot-scope="scope">
                      {{ scope.row.get_task.started_date }}
                    </template>
                  </el-table-column>
                  <el-table-column label="结束时间" align="center" width="120">
                    <template slot-scope="scope">
                      {{ scope.row.get_task.ended_date }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="remark" label="备注" />
                  <el-table-column label="状态" align="center" width="120">
                    <template slot-scope="scope">
                      <task-status :data="scope.row.get_task" />
                    </template>
                  </el-table-column>
                </el-table>
                <div class="list-bottom mt10 clearfix">
                  <div class="f-left" />
                  <div class="f-right">
                    <pagination v-show="taskLists.total>0" :total="taskLists.total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getTaskLists()" />
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane name="signs">
                <span slot="label"><i class="iconfont icon-contract" /> 签约记录</span>
                <sign-lists v-if="showTab=='signs'" :user_id="detailData.id" />
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- <el-dialog :visible.sync="infoModifyVisible" :title="'修改认证资料'" v-if="infoModifyVisible" width="1000px" @close='infoModifyClose'>
			<el-form :model="formData" ref="form" label-width="100px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="会员类别" prop="category">
							<el-select v-model="formData.category" placeholder="请选择">
								<el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="认证状态" prop="customer_id">
							<el-switch v-model="formData.category_status" :active-value="1" :inactive-value="0" active-text="" inactive-text=""></el-switch>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="姓名" prop="name" style="width:300px;" :rules="[{ required: true, message: '请输入姓名'}]">
							<el-input v-model="formData.name" type="text"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>

			<div slot="footer" class="dialog-footer clearfix">
				<div class="f-left"></div>
				<div class="f-right">
					<el-button @click="close()"><i class="el-icon-close"></i> 关闭</el-button>
					<el-button type="primary" @click="submitForm('form')" :loading="submitLoading"><i class="el-icon-check"></i> 提交</el-button>
				</div>
			</div>
		</el-dialog> -->

  </div>
</template>

<script>
import { detail, store, del } from '@/api/user'
import { users as taskUsers } from '@/api/task'
import Pagination from '@/components/Pagination'
import UserStatus from './components/UserStatus'
import WorkerStatus from './components/WorkerStatus'
import SignStatus from './components/SignStatus'
import TaskStatus from '@/views/task/components/TaskStatus'
import SignLists from '@/views/user/components/SignLists'
export default {
	components: { Pagination, UserStatus, WorkerStatus, SignStatus, TaskStatus, SignLists },
	data() {
		return {
			detailQuery: { loading: true },
			detailData: {},
			showTab: 'task',
		    appointments: this.listsData(this),
		    infoModifyVisible: false,
		    formData: {},
			submitLoading: false,
			taskLists: this.listsDefault(this)
		}
	},
	mounted() {
		this.detailQuery.id = this.$route.query.id
		this.init()
	},
	methods: {
		init() {
			detail(this.detailQuery).then(res => {
				this.detailData = res.data.data
				this.formData = { name: this.detailData.get_user_info.name, category: this.detailData.category, sex: this.detailData.sex, birthday: this.detailData.get_user_info.birthday, marriage: this.detailData.get_user_info.marriage, education: this.detailData.get_user_info.education, salary: this.detailData.get_user_info.salary, car: this.detailData.get_user_info.car, house: this.detailData.get_user_info.house }
				this.getTaskLists()
			})
		},
		getTaskLists() {
			taskUsers({ user_id: this.detailData.id }).then(res => {
				this.taskLists = res.data.lists
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
		handleClick(tab, event) {
			if (tab.name == 'appointments') {
        		listsAppointment({ user_id: this.detailData.id }).then(res => {
					this.appointments = res.data.lists
				})
        	}
		},
	    goBack() {
	    	this.$router.go(-1)
	    },
	    submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.submitLoading = true
					updateInfo(this.formData).then(res => {
						this.submitLoading = false
						this.$message.success(res.msg)
						this.detailData = res.data.user
						this.infoModifyVisible = false
					})
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		handleDelete() {
			this.$confirm('确认要删除该用户吗，该操作不可恢复，请谨慎操作？').then(res => {
	            del({ id: this.detailData.id }).then(res => {
					this.$message.success(res.msg)
					this.$store.dispatch('tagsView/delView', this.$route)
					this.$router.push({ path: '/user/lists' })
				})
	        }).catch(res => {})
		},
	    infoModifyClose() {

	    }
	}
}
</script>

<style>

</style>
