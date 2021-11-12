<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="dx-container">
          <tyt-page-header content="任务管理" />
          <div class="dx-main">
            <task-lists :operator="9" />
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import TaskLists from '@/views/task/components/TaskLists'
export default {
	components: { TaskLists },
	data() {
		return {

		}
	}
}
</script>

<style>
</style>
