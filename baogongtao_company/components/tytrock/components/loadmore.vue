<template>
	<view>
		<view class="loadmore" v-if="visible">
			<div class="container animation-3">
			  <div class="shape shape1"></div>
			  <div class="shape shape2"></div>
			  <div class="shape shape3"></div>
			  <div class="shape shape4"></div>
			</div>
		</view>
		<view v-if="!visible && nodata && data.length==0">
			<view v-if="source == 'def'">
				<view class="empty">
					<view class="icon"><i class="iconfont icon-task-null"></i></view>
					<p class="name ptb10 fs-14 fc-6">{{ nullTxt }}</p>
				</view>
			</view>
			<view v-if="source == 'error'">
				<view class="empty">
					<image class="img" src="/static/image/icon/warn.png" />
					<p class="name ptb10 fs-14 fc-6">{{ nullTxt }}</p>
				</view>
			</view>
			<div v-else-if="source == 'mytask' ">
				<div class="empty">
					<view class="icon"><i class="iconfont icon-task-null"></i></view>
					<p class="name ptb10 fs-14 fc-6">没有相关任务</p>
					<dx-button plain @click="linkTo('/pages/task/lists/index',2)">前往任务大厅</dx-button>
				</div>
			</div>
			<div v-else-if="source == 'task' ">
				<div class="empty">
					<view class="icon"><i class="iconfont icon-task-null"></i></view>
					<p class="name ptb10 fs-14 fc-6">没有相关任务</p>
				</div>
			</div>
			<div v-else-if="source == 'cart' ">
				<div class="empty">
					<image class="img" src="/static/image/cart02.png" />
					<p class="name pt10 fs-16 fc-6">您的购物车空空的</p>
					<p class="name pt5 pb10 fs-12 fc-6">赶紧去挑些喜欢的填满它吧</p>
					<tyt-navigator class="btn" hover-class="none" @callBack="linkTo('/pages/shop/index/index')">去首页逛逛</tyt-navigator>
				</div>
			</div>
		</view>
	</view>
</template>

<script>
import dxButton from "doxinui/components/button/button";
export default {
	components: { dxButton },
	name: "tytLoadmore",
	props: {
		//显示文本
		text: {
			type: String,
			default: "正在加载..."
		},
		//是否可见
		visible: {
			type: Boolean,
			default: false
		},
		nodata: {
			type: Boolean,
			default: false
		},
		source: {
			type: String,
			default: 'def'
		},
		nullTxt: {
			type: String,
			default: '暂无数据'
		},
		data: {
			type: Array,
			default: []
		}
	}
}
</script>

<style>
.loadmore{text-align: center;}
.container {
  width: 30px;
  height: 30px;
  position: relative;
  margin: 0 auto;
}
.container.animation-1 {
  -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
}
.container.animation-2, .container.animation-4 {
  -webkit-transform: rotate(10deg);
          transform: rotate(10deg);
}
.container.animation-2 .shape, .container.animation-4 .shape {
  border-radius: 5px;
}
.container.animation-2, .container.animation-3, .container.animation-4 {
  -webkit-animation: rotation 1s infinite;
          animation: rotation 1s infinite;
}
.container.animation-3 .shape1 {
  border-top-left-radius: 10px;
}
.container.animation-3 .shape2 {
  border-top-right-radius: 10px;
}
.container.animation-3 .shape3 {
  border-bottom-left-radius: 10px;
}
.container.animation-3 .shape4 {
  border-bottom-right-radius: 10px;
}
.container.animation-4, .container.animation-5 {
  -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
}
.container.animation-5 .shape {
  width: 15px;
  height: 15px;
}
.container.animation-6 {
  -webkit-animation: rotation 1s infinite;
          animation: rotation 1s infinite;
}
.container.animation-6 .shape {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}
.container .shape {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 1px;
}
.container .shape.shape1 {
  left: 0;
  background-color: #5C6BC0;
}
.container .shape.shape2 {
  right: 0;
  background-color: #8BC34A;
}
.container .shape.shape3 {
  bottom: 0;
  background-color: #FFB74D;
}
.container .shape.shape4 {
  bottom: 0;
  right: 0;
  background-color: #F44336;
}

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
.animation-1 .shape1 {
  -webkit-animation: animation1shape1 0.5s ease 0s infinite alternate;
          animation: animation1shape1 0.5s ease 0s infinite alternate;
}

