<template>
	<section>
		<view class="pop-overlay" v-if="diagDiv" ></view>
		<view class="pop-body" v-if="diagDiv">
			<view class="pop-box">
				<view class="pop-con">
					<view class="p pop-title">登录并授权</view>
					<view class="p pop-intro">申请获取以下权限</view>
					<view class="p pop-intro">获得你的公开信息(昵称、头像)</view>
				</view>
				<view class="pop-button">
					<button open-type="getUserInfo" @getuserinfo="bindGetUserInfo">允许</button>
				</view>
			</view>
		</view>
	</section>
</template>
<script>
export default {
	props: ['text'],
	data() {
		return {
			diagDiv: false
		}
	},
	methods: {
		toggleDiag() {
			this.diagDiv = !this.diagDiv;
		},
		auth(){
			if(!uni.getStorageSync('userInfo')){
				this.diagDiv = true;
			}
		},
		bindGetUserInfo(e) {
			console.log(e)
			if (e.mp.detail.userInfo) {
				let res = e.mp.detail.userInfo;
				console.log(res);
				uni.setStorageSync("userInfo", res);
				if(this.$parent.avatarUrl != undefined) this.$parent.avatarUrl = res.avatarUrl;
				if(this.$parent.nickname != undefined) this.$parent.nickname = res.nickName;
				this.diagDiv=false;
				
			} else {
				uni.showToast({
					title: '授权失败',
					icon: 'none'
				})
			}
		}
	}
}

</script>
<style scoped>
.pop-box {
	position: fixed;
	min-height: 200px;
	background: #fff;
	border-radius: 3px 3px 0 0;
	z-index: 999;
	top: 50%;
	margin-top: -100px;
	left: 30px;
	right: 30px;
}

.pop-con {
	padding: 15px 15px 75px;
	text-align: center;
}

.pop-con .p {}

.pop-title {
	font-size: 20px;
	font-weight: bold;
	color: #000;
	line-height: 40px;
	margin-bottom: 10px;
}

.pop-intro {
	font-size: 16px;
	color: #999;
	line-height: 30px;
}

.pop-button {
	position: absolute;
	bottom: 0;
	width: 100%;
}

.pop-button button {
	color: #13cc0c;
	height: 50px;
	line-height: 50px;
	background: #f7f7f7;
}
.pop-overlay {
    position: fixed;
    top: 0px;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 800px;
    background: #333;
    filter: alpha(opacity=70);
    -moz-opacity: 0.7;
    opacity: 0.7;
}

</style>
