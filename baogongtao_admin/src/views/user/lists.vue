<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="dx-container">
          <tyt-page-header content="个人管理" />
          <div class="dx-main">

            <user-lists :role="12" />

          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UserLists from './components/UserLists'
export default {
	components: { UserLists },
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
