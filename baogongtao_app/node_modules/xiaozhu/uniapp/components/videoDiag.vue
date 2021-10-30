
<!-- 调用 
import videoDiag from "xiaozhu/wechatapp/components/videoDiag";
components: {
		videoDiag
}
<videoDiag ref="videoDiag" :src="data.user.userInfo.getVideoSrc.url"></videoDiag>
@click="$refs.videoDiag.ajax()"

-->
<template>
	<section>
			<div class="share-overlay" v-if="videoShow == true" @click="videoShow = !videoShow"></div>
			<div class="float-video" v-if="videoShow == true">
				<video :src="src" autoplay="true"></video>
			</div>
			<div class="icon_off" v-if="videoShow == true" @click="videoShow = !videoShow"><span class="iconfont icon-xiaozhu-off"></span></div>
	</section>
</template>
<script type="text/javascript">
	export default{
		props:['src'],
		data(){
			return {
				videoShow:false
			}
		},
		methods:{
			ajax(){
				this.videoShow = !this.videoShow;
			}
		}
	}
</script>
<style type="text/css" scoped="">
.float-video{position: fixed;left: 0px;right: 0px;top: 50%;margin-top: -150px;z-index: 21;}
.float-video video{width: 100%;}
.icon_off {position: fixed;bottom: 28%;z-index: 22;left: 50%;margin-left: -20px;}
.icon_off .iconfont{font-size: 40px;color: #fff;}
</style>