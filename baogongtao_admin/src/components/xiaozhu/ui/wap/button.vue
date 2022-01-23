<template>
  <section>
    <button v-if="type == 'green' && size == 'w100'" class="dx-btn dx-btn-big dx-btn-green w-b100" form-type="submit" @click="callBack">{{ title }}</button>
    <button v-if="type == 'green' && size == 'middle'" class="dx-btn dx-btn-green" form-type="submit" @click="callBack">{{ title }}</button>
  </section>
</template>
<script type="text/javascript">
	export default {
		props: ['title', 'type', 'size'],
		methods: {
			callBack() {
				this.$emit('dxClick')
			}
		}
	}
</script>
