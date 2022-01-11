<!-- 调用 
import videoDiag from "xiaozhu/vue/components/wap/videoDiag";
components: {
		videoDiag
}
<videoDiag ref="videoDiag" :src="data.user.userInfo.getVideoSrc.url"></videoDiag>
@click="$refs.videoDiag.ajax()"

-->
<template>
	<section>
		<div id="share-overlay2" @click="toClose" v-if="thisDiag"></div>
		<div id="float-video" v-if="thisDiag">
			<div class="dx-video">
				<div  @click="toClose"><i class="iconfont dx-del fs-30 fs-white"></i></div>
				<video controls="" width="320" height="240" autoplay="" name="media" v-if="src">
						<source :src="src" type="video/mp4">
				</video>
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
.dx-video{
	position:relative;
}
.dx-video .dx-del{
	position: absolute;
	left: 50%;
	margin-left: -30px;
	bottom: -120px;
}
#float-video {
	position: fixed;
	left: 0px;
	right: 0px;
	top: 20%;
	margin-top: -20px;
	z-index: 900;
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
	z-index: 100;
	width: 100%;
	height: 100vh;
	background: #333;
	filter: alpha(opacity=70);
	-moz-opacity: 0.7;
	opacity: 0.7;
}

</style>
