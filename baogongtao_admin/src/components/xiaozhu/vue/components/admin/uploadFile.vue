<!-- 
使用：
1.components: {
        'my-upload':()=>import('xiaozhu/vue/components/admin/uploadFile.vue')
    }
2.   <my-upload action="/admin/client/upload" ref="upload" downLoadUrl="/admin/example-excel?filepath=/upload/text.csv"></my-upload>
 -->
<template>
    <el-dialog title="上传学生信息" :visible.sync="dialoguploadVisible" :top="top" :before-close="handleClose" size="tiny">
        <el-upload class="upload-demo" drag :action="action" multiple :on-success="uploadSuccess" :data="uploadData"> <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em><span style="color: red">(只能上传excel格式文件)</span></div>
            <div class="el-upload__tip" slot="tip">
                <a class="el-upload__tip pull-right" slot="tip" :href="downLoadUrl">下载示例文件</a>
            </div>
        </el-upload>
    </el-dialog>
</template>
<script>
export default {
    props: ['top', 'action', 'downLoadUrl'],
    data() {
        return {
            uploadData: {
                _token: $("#token").val(),
            },
            dialoguploadVisible: false

        };
    },
    methods: {
        ajax() {
            this.dialoguploadVisible = true;
        },
        handleClose() {
            this.dialoguploadVisible = false;
        },
        uploadSuccess(response, file, fileList) {
            if (response.status == 3) {
                vueError(this, response.message);
                fileList.pop();
                return false;
            }
            if (response.status == 2) {
                vueSuccess(this, response.message);
                fileList.pop();
                this.dialoguploadVisible = false;
                this.$parent.ajax();
            }

        },
    },
}
</script>
<style type="text/css">
input[type=file] {
    display: none
}
</style>