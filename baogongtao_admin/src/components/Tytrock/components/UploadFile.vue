<template>
  <div>
    <el-upload class="upload-demo" :action="url" :data="uploadData" :on-remove="handleRemove" :on-success="handelSuccess" :before-remove="beforeRemove" multiple :limit="length" :on-exceed="handleExceed" :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
import { uploadDelete } from '@/api/base'
export default {
	props: {
		pathName: {
			type: String
		},
		length: {
			type: Number
		},
		fileList: {
			type: Array,
			default: () => []
		},
		defaultText: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			url: process.env.VUE_APP_BASE_API + '/base/upload',
			uploadData: {
				client_id: this.$store.getters.client_id,
				type: 'file',
				pathname: this.pathName,
				token: this.$store.getters.token,
				respone: 'filename'
			}
		}
	},
	methods: {
		handelSuccess(response, file) {
			// console.log(response, file)
			if (this.length == 1) {
				this.fileList.splice(0, 1)
			}

			this.fileList.push(file)

			this.$emit('callBack', file)
		},
		handleExceed(files, fileList) {
			this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
		},
		handleRemove(file, fileList) {
	        for (var i = 0; i < this.fileList.length; i++) {
				if (this.fileList[i].uid == file.uid) this.fileList.splice(i, 1)
			}
			uploadDelete({ file: file.response, pathname: this.pathName }).then(res => {
				console.log(res)
			})
	    }
	}
}
</script>

<style>

</style>
