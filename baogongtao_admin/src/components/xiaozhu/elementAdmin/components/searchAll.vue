<template>
  <section>
    <el-dialog :title="'选择' " :visible.sync="dialogVisible" top="10px" width="1000px" :before-close="handleClose" append-to-body class="searchAll">
      <div v-if="!showInfo" class="toolbar">
        <el-form id="search" :inline="true">
          <el-form-item v-for="v in searchFields" :label="v.label">
            <el-input v-if="!v.type || v.type == 'text'" v-model="data.query[v.prop]" :placeholder="'请输入'+v.label" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="toSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleClose">选中关闭</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 如果有tarbarsStart -->
      <!-- 如果有tarbarsStart -->
      <div v-if="tarbars" class="list-box clear">

        <div role="tablist" class="el-tabs__nav is-top" style="transform: translateX(0px);">
          <div v-for="v in tarbars.data" :class="['el-tabs__item is-top', data.query[tarbars.prop] == v.value ? 'is-active' :'']" @click="searchTarbar(v)">{{ v.label }}</div>
        </div>
      </div>
      <!-- 如果有tarbarsEnd -->
      <!-- 如果有tarbarsEnd -->
      <div class="clear search_class">
        <el-col v-if="searchClass" :span="5" class="left-col">
          <div class="search-product-title" @click="searchFields.fclass=0;ajax()">全部分类</div>
          <el-tree :data="fclassArr" @node-click="handleNodeClick" />
        </el-col>
        <el-col :span="searchClass ? 19 : 24" style="background: white;z-index: 999">
          <el-table
            ref="multipleTable"
            v-loading="data.listLoading"
            :data="data.lists"
            border
            tooltip-effect="dark"
            style="width:100%"
            @selection-change="selsChange"
          >
            <el-table-column v-if="type == 'checkbox' && !showInfo" type="selection" min-width="30" />
            <el-table-column v-if="type == 'radio' && !showInfo" min-width="40">
              <template scope="scope">
                <el-radio v-model="radioIndex" :label="scope.$index + 1" />
              </template>
            </el-table-column>
            <el-table-column
              v-for="(v,key) in tableFields"
              :prop="v.prop"
              :label="v.label"
              :width="v.width"
              :align="v.align ? v.align:'left'"
              :min-width="v.minWidth"
            >
              <template v-if="v['append_searchAll_'+v.prop]" scope="scope">
                <slot v-if="v['append_searchAll_'+v.prop]" :name="'append_searchAll_'+v.prop" :row="scope.row" :$index="scope.$index" />
              </template>
            </el-table-column>

          </el-table>
        </el-col>
      </div>
      <div v-if="data.lists" class="toolbar text-right" style="margin-top: 20px;">
        <el-pagination
          :current-page="data.current_page"
          :page-sizes="[15]"
          :page-size="15"
          layout="total, sizes, prev, pager, next, jumper"
          :total="data.total"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-dialog>
  </section>
</template>
<style type="text/css" scoped="">
	.searchAll /deep/.el-dialog{padding-bottom: 15px;height: auto!important;}
	.search_class{display: flex;}
	.left-col {
		padding-right: 20px;
	}

	.left-col .search-product-title {
		font-size: 15px;
		margin-bottom: 12px;
	}
	.clear{clear: both;}
</style>
<script type="text/javascript">
	export default {
		props: ['top'],
		data() {
			return {
				dialogVisible: false,
				data: this.formatData(this),
				formAction: '',
				text: 1,
				radioIndex: 0,
				page: 1,
				fclass: 0,
				tableFields: [],
				searchFields: [],
				name: '',
				fclassArr: [],
				department: 0,
				classVal: 0,
				classVal: 0,
				company_name: '',
				type: 'radio',
				sels: [],
				tarbars: [],
				searchClass: false,
				showInfo: false
			}
		},
		methods: {
			searchTarbar(row) {
				 this.$set(this.data.query, this.tarbars.prop, row.value)
				 this.ajax()
			},
			click(row) {
				if (this.type == 'radio') {
					this.dialogVisible = false
					this.$emit('callBack', [row])
				}
				console.log(row)
			},
			ajax(row, value, type) {
				if (type) {
					this.type = type
				}
				if (row) {
					console.log(row)
					this.tableFields = row.tableFields
					this.searchFields = row.searchFields
					this.tarbars = row.tarbars
					if (this.tarbars) {
						 this.$set(this.data.query, this.tarbars.prop, row.tarbars.data[0].value)
					}
					if (row.showInfo) {
						this.showInfo = true
					}
					this.searchFields.page = this.page
					this.formAction = row.url
					if (row.searchClass) {
						this.searchClass = row.searchClass
					}
					this.dialogVisible = true
				}
				if (this.searchClass) {
					this.data.query.fclass = this.fclass
				}
				this.getAjax(this, this.searchFields, msg => {
					$('.el-dialog').css({
						height: '100%'
					})

					if (this.fclassArr.length == 0) {
						this.fclassArr = msg.fclass
					}

					// $(".el-dialog").css({
					//     height: '100%',
					// });
					// if (this.fclassArr.length == 0) {
					//     this.fclassArr = msg.department;
					// }
					// if (product_str) {
					//     this.$nextTick(() => {
					//         product_str = product_str.split(",");
					//         msg.lists.forEach(v => {
					//             if (this.in_array(v.id, product_str)) {
					//                 this.sels.push(v);
					//                 this.$refs.multipleTable.toggleRowSelection(v, checked);
					//             };
					//         });
					//     });
					//     let checked = true;
					// }
				})
			},
			selsChange(sels) {
				console.log(this.$refs.multipleTable)
				this.sels = sels
			},
			handleClose() {
				if (this.type == 'radio') {
					this.dialogVisible = false
					console.log(this.data.lists[this.radioIndex - 1])
					this.$emit('callBack', [this.data.lists[this.radioIndex - 1]])
				} else {
					this.dialogVisible = false
					this.$emit('callBack', this.sels)
				}
			},
			handleCurrentChange(val) {
				this.data.query.page = val
				this.ajax()
			},
			toSearch() {
				this.data.query.page = 1
				this.ajax()
			},
			handleNodeClick(data, e, b) {
				if (e.childNodes.length == 0) {
					if (e.level == 1) {
						this.fclass = data.value
					} else {
						this.fclass = data.value
					}
					this.ajax()
				}
			}
		}
	}
</script>
