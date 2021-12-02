<template>
	<view>
		<page ref="page"></page>
		<view class="p15 prof-label">
			<view class="top ptb15 bd-be">
				<view class="topG flex">
					<view class="left flex1">
						<view class="fs-17">选择职业标签</view>
						<view class="fs-14 mt3">精准的职业标签更能吸引HR的目光</view>
						<view class="inputv mt15"><input class="input" type="text" placeholder="请输入自定义标签"></view>
					</view>
					<view class="right Arial"><text class="main-color">3</text>/5</view>
				</view>
				<view class="curlabel mt15">
					<dx-tag type="primary" myclass="mr5 mb5" hollow closable v-for="(item,key) in labelCur">{{item}}</dx-tag>
				</view>
			</view>
			<view class="labelG">
				<view class="fs-15 mtb15">热门标签</view>
				<dx-tag :type="key == 3?'primary':'info'" myclass="mr5 mb5" hollow v-for="(item,key) in labelG">{{item}}</dx-tag>
			</view>
		</view>
	</view>
</template>

<script>
	import dxTag from "doxinui/components/tag/tag"
	export default {
		components:{dxTag},
		data() {
			return {
				labelCur:['前端开发','产品经理','数据采集'],
				labelG:['程序员','JAVA','前端开发','后端开发','数据采集','产品经理','金牌销售','保洁','大堂经理','保安','快递员','部门经理']
			}
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>
<style lang="scss">
page{background: $color-white;}
@import "../index.scss";
</style>