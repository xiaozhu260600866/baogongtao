<template>
  <div class="app-container">
    <el-row v-loading="detailData.loading" style="margin-bottom: 60px;">
      <el-form ref="form" :model="formData" label-width="100px">
        <el-col :span="24">
          <div class="dx-container">
            <div class="p15"><el-page-header :content="pageTitle" @back="goBack" /></div>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="dx-container mt5">

            <div class="dx-title">
              <h1><i class="el-icon-s-unfold" /> 基本信息</h1>
            </div>
            <div class="dx-main">
              <div class="list-box mt20">

                <el-row>
                  <el-col :span="16">
                    <el-form-item label="销售单名称" prop="name" :rules="[{ required: true, message: '销售单名称不能为空'}]">
                      <el-input v-model="formData.name" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="开单日期" prop="created_date">
                      <el-date-picker v-model="formData.created_date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="客户" prop="customer_id">
                      <el-input v-model="formData.customer" type="text" placeholder="请选择客户" readonly :clearable="true"><el-button slot="append" @click="customerSelVisible=true">选择</el-button></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="销售单号" prop="no">
                      <el-input v-model="formData.no" type="text" placeholder="不填写由系统自动生成" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="交货日期" prop="delivery_date">
                      <el-date-picker v-model="formData.delivery_date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="备注">
                      <el-input v-model="formData.remark"type="textarea" :rows="3" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="销售人员" prop="saler_id">
                      <el-input v-model="formData.saler" type="text" readonly><el-button slot="append" icon="el-icon-search" @click="toSelectUser()" /></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :span="24">
          <div class="dx-container mt20">
            <div class="dx-title">
              <h1><i class="el-icon-s-unfold" /> 产品明细</h1>
            </div>
            <div class="dx-main">
              <div class="list-box mt10">

                <!-- <div v-if="productLists.length==0" class="pointer text-center fc-9" @click="handleSelProduct">
									<p><i class="el-icon-document-add" style="font-size: 80px;"></i></p>
									<p>暂未产品，点击选择</p>
								</div> -->

                <!-- <div class="ptools mt0 pt0 clearfix">
									<div class="search-box f-left">
									</div>
									<div class="f-right">
										<el-button type="primary" size="small" @click="handleSelProduct()" id="aaa"><i class="el-icon-plus"></i> 添加产品</el-button>
									</div>
								</div> -->
                <el-table :data="productLists" show-summary :summary-method="getSummaries" border style="width: 100%" class="product-lists" @selection-change="productSelsChange">
                  <el-table-column label="序号" align="center" width="50">
                    <template slot-scope="scope">
                      <span class="key">{{ scope.$index + 1 }}</span>
                      <span class="ope" style="display:none;position:absolute;top: 5px;left:50%;width:20px;margin-left:-10px;">
                        <el-tag size="mini" type="success" class="addLine pointer" title="增加行" :data-index="scope.$index">+</el-tag>
                        <el-tag size="mini" type="danger" class="delLine pointer" title="移除此行" :data-index="scope.$index">×</el-tag>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column label="产品名称">
                    <template slot-scope="scope">
                      <div class="ajax-input-dom el-input el-input--medium">
                        <input class="el-input__inner ajax-input nob-input" type="text" :value="scope.row.name" :data-index="scope.$index">
                        <el-button slot="suffix" type="primary" size="mini" class="mt5" style="display:none;" @click="handleSelProduct(scope.$index)">选择</el-button>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="model" label="型号" align="center" width="150" />
                  <el-table-column prop="stock" label="库存" align="center" width="100" />
                  <el-table-column prop="price_sale" label="销售单价" align="center" width="100" />
                  <el-table-column prop="price_sale_actual" label="实际售价" align="center" width="100">
                    <template slot-scope="scope">
                      <div class="el-input el-input--medium">
                        <input v-model="scope.row.price_sale_actual" class="el-input__inner nob-input text-center" type="text" :data-index="scope.$index">
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="num" label="销售数量" align="center" width="120">
                    <template slot-scope="scope">
                      <div class="el-input el-input--medium">
                        <input v-model="scope.row.num" class="el-input__inner nob-input text-center" type="text" :data-index="scope.$index">
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="小计" align="center" width="100">
                    <template slot-scope="scope">{{ scope.row.price_total = scope.row.num?scope.row.num * scope.row.price_sale_actual:'' }}</template>
                  </el-table-column>
                  <el-table-column prop="unit" label="备注" align="center" width="200">
                    <template slot-scope="scope">
                      <div class="el-input el-input--medium">
                        <textarea class="el-input__inner nob-input">{{ scope.row.remark }}</textarea>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>

                <div class="autoTb" style="width:600px;display: none;">
                  <el-table :data="autoProductLists" border style="width: 100%" @row-click="autoTbClick">
                    <el-table-column prop="name" label="产品名称" />
                    <el-table-column prop="model" label="产品型号" align="center" width="100" />
                    <el-table-column prop="stock" label="库存" align="center" width="100" />
                    <el-table-column prop="price_sale" label="销售单价" align="center" width="100" />
                  </el-table>
                </div>

              </div>
            </div>
          </div>
        </el-col>

        <el-col :span="24">
          <div class="dx-container mt20">

            <div class="dx-title">
              <h1><i class="el-icon-s-unfold" /> 金额信息</h1>
            </div>
            <div class="dx-main">
              <div class="list-box mt20">

                <el-row>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="产品总价">
                      <el-input v-model="proTotal.totalAmount" type="text" disabled style="width:150px;" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="运杂费" prop="extras">
                      <el-input v-model="formData.extras" type="text" style="width:150px;" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="优惠金额" prop="discount">
                      <el-input v-model="formData.discount" type="text" style="width:150px;" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="销售单总额">
                      <el-input v-model="orderAmount" type="text" disabled style="width:150px;" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="收款计划" prop="customer_id">
                      <el-select v-model="formData.receivable_plan" placeholder="请选择">
                        <el-option v-for="item in receivablePlans" :key="item.value" :label="item.name" :value="item.value" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-col>

        <div class="fixed-btn">
          <el-button @click="resetForm('form')"><i class="el-icon-refresh-left" /> 重 置</el-button>
          <el-button type="primary" @click="submitForm('form')"><i class="el-icon-check" /> 提 交</el-button>
        </div>
      </el-form>
    </el-row>

    <user-select :visible="userSelVisible" :length="1" @close="userSelVisible=false" @select="userSelected" />
    <product-select :product-sel-visible="productSelVisible" @close="productSelVisible=false" @select="productSelected" />
    <customer-select :visible="customerSelVisible" :length="1" :category="1" @close="customerSelVisible=false" @select="customerSelected" />
  </div>
