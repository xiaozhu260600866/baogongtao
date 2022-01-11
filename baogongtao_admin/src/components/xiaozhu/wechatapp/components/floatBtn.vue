
<!--
调用方法

 <div class="float-group" style="bottom: 25px;" @click="goto('/pages/shop/appointment/main',1)">
	<floatBtn type="0" icon="icon-pro-cart"></floatBtn>
</div>
 -->

<template>
	<div>
		
		<!-- 单图标 -->
		<div v-if="icon && !title">
			<button :class="['float-nav',myclass ? myclass:'']" hover-class="none" :open-type="openType">
				<div class="nav-box one-icon">
					<p :class="['nav-icon','iconfont',icon, [iSize ? iSize :'fs-24']]"></p>
				</div>
			</button>
		</div>

		<!-- 单文字 -->
		<div v-if="!icon && title">
			<button :class="['float-nav',myclass ? myclass:'']" hover-class="none" :open-type="openType">
				<div class="nav-box one-name">
					<p class="nav-name fs-13">{{ title }}</p>
				</div>
			</button>
		</div>

		<!-- 图标+文字 -->
		<div v-if="icon && title">
			<button :class="['float-nav',myclass ? myclass:'']" hover-class="none" :open-type="openType">
				<div class="nav-box">
					<p :class="['nav-icon','iconfont', icon  ,[iSize ? iSize :'fs-24']]"></p>
					<p class="nav-name fs-10">{{ title }}</p>
				</div>
			</button>
		</div>

	</div>
</template>
<script type="text/javascript">
export default{
	props:['type','title','icon','myclass','iSize','openType'],
	data() {
		return {
			source: ''
		}
	},
	methods:{
		
	},
	onLoad() {
		
	},
}	
</script>
<style type="text/css" scoped="">

	@import url("./floatBtn.css");
</style>