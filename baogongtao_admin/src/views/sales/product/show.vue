<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="dx-container">
          <div class="p15"><el-page-header content="产品详情" @back="goBack" /></div>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="dx-container mt5">
          <div class="dx-main">
            <div class="product-detail-info">
              <div class="info-left">
                <div class="cover"><el-image style="width: 100px; height: 100px" :src="detailData.coverMinUrl" /></div>
                <p align="center">
                  <el-dropdown @command="handleCommand">
                    <el-button size="mini" round>操作<i class="el-icon-arrow-down el-icon--right" /></el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item><router-link :to="'/sales/product/create?id='+detailData.id" class="fc-blue"><i class="el-icon-edit" /> 编辑产品</router-link></el-dropdown-item>
                      <el-dropdown-item divided command="del" class="fc-danger"><i class="el-icon-delete" /> 删除产品</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </p>
              </div>
              <div class="info-right">
                <el-form ref="form" :inline="true" label-width="100px">
                  <el-row>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="产品名称：">{{ detailData.name }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="产品类别：">{{ className(detailData.class_id) }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="产品编号：">{{ detailData.no }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="产品性质：">{{ detailData.categoryName }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="单位：">{{ detailData.unit }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="型号：">{{ detailData.model }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="销售单价：">{{ detailData.price_sale }}元</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="当前库存：">{{ detailData.stock }}</el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                      <el-form-item label="供应商：">{{ detailData.supplierName }}</el-form-item>
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
            <el-tabs v-model="showTab" @tab-click="handleClick">
              <el-tab-pane name="children">
                <span slot="label"><i class="iconfont icon-subparts" /> 产品子件</span>
                <div class="ptools p0 clearfix">
                  <div class="search-box f-left">
                    <el-form :inline="true" :model="subpartsQuery">
                      <el-form-item>
                        <el-input v-model="listQuery.name" placeholder="子件名称" suffix-icon="el-icon-search" />
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="subpartsSearchForm()">搜索</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div class="f-right">
                    <el-button type="primary" @click="handelAddSubpart()"><i class="el-icon-plus" /> 新增产品子件</el-button>
                  </div>
                </div>
                <el-table v-loading="subparts.listLoading" :data="subparts.data" empty-text="无子件信息" border style="width: 100%" @selection-change="subpartsSelsChange">
                  <el-table-column type="selection" align="center" width="55" />
                  <el-table-column label="名称"><template slot-scope="scope">{{ scope.row.get_product.name }}</template></el-table-column>
                  <el-table-column label="子件性质" align="center" width="150"><template slot-scope="scope">{{ scope.row.get_product.categoryName }}</template></el-table-column>
                  <el-table-column prop="num" align="center" label="数量" width="100" />
                  <el-table-column label="单位" align="center" width="100"><template slot-scope="scope">{{ scope.row.get_product.unit }}</template></el-table-column>
                  <el-table-column label="现有库存" align="center" width="150"><template slot-scope="scope">{{ scope.row.get_product.stock }}</template></el-table-column>
                  <el-table-column label="操作" align="right" width="200">
                    <template slot-scope="scope">
                      <el-button size="mini" type="primary" @click="handleEditSubpart(scope.$index, scope.row)"><i class="el-icon-edit" /> 编辑</el-button>
                      <el-button size="mini" type="danger" @click="handleDeleteSubpart(scope.$index, scope.row)"><i class="el-icon-delete" /> 删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="list-bottom mt10 clearfix">
                  <div class="f-left"><el-button type="danger" :disabled="this.subpartSelectLists.length===0" @click="handelDeleteSubparts"><i class="el-icon-delete-solid" /> 批量删除产品子件</el-button></div>
                  <div class="f-right" />
                </div>
              </el-tab-pane>
              <el-tab-pane name="stock">
                <span slot="label"><i class="el-icon-shopping-cart-full" /> 产品库存变更记录</span>
                <InventoryRecordTb v-if="showTab=='stock'" :lists-data="inventories" />
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog v-if="subpartAddVisible" :visible.sync="subpartAddVisible" :title="subpartAddTitle" width="700px">
      <el-form ref="subpartForm" :model="subpartFormData" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="子件产品" prop="product_id" :rules="[{ required: true, message: '请选择子件产品'},]">
              <el-input v-model="subpartFormData.name" type="text" autocomplete="off" :validate-event="false" :readonly="true" placeholder="点击选择产品" style="cursor: pointer;" @focus="handleSelProduct" />
              <!-- <el-button plain ><i class="el-icon-plus"></i> 选择产品</el-button> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所需数量" prop="num" :rules="[{ required: true, message: '请填写所需数量'},]">
              <el-input v-model="subpartFormData.num" type="text" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="content">
              <el-input v-model="subpartFormData.content"type="textarea" :rows="3" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="subpartAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="subpartSubmitForm('subpartForm')">提 交</el-button>
      </div>
    </el-dialog>

    <product-select :product-sel-visible="productSelVisible" @close="productSelVisible=false" @select="productSelected" />
  </div>
</template>

<script>
import { classes, detail, subparts, subpartStore, subpartDelete, del } from '@/api/sales/product'
import { inventoryRecords } from '@/api/inventory/inout'
import ProductSelect from './components/ProductSelect'
import InventoryRecordTb from '@/views/inventory/inout/components/InventoryRecordTb'
export default {
	components: { ProductSelect, InventoryRecordTb },
	data() {
		return {
			detailQuery: { loading: true },
			detailData: {},
			classes: [],
			classesArr: [],
			showTab: 'children',
			productSelVisible: false,
			subparts: this.listsData(this),
			subpartsQuery: {},
			subpartAddVisible: false,
			subpartAddTitle: '新增产品子件',
			subpartFormData: { fid: '', name: '', product_id: '', num: 1, remark: '' },
		    subpartSelectLists: [],
		    inventories: this.listsData(this)
		}
	},
	mounted() {
		this.detailQuery.id = this.$route.query.id
		classes().then(res => {
			this.classes = this.getTreeData(res.data.lists)
			this.classesArr = JSON.parse(JSON.stringify(this.classes))
			this.classesArr = this.treeData2Single(this.classesArr)

			this.getDetailData()
		})
		this.getSubpartLists()
	},
	methods: {
		getDetailData() {
			detail(this.detailQuery).then(res => {
				this.detailData = res.data.data
			})
		},
		className(v) {
			return this.treeData2LevelStr(this.classesArr, v)
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
			if (tab.name == 'stock') {
        		inventoryRecords({ item_id: this.detailData.id }).then(res => {
					this.inventories = res.data.lists
				})
        	}
		},
	    goBack() {
	    	this.$router.go(-1)
	    },
	    getSubpartLists() {
			this.subparts.listLoading = true
	    	subparts({ fid: this.$route.query.id }).then(res => {
				this.subparts = res.data.lists
			})
	    },
	    subpartsSelsChange(sel) {
	    	this.subpartSelectLists = sel
	    },
	    subpartsSearchForm() {

	    },
	    handelAddSubpart() {
	    	this.subpartAddTitle = '新增产品子件'
	    	this.subpartFormData = { fid: '', name: '', product_id: '', num: 1, remark: '' }
	    	this.subpartAddVisible = true
	    },
	    handleEditSubpart(index, row) {
	    	this.subpartFormData.id = row.id
	    	this.subpartFormData.product_id = row.product_id
	    	this.subpartFormData.num = row.num
	    	this.subpartFormData.remark = row.remark
	    	this.subpartFormData.name = row.get_product.name
	    	this.subpartAddTitle = '修改产品子件'
	    	this.subpartAddVisible = true
	    },
	    handleDeleteSubpart(index, row) {
			this.$confirm('确认要再该产品移除此子件吗？').then(res => {
	            subpartDelete({ id: row.id }).then(res => {
					this.$message.success(res.msg)
					this.getSubpartLists()
					this.subpartAddVisible = false
				})
	        }).catch(res => {})
	    },
	    handelDeleteSubparts() {
	    	this.$confirm('确认要所选的子件吗？').then(res => {
	            subpartDelete({ id: this.selectLists2IdStr(this.subpartSelectLists) }).then(res => {
					this.$message.success(res.msg)
					this.getSubpartLists()
				})
	        }).catch(res => {})
	    },
	    subpartSubmitForm(formName) {
	    	this.$refs[formName].validate((valid) => {
				if (valid) {
					this.subpartFormData.fid = this.detailData.id
					subpartStore(this.subpartFormData).then(res => {
						this.$message.success(res.msg)
						this.getSubpartLists()
						this.subpartAddVisible = false
					})
				} else {
					console.log('error submit!!')
					return false
				}
			})
	    },
	    handleSelProduct() {
	    	this.productSelVisible = true
	    },
	    productSelected(row) {
	    	// console.log(row)
	    	let seled = 0
	    	this.subparts.data.forEach((element) => {
	    		if (element.product_id == row.id) {
	    			seled = 1
	    		}
	    	})
	    	if (seled == 1) return this.$message.error('该产品已选')
	    	this.subpartFormData.name = row.name
	    	this.subpartFormData.product_id = row.id
	    	this.productSelVisible = false
	    }
	}
}
</script>

<style>

</style>
