<template>
    <view class="dxi-banner-swiper"  :class="[myclass]" :style="{padding:`${tbPadding*2}rpx ${lrPadding*2}rpx`,zIndex: zIndex,borderRadius:bdR*2+'rpx'}" v-if="data.length">
		<swiper class="swiper" :indicator-dots="indicatorDots" :vertical="false" :autoplay="true" :duration="100" :circular="true" :style="'height:'+imgheights[current]+'rpx'" :indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor">
            <swiper-item v-for="(item,index) in data" v-if="item" :style="{borderRadius:bdR*2+'rpx'}">
				<image :src="item[imageField || 'coverUrl']" :style="'height:'+imgheights[current]+'rpx;width:'+imgwidth+'rpx;'" @load="imageLoad" @click="clickCover(item)"></image>
            </swiper-item>
        </swiper>
    </view>
</template>
<script>
export default {
    props: {
		// 自定义类名
		myclass:{
			type: String, 
			default: ''
		},
		data:{
			type: Array,
			default (){
				return[]
			}
		},
		purl:{
			type: String,
			default: ''
		},
		indicatorDots:{
			type:Boolean,
			default: true
		},
		imageLoad:{
			type:String,
			default: ''
		},
		tbPadding:{
			type: Number,
			default: 12
		},
		lrPadding:{
			type: Number,
			default: 12
		},
		zIndex:{
			type: Number,
			default: 99
		},
		bdR:{
			type: Number,
			default: 6
		},
		indicatorColor:{
			type: String,
			default:'rgba(255, 255, 255, 0.5)'
		},
		indicatorActiveColor:{
			type: String,
			default:'#fff'
		},
		imageField:{
			type:String,
			defalut:''
		}
	},
    data() {
        return {
            vertical: false,
            autoplay: true,
            duration: 100,
            circular: true,
            imgheights: [],
            imgwidth: 750,
            current: 0,
          
        }
    },
    methods: {
		clickCover(item){
			if(item.url){
				if(item.url.indexOf('http') !==-1){
					window.location.href = item.url;
				}else{
					this.goto(item.url,1);
				}
				
			    return false;
			}
			if(item.cover){
				console.log(5555,item.cover,666,this.purl)
			   // this.previewImage(item.cover,this.purl)
				uni.previewImage({
					urls: [item.cover],
				});
			}
			
		},
        imageLoad(e) {
            var imgwidth = e.mp.detail.width,
                imgheight = e.mp.detail.height,
                ratio = imgwidth / imgheight;
            var viewHeight = 750 / ratio;
            var imgheight = viewHeight
            var imgheights = this.imgheights;
            imgheights.push(imgheight)
            this.imgheights = imgheights;
			this.imgwidth-=this.lrPadding*2;
			console.log(33333,this.lrPadding,imgwidth)
        },
    }
}

</script>
<style>
.dxi-banner-swiper{position: relative;}
.uni-swiper-dot,.swiper-dot{width: 8rpx!important;height: 8rpx!important;display: inline-flex;background: none;justify-content: space-between;background: rgba(255, 255, 255, 0.8)!important;border-radius: 16rpx!important;}
.uni-swiper-dot-active,.swiper-dot-active {width: 16rpx!important;background: #fff!important;}

.dxi-banner-swiper .wx-swiper-dot {width: 8upx;height: 8upx;display: inline-flex;background: none;justify-content: space-between;}
.dxi-banner-swiper .wx-swiper-dot::before {content: '';flex-grow: 1;background: rgba(255, 255, 255, 0.8);border-radius: 16upx;overflow: hidden;}
.dxi-banner-swiper .wx-swiper-dot-active::before {background: red;}
.dxi-banner-swiper .wx-swiper-dot.wx-swiper-dot-active {width: 16upx;}
</style>