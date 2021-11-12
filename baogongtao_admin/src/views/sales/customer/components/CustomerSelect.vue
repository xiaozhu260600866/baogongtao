<template>
  <div class="dx-main">
    <div class="list-box">
      <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" title="选择客户/供应商" width="800px" @close="close">
        <div class="select-main">
          <div class="l">
            <el-table :data="categoryData" :show-header="false" style="width: 100%" row-key="id" :highlight-current-row="true" :current-row-key="0" row-class-name="nobg" class="nobg" @cell-click="categoryClick">
              <el-table-column prop="name" label="名称" class-name="pointer" />
            </el-table>
          </div>
          <div class="r">
            <el-table v-loading="listsData.listLoading" :data="listsData.data" border style="width: 100%">
              <template slot="empty">
                <div class="empty-div">
                  <div><svg-icon icon-class="dx-empty" /></div>
                  <p>暂无</p>
                </div>
              </template>
              <el-table-column prop="name" label="客户名称" />
              <el-table-column prop="contact" label="联系人" align="center" width="100" />
              <el-table-column prop="phone" label="联系电话" align="center" width="120" />
              <el-table-column label="选择" align="center" width="120">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" :disabled="selectedId.indexOf(scope.row.id)>=0?true:false" @click="handleSelect(scope.$index, scope.row)"><i class="el-icon-check" /> {{ selectedId.indexOf(scope.row.id)>=0?'已选':'选择' }}</el-button>
                </template>
              </el-table-column>
            </el-table>

            <div class="list-bottom clearfix">
              <div class="f-left" />
              <div class="f-right">
                <pagination v-show="listsData.total>0" :total="listsData.total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListsData" />
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clearfix">
          <div class="f-left">已选：<el-tag v-for="tag in selected" :key="tag.name" closable @close="handleCloseTag(tag)"> {{ tag.name }}</el-tag></div>
          <div class="f-right">
            <el-button @click="close()">取 消</el-button>
            <el-button type="primary" @click="submitSelected()">确 定</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { lists } from '@/api/sales/customer'
import Pagination from '@/components/Pagination'
export default {
	components: { Pagination },
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		length: {
			type: Number,
			default: 0
		},
		category: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			dialogVisible: false,
			listsData: this.listsData(this),
			listQuery: this.listQuery(this, 5),
			categoryData: [{ name: '客户', value: 1 }, { name: '供应商', value: 2 }],
			currentCategory: this.category,
			selected: [],
			selectedId: []
		}
	},
	watch: {
		visible(val) {
			this.dialogVisible = val
			if (this.dialogVisible == true) this.init()
		}
	},
	mounted() {
		// this.init();
	},
	methods: {
		init() {
			this.getListsData()
		},
		categoryClick(row, column, cell, event) {
			this.currentCategory = row.value
			this.getListsData()
		},
		getListsData() {
			this.listQuery.category = this.currentCategory
			lists(this.listQuery).then(res => {
				this.listsData = res.data.lists
			})
		},
		searchForm() {
			this.getListsData()
		},
		handleSelect(index, row) {
			if (this.length == 1) {
				this.selected = [{ id: row.id, name: row.name }]
				this.selectedId = [row.id]
				this.submitSelected()
			} else {
				this.selected.push({ id: row.id, name: row.name })
				this.selectedId.push(row.id)
			}

			// this.$emit('select',row);
		},
		handleCloseTag(tag) {
			this.selected.splice(this.selected.indexOf(tag), 1)
			this.selectedId.splice(this.selected.indexOf(tag), 1)
		},
		submitSelected() {
			this.$emit('select', this.selected)
		},
		close() {
			this.$emit('close')
		}
	}
}
</script>

<style lang="scss" scoped>
.select-main{
	height: 350px;overflow-y: scroll;
	.l{
		position: absolute;top: 0;left: 0;bottom:0;width: 150px;background: #edf2f5;
		.el-table tr{background: none;}
		/deep/.el-table__body tr.current-row>td{background-color: #5683ad !important;color: #fff !important;}
	}
	.r{
		margin-left: 150px;background:#fff;
	}
}
.el-tag{margin-right: 10px;}
</style>
