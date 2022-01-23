<template>
  <section>
    <div v-if="propDiv" class="share-overlay" />
    <div v-if="propDiv" class="Ppop-body">
      <div class="Ppop-box plr20 pb10 pt30">
        <slot name="content" />
      </div>
    </div>
  </section>
</template>
<script>
export default {
	props: ['data'],
	data() {
		return {
			propDiv: false
		}
	},
	methods: {
		toggleDiag() {
			this.propDiv = !this.propDiv
		}
	},
	onLoad() {
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
