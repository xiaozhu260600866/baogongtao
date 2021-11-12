<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="dx-container">
          <tyt-page-header content="合同管理" />
          <div class="dx-main">

            <div class="mt10"><contract-lists /></div>

          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ContractLists from './components/ContractLists'
export default {
	components: { ContractLists },
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
