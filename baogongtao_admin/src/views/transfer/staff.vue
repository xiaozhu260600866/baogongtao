<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="dx-container">
          <tyt-page-header content="员工工资发放" />
          <div class="dx-main">
            <wage-lists :type="3" />
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import WageLists from './components/WageLists'
export default {
	components: { WageLists },
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
