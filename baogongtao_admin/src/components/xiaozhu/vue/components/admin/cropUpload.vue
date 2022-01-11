<!-- 图片 -->
<template>
	<section>
		<el-form-item :label="label ? label : '标题'">
			<div class="edit-content flex">
				<li v-for="(cover,coverIndex) in currentValue" class="drag-handle stick_w active" :style="'background: url('+cover.url+') center center / cover;'" @click="actIndex = coverIndex">
					<!---->
					<a :href="cover.url" target="_blank" style="height:100%;width:100%"><div  style="height:100%;width:100%"></div></a>
					<img  src="https://website.doxinsoft.com/images/website/active.png" class="coner_bottom" v-if="actIndex ==coverIndex">
					<i data-img="https://resource.aijiatui.com/13632945694/company/moments/78f40d828dadcce14201593f8cb32f49.jpeg" class="closeSwpier el-icon-circle-close" @click="del(coverIndex)"></i>
				</li>
				<li class="ctl_li stick_w cicle_border" @click="open('')" v-if="currentValue.length < data.data.allowUploadNum"><i  class="el-icon-plus"></i>
					<!---->
				</li>
			</div>
			<div class="marsk_img" v-if="currentValue.length ">
				<div class="chosed_img_1" :style="'background: url('+currentValue[actIndex].url+') center center / cover;'"></div>
				<div class="marsk" @click="open(currentValue[actIndex])">
					<div class="self_i">
						<img  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAANdJREFUOBHVlEEKwjAQRY0I2lpr8Qx6FpeCVxI8R28hCIKKUhU34lJXrryFvgqBOKbR1i504LWTn5nfIaVVN6JSQlRL8HhY1Lj2yzL7Mx/eRQSdr8bGIIQt7CEqZEZjCxLQsSNp5zKjIYCVdjDuG/LwIzMKfVgYzTJdIwROMwo8mMlOy3qJ1rSasdGAqaUpS5qz4T+ZIdRhktXh0NPpvdRMf2sD8ivEcIR3caAghgsM4TV4wtgxgd4ayU49kdRzr21Ghf5Pv2ek5GFwmj20rtTF+qyUOpnaHb4LRPn19RCBAAAAAElFTkSuQmCC" alt=""> 重新上传
            				</div>
					</div>
				</div>
				<p class="tip">{{ message }}</p>
				<p class="tip" v-if="data.data.allowUploadNum >1">图片大小不超过2M,支持jpg、png格式，最多可上传{{ data.data.allowUploadNum }}张 </p>
		</el-form-item>
		<cropUploadPic :data="data" ref="cropUpload" v-model="currentValue[actIndex]" :source="source"></cropUploadPic>
		<cropUploadPic2 :data="data" ref="cropUpload2" v-model="currentValue[actIndex]" :source="source" :uploadId="uploadId"></cropUploadPic2>
	</section>
</template>
<script type="text/javascript">
import cropUploadPic from "./cropUploadPicNew";
import cropUploadPic2 from "./cropUploadPicNew2";
export default {
	props: ["value", "data", "message", "label","source" ],
	data() {
		return {
			siteName: this.getSiteName(),
			actIndex: 0,
			uploadId:this.getMath(1,1000),
			fileList: []
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
		del(index) {
			this.getConfirm("是否删除？", msg => {
				this.currentValue.splice(index, 1)
				this.actIndex = this.currentValue.length - 1;
			});
		},
		open(item) {

			if (!item) {
				this.currentValue.push({ name: 'pic.png', url: 'https://website.doxinsoft.com//upload/images/website/pic.png' });
				this.actIndex = this.currentValue.length - 1;
				
			}
			this.uploadId = this.getMath(1,1000);
			this.$refs.cropUpload2.ajax();
			/*if(item && item.name != 'pic.png'){
				this.uploadId = this.getMath(1,1000);
				this.$refs.cropUpload2.ajax();
			}else{
				this.$refs.cropUpload.ajax();
			}*/

			
		}
	},
	components: {
		cropUploadPic,
		cropUploadPic2
	}
}

</script>
<style type="text/css" scoped="">
li{
	list-style: none;
}
.tip {
	color: #999;
	line-height: 20px;
	font-size: 12px;
}

.marsk_img:hover .marsk {
	display: block
}

.marsk_img {
	position: relative;
	display: inline-block;
	margin-top: 10px;
	cursor: pointer;
}

.marsk_img .marsk {
	display: none;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	color: #fff;
	font-size: 14px;
	background-color: rgba(97, 97, 97, .58);

}

.marsk_img .marsk .self_i {
	position: absolute;
	width: 100%;
	bottom: 0;
	top: 0;
	left: 0;
	margin: auto;
	height: 28px;
	text-align: center;
}

.chosed_img_1 {
	width: 200px;
	height: 106.6px;
	display: block;
}

.marsk-upload {
	position: absolute;
	left: 80px;
	bottom: 5px;
	color: #a4bfdd;
	text-align: center;
}

.cicle_border {
	border: 1px dotted #58b7ff !important;
}

.stick_w.active {
	border: 1px solid #58b7ff;
	position: relative;
}

.stick_w {
	width: 60px !important;
	height: 60px !important;
	line-height: 60px !important;
}

.edit-content li {
	position: relative;
	float: left;
	width: 80px;
	height: 80px;
	border: 0px;
	margin-right: 10px;
	margin-left: 0px;
	/* margin-bottom: 2px; */
	margin-bottom: 10px;
	cursor: pointer;
	text-align: center;
	border-radius: 6px;
}

.stick_w.active .coner_bottom {
	width: 13px;
	height: 12px;
	position: absolute;
	bottom: 0;
	right: 0;
}

.closeSwpier {
	color: red;
}

.edit-content li:hover .closeSwpier {
	display: block;
}

.closeSwpier {
	display: none;
	position: absolute;
	width: 20px;
	height: 20px;
	top: -8px;
	right: -8px;
	border-radius: 50%;
	background-color: #fff;
	line-height: 20px;
	text-align: center;
	font-size: 18px;
}

</style>
