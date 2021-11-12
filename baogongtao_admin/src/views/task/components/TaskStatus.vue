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
			typeName: []
		}
	},
	mounted() {
		this.typeName[1] = ''
		this.typeName[2] = 'warning'
		this.typeName[3] = 'success'
		this.typeName[4] = ''
		this.typeName[5] = 'success'
		this.typeName[6] = 'success'
		this.typeName[7] = 'info'
	}
}
</script>
