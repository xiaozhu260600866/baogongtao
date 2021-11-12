<template>
  <div>
    <el-tag :type="statusName[data.status]">{{ data.statusName }}</el-tag>
  </div>
</template>

<script>
export default {
	props: {
		data: {
			type: Object,
			default: {}
		}
	},
	data() {
		return {
			statusName: ['', 'warning', 'success', '']
		}
	}
}
</script>
