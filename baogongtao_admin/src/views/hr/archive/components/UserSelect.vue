<template>
  <div class="dx-main">
    <div class="list-box">
      <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" title="选择人员" width="800px" @close="close">
        <div class="select-main">
          <div class="l">
            <el-table v-loading="departmentsData.listLoading" :data="departmentsData" :show-header="false" style="width: 100%" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :highlight-current-row="true" row-class-name="nobg" class="nobg" @cell-click="dmpClick">
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
              <el-table-column prop="name" label="姓名" align="center" width="120" />
              <el-table-column prop="position" label="职务" align="center" width="150" />
              <el-table-column prop="departmentName" label="部门" align="center" width="150" />
              <el-table-column label="选择" align="center">
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
import { lists as dmpLists } from '@/api/hr/department'
import { lists } from '@/api/hr/user'
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
		}
	},
	data() {
		return {
			dialogVisible: false,
			departmentsData: [],
			listsData: this.listsData(this),
			listQuery: this.listQuery(this, 5),
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
			this.getDepartmentData()
			this.getListsData()
		},
		getDepartmentData() {
			this.$set(this.departmentsData, 'listLoading', true)
			dmpLists(this.listQuery).then(res => {
				this.departmentsData = [{ id: '', name: '所有部门' }]
				const dmpData = this.getTreeData(res.data.lists)
				dmpData.map((value, index, array) => {
				     this.departmentsData = this.departmentsData.concat(value)
				})
			})
		},
		dmpClick(row, column, cell, event) {
			this.listQuery.department_id = row.id
			this.getListsData()
		},
		getListsData() {
			this.listQuery.role = 12
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
	}
	.r{
		margin-left: 150px;background:#fff;
	}
}
.el-tag{margin-right: 10px;}
</style>
