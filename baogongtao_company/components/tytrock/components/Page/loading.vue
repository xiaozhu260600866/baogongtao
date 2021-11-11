<template>
	<view>
		<view class="page-loading" v-if="visible">
			<view class="loading-container">
				<view class="animation">
					<view class="shape shape1"></view>
					<view class="shape shape2"></view>
					<view class="shape shape3"></view>
					<view class="shape shape4"></view>
			    </view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		visible: {
			type:Boolean,
			default:false
		}
	},
}
</script>

<style>
.page-loading{position: fixed;top: 0;left: 0;right: 0;bottom: 0;z-index:9999;background: #fff;}
.page-loading .loading-container{width: 30px;height: 30px;position: absolute;top: 50%;left: 50%;margin-left: -15px;margin-right: -15px;}
.page-loading .animation {width: 30px;height: 30px;position: relative;}
.animation {-webkit-animation: rotation 1s infinite;animation: rotation 1s infinite;}
.animation .shape {position: absolute;width: 10px;height: 10px;border-radius: 1px;}
.animation .shape.shape1 {left: 0;background-color: #5C6BC0;}
.animation .shape.shape2 {right: 0;background-color: #8BC34A;}
.animation .shape.shape3 {bottom: 0;background-color: #FFB74D;}
.animation .shape.shape4 {bottom: 0;right: 0;background-color: #F44336;}
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.animation .shape1 {
  -webkit-animation: animationshape1 2s linear 0s infinite normal;
  animation: animationshape1 2s linear 0s infinite normal;
}

@-webkit-keyframes animationshape1 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, 18px);
    transform: translate(0, 18px);
  }
  50% {
    -webkit-transform: translate(18px, 18px);
    transform: translate(18px, 18px);
  }
  75% {
    -webkit-transform: translate(18px, 0);
    transform: translate(18px, 0);
  }
}

@keyframes animationshape1 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, 18px);
    transform: translate(0, 18px);
  }
  50% {
    -webkit-transform: translate(18px, 18px);
    transform: translate(18px, 18px);
  }
  75% {
    -webkit-transform: translate(18px, 0);
    transform: translate(18px, 0);
  }
}
.animation .shape2 {
  -webkit-animation: animationshape2 2s linear 0s infinite normal;
  animation: animationshape2 2s linear 0s infinite normal;
}

@-webkit-keyframes animationshape2 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(-18px, 0);
    transform: translate(-18px, 0);
  }
  50% {
    -webkit-transform: translate(-18px, 18px);
    transform: translate(-18px, 18px);
  }
  75% {
    -webkit-transform: translate(0, 18px);
    transform: translate(0, 18px);
  }
}

@keyframes animationshape2 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(-18px, 0);
    transform: translate(-18px, 0);
  }
  50% {
    -webkit-transform: translate(-18px, 18px);
    transform: translate(-18px, 18px);
  }
  75% {
    -webkit-transform: translate(0, 18px);
    transform: translate(0, 18px);
  }
}
.animation .shape3 {
  -webkit-animation: animationshape3 2s linear 0s infinite normal;
          animation: animationshape3 2s linear 0s infinite normal;
}

@-webkit-keyframes animationshape3 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(18px, 0);
    transform: translate(18px, 0);
  }
  50% {
    -webkit-transform: translate(18px, -18px);
    transform: translate(18px, -18px);
  }
  75% {
    -webkit-transform: translate(0, -18px);
    transform: translate(0, -18px);
  }
}

@keyframes animationshape3 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(18px, 0);
    transform: translate(18px, 0);
  }
  50% {
    -webkit-transform: translate(18px, -18px);
    transform: translate(18px, -18px);
  }
  75% {
    -webkit-transform: translate(0, -18px);
    transform: translate(0, -18px);
  }
}
.animation .shape4 {
  -webkit-animation: animationshape4 2s linear 0s infinite normal;
          animation: animationshape4 2s linear 0s infinite normal;
}

@-webkit-keyframes animationshape4 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, -18px);
    transform: translate(0, -18px);
  }
  50% {
    -webkit-transform: translate(-18px, -18px);
    transform: translate(-18px, -18px);
  }
  75% {
    -webkit-transform: translate(-18px, 0);
    transform: translate(-18px, 0);
  }
}

@keyframes animationshape4 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, -18px);
    transform: translate(0, -18px);
  }
  50% {
    -webkit-transform: translate(-18px, -18px);
    transform: translate(-18px, -18px);
  }
  75% {
    -webkit-transform: translate(-18px, 0);
    transform: translate(-18px, 0);
  }
}
</style>
