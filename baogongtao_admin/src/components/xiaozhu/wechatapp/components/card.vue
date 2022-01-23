<template>
  <div>
    <p class="card">
      {{ text }}
      <slot name="left" />
    </p>
  </div>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
