<!--
使用：
1.components: {
        'my-search':()=>import('xiaozhu/vue/components/admin/search.vue')
         'my-search':resolve => require(['xiaozhu/vue/components/admin/search.vue'], resolve),
    }
2. <my-search tablename="clients" searchfield="name" v-model="ruleForm.name" ref="searchClient" style="width:100%" formAction="/ajax/vue-search" @callback="callBack" :fieldArr="[
               {prop:'name',label:'姓名'},
               {prop:'no',label:'编号'},
               {prop:'phone',label:'电话'},
               {prop:'created_at',label:'时间'}
           ]" />
 -->
<template id="mysearch">
  <div style="position: relative;display:inline-block">
    <div data-v-90d86c0c="" class="el-input el-input--suffix">
      <input v-model="searchMemberVal" type="text" autocomplete="off" :placeholder="placeholder" class="el-input__inner" @keyup="searchMember('keyup')" @click="selectAll($event)">
      <span class="el-input__suffix" @click="searchMember('click')"><span class="el-input__suffix-inner"><i data-v-90d86c0c="" class="el-input__icon el-icon-caret-bottom" /></span>
      </span>
    </div>
    <div v-show="memberInfoDig" class="memberInfo">
      <el-table ref="multipleTable" v-loading="data.listLoading" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @row-click="selectMemberNew">
        <el-table-column v-for="v in fieldArr" :prop="v.prop" :label="v.label" min-width="140" />
      </el-table>
      <el-col :span="24" class="toolbar" style="margin:10px 0">
        <el-pagination :current-page="data.current_page" :page-sizes="[13]" :page-size="13" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style="float: right" @current-change="handleCurrentChange" />
      </el-col>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
    props: ['tablename', 'fieldArr', 'formAction', 'searchfield', 'value', 'placeholder'],
    data() {
        return {
            data: this.formatData(this),
            memberInfoDig: false,
            type: 'click',
            page: 1
        }
    },
    computed: {
        searchMemberVal: {
            // 动态计算currentValue的值
            get: function() {
                return this.value
            },
            set: function(val) {
                this.$emit('input', val)
            }
        }
    },
    methods: {
        selectAll(event) {
            var obj = event.currentTarget
            $(obj).select()
        },
        searchMember(type) {
            this.type = type
            if (type == 'click') this.memberInfoDig = !this.memberInfoDig
            else this.memberInfoDig = true
            this.ajax()
        },
        ajax() {
            if (this.memberInfoDig) {
                this.getAjax(this, { content: this.searchMemberVal, tablename: this.tablename, page: this.page, field: this.searchfield, token: Math.random() * 10 }, msg => {})
            }
        },
        selectMemberNew(item) {
            this.searchMemberVal = item[this.searchfield]
            this.memberInfoDig = false
            console.log(this.fieldArr)
            this.$emit('callback', item)
        },
        handleCurrentChange(val) {
            this.page = val
            this.ajax()
        }
    }
}

</script>
<style type="text/css" scoped="">
.control {
    display: table-cell;
    position: relative;
    z-index: 2;
    float: left;
    width: 100%;
    margin-bottom: 0;
    height: inherit;
    padding: 2px 4px;
    border: 0px;
    border: 1px solid transparent;
    background-color: #fff!important;
    line-height: inherit;
    vertical-align: middle;
    line-height: 14px;
}

.icon {
    position: absolute;
    top: 0;
    right: -10px;
    z-index: 999;
    display: inline-block;
    width: 18px;
    height: 34px;
    line-height: 34px;
    background: #f3f3f3;
    text-align: center;
}

.memberInfo {
    min-height: 60px;
    background-color: #F5F5F5;
    padding: 10px;
    position: absolute;
    top: 35px;
    z-index: 99;
    padding: 0;
    -moz-box-shadow: 1px 2px 8px #ddd;
    -webkit-box-shadow: 1px 2px 8px #ddd;
    box-shadow: 1px 2px 8px #ddd;
}

</style>
