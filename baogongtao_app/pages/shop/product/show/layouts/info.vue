<template>
    <section>
        <view class="share-overlay" @click="toggleInfoDiag" v-if="infoDiag"></view>
        <div v-if="infoDiag">
            <view class="bd-t infoanimation choose">
                <view class="choose-floor">
                    <view class="choose-sit bd-b">
                        <view class="pro-img bd-o">
                            <image :src="siteName+'/upload/images/product/'+productInfo[infokey].pic" class="info-pic"></image>
                        </view>
                        <view class="choose-del"></view>
                        <view class="choose-detail">
                            <view class="pro-price price_color">￥
                                <text class="info-price">{{ productInfo[infokey].price }}</text>
                            </view>
                            <view class="p">库存
                                <text class="info-num">{{ productInfo[infokey].num }}</text>
                            </view>
                        </view>
                    </view>
                    <view class="choose-class">
                        <view class="class-h4">{{ productInfo[infokey].name }}</view>
                        <view class="p">
                            <block v-for="(item,key) in productInfo" :key="key">
                                <span :class="['bdd',key==infokey ?  'yes-act' :'no-act']" @click="infokey = key">{{ item.name }}</span>
                            </block>
                        </view>
                        <view class="clear"></view>
                    </view>
                    <view class="num_wrap choose-sum bd-b">
                        <view class="inline float_l">数量</view>
                        <view class="float_r">
                            <text class="iconfont icon-count-minus minus_disabled" id="minus" @click="infonum<=1 ? 1:infonum-=1"></text>
                            <input class="num" name="num" id="buyNum" type="tel" v-model.lazy="infonum" />
                            <text class="iconfont icon-count-plus" id="plus" @click="infonum++"></text>
                        </view>
                        <view class="clear"></view>
                    </view>
                </view>
                <view class="button">
                    <navigator @click="infoSubmit">确认</navigator>
                </view>
            </view>
        </div>
    </section>
</template>
<script>
export default {
    props: ["productInfo"],
    data() {
        return {
            infokey: 0,
            infonum: 1,
            infoDiag: false,
            siteName: this.getSiteName(),
            cartNum: 0,
            showType: ''
        }
    },
    onLoad() {
        this.infoDiag = false;
    },
    methods: {
        infoSubmit() {
            let info = this.productInfo[this.infokey];
            info.bnum = this.infonum;
            this.addCartAjax({ infoId: info.id, num: info.bnum, type: "add", is_info: 1,token: uni.getStorageSync('token')});
        },
        addCartAjax(data) {
            let showType = this.showType;
			data.token =  uni.getStorageSync('token');
			if(!data.token){
				//this.getError("请注册简历");
				return this.goto("/pages/user/login/index/index");	
			}
            let url = "";
            if (showType == "addCart") {
                url = "/shop/cart/to-add-cart"
            } else {
                url = "/shop/product/show";
            }
			this.postAjax(url,data).then(msg=>{
				if (msg.data.status == 2) {
				    if (showType != "addCart") {
				        this.infoDiag = false;
				        this.goto('/pages/shop/order/buy/index?order_no=' + msg.data.order_no,1);
				        return false;
				    }
				    this.cartNum = msg.data.num;
				    if (this.productInfo.length > 0) {
				        this.toggleInfoDiag();
				    }
				    this.$emit('callback', this.cartNum);
				}
			});
           
        },
        toggleInfoDiag() {
            this.infoDiag = !this.infoDiag;
        }
    }

}
</script>
<style scoped>
@import url("info.css");
</style>