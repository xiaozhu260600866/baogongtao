<template>
  <section>
    <el-dialog title="选择图片" :visible.sync="dialogFormVisible" top="141px" :before-close="handleClose" width="800px" append-to-body>
      <div class="flex">
        <div id="cut_container" style=" width:400px;margin-right: 30px">
          <h3 class="menu">裁剪框</h3>
          <div class="select">
            <el-button type="primary" @click="handleClose">选择文件</el-button>
            <input :id="'change_btn_'+uploadId" type="file" style="width: 80%; margin-bottom: 15px;display: block;opacity: 0;height: 40px;position: relative;z-index: 2;" @change="fileChange($event)">
          </div>
          <div style="background-color: #d6d6d6;height:320px" class="uploadBody"> <img :id="'image_'+uploadId"> </div>
        </div>
        <div style="">
          <h3 class="menu">裁剪预览框</h3>
          <p style="height: 52px;" />
          <div class="pre-container">
            <div class="small" />
            <div class="cavans" />
          </div>
        </div>
      </div>
      </div>
      <el-form-item class="picUpload mt20">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="upload2()">发布<span v-if="percent" /></el-button>
      </el-form-item>
    </el-dialog>
  </section>
</template>
<style type="text/css" scoped="">
.menu {
	color: #324057;
	margin-bottom: 10px;
}

.select {
	position: relative;
}

.select .el-button {
	position: absolute;
	z-index: 1;
}

.pre-container {
	width: 100%;
	background-color: #d6d6d6;
	overflow: hidden;
	border-radius: 4px;
	margin-top: 40px
}

.small {
	width: 300px;
	height: 283px;
	overflow: hidden;
}

.box {
	width: 500px;
	height: 400px;
}

</style>
<script type="text/javascript">
import ajax from './ajax'

import '../utils/cropper.js'
import '../utils/cropper.css'

export default {
	props: ['data', 'value', 'source', 'uploadId'],
	data() {
		return {
			dialogFormVisible: false,
			percent: 0
		}
	},
	computed: {
		currentValue: {
			// 动态计算currentValue的值
			get: function() {
				return this.value
			},
			set: function(val) {
				this.$emit('input', val)
			}
		}
	},
	mounted() {

	},

	methods: {
		ajax(item) {
			this.$nextTick(() => {
				$('#image_' + this.uploadId).cropper('destroy')
				if (document.getElementById('image_' + this.uploadId)) document.getElementById('image_' + this.uploadId).src = ''
				const file = $('#change_btn_' + this.uploadId)[0]
				if (file) {
					file.value = ''
				}
				this.dialogFormVisible = true
			})
		},
		handleClose() {
			this.dialogFormVisible = false
		},
		upload2() {
			var cas = $('#image_' + this.uploadId).cropper('getCroppedCanvas')
			this.showLoading()
			cas.toBlob(blob => {
				ajax({
					uploadProps: this.data,
					name: 'xiaozhu',
					file: blob,
					onProgress: e => {
						// this.$emit("onProgress", e);

						// this.getSuccess("上传进度" + parseInt(e.percent) + '%');
						// this.percent = parseInt(e.percent);
					},
					onSuccess: res => {
						this.$emit('onSuccess', res)
						// this.clear();
						$('#image_' + this.uploadId).cropper('destroy')
						if (this.source && this.source == 'delImage') {
							// $("#image2").remove();
						}

						const file = $('#change_btn_' + this.uploadId)[0]
						if (file) {
							file.value = ''
						}
						this.hideLoading()
						this.dialogFormVisible = false

						this.currentValue = { name: res.filename, url: this.getSiteName() + '/upload/images/' + this.data.data.upurl + '/' + res.filename }
					},
					onError: (err, response) => {
						// this.$emit("onError", err, response);
						// this.clear();
					}
				})
			}, 'image/jpeg', 0.5)
		},
		fileChange(event) {
			$('#image_' + this.uploadId).cropper('destroy')
			const reader = new FileReader()
				const file = event.currentTarget.files[0]
				const imgType = /^image\//
			if (file.type) {
				if (!imgType.test(file.type)) {
					alert('请选择图片')
					return
				}
			}
			const self = this
			reader.onload = function(e) {
				document.getElementById('image_' + self.uploadId).src = e.target.result
				$('#image_' + self.uploadId).cropper({
					aspectRatio: self.data.data.widthRatio / self.data.data.heightRatio,
					viewMode: 1,
					dragMode: 'none',
					preview: '.small',
					responsive: false,
					restore: false,
					autoCropArea: 1,
					center: false,
					cropBoxResizable: false,
					zoomOnWheel: false,
					//        modal:false,
					//        guides:false,
					//        background:false,
					autoCrop: false,
					//        autoCropArea:0.1,
					//        movable:false,
					//        scalable:false,
					//        zoomable:false,
					//        wheelZoomRatio:false,
					//        cropBoxMovable:false,
					//        cropBoxResizable:false,
					ready: function() {
						// console.log("ready");
						// console.log(this);
						$(this).cropper('crop')
					},
					cropstart: function(e) {
						// console.log(e);
						// console.log("cropstart");
					},
					cropmove: function(e) {
						// console.log("cropmove");
					},
					cropend: function(e) {
						// console.log("cropend");
					},
					crop: function(e) {
						// console.log("crop");
					},
					zoom: function(e) {
						// console.log("zoom");
					}
				})
			}
			reader.readAsDataURL(file)
		}
	}
}

</script>
