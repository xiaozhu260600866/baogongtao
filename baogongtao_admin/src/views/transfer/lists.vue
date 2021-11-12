<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="dx-container">
          <tyt-page-header content="转账记录" />
          <div class="dx-main">
            <transfer-lists :operator="9" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TransferLists from '@/views/transfer/components/TransferLists'
export default {
	components: { TransferLists },
	data() {
		return {

		}
	}
}
</script>

<style>
</style>
