<template>
  <div class="dx-main">
    <div class="list-box">
      <el-dialog v-if="productSelVisible" :visible.sync="productSelVisible" title="选择产品" width="800" @close="close">
        <div class="ptools p0 clearfix">
          <div class="search-box f-left">
            <el-form :inline="true" :model="listQuery">
              <el-form-item>
                <el-cascader v-model="listQuery.class_id" :options="classes" clearable :props="{ checkStrictly: true, expandTrigger: 'hover' ,value:'id',label:'name'}" placeholder="所有分类" style="width: 200px;" />
              </el-form-item>
              <el-form-item>
                <el-select v-model="listQuery.category" clearable placeholder="所有性质">
                  <el-option v-for="item in categories" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-input v-model="listQuery.name" placeholder="产品名称" suffix-icon="el-icon-search" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchForm()">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="f-right" />
        </div>
        <el-table v-loading="listsData.listLoading" :data="listsData.data" border style="width: 100%">
          <el-table-column label="产品名称">
            <template slot-scope="scope">
              <div class="list-col-img">
                <el-image class="list-img" :src="scope.row.coverMinUrl" :alt="scope.row.name" />
                <div class="list-txt">{{ scope.row.name }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="categoryName" label="性质" align="center" width="100" />
          <el-table-column prop="no" label="编号" align="center" width="120" />
          <el-table-column prop="model" label="型号" align="center" width="150" />
          <el-table-column prop="stock" label="库存" align="center" width="100" :sortable="'custom'" />
          <el-table-column prop="unit" label="单位" align="center" width="80" />
          <el-table-column label="选择" align="right" width="100">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleSelect(scope.$index, scope.row)"><i class="el-icon-edit" /> 选择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="list-bottom clearfix">
          <div class="f-left" />
          <div class="f-right">
            <pagination v-show="listsData.total>0" :total="listsData.total" :page.sync="listQuery.page" :page-sizes="[5,10]" :limit.sync="listQuery.limit" @pagination="getListsData" />
          </div>
        </div>
        <div slot="footer" class="dialog-footer" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { lists, classes } from '@/api/sales/product'
import Pagination from '@/components/Pagination'
export default {
	components: { Pagination },
	props: {
		productSelVisible: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			classes: [],
			listsData: this.listsData(this),
			listQuery: this.listQuery(this, 5)
		}
	},
	mounted() {
		classes().then(res => {
			this.classes = this.getTreeData(res.data.lists)
			this.getListsData()
		})
	},
	methods: {
		getListsData() {
			lists(this.listQuery).then(res => {
				this.listsData = res.data.lists
				this.categories = res.data.proCategory
			})
		},
		searchForm() {
			this.getListsData()
		},
		handleSelect(index, row) {
			this.$emit('select', row)
		},
		close() {
			this.$emit('close')
		}
	}
}
</script>
