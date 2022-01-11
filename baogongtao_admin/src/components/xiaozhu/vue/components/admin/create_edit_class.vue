<template>
    <section>
        <el-dialog :title="title" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose" append-to-body>
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="排序" :rules="[{ required: true, message: '排序不能为空'},]">
                    <el-input v-model="ruleForm.sort" :class="['width80']"></el-input>
                </el-form-item>
                <el-form-item label="名称" :rules="[{ required: true, message: '名称不能为空'},]">
                    <el-input v-model="ruleForm.name" :class="['width80']"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            ruleForm: {},
            formAction: '',
            type: '',
            dialogVisible: false,
            title: '',
            user_id: ''
        }
    },
    props: [],
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.postAjax(this.formAction, this.ruleForm, msg => {
                        if (msg.data.status == 2) {
                            this.dialogVisible = false;
                            this.$emit("callBack", this.ruleForm);
                        }

                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleClose: function(done) {
            this.dialogVisible = false;
        },
        ajax(row, formAction, type) {
            this.type = type;
            this.formAction = formAction + "class";
            this.dialogVisible = true;
            if (type == 'add') {
                this.ruleForm = { fid: row.id, sort: 0, name: '' }
                this.title = "添加[" + row.name + ']下级类别';
            } else {
                 this.title = "修改[" + row.name + ']类别';
                 this.ruleForm = row;
            }
            this.ruleForm.type  = type;
        }
    },
}

</script>
