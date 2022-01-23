<!--
使用：
1.components: {
        'my-status':()=>import('xiaozhu/vue/components/admin/status.vue')
    }
2.   <my-status  ref="status" style="width:100%"  formAction="/admin/article/change-status"/>
3.调用：

this.$refs.status.ajax({id:item.id,status:item.status}); //函数内为调用的URL
 -->
<template>
  <!-- 上传规格 -->
  <el-dialog :title="ruleForm.status==2 ? '请填写拒绝内容' :'确认是否通过' " :visible.sync="dialogVisible" size="tiny" :before-close="handleClose" append-to-body>
    <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">
      <div v-if="ruleForm.status==2" class="el-form-item">
        <el-form-item label="拒绝理由" prop="content" :rules="[{ required: true, message: '请填写拒绝理由'}, ]">
          <el-input v-model="ruleForm.content" type="textarea" :rows="2" placeholder="请输入内容" />
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer ">
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      <el-button @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script type="text/javascript">
export default {
    props: ['formAction', 'source'],
    data() {
        return {
            ruleForm: {},
            dialogVisible: false
        }
    }, // 父类的数据
    methods: {
        handleClose: function(done) {
            this.dialogVisible = false
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.postAjax(this.formAction, this.ruleForm, msg => {
                        if (msg.data.status == 2) {
                            this.dialogVisible = false
                           if (this.source && this.source == 'open') {
                                this.$emit('callBack', msg.data.detail)
                           } else {
                                this.$parent.status = this.ruleForm.status
                                this.$parent.ajax()
                           }
                        }
                    })
                }
            })
        },
        ajax(item) {
            this.ruleForm = item
            this.dialogVisible = true
        }
        /* 商品规格结束*/
    }

}

</script>
