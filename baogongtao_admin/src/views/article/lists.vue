<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="dx-container">
          <div class="p15"><el-page-header :content="classData.name" @back="goBack" /></div>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="dx-container">

          <div class="dx-main">
            <div class="ptools pb0 clearfix">
              <div class="search-box f-left">
                <el-form :inline="true" :model="listQuery">
                  <el-form-item>
                    <el-cascader v-model="listQuery.class_id" :options="classes" clearable :props="{ checkStrictly: true, expandTrigger: 'hover' ,value:'id',label:'name'}" placeholder="所有分类" style="width: 200px;" />
                  </el-form-item>
                  <el-form-item>
                    <el-input v-model="listQuery.title" placeholder="文章标题" />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="searchForm('form')"><i class="el-icon-search" /> 搜索</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div class="f-right">
                <router-link :to="'/site/article/create?class_id=' + this.class_id"><el-button type="primary"><i class="el-icon-plus" /> 发布文章</el-button></router-link>
              </div>
            </div>
            <div class="list-box">

              <el-table v-loading="listsData.listLoading" :data="listsData.data" border style="width: 100%" @sort-change="sortAction" @selection-change="selsChange">
                <template slot="empty">
                  <div class="empty-div">
                    <div><svg-icon icon-class="dx-empty" /></div>
                    <p>暂无</p>
                  </div>
                </template>
                <el-table-column type="selection" align="center" width="55" />
                <el-table-column label="文章标题" min-width="180">
                  <template slot-scope="scope">
                    <div class="list-col-img">
                      <el-image class="list-img" :src="scope.row.coverMinUrl" :alt="scope.row.title" />
                      <div class="list-txt">{{ scope.row.title }}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="分类" width="150" align="center">
                  <template slot-scope="scope">{{ className(scope.row.class_id) }}</template>
                </el-table-column>
                <el-table-column label="状态" align="center" width="100">
                  <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="changeStatus(scope.row)" />
                  </template>
                </el-table-column>
                <el-table-column prop="published_date" label="发布日期" align="center" width="120" />
                <el-table-column label="操作" align="right" width="200">
                  <template slot-scope="scope">
                    <router-link :to="'/site/article/edit?id='+scope.row.id"><el-button size="mini" type="primary"><i class="el-icon-edit" /> 编辑</el-button></router-link>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete" /> 删除</el-button>
                  </template>
                </el-table-column>
                </el-table-column>
              </el-table>

              <div class="list-bottom clearfix">
                <div class="f-left"><el-button type="danger" :disabled="this.selectLists.length===0" @click="selectDelete"><i class="el-icon-delete-solid" /> 批量删除</el-button></div>
                <div class="f-right">
                  <pagination v-show="listsData.total>0" :total="listsData.total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListsData" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { classes, lists, store, del, classDetail } from '@/api/article'
import Pagination from '@/components/Pagination'
export default {
	components: { Pagination },
	data() {
		return {
			class_id: '',
			classData: {},
			classes: [],
			classesArr: [],
			categories: [],
			listsData: this.listsDefault(this),
		    listQuery: this.queryDefault(this),
		    selectLists: []
		}
	},
	mounted() {
		this.class_id = this.$route.query.class_id
		this.listQuery.class_id = this.class_id
		classDetail({ id: this.class_id }).then((res) => {
			this.classData = res.data.data
		})
		classes().then(res => {
			this.classes = this.getTreeData(res.data.lists)
			// console.log(this.classes);
			this.classesArr = JSON.parse(JSON.stringify(this.classes))
			this.classesArr = this.treeData2Single(this.classesArr)
			// console.log(this.classesArr);

			this.getListsData()
		})
	},
	methods: {
		getListsData() {
			this.$set(this.listsData, 'listLoading', true)
			lists(this.listQuery).then(res => {
				this.listsData = res.data.lists
				this.categories = res.data.proCategory
			})
		},
		className(v) {
			// return v;
			return this.treeData2LevelStr(this.classesArr, v)
		},
		changeStatus(row) {
			store({ id: row.id, status: row.status }).then(res => {
				// this.listsData = res.data.lists;
			})
			// console.log(row);
		},
		handleDelete(index, row) {
			this.$confirm('确认要删除该文章吗？').then(res => {
	            del({ id: row.id }).then(res => {
					this.$message.success(res.msg)
					this.listsData.data.splice(index, 1)
				})
	        }).catch(res => {})
		},
		selsChange: function(sels) {
			// console.log(sels)
			this.selectLists = sels
		},
		selectDelete() {
			this.$confirm('确认要删除所选文章吗？').then(res => {
	            del({ id: this.selectLists2IdStr(this.selectLists) }).then(res => {
					this.$message.success(res.msg)
					this.getListsData()
				})
	        }).catch(res => {})
		},
		searchForm() {
			if (this.listQuery.class_id) this.listQuery.class_id = this.listQuery.class_id.pop()
			this.getListsData()
		},
		sortAction(e) {
			this.listQuery.order_filed = e.prop
			this.listQuery.order_by = e.order == 'ascending' ? 'ASC' : 'DESC'
			// console.log(this.listQuery)
			this.getListsData()
		},
	    goBack() {
	    	this.$router.push({ path: '/site/article/class' })
	    }
	}
}
</script>

<style>
</style>
