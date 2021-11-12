<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="dx-container">
          <tyt-page-header content="员工合同" />
          <div class="dx-main">

            <div class="mt10"><sign-lists :type="1" /></div>

          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SignLists from '@/views/user/components/SignLists'
export default {
	components: { SignLists },
	data() {
		return {

		}
	},
	mounted() {

	},
	methods: {
	}
}
</script>

<style>
</style>
