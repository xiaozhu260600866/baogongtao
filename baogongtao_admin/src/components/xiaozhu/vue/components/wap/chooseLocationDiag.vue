<!-- 调用 
import picDiag from "xiaozhu/vue/components/wap/picDiag";
components: {
		picDiag
}
<picDiag ref="picDiag" :src="data.user.userInfo.getVideoSrc.url"></picDiag>
@click="$refs.picDiag.ajax()"

-->
<template>
	<section>
		<div id="share-overlay2" @click="toClose" v-if="thisDiag"></div>
		<div id="float-video" v-if="thisDiag">
			<div class="text-center m10">
				 <iframe data-v-3f05b4e6="" id="mapPage" width="100%" height="500px" frameborder="0" src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=LT6BZ-ZAOC6-KUFSB-MR4F4-OOMX5-S6BTW&referer=myapp"></iframe>
				 <div class="dx-btn dx-btn-blue width100" @click="toClose">确定</div>
			</div>
		</div>
	</section>
</template>
<script type="text/javascript">
export default {
	props: ['src'],
	data() {
		return {
			thisDiag: false
		}
	},
	mounted(){
		window.addEventListener('message',event=>{
    // 接收位置信息
             //this.handleClose();
   			 this.$emit("locationCallBack",event.data);
		}, false);
	},
	methods: {
		ajax() {
			this.thisDiag = true;
			this.$nextTick(() => {
				//document.getElementById("float-video").style.display = "block"
				//document.getElementById("share-overlay2").style.display = "block"
			});
		},
		toClose() {
			this.$parent.videoSrc = "";
			this.thisDiag = false;
			//document.getElementById("float-video").style.display = "none"
			//document.getElementById("share-overlay2").style.display = "none"
		}
	}
}

</script>
<style type="text/css" scoped="">
#float-video {
	position: fixed;
	left: 0px;
	right: 0px;
	top: 0%;
	margin-top: -20px;
	z-index: 9002;
}

#float-video video {
	width: 100%;
	text-align: center
}

.icon_off {
	position: fixed;
	bottom: 28%;
	z-index: 901;
	left: 50%;
	margin-left: -20px
}

.icon_off .iconfont {
	font-size: 40px;
	color: #fff;
}

#share-overlay2 {
	position: fixed;
	top: 0px;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 9001;
	width: 100%;
	height: 100vh;
	background: #333;
	filter: alpha(opacity=70);
	-moz-opacity: 0.7;
	opacity: 0.7;
}

</style>
