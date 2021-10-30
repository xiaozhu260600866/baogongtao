<template>
	<div>
		<el-upload class="upload-demo upload-file" drag :action="getSiteName()+action" :fileList="fileList" multiple :accept="accept" :on-success="uploadSuccess"
		:before-upload="beforeAvatarUpload" :data="uploadData" :on-remove="handleRemove">
			<i class="el-icon-upload"></i>
			<div class="el-upload__text"><em>点击上传</em></div>
			<div class="el-upload__tip" slot="tip">只能上传<span v-for="suffix in allowSuffix">{{suffix}}</span>格式文件</div>
		</el-upload>
	</div>
</template>
<script>
export default {
	props: ['action', 'accept',"fileList","allowSuffix","upurl"],
	data() {
		return {
			uploadData: {
				api_token:this.getUser().api_token,
				source:"admin",
				upurl:this.upurl
			},
		};
	},
	methods: {
		handleRemove(file, fileList) {
			for (var i = 0; i < this.fileList.length; i++) {
				if (this.fileList[i].uid == file.uid) {
					this.fileList[i].delete = true;
					this.fileList[i].upurl = this.upurl;
					this.postAjax(this.action,this.fileList[i]);
					this.fileList.splice(i, 1);
				}
			}
		},
		beforeAvatarUpload(file){
		},
		uploadSuccess(response, file, fileList) {
			if (response.status == 3) {
				this.getError(response.message);
				return false;
			}
			if (response.status == 2) {
				this.fileList.push(file);

			}

		},
	},
}
</script>
<style type="text/css">
.upload-file input[type=file] {display: none}
.upload-file .el-upload__tip{display: flex;line-height: 24px;}
.upload-file .el-upload-list{margin-top: 10px;}
.upload-file .el-upload-list__item{width: 360px!important;line-height: 36px!important;height: 36px!important;margin: 0 0 10px;}
</style>