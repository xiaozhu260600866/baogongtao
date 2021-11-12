<template>
  <div class="dx-main">
    <div class="list-box">
      <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" :title="billName + '款'" width="1000px" @close="close">
        <div v-if="billData" class="bill-detail">
          <h4>来自应{{ billName }}账款</h4>
          <el-form ref="form" :inline="true" label-width="100px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="客户名称：">{{ billData.customerName }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="billName + '款状态：'">
                  <bill-status :data="billData" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="'应' + billName + '金额：'">{{ amountFormat(billData.amount) }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="'应' + billName + '日期：'">{{ billData.ought_date }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="'已' + billName + '金额：'">{{ amountFormat(billData.amount_completed) }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="(category==1?'到帐':'付款') + '日期：'">{{ billData.completed_date }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="'未' + billName + '金额：'">{{ amountFormat(billData.amount - billData.amount_completed) }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="业务员：">{{ billData.saler }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <el-form ref="form" :model="formData" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="收款账号" prop="account_id" :rules="[{ required: true, message: '请选择' + billName + '款账号'},]">
                <el-select v-model="formData.account_id" placeholder="请选择">
                  <el-option v-for="item in capitalAccountsData" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="billName + '款金额'" prop="amount" style="width:300px;">
                <el-input v-model="formData.amount" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户" prop="customer_id">
                <el-select v-model="formData.customer_id" placeholder="请选择" :disabled="this.billData?true:false">
                  <el-option v-for="item in customersData" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="billName + '款人'" prop="payee" style="width:300px;">
                <el-input v-model="formData.payee" type="text" readonly><el-button slot="append" icon="el-icon-search" @click="toSelectUser()" /></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="业务员" prop="saler" style="width:300px;">
                <el-input v-model="formData.saler" type="text" readonly><el-button slot="append" icon="el-icon-search" :disabled="this.billData?true:false" @click="toSelectUser()" /></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="billName + '款日期'" prop="action_date">
                <el-date-picker v-model="formData.action_date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="摘要" prop="remark">
                <el-input v-model="formData.remark"type="textarea" :rows="3" autocomplete="off" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <div slot="footer" class="dialog-footer clearfix">
          <div class="f-left" />
          <div class="f-right">
            <el-button @click="close()"><i class="el-icon-close" /> 关闭</el-button>
            <el-button type="primary" @click="submitForm('form')"><i class="el-icon-check" /> 提交</el-button>
          </div>
        </div>
      </el-dialog>

      <user-select :visible="userSelVisible" :length="1" @close="userSelVisible=false" @select="userSelected" />

    </div>
  </div>
</template>

<script>
import { detail as billDetail } from '@/api/finance/bill'
import { capitalAccounts } from '@/api/finance/base'
import { lists as customerLists } from '@/api/sales/customer'
import { store } from '@/api/finance/capital'
import UserSelect from '@/views/hr/archive/components/UserSelect'
import BillStatus from '@/views/finance/bill/components/BillStatus'
export default {
	components: { UserSelect, BillStatus },
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		category: {
			type: Number,
			default: 0
		},
		billId: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			billName: this.category == 2 ? '付' : '收',
			dialogVisible: false,
			userSelVisible: false,
			billData: {},
			capitalAccountsData: {},
			customersData: {},
			detailData: {},
			formData: { category: this.category, source_type: 1, amount: '', remark: '', action_date: this.getNowDate(), creator_id: this.$store.getters.user_id, creator: this.$store.getters.name, payee_id: 0, payee: this.$store.getters.name, saler_id: this.$store.getters.user_id, saler: '' }
		}
	},
	watch: {
		visible(val) {
			this.dialogVisible = val
			if (val == true) this.getData()
		}
	},
	mounted() {

	},
	methods: {
		getData() {
			if (this.billId) {
				billDetail({ id: this.billId }).then(res => {
					this.billData = res.data.data
					console.log(this.formData)
					this.category = this.billData.category
					this.billName = this.category == 2 ? '付' : '收'
					this.formData.category = this.category
					this.formData.source_type = 2
					this.formData.source_id = this.billData.id
					this.formData.customer_id = this.billData.customer_id
					this.formData.saler_id = this.billData.saler_id
					this.formData.saler = this.billData.saler
					this.formData.amount = this.billData.amount - this.billData.amount_completed
				})
			} else {
				this.formData = { source_type: 1, action_date: this.getNowDate(), creator_id: this.$store.getters.user_id, creator: this.$store.getters.name, payee_id: this.$store.getters.user_id, payee: this.$store.getters.name }
			}

			capitalAccounts({}).then(res => {
				this.capitalAccountsData = res.data.lists
			})
			customerLists({}).then(res => {
				this.customersData = res.data.lists
			})
		},
	    toSelectUser() {
	    	this.userSelVisible = true
	    },
	    userSelected(data) {
	    	this.formData.payee_id = data[0].id
	    	this.formData.payee = data[0].name
	    	this.userSelVisible = false
	    },
	    submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					store(this.formData).then(res => {
						this.$message.success(res.msg)
						this.close()
					})
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		close() {
			this.$emit('close')
		}
	}
}
</script>

<style lang="scss" scoped>
.bill-detail{
	padding: 10px;background-color: #f0f9eb;border: #d8efcc 1px solid;border-radius: 5px;margin-bottom: 15px;
	h4{text-align: center;color: #48792c;}
	.el-form-item{margin-bottom: 5px;}
}
</style>
