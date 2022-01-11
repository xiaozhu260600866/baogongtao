<!-- <diag :open="true">
			<div slot="content" >
				123456
			</div>
		</diag> -->
<template>
	<section>
			
		<div class="share-overlay" @click="toggleDiag" v-if="thisDiag || open" style="z-index: 1"></div>
		<div v-if="type == 2">
			<div :class="['layermchild layermanim p15 bounceIn2',myclass? myclass : '']" v-if="thisDiag || open" :style="top ? 'top:'+top : ''">
				<div class="diag-box" style="overflow-y: scroll;"><scroll-view scroll-y="true"><div class="diag-con">
					<slot name="content" />
				</div></scroll-view></div>
				<!-- <div class="icon_off" v-if="thisDiag == true || open" @click="toggleDiag"><span class="iconfont icon-xiaozhu-off"></span></div> -->
			</div>
		</div>
		<div v-else>
			<div :class="['layermchild layermanim p15 bounceIn',myclass? myclass : '']" v-if="thisDiag || open" :style="top ?  'top:'+top+'%;' : 'top:45%;'">
				<slot name="content" />
				<!-- <div class="icon_off" v-if="thisDiag == true || open" @click="toggleDiag"><span class="iconfont icon-xiaozhu-off"></span></div> -->
			</div>
		</div>
	</section>
</template>
<script type="text/javascript">
export default {
	props: ['top', 'ruleform', 'parentData', 'vaildate', 'open','myclass','type'],
	data() {
		return {
			thisDiag: false,
			diagClass: 'bounceIn'
		}
	},
	methods: {
		toggleDiag() {
			this.thisDiag = false;
			this.open = false;
			
		},
		ajax() {
			this.thisDiag = true;
		}
	}

}

</script>
<style type="text/css" scoped="">
@import url("../font/globalFont.css");

.bounceIn .icon_off {position: absolute;bottom: -120upx;z-index: 100;left: 50%;margin-left: -34px;}
.icon_off .iconfont {font-size: 68upx;color: #eee;}

.layermchild {position: relative;}
.layermchild {opacity: 1;transform: scale(1);-webkit-transform: scale(1);}
.bounceIn {width: 90%;margin: 0 auto;z-index: 100;position: fixed;left: 5%;-webkit-animation-duration: 0.2s;animation-duration: 0.2s;-webkit-animation-name: bounceIn;animation-name: bounceIn;border-radius: 12upx;max-height: 86%;background: white;}

.bounceIn2{width: 100%;height: 100%;position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 101;display: flex;flex-direction: column;justify-content: center;}
.bounceIn2 .diag-box{max-height: 86%;padding: 40upx 30upx;background: #fff;border-radius: 12upx;}
.bounceIn2 .diag-con{max-height: 100%;}
.bounceIn2 .icon_off{text-align: center;margin-top: 40upx;height: 68upx;line-height: 68upx;}

.bounceOut {width: 95%;margin: 0 auto;z-index: 10;position: fixed;left: 2.5%;-webkit-animation-duration: 0.2s;animation-duration: 0.2s;-webkit-animation-name: bounceOut;animation-name: bounceOut;}
.share-overlay {position: fixed;top: 0px;right: 0;bottom: 0;left: 0;z-index: 100;width: 100%;height: 800px;background: #333;filter: alpha(opacity=70);-moz-opacity: 0.7;opacity: 0.7;}

@keyframes bounceIn {

	from,
	20%,
	40%,
	60%,
	80%,
	to {
		-webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
		animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
	}

	0% {
		opacity: 0;
		-webkit-transform: scale3d(0, 0, 0);
		transform: scale3d(0, 0, 0);
	}

	20% {
		opacity: 0.2;
		-webkit-transform: scale3d(0.2, 0.2, 0.2);
		transform: scale3d(0.2, 0.2, 0.2);
	}

	40% {
		opacity: 0.4;
		-webkit-transform: scale3d(0.4, 0.4, 0.4);
		transform: scale3d(0.4, 0.4, 0.4);
	}

	60% {
		opacity: 0.6;
		-webkit-transform: scale3d(0.6, 0.6, 0.6);
		transform: scale3d(0.6, 0.6, 0.6);
	}

	80% {
		opacity: 0.8;
		-webkit-transform: scale3d(0.8, 0.8, 0.8);
		transform: scale3d(0.8, 0.8, 0.8);
	}

	to {
		opacity: 1;
		-webkit-transform: scale3d(1, 1, 1);
		transform: scale3d(1, 1, 1);
	}
}


@keyframes bounceOut {
	20% {
		-webkit-transform: scale3d(0.9, 0.9, 0.9);
		transform: scale3d(0.9, 0.9, 0.9);
	}

	50%,
	55% {
		opacity: 1;
		-webkit-transform: scale3d(1.1, 1.1, 1.1);
		transform: scale3d(1.1, 1.1, 1.1);
	}

	to {
		opacity: 0;
		-webkit-transform: scale3d(0.3, 0.3, 0.3);
		transform: scale3d(0.3, 0.3, 0.3);
	}
}

</style>
