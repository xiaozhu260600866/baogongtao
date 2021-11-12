<template>
  <div class="dx-main">
    <div class="list-box">
      <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" title="详情" width="1000px" @close="close">
        <el-form ref="form" :inline="true" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="客户名称：">{{ detailData.customerName }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="billName + '款状态：'">
                <bill-status :data="detailData" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'应' + billName + '金额：'">{{ amountFormat(detailData.amount) }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'应' + billName + '日期：'">{{ detailData.ought_date }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'已' + billName + '金额：'">{{ amountFormat(detailData.amount_completed) }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="(category==1?'到帐':'付款') + '日期：'">{{ detailData.completed_date }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'未' + billName + '金额：'">{{ amountFormat(detailData.amount - detailData.amount_completed) }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="业务员：">{{ detailData.saler }}</el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注：">{{ detailData.remark }}</el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <el-table v-loading="listsData.listLoading" :data="listsData.lists" border style="width: 100%" header-cell-class-name="bg-f2" :empty-text="'暂无' + billName + '款记录'">
          <el-table-column prop="created_at" label="时间" align="center" />
          <el-table-column prop="amount" :label="billName + '款金额'" align="center" />
          <el-table-column prop="creator" label="操作员" align="center" />
          <el-table-column prop="remark" label="摘要" align="center" />
        </el-table>
        <div slot="footer" class="dialog-footer clearfix">
          <div class="f-left" />
          <div class="f-right">
            <el-button @click="close()"><i class="el-icon-close" /> 关闭</el-button>
            <el-button v-if="detailData.status<8" type="primary" @click="transactionVisible=true"><i class="iconfont icon-receivable" /> {{ billName }}款</el-button>
          </div>
        </div>
      </el-dialog>

      <transaction :visible="transactionVisible" :bill-id="id" :category="category" @close="transactionClose" />
    </div>
  </div>
</template>

<script>
import { detail, recordLists } from '@/api/finance/bill'
import BillStatus from '@/views/finance/bill/components/BillStatus'
import Transaction from '@/views/finance/bill/components/Transaction'
export default {
	components: { BillStatus, Transaction },
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		id: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			category: 0,
			billName: '',
			dialogVisible: false,
			transactionVisible: false,
			detailData: {},
			listsData: this.listsData(this),
			updated: false
		}
	},
	watch: {
		visible(val) {
			this.dialogVisible = val
			if (val == true) {
				this.getData()
				this.updated = false
			}
		}
	},
	mounted() {
	},
	methods: {
		getData() {
			detail({ id: this.id }).then(res => {
				this.detailData = res.data.data
				this.category = this.detailData.category
				this.billName = this.category == 1 ? '收' : '付'
			})
			recordLists({ bill_id: this.id }).then(res => {
				this.listsData = res.data
			})
		},
		transactionClose() {
			this.transactionVisible = false
			this.getData()
			this.updated = true
		},
		close() {
			this.$emit('close', this.updated)
		}
	}
}
</script>

<style lang="scss" scoped>
.el-form-item{margin-bottom: 12px;}
</style>
