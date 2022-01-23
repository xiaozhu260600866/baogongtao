<!-- 使用
1.'my-upload': () =>
            import ('xiaozhu/vue/components/wap/uploadPic.vue'),
2. <my-upload upurl="product" uploadLength="3" :fileList="fileList" :sizearr="[300]"></my-upload>
3.data(){
	return {
		fileList:[]
	}
4.格式化fileList
implodeCover(this.fileList);
5.分割fileList
splitCover(params.cover, "product");
}
-->
<template>
  <div>
    <el-upload :file-list="fileList" action="/ajax/uploadpic" :data="uploadData" :before-upload="uploadBefore" list-type="picture-card" :on-success="uploadSuccess" :on-remove="handleRemove" :on-preview="handlePictureCardPreview"> <i class="el-icon-plus" />
    </el-upload>
  </div>
</template>
<style type="text/css">
input[type=file] {
    display: none
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.el-upload-list__item-preview {
    display: none
}

.el-upload-list__item {
    width: 20% !important;
    height: 80px !important;
    margin-right: 3.2% !important;
}

.el-upload {
    width: 20% !important;
    height: 80px !important;
    position: relative
}

.el-upload .el-icon-plus {
    position: absolute;
    left: 25%;
    top: 30%;
}
</style>
<script type="text/javascript">
import { Upload } from 'element-ui'

export default {
    components: {
        'el-upload': Upload

    },
    props: ['upurl', 'uploadLength', 'fileList', 'sizearr'],
    data() {
        return {
            uploadData: {
                _token: $('#token').val(),
                upurl: this.upurl
            },
            dialogImageUrl: '',
            dialogVisibleImage: false
        }
    },
    mounted() {
        $('.el-upload-list__item-preview').hide()
    }, // 父类的数据

    methods: {
        handleRemove(file, fileList) {
            // return false;
            for (var i = 0; i < this.fileList.length; i++) {
                if (this.fileList[i].name == file.name) this.fileList.splice(i, 1)
            }
            console.log(this.fileList)
            // alert("A");
        },
        uploadBefore(file) {
            if (this.uploadLength <= this.fileList.length) {
                alert('上传不得大于' + this.uploadLength)
                return false
            }
        },
        uploadSuccess(response, file, fileList) {
            if (response == 2 || response == 0) {
                alert('上传文件格式不正确')
                fileList.pop()
                return false
            }
            var that = this

            /* 压缩图开始*/
            $.ajax({
                type: 'POST',
                url: '/ajax/image-resize',
                data: {
                    type: this.upurl,
                    value: response,
                    size: this.sizearr,
                    _token: $('#token').val()
                },
                dataType: 'text',
                success: function(datav) {
                    that.fileList.push(file)
                    console.log(that.fileList)
                    $('.el-upload-list__item-preview').hide()
                }
            })
            /* 压缩图结束*/
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url
            this.dialogVisibleImage = true
            $('.el-upload-list__item-preview').hide()
        }
    }
}
</script>
