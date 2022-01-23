<!--
使用：
1.components: {
        'my-table':()=>import('xiaozhu/vue/components/admin/table.vue')
        'my-table':resolve => require(['xiaozhu/vue/components/admin/table.vue'], resolve),
    }
2.  <my-table :searchFields="{title:'',searchDate:[]}" tableName="articles" ref="table" style="width:100%" :fieldArr="[
               {prop:'title',label:'姓名'},
               {prop:'created_at',label:'时间'}
           ]" />
3.调用：this.$refs.table.ajax('/admin/article'); //函数内为调用的URL
 -->
<template>
  <el-dialog title="查看记录" :visible.sync="dialogFormVisible" :top="top" :before-close="handleClose">
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="searchFields" style="text-align: -webkit-right;">
        <el-form-item v-for="(v,i) in searchFields">
          <el-input v-if="i!='searchDate'" v-model="searchFields[i]" :placeholder="'请输入要搜索的关键字'" name="name" />
        </el-form-item>
        <el-date-picker v-if="searchFields.searchDate" v-model="searchDate" type="daterange" placeholder="选择日期范围" />
        <el-form-item>
          <el-button type="primary" @click="toSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table ref="multipleTable" v-loading="listLoading" :data="data.lists" border tooltip-effect="dark" style="width: 100%">
      <el-table-column v-for="v in fieldArr" :prop="v.prop" :label="v.label" :min-width="v.minWidth" :width="v.width" />
      <el-table-column label="操作" :width="operateWidth | 250">
        <template scope="scope">
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar" style="margin:50px 0">
      <el-pagination :current-page="data.current_page" :page-sizes="[10]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style="float: right" @current-change="handleCurrentChange" />
    </el-col>
  </el-dialog>
</template>
<script>
export default {
    props: ['top', 'searchFields', 'tableName', 'fieldArr', 'operateWidth'],
    data() {
        return {
            ruleForm: {},
            dialogFormVisible: false,
            listLoading: false,
            formAction: '',
            page: 1,
            data: this.formatData(this),
            searchDate: []
        }
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        ajax(formAction) {
            this.formAction = formAction
            this.dialogFormVisible = true
            this.toggleField()
            this.getAjax(this, { page: this.page }, msg => {

            })
        },
        handleDel: function(index, item) { /* 单件删除*/
             this.del_vuex(item, index, this)
        },
        toSearch() {
            this.ajax(this.formAction)
        },
        toggleField() {
            var date = this.searchDate
            var data = ''
            for (var key in this.searchFields) {
                if (key != 'searchDate') data += key + '=' + this.searchFields[key] + '&'
            }
            if (date.length > 0) {
                data += 'start_date=' + date[0].getFullYear() + '-' + (date[0].getMonth() + 1) + '-' + date[0].getDate() + '&'
                data += 'end_date=' + date[1].getFullYear() + '-' + (date[1].getMonth() + 1) + '-' + date[1].getDate() + '&'
            }
            if (this.formAction.indexOf('?') >= 0) this.formAction += '&' + data
            else this.formAction += '?' + data
        },
        handleClose() {
            this.dialogFormVisible = false
            this.$parent.ajax()
        },
        handleCurrentChange(val) {
            this.page = val
            this.ajax(this.formAction)
        }
    }

}
</script>
