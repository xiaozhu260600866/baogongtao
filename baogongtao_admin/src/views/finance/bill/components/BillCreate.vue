<template>
  <div class="dx-main">
    <div class="list-box">
      <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" :title="billName + '款计划'" width="1000px" @close="close">
        <el-form ref="form" :model="formData" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="客户" prop="customer_id">
                <el-input v-model="formData.customer" type="text" placeholder="请选择客户" readonly :clearable="true"><el-button slot="append" @click="customerSelVisible=true">选择</el-button></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'应' + billName + '金额'" prop="amount" style="width:300px;" :rules="[{validator: checkMoney, trigger: 'blur'}]">
                <el-input v-model="formData.amount" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'应' + billName + '日期'" prop="ought_date" :rules="[{ required: true, message: '请输入应' + billName + '日期'}]">
                <el-date-picker v-model="formData.ought_date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="业务员" prop="saler" style="width:300px;">
                <el-input v-model="formData.saler" type="text" readonly><el-button slot="append" icon="el-icon-search" :disabled="this.orderData.id?true:false" @click="toSelectUser()" /></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="formData.remark"type="textarea" :rows="3" autocomplete="off" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <div slot="footer" class="dialog-footer clearfix">
          <div class="f-left" />
          <div class="f-right">
            <el-button @click="close()"><i class="el-icon-close" /> 关闭</el-button>
            <el-button type="primary" :loading="submitLoading" @click="submitForm('form')"><i class="el-icon-check" /> 提交</el-button>
          </div>
        </div>
      </el-dialog>

      <user-select :visible="userSelVisible" :length="1" @close="userSelVisible=false" @select="userSelected" />
      <customer-select :visible="customerSelVisible" :length="1" :category="category" @close="customerSelVisible=false" @select="customerSelected" />

    </div>
  </div>
</template>

<script>
import { lists as customerLists } from '@/api/sales/customer'
import { detail as orderDetail } from '@/api/sales/order'
import { detail as purchaseDetail } from '@/api/inventory/purchase'
import { store } from '@/api/finance/bill'
import UserSelect from '@/views/hr/archive/components/UserSelect'
import CustomerSelect from '@/views/sales/customer/components/CustomerSelect'
export default {
	components: { UserSelect, CustomerSelect },
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		category: {
			type: Number,
			default: 0
		},
		orderId: {
			type: Number,
			default: 0
		},
		purchaseId: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			billName: '',
			dialogVisible: false,
			userSelVisible: false,
			submitLoading: false,
			billData: {},
			capitalAccountsData: {},
			customersData: {},
			orderData: {},
			detailData: {},
			formData: { category: this.category, source_type: 1, customer_id: '', amount: '', remark: '', ought_date: this.getNowDate(), creator_id: this.$store.getters.user_id, creator: this.$store.getters.name, saler_id: this.$store.getters.user_id, saler: '' },
			customerSelVisible: false
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
			this.billName = this.category == 2 ? '付' : '收',
			customerLists({}).then(res => {
				this.customersData = res.data.lists
			})
			if (this.orderId) {
				orderDetail({ id: this.orderId }).then(res => {
					this.orderData = res.data.data
					this.formData.customer_id = this.orderData.customer_id
					this.formData.customer = this.orderData.customerName
					this.formData.saler = this.orderData.saler
					this.formData.saler_id = this.orderData.saler_id
					this.formData.source_type = 2
					this.formData.source_id = this.orderData.id
				})
			} else if (this.purchaseId) {
				purchaseDetail({ id: this.purchaseId }).then(res => {
					this.orderData = res.data.data
					this.formData.category = this.orderData.category == 1 ? 2 : 1
					this.formData.customer_id = this.orderData.customer_id
					this.formData.customer = this.orderData.customerName
					this.formData.saler = this.orderData.creator
					this.formData.saler_id = this.orderData.creator_id
					this.formData.source_type = this.orderData.category == 1 ? 3 : 4
					this.formData.source_id = this.orderData.id
				})
			}
		},
	    customerSelected(data) {
	    	if (data.length) {
	    		this.formData.customer_id = data[0].id
	    		this.formData.customer = data[0].name
	    	} else {
	    		this.formData.customer_id = ''
	    		this.formData.customer = ''
	    	}
	    	this.customerSelVisible = false
	    },
	    toSelectUser() {
	    	this.userSelVisible = true
	    },
	    userSelected(data) {
	    	this.formData.saler_id = data[0].id
	    	this.formData.saler = data[0].name
	    	this.userSelVisible = false
	    },
	    submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.submitLoading = true
					store(this.formData).then(res => {
						this.$message.success(res.msg)
						this.close(res.data.data)
						this.submitLoading = false
					})
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		close(data = null) {
			this.$emit('close', data)
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
