<!-- 
使用：
1.components: {
        'my-class':()=>import('xiaozhu/vue/components/admin/new_class.vue')
    }
2.       <my-class top="2%" ref="category"  :formAction="'admin/department/'" title="部门" auth="1"></my-class>   //注意formAction 是方法 的前缀
 -->
<template id="class">
    <el-dialog :title="'新建|编辑'+title" :visible.sync="dialogVisible" width="1000px" :top="top" :before-close="handleClose" append-to-body>
        <div class="flex-right mb20" v-if="auth==1"><button class="dx-btn dx-btn-blue" @click="$refs.createEditClass.ajax({id:0,name:'一级'},formAction,'add')">新建{{ title }}</button></div>
        <div>
            <treeLi :data="data.lists" lev="0" :show="true" :formAction="formAction" :auth="auth"></treeLi>
        </div>
         <createEditClass ref="createEditClass" @callBack="callBack"></createEditClass>
    </el-dialog>

</template>
<style type="text/css">

</style>
<script type="text/javascript">
export default {
    data: function() {
        return {
            ruleForm: {},
            getSiteName: this.getSiteName(),
            data: {},
            name: "",
            sort: 0,
            fid: '',
            lists: [],
            selectVal:{},
            uploadVisible: false,
            fileList: [],
            dialogVisible: false,
            listLoading: false,
        }
    },
    props: ['formAction', 'top','title','auth'], //父类的数据
    methods: {
        callBack(v) {
           this.ajax();
        },
        treeLiCallBack(){
            this.dialogVisible = false;
            this.$emit("callBack",this.selectVal);
        },
       
        ajax: function() {
            console.log(this);
            this.dialogVisible = true;
            this.listLoading = true;
            let oldFromAction = this.formAction;
            this.formAction = this.formAction + "class?type=" + this.type + '&token=' + Math.random() * 10;
            this.getAjax(this, {}, msg => {
                this.lists = msg.lists;
                this.listLoading = false;
                this.formAction = oldFromAction;
            });
        },
        handleClose() {
            if(this.$parent.tableName){
                 this.$parent.ajax();
            }else{
              this.$parent.$parent.ajax();  
            }
           
           
            this.dialogVisible = false;
        },
    },
    components: {
        "treeLi": resolve => require(['./treeLi.vue'], resolve),
        "createEditClass": resolve => require(['./create_edit_class.vue'], resolve),

    }
}

</script>
