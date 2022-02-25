<template>
	<view>
		<page ref="page"></page>
		<view class="pro_edit pb70">
			<view class="block-sec">
				<weui-input v-model="ruleform.name" label="产品名称" type="text" name="name" datatype="require" block></weui-input>
				<weui-input v-model="ruleform.needArr" label="分类" name="needArr" type="manyselect" dataKey="needArr"
				 changeField="value"></weui-input>
				<weui-input v-model="ruleform.sendType" label="服务方式" name="sendType" changeField="value" type="radio" dataKey="sendTypeArr"
				 @callback="test" right></weui-input>
			</view>
			<view class="block-sec">
				<weui-input v-model="ruleform.price" label="单价" type="text" name="price" myclass="right">
					<view slot="right">元</view>
				</weui-input>
				<weui-input v-model="ruleform.num" label="库存" type="text" name="num" myclass="right">
					<view slot="right">件</view>
				</weui-input>
			</view>
			<view class="block-sec">
				<weui-input v-model="ruleform.cover" label="缩略图片" type="upload" upurl='article' allowUpLoadNum="5" name="cover"
				 datatype="require" block></weui-input>
				<weui-input v-model="ruleform.cover" label="详细页横幅图片" type="upload" upurl='article' allowUpLoadNum="5" name="cover" block></weui-input>
				<weui-input v-model="ruleform.content" label="商品详情" type="textarea" name="content" datatype="require" block></weui-input>
				<weui-input v-model="ruleform.contentImg" label="详情图片" type="upload" upurl='article' allowUpLoadNum="5" name="contentImg" block></weui-input>
			</view>
		</view>
		<dxftButton type="primary" size="lg" @click="goto('/pages/merchant/products/lists',1)">确认</dxftButton>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components:{dxftButton},
		data() {
			return {
				mpType: 'page',
				ruleform: {},
				needArr: [{
					label: '服务类',value: '服务类',
					children: [
						{label: '工商财税法律',value: '工商财税法律'},
						{label: '咨询管理',value: '咨询管理'},
						{label: '数据信息',value: '数据信息'},
						{label: '人力资源',value: '人力资源'},
						{label: '电商营销',value: '电商营销'},
						{label: '医疗健康',value: '医疗健康'}
					]
				}, {
					label: '产品类',value: '产品类',
					children: [
						{label: '电子电工',value: '7'},
						{label: '五金管材',value: '8'},
						{label: '家电日用',value: '9'},
						{label: '机械设备',value: '10'}
					]
				}],
				sendTypeArr:[
					{label: '邮寄',value: '1'},
					{label: '到店',value: '2'}
				]
			}
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>