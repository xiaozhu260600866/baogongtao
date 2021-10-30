<!-- 
使用：
1.components: {
        'my-status':()=>import('xiaozhu/vue/components/wap/status.vue')
    }
2.   <my-status  ref="status" style="width:100%"  formAction="/admin/article/change-status"/>
3.调用：

this.$refs.status.ajax({id:item.id,status:item.status}); //函数内为调用的URL          
 -->
<template>
    <diag ref="diag" top="20" :ruleform="ruleform" :vaildate="vaildate">
        <div slot="content">
            <h3>{{ ruleform.status==2 ? '请填写拒绝内容' :'确认是否通过' }}</h3>
            <weui-input v-model="ruleform.content" label="拒绝理由" type="textarea" name="content" datatype="require" v-if="ruleform.status==2"></weui-input>
            <div class="flex-center mt20">
                <div>
                	<button class="btn btn-danger" @click="submit()">提交</button>
                	<button class="btn btn-danger ml20" @click="handleClose()">取消</button>
                </div>
            </div>
        </div>
    </diag>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            ruleform: {  },
            vaildate: {},
            dialogVisible: false,
            data: this.formatData(this)
        }
    },
    props: [ /*'status','id',*/ 'formAction'], //父类的数据
    methods: {
        handleClose: function(done) {
            this.$refs.diag.thisDiag = false;
        },
        submit() {
            if (this.vaildForm(this)) {
                this.postAjax(this.formAction, this.ruleform, msg => {
                    if(msg.data.status == 2){
                    	this.handleClose();
                    	this.$emit("callBack");
                    }
                });
            };
        },
        ajax(item) {
            this.ruleform = item;
            this.$refs.diag.thisDiag = true;
        }
        /*商品规格结束*/
    },


}

</script>
