<template>
  <section>
    <div v-if="diagDiv" class="share-overlay" @click="toggleDiag()" />
    <div v-if="diagDiv" class="industry">
      <div class="item-body">
        <p class="item-title main-color fs16 lh50 text-center">{{ label }}</p>
        <div class="item-box">
          <p v-for="v in lists" class="fs16 font_666 bd-be" @click="selectRes(v)">{{ v.label }}</p>
        </div>
      </div>
      <div class="off-icon" @click="toggleDiag()">
        <span class="iconfont icon-OFF fs14 font_666" />
      </div>
    </div>
  </section>
</template>
<script>
export default {
	props: ['lists', 'label'],
	data() {
		return {
			diagDiv: false
		}
	},
	methods: {
		toggleDiag() {
			this.diagDiv = !this.diagDiv
			this.$parent.isFixed = this.diagDiv
			console.log(this.$parent.isFixed)
		},
		selectRes(item) {
			this.toggleDiag()
			this.$emit('callBack', item)
		}
	}
}

</script>
<style type="text/css" scoped>
.industry{position: fixed;top: 80px;right: 15px;bottom: 100px;left: 15px;background: #fff;border-radius: 10px;z-index: 21;height: 400px;overflow: hidden;}
.industry .off-icon{position: absolute;top: 15px;right: 15px;line-height: 14px;z-index: 22;}
.industry .item-title{position: absolute;top: 0;left: 0;width: 100%;background: #fff;z-index: 22;}
.industry .item-body{height: 100%;}
.industry .item-box{height: 100%;padding-top: 50px;overflow-y: scroll;}
.industry .item-box ._p:first-child{border-top: 1px #eee solid;}
.industry .item-box ._p{line-height: 20px;padding: 11px 20px 11px 40px;position: relative;}
.industry .item-box ._p:before{content: '';display: block;position: absolute;top: 50%;left: 25px;margin-top: -3px;width: 6px;height: 6px;border-radius: 50%;background: #ddd;}
</style>
