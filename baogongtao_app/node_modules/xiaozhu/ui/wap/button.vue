<template>
	<section>
		 <button class="dx-btn dx-btn-big dx-btn-green w-b100" form-type="submit" v-if="type == 'green' && size == 'w100'" @click="callBack">{{ title }}</button>
		  <button class="dx-btn dx-btn-green" v-if="type == 'green' && size == 'middle'" @click="callBack" form-type="submit">{{ title }}</button>
	</section>
</template>
<script type="text/javascript">
	export default{
		props:['title','type','size'],
		methods:{
			callBack(){
				this.$emit("dxClick");
			}
		}
	}
</script>