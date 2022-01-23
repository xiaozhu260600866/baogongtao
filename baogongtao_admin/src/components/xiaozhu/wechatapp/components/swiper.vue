<template>
  <div style="position: relative;z-index: 1;">
    <swiper class="swiper" :indicator-dots="indicatorDots? false : true" :vertical="vertical" :autoplay="autoplay" :duration="duration" :circular="circular" :style="'height:'+imgheights[current]+'rpx'">
      <swiper-item v-for="(item,index) in lists" v-if="item">
        <a :href="item.url ? item.url : '' " hover-class="none">
          <img :src="item.cover ? item.cover :getSiteName+'/upload/images/'+purl+'/300_'+item " :style="'height:'+imgheights[current]+'rpx;width:'+imgwidth+'rpx;'" @load="imageLoad" @click="!item.cover ? previewImage(item,purl):''">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
export default {
    props: ['lists', 'purl', 'indicatorDots'],
    data() {
        return {
            vertical: false,
            autoplay: true,
            duration: 100,
            circular: true,
            imgheights: [],
            imgwidth: 750,
            current: 0,
            getSiteName: this.getSiteName()
        }
    },
    methods: {
        imageLoad(e) {
            var imgwidth = e.mp.detail.width
                var imgheight = e.mp.detail.height
                var ratio = imgwidth / imgheight
            var viewHeight = 750 / ratio
            var imgheight = viewHeight
            var imgheights = this.imgheights
            imgheights.push(imgheight)
            this.imgheights = imgheights
        }
    }
}

</script>
<style>
</style>
