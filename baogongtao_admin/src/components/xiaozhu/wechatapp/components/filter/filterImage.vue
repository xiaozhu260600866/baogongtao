<template>
  <div>
    <img :src="getSiteName +'/upload/images/'+purl+'/'+currentValue" lazy-load="true" :class="myClass">
  </div>
</template>
<script type="text/javascript">
export default {
	props: ['value', 'purl', 'myClass'],
	data() {
		return {
			getSiteName: this.getSiteName()
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
	}
}

</script>
