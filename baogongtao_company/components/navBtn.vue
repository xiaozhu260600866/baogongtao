<template>
	<view>
		<view :class="['nav_btn', myclass ? myclass : '']">
			<slot name="LnavBtn" />
			<view :class="['item', itemclass ? itemclass : '']" v-for="(v,index) in data" :key="index">
				<myform :ruleform="{}" :append="true" :vaildate="{}" :data="v" @callBack="goto(v.url,1)">
					<view slot="content">
						<view class="nav_img">
							<image :src=" v.coverUrl " :class="['img']" />
						</view>
						<view class="txt"><span>{{v.name}}</span></view>
					</view>
				</myform>
			</view>
			<slot name="RnavBtn" />
		</view>
	</view>
</template>

<script>
	export default{
		props:['data','myclass','itemclass'],
		data(){
			return {
				
			}
		}
	}
</script>
<style>
.nav_btn{padding: 5px;background: #fff;display: flex;flex-wrap: wrap;}
.nav_btn .item,.nav_btn .item ._view{width: 25%;padding: 8px 5px;text-align: center;}
.nav_btn .nav_img {text-align: center;text-align: -webkit-center;}
.nav_btn .nav_img .img{width: 44px;height: 44px;display: flex;justify-content: center;border-radius: 10px;}
.nav_btn .txt{padding-top: 5px;font-size: 13px;color: #333;text-align: center;line-height: 20px;}
.nav_btn .item-5{width: 20%;}
</style>