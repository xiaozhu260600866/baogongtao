<!-- <marque :lists="data.articleLists"></marque> -->
<template>
  <div class="vueBox">
    <view class="tui-rolling-news bg-f">
      <div class="hl-logo">
        <image class="img" src="https://456.doxinsoft.com/images/wap/news-notice.png" />
      </div>
      <swiper vertical autoplay circular interval="3000" class="tui-swiper">
        <swiper-item v-for="(item, index) in lists" :key="index" class="tui-swiper-item">
          <view :class="['tui-news-item',fontSize || 'fs-15']" @click="goto(item.url,1)">{{ item.label }}</view>
        </swiper-item>
      </swiper>
    </view>

  </div>
</template>
<script>
  export default {
    props: ['lists', 'myclass', 'fontSize'],
    data() {
      return {
        animate: false,
        timer1: '',
        br: '\n',
        timer2: ''

      }
    },
    mounted() {

    },
    onUnload() {

    },
    methods: {

    }
  }
</script>
<style scoped>

.hl-logo .img{width: 24px;height: 24px;display: flex;margin-right: 15px;display: flex;margin-top: 3px;}

.tui-rolling-news {
		width: 100%;
		padding: 20upx 30upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
	}

	.tui-swiper {
		font-size: 28upx;
		height: 50upx;
		flex: 1;
	}

	.tui-swiper-item {
		display: flex;
		align-items: center
	}

	.tui-news-item {
		line-height: 28upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

</style>