@-webkit-keyframes animation1shape1 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(16px, 16px);
            transform: translate(16px, 16px);
  }
}

@keyframes animation1shape1 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(16px, 16px);
            transform: translate(16px, 16px);
  }
}
.animation-1 .shape2 {
  -webkit-animation: animation1shape2 0.5s ease 0s infinite alternate;
          animation: animation1shape2 0.5s ease 0s infinite alternate;
}

@-webkit-keyframes animation1shape2 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(-16px, 16px);
            transform: translate(-16px, 16px);
  }
}

@keyframes animation1shape2 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(-16px, 16px);
            transform: translate(-16px, 16px);
  }
}
.animation-1 .shape3 {
  -webkit-animation: animation1shape3 0.5s ease 0s infinite alternate;
          animation: animation1shape3 0.5s ease 0s infinite alternate;
}

@-webkit-keyframes animation1shape3 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(16px, -16px);
            transform: translate(16px, -16px);
  }
}

@keyframes animation1shape3 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(16px, -16px);
            transform: translate(16px, -16px);
  }
}
.animation-1 .shape4 {
  -webkit-animation: animation1shape4 0.5s ease 0s infinite alternate;
          animation: animation1shape4 0.5s ease 0s infinite alternate;
}

@-webkit-keyframes animation1shape4 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(-16px, -16px);
            transform: translate(-16px, -16px);
  }
}

@keyframes animation1shape4 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(-16px, -16px);
            transform: translate(-16px, -16px);
  }
}
.animation-2 .shape1 {
  -webkit-animation: animation2shape1 0.5s ease 0s infinite alternate;
          animation: animation2shape1 0.5s ease 0s infinite alternate;
}

@-webkit-keyframes animation2shape1 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(20px, 20px);
            transform: translate(20px, 20px);
  }
}

@keyframes animation2shape1 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(20px, 20px);
            transform: translate(20px, 20px);
  }
}
.animation-2 .shape2 {
  -webkit-animation: animation2shape2 0.5s ease 0s infinite alternate;
          animation: animation2shape2 0.5s ease 0s infinite alternate;
}

@-webkit-keyframes animation2shape2 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(-20px, 20px);
            transform: translate(-20px, 20px);
  }
}

@keyframes animation2shape2 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(-20px, 20px);
            transform: translate(-20px, 20px);
  }
}
.animation-2 .shape3 {
  -webkit-animation: animation2shape3 0.5s ease 0s infinite alternate;
          animation: animation2shape3 0.5s ease 0s infinite alternate;
}

@-webkit-keyframes animation2shape3 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(20px, -20px);
            transform: translate(20px, -20px);
  }
}

@keyframes animation2shape3 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(20px, -20px);
            transform: translate(20px, -20px);
  }
}
.animation-2 .shape4 {
  -webkit-animation: animation2shape4 0.5s ease 0s infinite alternate;
          animation: animation2shape4 0.5s ease 0s infinite alternate;
}

@-webkit-keyframes animation2shape4 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(-20px, -20px);
            transform: translate(-20px, -20px);
  }
}

@keyframes animation2shape4 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(-20px, -20px);
            transform: translate(-20px, -20px);
  }
}
.animation-3 .shape1 {
  -webkit-animation: animation3shape1 0.5s ease 0s infinite alternate;
          animation: animation3shape1 0.5s ease 0s infinite alternate;
}

@-webkit-keyframes animation3shape1 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(5px, 5px);
            transform: translate(5px, 5px);
  }
}

@keyframes animation3shape1 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(5px, 5px);
            transform: translate(5px, 5px);
  }
}
.animation-3 .shape2 {
  -webkit-animation: animation3shape2 0.5s ease 0s infinite alternate;
          animation: animation3shape2 0.5s ease 0s infinite alternate;
}

@-webkit-keyframes animation3shape2 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(-5px, 5px);
            transform: translate(-5px, 5px);
  }
}

@keyframes animation3shape2 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(-5px, 5px);
            transform: translate(-5px, 5px);
  }
}
.animation-3 .shape3 {
  -webkit-animation: animation3shape3 0.5s ease 0s infinite alternate;
          animation: animation3shape3 0.5s ease 0s infinite alternate;
}

