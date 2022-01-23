<!--  调用
<meiTime ref="meiTime"  :data="[
			{label:'今天',value:'today'},
			{label:'本周',value:'thisweek'},
			{label:'本月',value:'thismonth'}
		]" :query="data.query"></meiTime>
mounted(){

}
-->
<template>
  <div>
    <div class="time-top bgf">
      <div class="time-nav">
        <a v-for="(v,key) in data" href="" :class="['aLink','fs14',query.dateSelect == v.value ? 'cur': '']" @click="select(v,key)"><span class="span">{{ v.label }}</span></a>

        <a href="" :class="['aLink','fs14',showtime == 3 ? 'cur': '']" @click="query.dateSelect='';showtime = 3"><span class="span">日期</span></a>
      </div>
      <div v-if="showtime == 3" class="time-date bgf">
        <div class="date-item start-time">
          <picker :value="date" class="date-picker" style="display: inline-block;width:100%" mode="date" @change="startDateChange">
            <view v-if="start_date" class="picker fs12">
              {{ start_date }}
            </view>
            <view class="picker fs12" wx:else>
              {{ date }}
            </view>
          </picker>
        </div>
        <span> -- </span>
        <div class="date-item end-time">
          <picker :value="date" class="date-picker" style="display: inline-block;width:100%" mode="date" @change="endDateChange">
            <view v-if="end_date" class="picker fs12">
              {{ end_date }}
            </view>
            <view class="picker fs12" wx:else>
              {{ date }}
            </view>
          </picker>
        </div>
        <div class="btn-search" @click="toSearch">
          <button class="sub-btn-sm">查询</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	components: {

	},
	props: ['data', 'query'],
	data() {
		return {
			getSiteName: this.getSiteName(),
			start_date: '',
			end_date: '',
			showtime: 0
		}
	},
	methods: {
		getFormAction() {
			return this.$parent.formAction.split('?')[0]
		},
		startDateChange(e) {
			this.start_date = e.mp.detail.value
		},
		endDateChange(e) {
			this.end_date = e.mp.detail.value
		},
		toSearch() {
		   if (!this.start_date && !this.end_date) {
		   		this.getError('日期没有选择')
		   		return false
		   }
		   this.query.start_date = this.start_date
		   this.query.end_date = this.end_date
		   this.$parent.$refs.page.ajax('notloing')
		},
		select(item, key) {
			this.showtime = 0
			this.query.dateSelect = item.value
            this.$parent.$refs.page.ajax('notloing')
		}
	},
	onPullDownRefresh() {
		this.ajax()
	},
	onLoad() {

		// this.ajax();
	}
}
</script>

<style>

.time-top{height: 40px;line-height: 40px;border-bottom: 1px #ddd solid;}
.time-top .time-nav{display: flex;}
.time-top .time-nav .aLink{width: 100%;text-align: center;}
.time-nav .cur .span{background: #ff721f;color: #fff;padding: 3px 10px;border-radius: 4px;}
.time-date{position: fixed;top: 40px;width: 100%;height: 50px;padding: 8px 10px; box-shadow: 0 2px 10px 0 hsla(0, 6%, 58%, .6);-webkit-box-shadow: 0 2px 10px 0 hsla(0, 6%, 58%, .6);-moz-box-shadow: 0 2px 10px 0 hsla(0, 6%, 58%, .6);display: flex;align-items: center;justify-content: space-around;z-index: 1000;}
.time-date .date-item{width: 34%;display: flex;height: 34px;}
.time-date .date-item .picker{height: 34px;line-height: 34px;padding: 0 10px;border: 1px #ddd solid;border-radius: 4px;}
.time-date .sub-btn-sm{display: block;}

</style>
