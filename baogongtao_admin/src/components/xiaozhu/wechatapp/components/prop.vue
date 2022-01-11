<template>
	<section>
		<div class="share-overlay" v-if="propDiv"></div>
		<div class="Ppop-body" v-if="propDiv">
			<div class="Ppop-box plr20 pb10 pt30">
				<slot name="content"></slot>
			</div>
		</div>
	</section>
</template>
<script>
export default {
	props: ['data'],
	data() {
		return {
			propDiv:false
		}
	},
	methods: {
		toggleDiag() {
			this.propDiv = !this.propDiv;
		}
	},
	onLoad(){
		this.propDiv = false
	}
}

</script>
<style>
.share-overlay{z-index: 101;}

@keyframes Afooter {
  0% {
    top: 0;
  }
  100% {
    top: 50%;
  }
}
</style>
