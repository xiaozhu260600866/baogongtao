<!-- 使用
<wxCharts :chartData="data.chartData" unit="次" title="近七天访客量"></wxCharts>
js
data(){
	return {
		otherData: {
			chartData: {
				main: {
					title: '总成交量',
					data: [15, 20, 45, 37],
					categories: ['2012', '2013', '2014', '2015']
				},
			}
		}
	}
}
import wxCharts from 'xiaozhu/wechatapp/components/wx_charts';
components: { wxCharts },

 -->
<template>
	<section>
		<div class="bgf">
			<canvas canvas-id="columnCanvas" class="canvas" bindtouchstart="touchHandler"></canvas>
		</div>
	</section>
</template>
<script type="text/javascript">
import wxCharts from './js/wxcharts.js';
var columnChart = null;
export default {
	props: ["chartData", "unit", "title"],
	data() {
		return {

		}
	},
	onReady() {
		var windowWidth = 320;
		try {
			var res = wx.getSystemInfoSync();
			windowWidth = res.windowWidth;
		} catch (e) {
			console.error('getSystemInfoSync failed!');
		}

		columnChart = new wxCharts({
			canvasId: 'columnCanvas',
			type: 'column',
			animation: true,
			categories: this.chartData.main.categories,
			series: [{
				name: this.title,
				data: this.chartData.main.data,
				format: (val, name) => {
					//return val.toFixed(2) + this.unit;
					return val + this.unit;
				}
			}],
			yAxis: {
				format: (val) => {
					return val + this.unit;
				},
				title: 'hello',
				min: 0
			},
			xAxis: {
				disableGrid: false,
				type: 'calibration'
			},
			extra: {
				column: {
					width: 15
				}
			},
			width: windowWidth,
			height: 200,
		});

	}
}

</script>