@-webkit-keyframes animation3shape3 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(5px, -5px);
            transform: translate(5px, -5px);
  }
}

@keyframes animation3shape3 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(5px, -5px);
            transform: translate(5px, -5px);
  }
}
.animation-3 .shape4 {
  -webkit-animation: animation3shape4 0.5s ease 0s infinite alternate;
          animation: animation3shape4 0.5s ease 0s infinite alternate;
}

@-webkit-keyframes animation3shape4 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(-5px, -5px);
            transform: translate(-5px, -5px);
  }
}

@keyframes animation3shape4 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(-5px, -5px);
            transform: translate(-5px, -5px);
  }
}
.animation-4 .shape1 {
  -webkit-animation: animation4shape1 0.3s ease 0s infinite alternate;
          animation: animation4shape1 0.3s ease 0s infinite alternate;
}

@-webkit-keyframes animation4shape1 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(5px, 5px);
            transform: translate(5px, 5px);
  }
}

@keyframes animation4shape1 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(5px, 5px);
            transform: translate(5px, 5px);
  }
}
.animation-4 .shape2 {
  -webkit-animation: animation4shape2 0.3s ease 0.3s infinite alternate;
          animation: animation4shape2 0.3s ease 0.3s infinite alternate;
}

@-webkit-keyframes animation4shape2 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(-5px, 5px);
            transform: translate(-5px, 5px);
  }
}

@keyframes animation4shape2 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(-5px, 5px);
            transform: translate(-5px, 5px);
  }
}
.animation-4 .shape3 {
  -webkit-animation: animation4shape3 0.3s ease 0.3s infinite alternate;
          animation: animation4shape3 0.3s ease 0.3s infinite alternate;
}

@-webkit-keyframes animation4shape3 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(5px, -5px);
            transform: translate(5px, -5px);
  }
}

@keyframes animation4shape3 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(5px, -5px);
            transform: translate(5px, -5px);
  }
}
.animation-4 .shape4 {
  -webkit-animation: animation4shape4 0.3s ease 0s infinite alternate;
          animation: animation4shape4 0.3s ease 0s infinite alternate;
}

@-webkit-keyframes animation4shape4 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(-5px, -5px);
            transform: translate(-5px, -5px);
  }
}

@keyframes animation4shape4 {
  from {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(-5px, -5px);
            transform: translate(-5px, -5px);
  }
}
.animation-5 .shape1 {
  animation: animation5shape1 2s ease 0s infinite reverse;
}

@-webkit-keyframes animation5shape1 {
  0% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, 15px);
            transform: translate(0, 15px);
  }
  50% {
    -webkit-transform: translate(15px, 15px);
            transform: translate(15px, 15px);
  }
  75% {
    -webkit-transform: translate(15px, 0);
            transform: translate(15px, 0);
  }
}

@keyframes animation5shape1 {
  0% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, 15px);
            transform: translate(0, 15px);
  }
  50% {
    -webkit-transform: translate(15px, 15px);
            transform: translate(15px, 15px);
  }
  75% {
    -webkit-transform: translate(15px, 0);
            transform: translate(15px, 0);
  }
}
.animation-5 .shape2 {
  animation: animation5shape2 2s ease 0s infinite reverse;
}

@-webkit-keyframes animation5shape2 {
  0% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(-15px, 0);
            transform: translate(-15px, 0);
  }
  50% {
    -webkit-transform: translate(-15px, 15px);
            transform: translate(-15px, 15px);
  }
  75% {
    -webkit-transform: translate(0, 15px);
            transform: translate(0, 15px);
  }
}

@keyframes animation5shape2 {
  0% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(-15px, 0);
            transform: translate(-15px, 0);
  }
  50% {
    -webkit-transform: translate(-15px, 15px);
            transform: translate(-15px, 15px);
  }
  75% {
    -webkit-transform: translate(0, 15px);
            transform: translate(0, 15px);
  }
}
.animation-5 .shape3 {
  animation: animation5shape3 2s ease 0s infinite reverse;
}

