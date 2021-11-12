<template>
  <div v-if="role==12" style="text-align: center;">
    <el-tag v-if="status==1" type="success">已签署</el-tag>
    <el-tag v-else type="danger">未签署</el-tag>
  </div>
  <div v-else-if="role==6" style="text-align: center;">
    <el-tag v-if="status==1" type="success">已签约</el-tag>
    <el-tag v-else type="danger">未签约</el-tag>
  </div>
</template>

<script>
export default {
	props: {
		status: {
			type: Number,
			default: 0
		},
		role: {
			type: Number,
			default: 12
		}
	}
}
</script>
