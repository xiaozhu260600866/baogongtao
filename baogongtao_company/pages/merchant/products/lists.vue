<template>
	<view>
		<page ref="page"></page>
		<view class="pb70">
			<dx-tabs :tabs="[
				{value: 0,name: '上架销售中',num: 3},
				{value: 1,name: '待上架',num: 3},
				{value: 2,name: '已下架',num: 10},
			]" selectedColor="#007AFF" sliderBgColor="#007AFF" @change="change" :height="100" :size="32" :selectedSize="32"></dx-tabs>
			<view class="proLists">
				<dx-products-pic v-for="item in proLists" :src="item.firstCover" :isList="true">
					<view class="title fs-16 fw-bold pr15">{{ item.name }}</view>
					<view class="grade flex-middle fc-3 fs-13 mt3">
						<view class="sales pr15">销量：<text class="Arial">{{ item.self_num_ }}</text></view>
						<view class="fresh">当前库存：<text class="Arial">{{ item.num }}</text></view>
					</view>
					<view class="flex-between">
						<dx-price v-model="item.price" split :intSize="16" :decimalSize="12"></dx-price>
					</view>
					<view class="edit-nav flex-right" >
						<dx-button size="mini" @click="goto('/pages/merchant/products/created_edit',1)">编辑</dx-button>
						<dx-button size="mini" v-if="!item.putaway" @click="putaway(item,1)">上架</dx-button>
						<dx-button size="mini" v-if="item.putaway" @click="putaway(item,0)">下架</dx-button>
					</view>
					<!-- 其他状态 -->
					<view class="del-icon"><text class="dxi-icon dxi-icon-del" @click="del(item)"></text></view>
				</dx-products-pic>
			</view>
		</view>
		<dxftButton type="primary" size="lg" @click="goto('/pages/merchant/products/created_edit',1)">+ 新增产品</dxftButton>
	</view>
</template>

<script>
	import dxTabs from "doxinui/components/tabs/tabs"
	import dxProductsPic from "doxinui/components/products/pic"
	import dxPrice from "doxinui/components/price/price"
	import dxButton from "doxinui/components/button/button"
	import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components:{dxTabs,dxProductsPic,dxPrice,dxButton,dxftButton},
		data() {
			return {
				proLists:[{
					firstCover:'https://www.baogongtao.com/upload/images/product/300_Fdfamat2dt.jpg',
					name:'测试',
					self_num_:3,
					num:120,
					price:0.1,
					putaway: 1,
				}]
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