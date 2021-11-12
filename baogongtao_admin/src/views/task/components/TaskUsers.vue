<template>
  <div class="dx-main">

    <el-table v-loading="listLoading" :data="listData.data" empty-text="暂无" border style="width: 100%" @selection-change="selectChange">
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column type="index" label="序号" align="center" width="55" />
      <el-table-column prop="name" label="姓名" align="center" />
      <el-table-column prop="sexName" label="性别" width="100" align="center" />
      <el-table-column prop="idcardno" label="身份证号码" align="center" />
      <el-table-column prop="phone" label="联系电话" align="center" />
      <el-table-column v-if="status==1" prop="salary" label="个人经营所得" align="center" />
      <el-table-column v-if="status==1" prop="operator" label="操作员" align="center" />
      <el-table-column v-if="status==1" prop="remark" label="备注" />
      <el-table-column label="操作" align="right" width="120">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handelDelete(scope.$index, scope.row)"><i class="el-icon-delete" /> 删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="list-bottom mt10 clearfix">
      <div class="f-left"><el-button type="danger" :disabled="this.selectLists.length===0" @click="selectDelete"><i class="el-icon-delete-solid" /> 批量删除</el-button></div>
      <div class="f-right">
        <pagination v-show="listData.total>0" :total="listData.total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getArticleLists(2)" />
      </div>
    </div>

  </div>
</template>

<script>
import { users, userDelete } from '@/api/task'
import Pagination from '@/components/Pagination'
export default {
	components: { Pagination },
	props: {
		taskId: {
			type: Number,
			default: 0
		},
		status: {
			type: Number,
			default: ''
		}
	},
	data() {
		return {
			listLoading: false,
			listData: this.listsDefault(this),
			listQuery: this.listQuery(this, 10),
			selectLists: []
		}
	},
	mounted() {
		this.listQuery.task_id = this.task_id
		this.listQuery.status = this.status
		this.getListsData()
	},
	methods: {
		getListsData() {
			this.listLoading = true
			users(this.listQuery).then(res => {
				this.listData = res.data.lists
				this.listLoading = false
			})
		},
		searchForm() {
			this.getListsData()
		},
	    handelDelete(index, row) {
	    	this.tytConfirm({ msg: '确认要删除该人员吗？' }, this).then(obj => {
    			userDelete({ id: row.id }).then(res => {
    				obj.instance.confirmButtonLoading = false
					this.$message.success(res.msg)
					this.listData.data.splice(index, 1)
					obj.done()
				})
	    	}).catch(obj => { obj.instance.confirmButtonLoading = false })
	    },
		selectChange(sels) {
			this.selectLists = sels
		},

		selectDelete() {
			this.$confirm('确认要删除所选人员吗？').then(res => {
	            userDelete({ id: this.selectLists2IdStr(this.selectLists) }).then(res => {
					this.$message.success(res.msg)
					this.getListsData()
				})
	        }).catch(res => {})
		}
	}
}
</script>
