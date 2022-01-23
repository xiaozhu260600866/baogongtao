<!-- <marque :lists="data.articleLists"></marque> -->
<template>
  <div class="vueBox">
    <div class="marquee">
      <div class="marquee_title">
        <div class="hl-logo">
          <img src="https://456.doxinsoft.com/images/wap/news-notice.png">
        </div>
      </div>
      <div class="marquee_box">
        <ul class="marquee_list" :class="{marquee_top:animate}">
          <li v-for="(item, index) in lists">
            <div v-for="(v,index2) in item" class="name nowrap" @click="goto(v.url,1)">{{ v.label }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    props: ['lists', 'myclass'],
    data() {
      return {
        animate: false,
        timer1: '',
        br: '\n',
        timer2: ''

      }
    },
    onLoad() {
		cosnoel.log(20)
      this.timer1 = setInterval(this.showMarquee, 2000)
    },
    onUnload() {
        clearInterval(this.timer1)
        clearInterval(this.timer2)
    },
    methods: {
      showMarquee: function() {
		 console.log('007')
        this.animate = true
        this.timer2 = setTimeout(() => {
          this.lists.push(this.lists[0])
          this.lists.shift()
          this.animate = false
        }, 5000)
      }
    }
  }
</script>
<style scoped>
  @import url("font/globalFont.css");

  .marquee {
    width: 100%;
    height: 50px;
    align-items: center;
    color: #3A3A3A;
    display: flex;
    box-sizing: border-box;
    background: #fff;
    padding: 10px 20px;
    height: auto;
  }

  .marquee_title {
    height: 30px;
    font-size: 14px;
    align-items: center;
  }

  .marquee_box {
    display: block;
    position: relative;
    height: 44px;
    overflow: hidden;
    flex: 1;
    overflow: hidden;
  }

  .marquee_list {
    display: block;
  }

  .marquee_top {
    transition: all 0.5s;
    margin-top: -44px
  }

  .marquee_list li {
    height: 44px;
    line-height: 22px;
    font-size: 14px;
  }

  .marquee_list li .name {
    position: relative;
    padding-left: 15px;
  }
  .marquee_list li .name:before{
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -3px;
    height: 6px;
    width: 6px;
    background: #999;
  }

  .red {
    color: #FF0101;
  }
  .hl-logo ._img{width: 24px;height: 24px;display: flex;margin-right: 15px;}
</style>
