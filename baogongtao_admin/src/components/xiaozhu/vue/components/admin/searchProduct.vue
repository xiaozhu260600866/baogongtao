<!--
使用：
1.components: {
        'my-searchProduct':()=>import('xiaozhu/vue/components/admin/searchProduct.vue')
    }
2.   <my-searchProduct  ref="searchProduct" />
3.调用：
this.$refs.searchProduct.ajax(); //函数内为调用的URL
 -->
<template>
  <section>
    <el-dialog :title="'选择产品' " :visible.sync="dialogVisible" :top="top" :before-close="handleClose">
      <el-col :span="24" class="toolbar">
        <el-form id="search" :inline="true">
          <el-form-item>
            <input v-model="name" autocomplete="off" :placeholder="'请输入产品名称'" type="text" name="name" rows="2" validateevent="true" class="el-input__inner" @keyup="toSearch">
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="toSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleClose">选中关闭</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="19" style="margin-right: 10px;background: white;z-index: 999">

        <el-table ref="multipleTable" v-loading="data.listLoading" :data="data.lists" border tooltip-effect="dark" style="width:100%" @selection-change="selsChange">
          <el-table-column type="selection" min-width="30" />
          <el-table-column prop="name" label="产品名称" min-width="60" />
          <el-table-column prop="fclassname" label="分类名称" min-width="60" />
          <el-table-column prop="num" label="库存" min-width="60" />
          <el-table-column prop="c_price" label="成本价" width="100" />
          <el-table-column prop="price" label="价格" min-width="80" />
        </el-table>
      </el-col>
      <el-col :span="4">
        <div class="search-product-title" @click="fclass=0;classVal=0;ajax()">全部分类</div>
        <el-tree :data="fclassArr" @node-click="handleNodeClick" />
      </el-col>
      <div v-if="data.lists" class="toolbar" style="margin:50px 0">
        <el-pagination :current-page="data.current_page" :page-sizes="[6]" :page-size="6" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style="float: right" @current-change="handleCurrentChange" />
      </div>
    </el-dialog>
  </section>
</template>
<style type="text/css" scoped="">

</style>
<script type="text/javascript">
export default {
    props: ['top'],
    data() {
        return {
            dialogVisible: false,
            data: this.formatData(this),
            formAction: '/admin/product/lists',
            page: 1,
            name: '',
            fclassArr: [],
            fclass: 0,
            classVal: 0,
            sels: []
        }
    },
    methods: {
        ajax() {
            this.dialogVisible = true
            this.getAjax(this, { fclass: this.fclass, class: this.classVal, name: this.name, page: this.page }, msg => {
                $('.el-dialog').css({
                    height: '100%'
                })
                if (this.fclassArr.length == 0) {
                    this.fclassArr = msg.fclass
                }
             })
        },
        selsChange(sels) {
            this.sels = sels
        },
        handleClose() {
            this.dialogVisible = false
            this.$emit('callBack', this.sels, this.data.warehouse)
        },
        handleCurrentChange(val) {
            this.page = val
            this.ajax()
        },
        toSearch() {
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
