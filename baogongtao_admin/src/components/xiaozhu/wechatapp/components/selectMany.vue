<template>
	<section>
		<view class="share-overlay" @click="toggleDiag" v-if="thisDiag"></view>
		<div v-if="thisDiag" style="z-index:9999">
			<div class="class_left">
				<div :class="['li',actIndex == key ? 'cur' :'']" v-for="(parent,key) in data" @click="actIndex = key"><span class="label">{{ parent.label }}</span></div>
			</div>
			<div class="class_right">
				<div class="index-tb rlist">
					<div class="ta-tr" v-for="(son,key1) in data[actIndex].children" @click="choose(son)"><a class="tb-item">{{ son.label }}</a></div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
export default {
	props:['data'],
	data() {
		return {
			formAction: '/product/class',
			getSiteName: this.getSiteName(),
			thisDiag: false,
			actIndex: 0,
			
			data: this.formatData()
		}
	},
	methods: {
		ajax() {
			this.thisDiag = true;
		},
		toggleDiag() {
			this.thisDiag = !this.thisDiag;
		},
		choose(item) {
			this.thisDiag = false;
			this.$emit("callBack", item);
			//let pages = getCurrentPages(); // 当前页面  
			//let beforePage = pages[pages.length - 2]; // 前一个页面
			//this.goto("/" + beforePage.route + "?industry=" + item.label);
		}
	},
}

</script>
<style type="text/css">
/* 评论填写 */

@keyframes chooseTrade {
	0% {
		padding-left: 0px;
	}
	100% {
		padding-left: 140px;
	}
}

.class_left {
	position: fixed;
	top: 0;
	left: 0;
	width: 140px;
	bottom: 0;
	background: #eee;
	overflow-y: scroll;
	z-index: 199
}

.class_left .li {
	height: 46px;
	padding: 3px 10px;
	box-sizing: border-box;
	display: flex;
	align-items: center;
}

.class_left .li .label {
	line-height: 20px;
	font-size: 16px;
}

.class_left .li.cur {
	background: #fff;
}

.class_right {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	background: #fff;
	animation: chooseTrade 0.2s;
	padding-left: 140px;
	overflow-y: scroll;
	z-index: 198
}

.class_right .index-tb {
	background: #fff;
}

.class_right .index-tb .ta-tr {
	height: 46px;
	padding: 3px 10px;
	box-sizing: border-box;
	display: flex;
	align-items: center;
}

.class_right .index-tb .tb-item {
	font-size: 16px;
	line-height: 20px;
}

</style>
