<template>
  <div class="dx-main">
    <div class="list-box">

      <el-table v-loading="listLoading" :data="listData.data" border style="width: 100%" @selection-change="selectChange">
        <template slot="empty">
          <div class="empty-div">
            <div><svg-icon icon-class="dx-empty" /></div>
            <p>暂无</p>
          </div>
        </template>
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="phone" label="联系电话" />
        <el-table-column prop="idcardno" label="身份证号码" />
        <el-table-column prop="created_at" align="center" label="加入时间" width="180" />
      </el-table>
      <div class="list-bottom mt10 clearfix">
        <div class="f-left" />
        <div class="f-right">
          <pagination v-show="listData.total>0" :total="listData.total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListsData" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { workers } from '@/api/user'
import Pagination from '@/components/Pagination'
export default {
	components: { Pagination },
	props: {
		companyId: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			listLoading: false,
			listData: this.listsDefault(this),
			listQuery: this.listQuery(this, 5)
		}
	},
	mounted() {
		this.listQuery.company_id = this.company_id
		this.getListsData()
	},
	methods: {
		getListsData() {
			this.listLoading = true
			workers(this.listQuery).then(res => {
				this.listData = res.data.lists
				this.listLoading = false
			})
		},
		searchForm() {
			this.getListsData()
		},
	    handelDelete(index, row) {
	    	this.tytConfirm({ msg: '确认要删除该文章吗？' }, this).then(obj => {
    			del({ id: row.id }).then(res => {
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
			this.$confirm('确认要删除所选文章吗？').then(res => {
	            del({ id: this.selectLists2IdStr(this.selectLists) }).then(res => {
					this.$message.success(res.msg)
					this.getListsData()
				})
	        }).catch(res => {})
		},
		close() {
			this.$emit('close')
		}
	}
}
</script>
