<template>
  <div>
    <div v-if="newFile.length == 0" style="position: relative">
      <el-progress v-show="percentShow" :percentage="percentage" class="progress" status="success" />
      <el-button element-loading-text="拼命上传中" type="primary" size="small" @click="uploadQiniu">上传</el-button>
      <input ref="inputfile" type="file" style="width:50px;height:30px;display:block;top:0;opacity: 0;position:absolute" @change="fileChangeHandle">
    </div>
    <div v-else style="position: relative">
      <div v-for="(v,key) in newFile" v-if="v.status == 1">
        <a href="javascript:;" class="el-icon-close" style="position: absolute;left: 0;z-index: 999;color:white;background-color: red;font-size: 20px;" @click="del(key,v.key)" />
        <video controls="" autoplay="" name="media" style="width:300px">
          <source :src="v.key" type="video/mp4">
        </video>
      </div>
    </div>
  </div>
</template>

<script>
    import * as qiniu from 'qiniu-js'
    export default {
        props: ['newFile', 'uploadToken'],
        data() {
            return {
                fileList: [],
                percentage: 0,
                percentShow: false

            }
        },
        mounted() {
            console.log(qiniu)
            console.log(1)
        },
        methods: {
            // 用七牛上传
            del(key, filename) {
                this.fileList.splice(key, 1)
                this.newFile.splice(key, 1)
                let end = filename.indexOf('mp4')
                if (end == -1) end = filename.indexOf('MP4')
                const start = filename.indexOf('com')
                filename = filename.substr(start + 4, end - start - 1)
                this.getConfirm('是否要删除文件', msg => {
                   this.postAjax('/ajax/delQiniu', { filename: filename }).then(msg => {
                       if (msg.data.status == 2) {
                            alert('删除成功；需要按立即创建才能生效')
                       }
                   })
                })
            },
            uploadQiniu() {
                for (const item of this.fileList) {
                    const fileName = item.name
                    const postfix = fileName.substring(fileName.lastIndexOf('.'), fileName.length)
                    const name = new Date().getTime() + Math.ceil(Math.random() * 100)
                    const token = this.uploadToken
                    const putExtra = {
                        fname: fileName,
                        params: {},
                        mimeType: null
                    }
                    const config = {
                        useCdnDomain: true
                    }
                    const observable = qiniu.upload(item, name + postfix, token, putExtra, config)
                    const vueThis = this
                    this.percentShow = true
                    this.percentage = 10
                    observable.subscribe(function(res) {
                        console.log('图片上传进度：', res)
                        vueThis.percentage = res.total.percent
                    }, function(error) {
                        // console.error('图片上传失败：', error)
                    }, function(res) {
                        vueThis.postAjax('/ajax/upload-qiniu', { key: res.key }).then(msg => {
                            if (msg.data.status == 2) {
                                item.key = msg.data.url
                                item.file = res.key
                                item.status = 1
                                console.log(vueThis.fileList)
                                vueThis.newFile.push({
                                    key: msg.data.url,
                                    file: res.key,
                                    status: 1
                                })
                                vueThis.percentShow = false
                                 alert('上传成功；需要按立即创建才能生效')
                            }
                        })

                        // vueThis.imgUrl = vueThis.qiniuUrl + res.key
                        // vueThis.fileUrl.push({
                        //     name: fileName,
                        //     url: vueThis.imgUrl
                        // });
                        // vueThis.$emit('uploadSuccess', vueThis.fileUrl);
                    })
                }
            },
            fileChangeHandle() {
                const file = this.$refs.inputfile.files[0]

                // 判断文件类型
                const upType = ['mp4', 'MP4']
                const fileName = file.name
                const postfix = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length)
                const fileSize = file.size
                if (fileSize > 1504857600) {
                    return this.getError('文件大小应小于1.5G')
                }
                if (upType.indexOf(postfix) === -1) {
                    return this.getError('只支持mp4格式的文件')
                }

                this.fileList.push(file)
                this.uploadQiniu()
            }

        }
    }
</script>

<style>
</style>
