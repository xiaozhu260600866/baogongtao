<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="dx-container">
          <tyt-page-header content="系统管理员" />
          <div class="dx-main">

            <user-lists :role="2" />

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
