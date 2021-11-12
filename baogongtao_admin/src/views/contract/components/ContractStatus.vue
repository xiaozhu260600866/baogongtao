<template>
  <div>
    <el-tag v-if="data.status===1" type="warning">{{ data.statusName }}</el-tag>
    <el-tag v-if="data.status===2" type="success">{{ data.statusName }}</el-tag>
    <el-tag v-if="data.status===3" type="info">{{ data.statusName }}</el-tag>
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
