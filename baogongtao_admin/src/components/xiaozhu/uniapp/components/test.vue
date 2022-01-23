<!--  调用
 <star :position="5.0" v-model="ruleform['score3_' + v.id]" :disabled="v.quote.id >0 ? true:false"></star>
 -->
<template>
  <section>
    1125
    <block v-for="(item,index2) in stars">
      <image :data-id="item" class="star-image" :style="'left: '+(item+position)*30+'rpx'" :src="currentValue > item ?(currentValue-item == 0.5?halfSrc:selectedSrc) : normalSrc" @click="select(item)" />
    </block>
    <span :style="'left:'+(5.5+position)*30+'rpx;position: absolute'" class="fs12">{{ currentValue }}</span>
  </section>
</template>
<script>
export default {
    props: ['position', 'value', 'disabled'],
    data() {
        return {
            stars: [0, 1, 2, 3, 4],
            normalSrc: '/static/image/normal.png',
            selectedSrc: '/static/image/selected.png',
            halfSrc: '/static/image/half.png'
        }
    },
    computed: {
        currentValue: {
            // 动态计算currentValue的值
            get: function() {
                return this.value
            },
            set: function(val) {
                this.$emit('input', val)
            }
        }
    },
    methods: {
        select(item) {
            if (this.disabled) return false

            this.currentValue = item + 1
        }
    }

}
</script>
<style>
.star-image {
    position: absolute;

    width: 30rpx;
    height: 30rpx;
}

</style>
