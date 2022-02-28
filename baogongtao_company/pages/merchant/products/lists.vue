<template>
	<view>
		<page ref="page"></page>
		<view class="pb70">
			<dx-tabs :tabs="[
				{value: 1,name: '上架销售中',num: 0},
				{value: 2,name: '已下架',num: 0},
			]" selectedColor="#007AFF" sliderBgColor="#007AFF" v-model="data.query.putaway" @change="ajax" :height="100" :size="32" :selectedSize="32"></dx-tabs>
			<view class="proLists" v-if="data.show">
				<dx-products-pic v-for="item in data.lists.data" :src="item.firstCover" :isList="true">
					<view class="title fs-16 fw-bold pr15">{{ item.name }}</view>
					<view class="grade flex-middle fc-3 fs-13 mt3">
						<view class="sales pr15">销量：<text class="Arial">{{ item.self_num_ }}</text></view>
						<view class="fresh">当前库存：<text class="Arial">{{ item.num }}</text></view>
					</view>
					<view class="flex-between">
						<dx-price v-model="item.price" split :intSize="16" :decimalSize="12"></dx-price>
					</view>
					<view class="edit-nav flex-right" >
						<dx-button size="mini" @click="goto('/pages/merchant/products/created_edit?id='+item.id,1)">编辑</dx-button>
						<dx-button size="mini" v-if="item.putaway==1" @click="putaway(item,2)">下架</dx-button>
						<dx-button size="mini" v-if="item.putaway==2" @click="putaway(item,1)">上架</dx-button>
					</view>
					<!-- 其他状态 -->
					<view class="del-icon"><text class="dxi-icon dxi-icon-del" @click="delProduct(item)"></text></view>
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
				data: this.formatData(this),
				formAction: '/admin/shop/product/lists',
				vueClass:[],
				getSiteName: this.getSiteName(),
				vaildate:{},
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
			this.ajax();
		},
		onShow(){
			this.ajax();
		},
		methods: {
			putaway(item,putaway){
				this.postAjax("/admin/shop/product/editField",{id:item.id,field:'putaway',value:putaway}).then(msg=>{
					if(msg.data.status ==2){
						this.ajax();
					}
				});
			},
			delProduct(item) {
				uni.showModal({
					title: '提示',
					content: '您确定要删除这个产品吗',
					success: res => {
						if (res.confirm) {
							this.postAjax('/ajax/mydel', {
								id: item.id,
								tablename: 'products'
							}).then(msg => {
								if (msg.data.status == 2) {
									this.ajax();
								}
							});
						}
					}
				})
			},
			ajax(){
				this.getAjax(this,{token:uni.getStorageSync('token'),company_id:uni.getStorageSync("sysCompany").id}).then(msg => {
					
				});
			}
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>