<template>
	<section>
		<view class="tyt_navigator">
			<div v-if="wxAuth && !wxUser" class="wxform block w-b100">
				<button hover-class="none" form-type="submit"  open-type="getUserInfo" @getuserinfo="bindGetUserInfo">
					<slot name="content" />
				</button>
			</div>
			<div v-else @click="clickBack">
				<slot name="content" />
			</div>
		</view>
	</section>
</template>
<script type="text/javascript">
import {wechatUser} from "@/api/base";
export default {		
	props: {
		wxAuth:{
			type:Boolean,
			default:false
		}
	},
	data() {
		return {
			wxUser:uni.getStorageSync("wxUser"),
			userInfo:{}
		}
	},
	mounted(){
		this.userInfo = uni.getStorageSync('userInfo');
	},
	methods: {
		clickBack(){
			this.$emit("callBack");
		},
		bindGetUserInfo(e) {
			if (e.mp.detail.userInfo) {
				//console.log(e.mp.detail.userInfo)
				wechatUser(e.mp.detail.userInfo).then(res=>{
					
				})
				uni.setStorageSync("wxUser", e.mp.detail.userInfo);
				this.$emit("callBack");
				
			} else {
				this.msgError('授权失败');
			}
		}
		
	}
}
</script>
<style>
.wxform button{border-radius: 0;background-color: transparent;padding: 0;}
</style>