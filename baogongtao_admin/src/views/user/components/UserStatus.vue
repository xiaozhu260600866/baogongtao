<template>
  <div style="text-align: center;">
    <el-tag v-if="data.status==1" type="success">正常</el-tag>
    <el-tag v-else type="danger">禁用</el-tag>
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
