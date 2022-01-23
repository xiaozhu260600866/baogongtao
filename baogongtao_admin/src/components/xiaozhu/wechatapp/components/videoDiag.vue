
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
    <div v-if="videoShow == true" class="share-overlay" style="z-index: 10;" @click="videoShow = !videoShow" />
    <div v-if="videoShow == true" class="float-video">
      <video :src="src" autoplay="true" />
    </div>
    <div v-if="videoShow == true" class="icon_off" @click="videoShow = !videoShow"><span class="iconfont icon-xiaozhu-off" /></div>
  </section>
</template>
<script type="text/javascript">
	export default {
		props: ['src'],
		data() {
			return {
				videoShow: false
			}
		},
		methods: {
			ajax() {
				this.videoShow = !this.videoShow
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
