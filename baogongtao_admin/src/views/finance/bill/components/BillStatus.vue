<template>
  <div>
    <el-tag v-if="data.status===0" type="danger">{{ data.statusName }}</el-tag>
    <el-tag v-if="data.status===1">{{ data.statusName }}</el-tag>
    <el-tag v-if="data.status===8" type="success">{{ data.statusName }}</el-tag>
  </div>
</template>

<script>
export default {
	props: {
		data: {
			type: Object,
			default: {}
		}
	}
}
</script>
