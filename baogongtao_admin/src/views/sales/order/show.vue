<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="dx-container">
          <div class="dx-tools">
            <router-link v-if="detailData.status>2 && detailData.status<8" :to="'/inventory/purchase2/create?order_id='+detailData.id"><el-button type="success" size="mini"><i class="iconfont icon-inventory-out" /> 销售出库</el-button></router-link>
            <el-button v-if="detailData.status>2 && detailData.status<8" type="primary" size="mini" @click="materialAnalysis"><i class="el-icon-s-marketing" /> 物料分析</el-button>
            <el-button v-if="detailData.status > 2 && detailData.pay_status<8" type="warning" size="mini" @click="handelCreateBill"><i class="iconfont icon-receivable" /> 新增收款计划</el-button>
            <el-button v-if="detailData.status===0" type="warning" size="mini" @click="toExamine"><i class="el-icon-s-claim" /> 提交审核</el-button>
            <el-button v-if="detailData.status===1 || detailData.status==2" type="success" size="mini" @click="examine(3)"><i class="el-icon-circle-check" /> 审核通过</el-button>
            <el-button v-if="detailData.status===1" type="danger" size="mini" @click="examine(2)"><i class="el-icon-remove-outline" /> 审核不通过</el-button>
          </div>
          <div class="p15"><el-page-header content="销售单详情" @back="goBack" /></div>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="dx-container mt5">
          <div class="dx-main">
            <div class="product-detail-info">
              <div class="info-left">
                <div class="cover" />
                <p v-if="detailData.status==0" align="center">
                  <i class="el-icon-tickets fc-9" style="font-size: 60px;" /><br>
                  <el-tag type="info">{{ detailData.statusName }}</el-tag>
                </p>
                <p v-if="detailData.status==1" align="center">
                  <i class="el-icon-time fc-warning" style="font-size: 60px;" /><br>
                  <el-tag type="warning">{{ detailData.statusName }}</el-tag>
                </p>
                <p v-if="detailData.status==2" align="center">
                  <i class="el-icon-warning-outline fc-danger" style="font-size: 60px;" /><br>
                  <el-tag type="danger">{{ detailData.statusName }}</el-tag>
                </p>
                <p v-if="detailData.status==3" align="center">
                  <i class="el-icon-video-play fc-primary" style="font-size: 60px;" /><br>
                  <el-tag>{{ detailData.statusName }}</el-tag>
                </p>
                <p v-if="detailData.status==8" align="center">
                  <i class="el-icon-circle-check fc-success" style="font-size: 60px;" /><br>
                  <el-tag type="success">{{ detailData.statusName }}</el-tag>
                </p>
                <p v-if="detailData.status<3" align="center">
                  <el-dropdown @command="handleCommand">
                    <el-button size="mini" round>操作<i class="el-icon-arrow-down el-icon--right" /></el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-if="detailData.status===0" command="toExamine" class="fc-primary"><i class="el-icon-s-claim" /> 提交审核</router-link></el-dropdown-item>
                      <el-dropdown-item><router-link :to="'/sales/order/create?id='+detailData.id" class="fc-blue"><i class="el-icon-edit" /> 编辑销售单</router-link></el-dropdown-item>
                      <el-dropdown-item divided command="del" class="fc-danger"><i class="el-icon-delete" /> 删除销售单</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </p>
              </div>
              <div class="info-right">
                <el-alert v-if="detailData.status==2" :title="'此销售订单审核不通过，不通过理由：【'+detailData.examined_remark+'】'" type="error" style="margin-bottom:10px;" />
                <el-form ref="form" :inline="true" label-width="100px">
                  <el-row>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="销售单名称：">{{ detailData.name }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="销售单号：">{{ detailData.no }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="开单日期：">{{ detailData.action_date }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="客户：">{{ detailData.customerName }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="订单总量：">{{ detailData.num }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="交货日期：">{{ detailData.delivery_date }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="产品总额：">{{ detailData.amount_pro }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="运杂费：">{{ detailData.amount_extras }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="销售员：">{{ detailData.saler }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="优惠：">{{ detailData.amount_discount }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="收款计划：">{{ detailData.receivablePlanName }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="订单总额：">{{ detailData.amount }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="已收款：">{{ detailData.amount_completed }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="未收款：">{{ detailData.amount - detailData.amount_completed }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="收款状态：">{{ detailData.payStatusName }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :lg="24">
                      <el-form-item label="备注：">{{ detailData.remark }}</el-form-item>
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
              <el-tab-pane name="items">
                <span slot="label"><i class="el-icon-s-order" /> 产品明细</span>
                <el-table :data="detailData.get_items" empty-text="无产品信息" show-summary border style="width: 100%">
                  <el-table-column label="产品名称"><template slot-scope="scope">{{ scope.row.get_item.name }}</template></el-table-column>
                  <!-- <el-table-column label="型号" align="center" width="120"><template slot-scope="scope">{{ scope.row.get_item.model }}</template></el-table-column> -->
                  <el-table-column align="center" label="现有库存" width="80"><template slot-scope="scope">{{ scope.row.get_item.stock }}</template></el-table-column>
                  <el-table-column prop="price_sale" label="销售单价" align="center" width="100" />
                  <el-table-column prop="price_sale_actual" label="实际售价" align="center" width="100" />
                  <el-table-column prop="num" label="销售数量" align="center" width="100" />
                  <el-table-column prop="num_completed" label="已出货" align="center" width="100" />
                  <el-table-column label="未出货" align="center" width="100">
                    <template slot-scope="scope">
                      {{ scope.row.num - scope.row.num_completed }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="amount" label="小计" align="center" width="120" />
                  <el-table-column label="备注" align="center" width="150"><template slot-scope="scope">{{ scope.row.remark }}</template></el-table-column>
                  <el-table-column label="状态" align="center" width="120">
                    <template slot-scope="scope">
                      <el-tag v-if="scope.row.status===0" type="danger">{{ scope.row.statusName }}</el-tag>
                      <el-tag v-if="scope.row.status===1" type="warning">{{ scope.row.statusName }}</el-tag>
                      <el-tag v-if="scope.row.status===2" type="success">{{ scope.row.statusName }}</el-tag>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane name="purchase1">
                <span slot="label"><i class="el-icon-document" /> 采购单据</span>
                <PurchaseListsTb v-if="showTab=='purchase1'" :category="1" :lists-data="purchase1Lists" :selector="false" :operate="false" />
              </el-tab-pane>
              <el-tab-pane name="inventoryIn">
                <span slot="label"><i class="iconfont icon-inventory-in" /> 入库记录</span>
                <InventoryRecordTb v-if="showTab=='inventoryIn'" :lists-data="InventoryInLists" />
              </el-tab-pane>
              <el-tab-pane name="purchase2">
                <span slot="label"><i class="el-icon-document" /> 销货单据</span>
                <PurchaseListsTb v-if="showTab=='purchase2'" :category="2" :lists-data="purchase2Lists" :selector="false" :operate="false" />
              </el-tab-pane>
              <el-tab-pane name="inventoryOut">
                <span slot="label"><i class="iconfont icon-inventory-out" /> 出货记录</span>
                <InventoryRecordTb v-if="showTab=='inventoryOut'" :lists-data="InventoryOutLists" />
              </el-tab-pane>
              <el-tab-pane name="billLists">
                <span slot="label"><i class="iconfont icon-receivable" /> 收款计划</span>
                <bill-lists-tb :query="billListQuery" :category="1" :reflash="billReflash" />
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog v-if="materialAnalysisVisible" :visible.sync="materialAnalysisVisible" title="物料分析" width="80%">
      <el-table v-loading="materialAnalysisData.listLoading" element-loading-text="物料分析中..." :data="materialAnalysisData.data" border style="width: 100%">
        <el-table-column prop="name" label="物料名称" />
        <el-table-column prop="unit" label="单位" align="center" width="100" />
        <el-table-column prop="stock" label="库存" align="center" width="120" />
        <el-table-column prop="distributions" label="库存已分配" align="center" width="120" />
        <el-table-column prop="demand" label="毛需求" align="center" width="120" />
        <el-table-column prop="purchase_num" label="当前采购订单数量" align="center" width="150" />
        <el-table-column label="净需求" align="center" width="120">
          <template slot-scope="scope"><span class="fw-bold" :class="scope.row.demand_net>0?'fc-danger':'fc-success'">{{ scope.row.demand_net }}</span></template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <router-link v-if="detailData.status>2" :to="'/inventory/purchase1/create?order_id='+detailData.id"><el-button type="primary"><i class="el-icon-document" /> 生成采购单据</el-button></router-link>
      </div>
    </el-dialog>

    <bill-create :visible="billCreateVisible" :order-id="detailData.id" :category="1" @close="billCreateClose" />
    <bill-detail :id="billDetailId" :visible="billDetailVisible" @close="billDetailClose" />
  </div>
</template>

<script>
import { detail, del, action, materielAnalysis } from '@/api/sales/order'
import { lists as purchaseLists } from '@/api/inventory/purchase'
import { inventoryRecords } from '@/api/inventory/inout'
import PurchaseListsTb from '@/views/inventory/purchase/components/PurchaseListsTb'
import InventoryRecordTb from '@/views/inventory/inout/components/InventoryRecordTb'
import BillCreate from '@/views/finance/bill/components/BillCreate'
import BillDetail from '@/views/finance/bill/components/BillDetail'
import BillListsTb from '@/views/finance/bill/components/BillListsTb'
export default {
	components: { PurchaseListsTb, InventoryRecordTb, BillCreate, BillDetail, BillListsTb },
	data() {
		return {
			detailQuery: { loading: true },
			detailData: {},
			showTab: 'items',
			materialAnalysisVisible: false,
			materialAnalysisData: this.listsData(this),
			purchase1Lists: this.listsData(this),
			purchase2Lists: this.listsData(this),
			InventoryInLists: this.listsData(this),
			InventoryOutLists: this.listsData(this),
			billCreateVisible: false,
			billDetailVisible: false,
			billDetailId: 0,
			billListQuery: this.queryDefault(this),
			billReflash: 0
		}
	},
	mounted() {
		this.detailQuery.id = this.$route.query.id
		this.getDetailData()
	},
	methods: {
		getDetailData() {
			detail(this.detailQuery).then(res => {
				this.detailData = res.data.data
				this.billListQuery.source_type = 2
				this.billListQuery.source_id = this.detailData.id
			})
		},
		className(v) {
			return this.treeData2LevelStr(this.classesArr, v)
		},
		handleClick(tab, event) {
        	if (tab.name == 'purchase1') {
        		purchaseLists({ category: 1, order_id: this.detailData.id }).then(res => {
					this.purchase1Lists = res.data.lists
				})
        	} else if (tab.name == 'purchase2') {
        		purchaseLists({ category: 2, order_id: this.detailData.id }).then(res => {
					this.purchase2Lists = res.data.lists
				})
        	} else if (tab.name == 'inventoryIn') {
        		inventoryRecords({ order_id: this.detailData.id, category: 1 }).then(res => {
					this.InventoryInLists = res.data.lists
				})
        	} else if (tab.name == 'inventoryOut') {
        		inventoryRecords({ order_id: this.detailData.id, category: 2 }).then(res => {
					this.InventoryOutLists = res.data.lists
				})
        	} else if (tab.name == 'billLists') {
        		this.billReflash += 1
        	}
    	},
	    goBack() {
	    	this.$router.go(-1)
	    },
	    handleCommand(command) {
	        if (command == 'del') {
	        	this.$confirm('确认要删除该销售单吗？', { type: 'warning' }).then(res => {
		            del({ id: this.detailData.id }).then(res => {
						this.$message.success(res.msg)
						this.$store.dispatch('tagsView/delView', this.$route)
						this.$router.push({ path: '/sales/order/lists' })
					})
		        }).catch(res => {})
	        } else if (command == 'toExamine') {
	        	this.toExamine()
	        }
	    },
	    toExamine() {
	    	this.tytConfirm({ msg: '确认要已完成该销售单内容的编辑并提交至审核吗？' }, this).then(obj => {
	    		action({ action: 'to-examine', id: this.detailData.id }).then(res => {
            		obj.instance.confirmButtonLoading = false
					this.$message.success(res.msg)
					this.detailData = res.data.data
					obj.done()
				}).catch(res => { obj.instance.confirmButtonLoading = false; obj.instance.confirmButtonText = '确定'; obj.done() })
	    	})
	    },
	    examine(status) {
	    	const txt = status == 2 ? '不' : ''
	    	const showInput = status == 2
	    	this.tytConfirm({ msg: '确认要审核' + txt + '该销售单吗？', showInput: showInput, inputType: 'textarea', inputPlaceholder: '请填写不通过理由' }, this).then(obj => {
	    		action({ action: 'examine', id: this.detailData.id, value: status, examined_remark: obj.instance.inputValue }).then(res => {
            		obj.instance.confirmButtonLoading = false
					this.$message.success(res.msg)
					this.detailData = res.data.data
					obj.done()
				}).catch(() => { obj.instance.confirmButtonLoading = false; obj.instance.confirmButtonText = '确定'; obj.done() })
	    	})
	    },
	    materialAnalysis() {
	    	this.materialAnalysisData.listLoading = true
        	this.materialAnalysisVisible = true
	    	materielAnalysis({ id: this.detailData.id }).then(res => {
	    		this.materialAnalysisData.listLoading = false
        		this.materialAnalysisData.data = res.data.data
			})
	    },
	    handelCreateBill() {
	    	this.billCreateVisible = true
	    },
	    billCreateClose(data) {
	    	if (data) {
	    		this.billDetailId = data.id
	    		this.billCreateVisible = false
	    		this.billDetailVisible = true
	    	} else {
	    		this.billCreateVisible = false
	    	}
	    },
	    billDetailClose() {
	    	this.billDetailVisible = false
	    }
	}
}
</script>

<style>

</style>
