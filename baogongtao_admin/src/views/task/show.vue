<template>
  <div class="app-container">
    <el-row v-loading="detailData.loading">
      <el-col :span="24">
        <div class="dx-container">
          <div class="p15"><el-page-header content="任务详情" @back="goBack" /></div>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="dx-container mt5">
          <div class="dx-main">
            <div class="product-detail-info">
              <div class="info-left">
                <div class="cover"><el-image v-loading="detailData.loading" style="width: 100px; height: 100px" :src="detailData.coverMinUrl" lazy /></div>
                <p align="center">{{ detailData.name }}</p>
                <p align="center">
                  <el-dropdown @command="handleCommand">
                    <el-button size="mini" round>操作<i class="el-icon-arrow-down el-icon--right" /></el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item><router-link :to="'/company/edit?id='+detailData.id" class="fc-blue"><i class="el-icon-edit" /> 修改任务</router-link></el-dropdown-item>
                      <el-dropdown-item divided command="del" class="fc-danger"><i class="el-icon-delete" /> 删除任务</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </p>
              </div>
              <div class="info-right">
                <el-form ref="form" :inline="true" label-width="120px">
                  <el-row>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="任务名称：">{{ detailData.name }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="所属企业：">{{ detailData.companyName }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="任务编号：">{{ detailData.no }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="任务类型">{{ detailData.typeName }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="所在地：">{{ detailData.province }} {{ detailData.city }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="开始日期：">{{ detailData.started_date }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="单人预算：">{{ detailData.budget_single }} 元</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="公开报名：">{{ detailData.open?'是':'否' }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="结束日期：">{{ detailData.ended_date }}</el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="任务描述：">{{ detailData.content }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :lg="8">
                      <el-form-item label="任务状态："><task-status :data="detailData" /></el-form-item>
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
                <span slot="label"><i class="iconfont icon-worker" /> 任务派工</span>

                <div v-if="detailData.status >=3">
                  <div class="ptools p0 mb10 clearfix">
                    <div class="search-box f-left" />
                    <div class="f-right">
                      <el-button type="success" @click="handelDownload"><i class="el-icon-download" /> 下载模板</el-button>
                      <el-upload style="display: inline-block;" class="upload-demo" :action="uploadUrl" :data="uploadData" accept=".xlsx" :multiple="false" :show-file-list="false" :before-upload="beforeUpload" :on-success="successUpload">
                        <el-button type="primary"><i class="el-icon-upload" /> 上传派工</el-button>
                      </el-upload>
                    </div>
                  </div>

                  <task-users v-if="detailData.id" ref="taskUsers" :task_id="detailData.id" :status="1" />
                </div>
                <div v-else class="empty-div text-center">
                  <div><svg-icon icon-class="dx-empty" /></div>
                  <p class="fc-9">当前状态不能上传派工，如要上传派工，请等待任务状态转为“已发布”</p>
                  <!-- <p class="fc-9">当前企业暂未上传工人签约文件，请先前往上传 <router-link :to="'/company/show?id='+detailData.company_id"><el-button type="primary" size="mini">立即前往</el-button></router-link></p> -->
                </div>
              </el-tab-pane>
              <el-tab-pane name="contract">
                <span slot="label"><i class="iconfont icon-apply" /> 任务报名</span>
                <div class="ptools p0 mb10 clearfix">
                  <div class="search-box f-left" />
                  <div class="f-right">
                    <el-button type="success" @click="applyExport"><i class="el-icon-download" /> 导出报名记录</el-button>
                  </div>
                </div>
                <task-users v-if="detailData.id" ref="taskUsers0" :task_id="detailData.id" :status="0" />
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { detail, del, smsRemind, download } from '@/api/task'
import TaskStatus from './components/TaskStatus'
import TaskUsers from './components/TaskUsers'
import { Loading } from 'element-ui'
export default {
	components: { TaskStatus, TaskUsers },
	data() {
		return {
			pageLoading: false,
			uploadUrl: process.env.VUE_APP_BASE_API + '/task/upload',
			uploadData: {
				task_id: '',
				token: this.$store.getters.token
			},
			detailQuery: { loading: true },
			detailData: { loading: true },
			showTab: 'task'
		}
	},
	mounted() {
		this.detailQuery.id = this.$route.query.id
		this.uploadData.task_id = this.$route.query.id
		this.getDetailData()
	},
	methods: {
		getDetailData() {
			detail(this.detailQuery).then(res => {
				this.detailData = res.data.data
			})
		},
	    handleCommand(command) {
	        if (command == 'del') {
	        	this.$confirm('确认要删除该任务吗？').then(res => {
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
	    goBack() {
	    	this.$router.go(-1)
	    },
	    handelDownload() {
	    	window.open(process.env.VUE_APP_BASE_URL + 'upload/file/任务派工上传模板.xlsx')
	    },
	    beforeUpload() {
	    	Loading.service({ text: '上传中...' })
	    },
	    successUpload(res) {
	    	// console.log(res)
	    	Loading.service().close()
	    	if (res.code == 0) {
	    		this.msgSuccess(res.msg, this)
	    		this.$refs.taskUsers.getListsData()
		    	smsRemind({ task_id: this.detailData.id }).then(res => {

		    	})
	    	} else {
	    		this.msgError(res.msg, this)
	    	}
	    },
	    applyExport() {
	    	window.open(process.env.VUE_APP_BASE_URL + 'api/task/download?token=' + this.$store.getters.token + '&action=task_user&task_id=' + this.detailData.id)
	    }

	}
}
</script>

<style>

</style>
