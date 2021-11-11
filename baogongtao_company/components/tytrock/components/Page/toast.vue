<template>
	<view>
		
		<view class="toast-main" :class="toast?'show':''">
			<view class="toast bbg">
				<view class="txt">{{ txt }}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
export default {
	props: {
		visible:{
			type:Boolean,
			default:false
		},
		content:{
			type:String,
			default:''
		}
	},
	data(){
		return{
			toast:this.visible,
			txt:this.content
		}
	},
	watch:{
		visible(val){
			if(val == true) this.toast = true;
			else this.toast = false;
		},
		content(val){
			this.txt = val;
		}
	}
}
</script>

<style>
.toast_lay{}
.toast-main{width: 50%;position: fixed;top: 40%;z-index: 99999;left: 25%;
	text-align: center;-ms-transform: scale(2);
	transform: scale(2);
	transition: all 0.3s ease-in-out 0s;
	pointer-events: none;
	opacity: 0;}
.toast span,.toast:before {
		background:#fa6c9f;
	}
.toast{display: inline-block; background:#fa6c9f;background:-webkit-linear-gradient(left,#fa6c9f 0%,#fcb067 80%,#fcb067 100%);background:linear-gradient(to right,#fa6c9f 0%,#fcb067 80%,#fcb067 100%);text-align: center;color: #fff;border-radius: 5upx;padding: 10upx 20upx;
	}
.toast:before{content:'';
		display:inline-block;
		height:100%;
		position:absolute;
		bottom:-5upx;
		left:30%;
		right:30%;
		z-index:-1;
		border-radius:30em;
		-webkit-filter:blur(50upx) brightness(0.95);
		filter:blur(50upx) brightness(0.95);
		-webkit-transform-style:preserve-3d;
		transform-style:preserve-3d;
		-webkit-transition:all 0.3s ease-out;
		transition:all 0.3s ease-out;}
.toast-main.show{opacity: 1;
	transition-duration: 0.3s;
	-ms-transform: scale(1);
	transform: scale(1);
	pointer-events: auto;}
</style>
