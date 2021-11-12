<template>
  <div>
    <el-tag :type="typeName[data.status]">{{ data.statusName }}</el-tag>
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
			typeName: ['', 'warning', '', 'success']
		}
	}
}
</script>
