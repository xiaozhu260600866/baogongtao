<!--
使用：
1.components: {
		'my-upload':()=>import('xiaozhu/vue/components/admin/uploadPic.vue')
	}
2.   <my-upload :upurl="ruleForm.getDepartment" uploadLength="1" :fileList="ruleForm.cover" :sizearr="300" opentype="ablank"></my-upload>
3.data(){
	return {
		fileList:[]
	}
4.格式化fileList
implodeCover(this.fileList);
5.分割fileList
splitCover(params.cover, "product");
 -->
<template>
  <div class="flex" style="display: flex;align-items: flex-start;">
    <p v-if="label" class="el-form-item__label" :style="labelWidth ?labelWidth : 'width:100px'">{{ label ? label : '上传图片' }}</p>
    <div class="flex1">
      <div v-if="uploadLength == 1">
        <el-upload
          v-if="!uploadPic"
          :headers="myHeaders"
          class="avatar-uploader"
          :data="uploadData"
          :action="getSiteName()+'/ajax/uploadpic?api_token='+getUser().api_token+'&source=admin'"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :before-upload="uploadBeforeSingle"
        >
          <i class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
        <div v-if="uploadPic" class="div-img" style="width:58px">
          <img :src="uploadPic" class="avatar avatar-img" style="height: 58px;width: 58px;overflow: hidden;display: flex;border-radius: 6px;">
          <a class="el-icon-group" href="javascript:;">
            <i class="el-icon-zoom-in" @click="big" />
            <i class="el-icon-delete" @click="delSingle" />
          </a>
          <label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-check" /></label>
        </div>
      </div>
      <div v-else>
        <el-upload
          :headers="myHeaders"
          :file-list="fileList"
          :action="getSiteName()+'/ajax/uploadpic?api_token='+getUser().api_token+'&source=admin'"
          :data="uploadData"
          :before-upload="uploadBefore"
          list-type="picture-card"
          :on-success="uploadSuccess"
          :limit="uploadLength"
          :on-remove="handleRemove"
          :on-preview="handlePictureCardPreview"
        > <i class="el-icon-plus" />
        </el-upload>
      </div>

      <el-dialog v-model="dialogVisibleImage" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>

      <p v-if="message" class="fs-12 fc-9 pt8">{{ message }}</p>
    </div>
  </div>
</template>
<style type="text/css">
	input[type=file] {
		display: none
	}
	.avatar-uploader .el-upload{width: 60px;height: 60px;line-height: 60px;border: 1px dotted #58b7ff;border-radius: 6px;}
	.avatar-uploader .el-upload img{height: 58px;width: 58px;overflow: hidden;display: flex;border-radius: 6px;}
	.el-upload--picture-card{width: 60px;height: 60px;line-height: 60px;border: 1px dotted #58b7ff;border-radius: 6px;}
	.el-upload--picture-card i{font-size: 14px;color: #333;}
	.el-upload-list__item{width: 60px!important;height: 60px!important;}
	.el-upload-list img{height: 58px!important;width: 58px!important;overflow: hidden;display: flex;border-radius: 6px;}
	.div-img{position: relative;overflow: hidden;border-radius: 6px;}
	.div-img .el-icon-group{position: absolute;top: 0;left: 0;background: rgba(0, 0, 0, 0.6);display: flex;width: 100%;height: 100%;justify-content: center;align-items: center;padding: 0 5px;border-radius: 6px;display: none;transition: all 0.5s;}
	.div-img .el-icon-group i{font-size: 12px;color: #fff;display: inline-block;width: 100%;text-align: center;}
	.div-img:hover .el-icon-group{display: flex;}
	.div-img .el-upload-list__item-status-label {position: absolute;right: -15px;top: -6px;width: 40px;height: 24px;background: #13ce66;text-align: center;-webkit-transform: rotate(45deg);transform: rotate(45deg);-webkit-box-shadow: 0 0 1pc 1px rgba(0,0,0,.2);box-shadow: 0 0 1pc 1px rgba(0,0,0,.2);display: block;}
	.div-img .el-upload-list__item-status-label i {font-size: 12px;margin-top: 11px;-webkit-transform: rotate(-45deg);transform: rotate(-45deg);color:  #fff;}
	.div-img:hover  .el-upload-list__item-status-label{display: none;}

</style>
<script type="text/javascript">
	export default {
		props: ['upurl', 'uploadLength', 'fileList', 'sizearr', 'opentype', 'label', 'labelWidth', 'message'], // 父类的数据
		data() {
			return {
				uploadData: {
					upurl: this.upurl,
					thumbsize: this.sizearr
				},
				uploadPic: '',
				dialogImageUrl: '',
				myHeaders: { Authorization: localStorage.getItem('token') },
				dialogVisibleImage: false
			}
		},
		watch: {
		  fileList(row) {
			 if (this.uploadLength == 1 && this.fileList.length > 0) {
				 this.uploadPic = this.fileList[0].url
			 }
			 if (this.uploadLength == 1 && this.fileList.length == 0) {
				   this.uploadPic = ''
			 }
		  }
		},
		mounted() {
			if (this.uploadLength == 1 && this.fileList.length > 0) {
				this.uploadPic = this.fileList[0].url
			}
		},
		methods: {
            big() {
              window.open(this.uploadPic, '_blank')
            },
            delSingle() {
              this.fileList.splice(0, 1)
              this.uploadPic = ''
              console.log(this.fileList)
            },
            uploadBeforeSingle() {
              console.log(1)
            },
			handleRemove(file, fileList) {
                console.log(file)
                console.log(fileList)
				 for (var i = 0; i < this.fileList.length; i++) {
					if (this.fileList[i].uid == file.uid) this.fileList.splice(i, 1)
				}
			},
			uploadBefore(file) {
				if (this.uploadLength <= this.fileList.length) {
					alert('上传不得大于' + this.uploadLength)
					return false
				}
			},
			uploadSuccess(response, file, fileList) {
				if (response.code != 0) {
					alert('上传文件格式不正确')
					fileList.pop()
					return false
				}
				var that = this
				if (that.uploadLength == 1) {
					that.fileList.splice(0, 1)
					file.url = that.getSiteName() + '/static/images/' + this.upurl + '/' + response.obj.filename
					that.uploadPic = file.url
					that.fileList.push(file)
				} else {
					that.fileList.push(file)
				}

				that.$emit('callBack', file)
			},
			handlePictureCardPreview(file) {
				if (this.opentype == 'ablank') {
					window.open(file.url, '_blank')
				} else {
					this.dialogImageUrl = file.url
					this.dialogVisibleImage = true
				}
			}
		}
	}
</script>
