<template>
  <!-- 上传规格 -->
  <el-dialog title="修改订单内容" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
    <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm" style="margin:20px;width:60%;min-width:300px;">
      <div v-if="type==0">
        <!-- 列表 -->
        <div class="el-form-item">
          <el-form-item label="旧价格">
            <el-input v-model="ruleForm.amount" placeholder="请输入内容" :disabled="true" />
          </el-form-item>
          <el-form-item label="新价格" prop="amount" :rules="[{ required: true, message: '新价格不能为空'}, ]">
            <el-input v-model="ruleForm.amount" style="width:80px" />
          </el-form-item>
        </div>
      </div>
      <div v-if="type==1">
        <el-form-item label="名称" prop="addr_name" :rules="[{ required: true, message: '名称不能为空'},]">
          <el-input v-model="ruleForm.addr_name" />
        </el-form-item>
        <el-form-item label="电话" prop="addr_phone" :rules="[{ required: true, message: '电话不能为空'},]">
          <el-input v-model="ruleForm.addr_phone" />
        </el-form-item>
        <el-form-item label="省" prop="addr_province" :rules="[{ required: true, message: '省不能为空'},]">
          <el-input v-model="ruleForm.addr_province" />
        </el-form-item>
        <el-form-item label="市" prop="addr_city" :rules="[{ required: true, message: '市不能为空'},]">
          <el-input v-model="ruleForm.addr_city" />
        </el-form-item>
        <el-form-item label="区" prop="addr_area" :rules="[{ required: true, message: '区不能为空'},]">
          <el-input v-model="ruleForm.addr_area" />
        </el-form-item>
        <el-form-item label="地址" prop="addr_address" :rules="[{ required: true, message: '地址不能为空'},]">
          <el-input v-model="ruleForm.addr_address" />
        </el-form-item>
      </div>
      <div v-if="type==2">
        <el-form-item label="快递" prop="express_name" :rules="[{ required: true, message: '快递不能为空'},]">
          <el-select v-model="ruleForm.express_name" placeholder="请选择快递">
            <el-option label="自提" value="自提" />
            <el-option label="顺丰速运" value="顺丰速运" />
            <el-option label="韵达快递" value="韵达快递" />
            <el-option label="圆通速递" value="圆通速递" />
            <el-option label="中通速递" value="中通速递" />
            <el-option label="EMS快递" value="EMS快递" />
            <el-option label="天天快递" value="天天快递" />
            <el-option label="百世快递" value="百世快递" />
            <el-option label="全峰快递" value="全峰快递" />
            <el-option label="其它" value="其它" />
          </el-select>
        </el-form-item>
        <el-form-item label="单号" prop="express_no" :rules="[{ required: true, message: '单号不能为空'},]">
          <el-input v-model="ruleForm.express_no" />
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer pull-right">
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      <el-button @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script type="text/javascript">
export default {
    props: ['type', 'ruleForm', 'formAction'],
    data() {
        return {
            formAction: this.formAction,
            dialogVisible: false
        }
    }, // 父类的数据
    methods: {
        handleClose: function(done) {
            this.dialogVisible = false
        },
        ajax() {
            this.dialogVisible = true
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm.type = this.type
                    this.postAjax(this.formAction, this.ruleForm, msg => {
                        if (msg.data.status == 2) {
                            this.getSuccess('操作成功')
                            this.$parent.ajax()
                            this.dialogVisible = false
                        }
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
        /* 商品规格结束*/
    }

}

</script>
