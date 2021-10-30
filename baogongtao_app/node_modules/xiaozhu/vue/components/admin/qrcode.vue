<!-- 
使用：
1.components: {
        'my-qrcode':()=>import('xiaozhu/vue/components/admin/qrcode.vue')
    }
2.   <my-qrcode  ref="qrcode"></my-qrcode>
 -->
<template>
    <section>
        <el-dialog title="扫一扫二维码，即可绑定" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <div class="el-form-item">
                    <el-form-item label="二维码">
                        <div class="qrcode">
                            <div :id="user_id"></div>
                        </div>
                    </el-form-item>
                </div>
            </el-form>
        </el-dialog>
    </section>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            ruleForm: {},
            user_id: ''
        }
    },
    props: [],
    methods: {
        handleClose: function(done) {
            this.dialogVisible = false;
            $(".qrcode img").remove();
        },
        getAjax(user_id) {
            this.user_id = user_id;
            this.dialogVisible = true;
            setTimeout(() => {
                let qrcode = new QRCode(document.getElementById(this.user_id), {
                    width: 200, //设置宽高
                    height: 200
                });
                qrcode.makeCode('https://www.baidu.com');
            }, 100)
        }
    },
}
</script>