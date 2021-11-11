<template>
	<view>
		<page ref="page"></page>
		<view class="pb70">
			<view class="bg-f edit">
				<weui-input v-model="ruleform.name" label="卡券名称" placeholder="请输入优惠券名称" type="text" name="name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.price" label="价格" type="number" name="price" datatype="require"></weui-input>
				<weui-input v-model="ruleform.price_full" label="满多少元" type="number" name="price_full"></weui-input>
				<weui-input v-model="ruleform.start_date" label="开始时间" type="date" name="start_date" datatype="require"></weui-input>
				<weui-input v-model="ruleform.end_date" label="结束时间" type="date" name="end_date" datatype="require"></weui-input>
				<weui-input v-model="ruleform.cover" label="封面图片" type="upload" upurl='article' allowUpLoadNum="1" name="cover" datatype="require"></weui-input>
				<weui-input v-model="ruleform.remark" label="简介" type="text" name="remark"></weui-input>
				<weui-input v-model="ruleform.detail" myclass="textarea" label="卡券详情" type="textarea" name="detail" datatype="require"></weui-input>
				<weui-input v-model="ruleform.pic" label="图文图片" type="upload" upurl='article' allowUpLoadNum="5" name="pic" datatype="require"></weui-input>
			</view>
			<dxftButton type="primary" size="lg" @click="submit()">提交</dxftButton>
		</view>
	</view>
</template>

<script>
import dxftButton from "doxinui/components/button/footer-button"
export default {
	components: {dxftButton},
		data() {
			return {
				vaildate: {},
				formAction: '/api/company/coupon-store',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			this.shareSource(this, '商城');
		},
		onLoad(options) {
			if(options.id){
				this.ajax();
			}
		},
		methods: {
			ajax() {
				this.getAjax(this,{token:uni.getStorageSync('token')}).then(msg => {
					   this.ruleform = msg.data.data;
					   this.ruleform.cover = this.ruleform.cover ? this.ruleform.cover.split(",") : [];
					   this.ruleform.pic = this.ruleform.pic ? this.ruleform.pic.split(",") : [];
				});
			},
			submit(){
				this.ruleform.token = uni.getStorageSync('token');
				this.ruleform.company_id = uni.getStorageSync("sysCompany").id;
				this.vaildForm(this, res => {	
					if(res){
						this.postAjax(this.formAction, this.ruleform).then(msg => {
							if (msg.data.code == 0) {
								return this.goto("/pages/merchant/index/index");
							}
						});
					}
					
				})
			},
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>