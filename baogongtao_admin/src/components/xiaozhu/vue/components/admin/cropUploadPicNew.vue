<template>
  <section>
    <el-dialog title="选择图片" :visible.sync="dialogFormVisible" top="141px" :before-close="handleClose" width="90%" append-to-body>
      <div class="flex">
        <div id="cut_container" style="  width:400px; height: 320px;margin-right: 30px">
          <h3>裁剪框</h3>
          <div style="background-color: #d6d6d6;height:320px" class="uploadBody"> <img  id="image"/> </div>
            <input type="file" id="change_btn" style="width: 80%; margin-top: 5%;display: block" @change="fileChange($event)">
          </div>
          <div style="">
            <h3>裁剪预览框</h3>
            <div class="pre-container">
              <div class="small"></div>
              <div class="cavans"></div>
            </div>
            <el-form-item class="text-right mt20">
              <el-button @click="handleClose">取消</el-button>
              <el-button type="primary" @click="upload2()">上传<span v-if="percent"></span></el-button>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-dialog>
  </section>
</template>
<style type="text/css" scoped="">
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
import ajax from "@/utils/ajax";

import "../utils/cropper.js";
import "../utils/cropper.css";

export default {
  props: ["data", "value", "source"],
  data() {
    return {
      dialogFormVisible: false,
      percent: 0,
    }
  },
  computed: {
    currentValue: {
      // 动态计算currentValue的值
      get: function() {
        return this.value;
      },
      set: function(val) {
        this.$emit('input', val);
      }
    }
  },

  methods: {
    ajax(item) {
      this.$nextTick(() => {
        $('#image').cropper('destroy');
        if (document.getElementById("image")) document.getElementById("image").src = "";
        let file = $('#change_btn')[0];
        if (file) {
          file.value = '';
        }
        this.dialogFormVisible = true;
      });
    },
    handleClose() {
      this.dialogFormVisible = false;
    },
    upload2() {
      var cas = $('#image').cropper('getCroppedCanvas');
      this.showLoading();
      cas.toBlob(blob => {
        ajax({
          uploadProps: this.data,
          name: 'xiaozhu',
          file: blob,
          onProgress: e => {
            //this.$emit("onProgress", e);

            //this.getSuccess("上传进度" + parseInt(e.percent) + '%');
            //this.percent = parseInt(e.percent);
          },
          onSuccess: res => {
            this.$emit("onSuccess", res);
            //this.clear();
            $('#image').cropper('destroy');
            if (this.source && this.source == "delImage") {
              $("#image").remove();
            }

            let file = $('#change_btn')[0];
            if (file) {
              file.value = '';
            }
            this.hideLoading();
            this.dialogFormVisible = false;

            this.currentValue = { name: res.filename, url: this.getSiteName() + '/upload/images/' + this.data.data.upurl + '/' + res.filename }



          },
          onError: (err, response) => {
            //this.$emit("onError", err, response);
            //this.clear();
          }
        })
      })
    },
    fileChange(event) {
      $('#image').cropper('destroy');
      let reader = new FileReader(),
        file = event.currentTarget.files[0],
        imgType = /^image\//;
      if (file.type) {
        if (!imgType.test(file.type)) {
          alert("请选择图片");
          return;
        }
      }
      let self = this;
      reader.onload = function(e) {
        document.getElementById("image").src = e.target.result;
        $('#image').cropper({
          aspectRatio: self.data.data.widthRatio / self.data.data.heightRatio,
          viewMode: 1,
          dragMode: 'none',
          preview: ".small",
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
            //console.log("ready");
            //console.log(this);
            $(this).cropper('crop');
          },
          cropstart: function(e) {
            //console.log(e);
            //console.log("cropstart");
          },
          cropmove: function(e) {
            //console.log("cropmove");
          },
          cropend: function(e) {
            //console.log("cropend");
          },
          crop: function(e) {
            //console.log("crop");
          },
          zoom: function(e) {
            // console.log("zoom");
          },
        });

      }.bind(this);
      reader.readAsDataURL(file);
    }
  },
  mounted() {

  }
};

</script>
