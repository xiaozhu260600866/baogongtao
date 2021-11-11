<template>
	<view>
		<page ref="page"></page>
		<view class="pb60">
			<view class="bg-f edit">
				<weui-input v-model="ruleform.name" label="姓名" type="text" name="name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.cardno" label="身份证" type="text" name="cardno" datatype="require"></weui-input>
				<weui-input v-model="ruleform.phone" label="手机" type="text" name="phone" datatype="require"></weui-input>
				<weui-input v-model="ruleform.sex" label="性别" placeholder="请选择" type="radio" name="sex" dataKey="sexArr"
				 changeField="label"></weui-input>
			
			</view>
			<dxftButton type="primary" size="lg" @click="submit()">提交</dxftButton>
		</view>
	</view>
</template>

<script>
import dxftButton from "doxinui/components/button/footer-button"
		import {userinfo} from "@/api/user";
export default {
	components: {dxftButton},
		data() {
			return {
				vaildate: {},
				formAction: '/api/company/recruit-record-store',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				recruit_id:'',
				ruleform:{},
				userInfo:{},
				sexArr:[
					{label:'男',value:'男'},
					{label:'女',value:'女'},
				],
				
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
			}else{
				userinfo({token:uni.getStorageSync('token')}).then((res)=>{
					this.ruleform = res.data.user.get_user_info;
					delete this.ruleform.id;
					
				})
			}
			this.recruit_id  = options.recruit_id;
			//this.getError("aaaqq")
			//this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this,{token:uni.getStorageSync('token')}).then(msg => {
					   this.ruleform = msg.detail;
				});
			},
			submit(){
				this.ruleform.token = uni.getStorageSync('token');
				this.ruleform.company_id = uni.getStorageSync("sysCompany").id;
				this.ruleform.recruit_id =  this.recruit_id;
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

</style>