<template>
	<view>
		<page ref="page"></page>
		<view class="p15 prof-label">
			<view class="top ptb15 bd-be">
				<view class="topG flex">
					<view class="left flex1">
						<view class="fs-17">选择职业标签</view>
						<view class="fs-14 mt3">精准的职业标签更能吸引HR的目光</view>
						<view class="inputv mt15"><input class="input" type="text" placeholder="请输入自定义标签" @blur="pushValue" v-model="content">
							
						</view>
					</view>
					<view class="right Arial"><text class="main-color">{{labelCur.length}}</text>/5</view>
				</view>
				<view class="curlabel mt15">
					<dx-tag type="primary" myclass="mr5 mb5" hollow closable v-for="(item,key) in labelCur" @close="labelCur.splice(key,1)">{{item}}</dx-tag>
				</view>
			</view>
			<view class="labelG">
				<view class="fs-15 mtb15">热门标签</view>
				<dx-tag :type="changeStatus(item.label) ?'primary':'info'" myclass="mr5 mb5" hollow v-for="(item,key) in labelG" @click="canPush(item.label)">{{item.label}}</dx-tag>
			</view>
			<dxftButton type="primary" size="lg" @click="submit()">提交</dxftButton>
		</view>
	</view>
</template>

<script>
	import dxTag from "doxinui/components/tag/tag"
	import dxftButton from "doxinui/components/button/footer-button"
		import { loginSentMsg, login, userinfo } from "@/api/user";
	import {
		attributes
	} from "@/api/base";
	export default {
		components:{dxTag,dxftButton},
		data() {
			return {
				labelCur:[],
				labelG:[],
				sysUser: uni.getStorageSync('sysUser'),
				vaildate: {},
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				step: 1,
				content:'',
				avatarUrl: '',
				ruleform: {

				},
			}
		},
		onLoad() {
			attributes({type:14,source:'app'}).then(res => {
				this.labelG = res.data.lists;
			})
			userinfo({token:uni.getStorageSync('token')}).then((res)=>{
				this.ruleform = res.data.user.get_user_info;
				this.labelCur = res.data.user.get_user_info.tags ? res.data.user.get_user_info.tags.split(",") :[];	
			
			})
		},
		methods: {
			submit(){
					this.ruleform.token = uni.getStorageSync('token');
					this.ruleform.tags = this.labelCur.join(",");
				if(this.labelCur.length ==0 || this.labelCur.length>5){
					return this.getError("数据错误，请重新填定");
				}
				this.postAjax("/api/auth/user/update", this.ruleform).then(msg => {
					if (msg.data.code == 0) {
					 return this.goto("/pages/user/index/index",2);
					}
				});
			},
			canPush(name){
				for (var i = 0; i < this.labelCur.length; i++) {
					if(this.labelCur[i] == name) return false;
				}
				console.log("666")
				this.labelCur.push(name);
				this.content = "";
				return true;
			},
			pushValue(e){
				if(e.detail.value){
					this.canPush(e.detail.value);
				}
				console.log(e.detail.value);
			},
			changeStatus(label){
				for (var i = 0; i < this.labelCur.length; i++) {
					if(this.labelCur[i] == label) return true;
				}
				//this.canPush(label);
			}
		}
	}
</script>
<style lang="scss">
page{background: $color-white;}
@import "../index.scss";
</style>