</template>

<script>
import { multipleAttributes } from '@/api/base'
import { classes, lists } from '@/api/sales/product'
import { store, detail } from '@/api/sales/order'
import ProductSelect from '@/components/Tytrock/ProductSelect'
import UserSelect from '@/views/hr/archive/components/UserSelect'
import CustomerSelect from '@/views/sales/customer/components/CustomerSelect'
export default {
	components: { ProductSelect, UserSelect, CustomerSelect },
	data() {
		return {
			pageTitle: '新增销售单',
			detailData: { loading: true },
			suppliers: [],
			formData: { id: '', supplier_id: '', name: '', created_date: this.getNowDate(), discount: 0, extras: 0, receivable_plan: 1, saler_id: this.$store.getters.user_id, saler: this.$store.getters.name, creator_id: this.$store.getters.user_id, creator: this.$store.getters.name },
			classData: [],
			productLists: [{}, {}, {}],
			productSelectLists: [],
			productSelVisible: false,
			curProductKey: 0,
			autoProductLists: [],
			proTotal: { totalNum: 0, totalAmount: 0 },
			receivablePlans: [],
			userSelVisible: false,
			customerSelVisible: false
		}
	},
	computed: {
		orderAmount: function() {
	        return this.proTotal.totalAmount + parseFloat(this.formData.extras) - parseFloat(this.formData.discount)
	    }
	},
	mounted() {
		console.log(this.productLists.length)
		this.init()
		const that = this
		$(document).ready(function() {
			$('.list-box').on('focus', '.nob-input', function() {
		        that.curProductKey = $(this).data('index')
		        $(this).addClass('ajax-input-focus')
		        $(this).next('button').show()
		        $(this).select()
		    })
		    $('.list-box').on('blur', '.nob-input', function() {
		        $(this).removeClass('ajax-input-focus')
		        // var that = $(this);
		        setTimeout(() => {
		            $('.autoTb').hide()
		            $(this).next('button').hide()
		        }, 200)
		    })
			$('.list-box').on('keyup', '.ajax-input', function() {
				if ($(this).val()) {
		            $('.autoTb').css({ 'bottom': $(document).height() - $(this).offset().top, 'left': $(this).offset().left })
		            const queryData = { name: $(this).val() }
		            lists(queryData).then(res => {
						// console.log(res)
						that.autoProductLists = res.data.lists.data
		            	$('.autoTb').show()
					})
		        }
			})
			$('.product-lists').on('mouseenter', '.el-table__row', function() {
		        $(this).find('.key').hide()
		        $(this).find('.ope').show()
			})
		    $('.product-lists').on('mouseleave', '.el-table__row', function() {
		        $(this).find('.key').show()
		        $(this).find('.ope').hide()
		    })
		    $('.product-lists').on('click', '.addLine', function() {
		        const curIndex = $(this).data('index')
		        const tempLists = []
		        that.productLists.forEach((element, index) => {
		        	tempLists.push(element)
		        	if (index == curIndex) tempLists.push({})
		        })
		        that.productLists = tempLists
		    })
		    $('.product-lists').on('click', '.delLine', function() {
		        const curIndex = $(this).data('index')
		        that.productLists.splice(curIndex, 1)
		        // reflashKey();
		        // count();
		    })
		})
	},
	methods: {
		init() {
			multipleAttributes({ types: [3] }).then(res => {
				this.receivablePlans = res.data.data[3]
			})
			classes().then(res => {
				this.classData = this.getTreeData(res.data.lists)
			})
			if (this.$route.query.id > 0) {
				this.detailData.id = this.$route.query.id
				this.pageTitle = '编辑销售单'
			}

			detail(this.detailData).then(res => {
				this.detailData = res.data
				if (res.data.data) {
					this.formData = res.data.data
					const items = res.data.data.get_items

					items.forEach((element, index) => {
						this.$set(element, 'id', element.item_id)
						this.$set(element, 'name', element.get_item.name)
						this.$set(element, 'model', element.get_item.model)
						this.$set(element, 'stock', element.get_item.stock)
						this.updateProductLists(element, index)
					})
				}
			})
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
		updateProductLists(data, index) {
			this.$set(this.productLists[index], 'id', data.id)
			this.$set(this.productLists[index], 'name', data.name)
			// this.$set(this.productLists[index],"categoryName",data.categoryName)
			this.$set(this.productLists[index], 'model', data.model)
			this.$set(this.productLists[index], 'stock', data.stock)
			// this.$set(this.productLists[index],"unit",data.unit)
			this.$set(this.productLists[index], 'price_sale', data.price_sale)
			this.$set(this.productLists[index], 'price_sale_actual', data.price_sale_actual ? data.price_sale_actual : data.price_sale)
			this.$set(this.productLists[index], 'num', data.num ? data.num : 1)
			this.$set(this.productLists[index], 'price_total', data.price_sale)
			this.$set(this.productLists[index], 'remark', '')
		},
		autoTbClick(row) {
			// console.log(this.curProductKey)
			this.updateProductLists(row, this.curProductKey)
		},
		getSummaries(param) {
			console.log(111)
	        const { columns, data } = param
	        const sums = []
	        columns.forEach((column, index) => {
	        	if (index === 1) {
		            sums[index] = '合计'
		            return
		        } else if (index === 6 || index === 7) {
		        	let totalNum = 0; let totalAmount = 0
		        	this.productLists.forEach((element, index) => {
		        		// console.log(typeof element.price_total)
		        		if (!isNaN(element.num)) totalNum += Number(element.num)
		        		if (!isNaN(element.price_total)) totalAmount += Number(element.price_total)
		        	})
		        	sums[6] = totalNum
		        	sums[7] = totalAmount
		        	this.proTotal.totalNum = totalNum
		        	this.proTotal.totalAmount = totalAmount
		        } else {
		        	sums[index] = ''
		        }
	        })
	        return sums
	    },
		handleSelProduct(index) {
			this.curProductKey = index
	    	this.productSelVisible = true
	    },
	    productSelected(row) {
	    	// console.log(row)
	    	let seled = 0
	    	this.productLists.forEach((element) => {
	    		if (element.id == row.id) {
	    			seled = 1
	    		}
	    	})
	    	if (seled == 1) return this.$message.error('该产品已选')
	    	// this.$set(row,"num",1)

	    	this.updateProductLists(row, this.curProductKey)
	    	/*
    		this.$set(this.productLists[this.curProductKey],"name",row.name)
			this.$set(this.productLists[this.curProductKey],"categoryName",row.categoryName)
			this.$set(this.productLists[this.curProductKey],"model",row.model)
			this.$set(this.productLists[this.curProductKey],"stock",row.stock)
			this.$set(this.productLists[this.curProductKey],"unit",row.unit)
			this.$set(this.productLists[this.curProductKey],"price_sale",row.price_sale)
			this.$set(this.productLists[this.curProductKey],"price_sale_actual",row.price_sale)
			this.$set(this.productLists[this.curProductKey],"num",1)
			this.$set(this.productLists[this.curProductKey],"price_total",row.price_sale)
			*/

	    	// this.productLists.push(row)
	    	this.productSelVisible = false
	    },
	    handleDeleteProducts() {

	    },
	    productSelsChange(sel) {
	    	this.productSelectLists = sel
	    },
	    handleDeleteProduct(index, row) {
	    	this.$confirm('确认要移除产品【' + row.name + '】吗？').then(res => {
	    		this.productLists.splice(index, 1)
	    	}).catch(res => {})
	    },
	    handleDeleteProducts() {
	    	this.$confirm('确认要移除所选产品吗？').then(res => {
	    		this.productLists.forEach((element, index) => {
	    			this.productSelectLists.forEach((ele, ind) => {
	    				if (ele.id == element.id) this.productLists.splice(index, 1)
	    			})
	    		})
	    	}).catch(res => {})
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
					let numErr = 0
					this.productLists.forEach((element, index) => {
						if (element.id) {
							if (!element.num) {
								numErr = 1
							}
						}
					})
					if (numErr == 1) return this.$message.error('请为每个产品填写销售数量')
					// let productLists = JSON.parse(JSON.stringify(this.productLists));

					this.formData.products = JSON.stringify(this.productLists)
					store(this.formData).then(res => {
						this.$message.success(res.msg)
						this.$router.push({ path: '/sales/order/show?id=' + res.data.data.id })
					})
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		resetForm(formName) {
	        this.$refs[formName].resetFields()
	    },
	    goBack() {
	    	this.$router.go(-1)
	    }
	}
}
</script>

<style>
</style>
