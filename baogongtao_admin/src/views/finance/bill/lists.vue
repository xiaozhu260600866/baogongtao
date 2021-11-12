<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="dx-container">
          <tyt-page-header :content="billName + '账款'" />
          <div class="dx-main">
            <div class="ptools pb0 clearfix">
              <div class="search-box f-left">
                <el-form :inline="true" :model="listQuery">
                  <el-form-item>
                    <el-input v-model="listQuery.customer" type="text" placeholder="所属客户" readonly :clearable="true"><el-button slot="append" @click="customerSelVisible=true">选择</el-button></el-input>
                  </el-form-item>
                  <el-form-item style="width:180px;">
                    <el-input v-model="listQuery.saler" type="text" placeholder="业务员" readonly :clearable="true"><el-button slot="append" @click="userSelVisible=true">选择</el-button></el-input>
                  </el-form-item>
                  <el-form-item style="width:200px;">
                    <el-select v-model="listQuery.status" multiple placeholder="请选择">
                      <el-option v-for="item in statusData" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="searchForm('form')"><i class="el-icon-search" /> 搜索</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div class="f-right">
                <el-button type="primary" @click="handelCreate"><i class="el-icon-plus" /> 创建{{ billName }}账款</el-button>
              </div>
            </div>

            <bill-lists-tb :query="listQuery" :category="category" :reflash="listReflash" :auto="true" />

          </div>
        </div>
      </el-col>
    </el-row>

    <transaction :visible="transactionVisible" :category="1" @close="transactionVisible=false" />
    <bill-create :visible="billCreateVisible" :category="category" @close="billCreateClose" />
    <user-select :visible="userSelVisible" :length="1" @close="userSelVisible=false" @select="userSelected" />
    <customer-select :visible="customerSelVisible" :length="1" :category="1" @close="customerSelVisible=false" @select="customerSelected" />
  </div>
</template>

<script>
import BillCreate from '@/views/finance/bill/components/BillCreate'
import BillListsTb from '@/views/finance/bill/components/BillListsTb'
import Transaction from '@/views/finance/bill/components/Transaction'
import UserSelect from '@/views/hr/archive/components/UserSelect'
import CustomerSelect from '@/views/sales/customer/components/CustomerSelect'
export default {
	components: { BillCreate, BillListsTb, Transaction, UserSelect, CustomerSelect },
	props: ['category'],
	data() {
		return {
			billName: this.category == 2 ? '应付' : '应收',
		    listQuery: this.queryDefault(this),
		    statusData: [{ value: 0, label: '未收款' }, { value: 1, label: '已收部分' }, { value: 2, label: '已收款' }],
		    transactionVisible: false,
		    billCreateVisible: false,
		    userSelVisible: false,
		    customerSelVisible: false,
		    listReflash: 0
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		init() {
			// this.getListsData();
		},

	    userSelected(data) {
	    	if (data.length) {
	    		this.listQuery.saler_id = data[0].id
	    		this.listQuery.saler = data[0].name
	    	} else {
	    		this.listQuery.saler_id = ''
	    		this.listQuery.saler = ''
	    	}
	    	this.userSelVisible = false
	    },
	    customerSelected(data) {
	    	if (data.length) {
	    		this.listQuery.customer_id = data[0].id
	    		this.listQuery.customer = data[0].name
	    	} else {
	    		this.listQuery.customer_id = ''
	    		this.listQuery.customer = ''
	    	}
	    	this.customerSelVisible = false
	    },
		searchForm() {
			this.listReflash += 1
		},
		handelCreate() {
			this.billCreateVisible = true
		},
		billCreateClose(data) {
			if (data) this.listReflash += 1
			this.billCreateVisible = false
		}
	}
}
</script>

<style>
</style>