@-webkit-keyframes animation5shape3 {
  0% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(15px, 0);
            transform: translate(15px, 0);
  }
  50% {
    -webkit-transform: translate(15px, -15px);
            transform: translate(15px, -15px);
  }
  75% {
    -webkit-transform: translate(0, -15px);
            transform: translate(0, -15px);
  }
}

@keyframes animation5shape3 {
  0% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(15px, 0);
            transform: translate(15px, 0);
  }
  50% {
    -webkit-transform: translate(15px, -15px);
            transform: translate(15px, -15px);
  }
  75% {
    -webkit-transform: translate(0, -15px);
            transform: translate(0, -15px);
  }
}
.animation-5 .shape4 {
  animation: animation5shape4 2s ease 0s infinite reverse;
}

@-webkit-keyframes animation5shape4 {
  0% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, -15px);
            transform: translate(0, -15px);
  }
  50% {
    -webkit-transform: translate(-15px, -15px);
            transform: translate(-15px, -15px);
  }
  75% {
    -webkit-transform: translate(-15px, 0);
            transform: translate(-15px, 0);
  }
}

@keyframes animation5shape4 {
  0% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, -15px);
            transform: translate(0, -15px);
  }
  50% {
    -webkit-transform: translate(-15px, -15px);
            transform: translate(-15px, -15px);
  }
  75% {
    -webkit-transform: translate(-15px, 0);
            transform: translate(-15px, 0);
  }
}
.animation-6 .shape1 {
  -webkit-animation: animation6shape1 2s linear 0s infinite normal;
          animation: animation6shape1 2s linear 0s infinite normal;
}

@-webkit-keyframes animation6shape1 {
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

@keyframes animation6shape1 {
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
.animation-6 .shape2 {
  -webkit-animation: animation6shape2 2s linear 0s infinite normal;
          animation: animation6shape2 2s linear 0s infinite normal;
}

@-webkit-keyframes animation6shape2 {
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

@keyframes animation6shape2 {
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
.animation-6 .shape3 {
  -webkit-animation: animation6shape3 2s linear 0s infinite normal;
          animation: animation6shape3 2s linear 0s infinite normal;
}

@-webkit-keyframes animation6shape3 {
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

@keyframes animation6shape3 {
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
.animation-6 .shape4 {
  -webkit-animation: animation6shape4 2s linear 0s infinite normal;
          animation: animation6shape4 2s linear 0s infinite normal;
}

@-webkit-keyframes animation6shape4 {
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

@keyframes animation6shape4 {
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

.empty{text-align: center;margin-top: 120upx;}
.empty .icon{font-size: 250upx;color: #999;line-height: 180upx;}
.empty .img{width: 150upx;height: 150upx;}
.empty .btn{border: 1upx #FF721F solid;background: transparent;border-radius: 72upx;height: 72upx;line-height: 72upx;width: 240upx;margin: 20upx auto 0;color: #FF721F;font-size: 14px;}

.no-order {
	padding-top: 15vh;
	text-align: center;
}

.no-order image {
	width: 196upx;
	height: 196upx;
}

.no-order ._div:first-of-type {
	color: #333;
	font-size: 30upx;
	line-height: 82upx;
}

.no-order .go-shopping {
	margin: 0 auto;
	width: 360upx;
	line-height: 80upx;
	border-radius: 80upx;
}

.NO-bg{position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: -1;}
.NO-con{display: flex;justify-content: center;flex-wrap: wrap;margin-top: 30%;}
.NO-con .p{width: 100%;text-align: center;}
.NO-con .NO-img ._img{width: 300upx;}

/* 购物车为空时 */
#empty1 {
	text-align: center;
	padding-top: 15vh;
}

#empty1 .e_img image {
	width: 240upx !important;
	height: 240upx !important;
	margin-bottom: 40upx;
}

#empty1 .pb {
	font-weight: 500;
	color: black
}

#empty1 .pd {
	color: #999;
	margin: 20upx 0 40upx;
}

#empty1 .pa {
	border: 1px #FF721F solid;
	background: #fff;
	border-radius: 80upx;
	height: 80upx;
	line-height: 80upx;
	width: 320upx;
	margin: 0 auto;
	color: #FF721F;
	font-size: 28upx;
}
.weui-loadmore{width: 100%!important;margin: 0!important;padding: 1.5em 0;}
</style>
