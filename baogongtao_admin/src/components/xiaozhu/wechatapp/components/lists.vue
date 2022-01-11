<template>
    <section>
        <div>
            <slot name="content" />
            <div v-if="data.show && data.lists && data.lists.length == 0 ">
                <div v-if="source == 'order' ">
                    <view class="no-order">
                        <image src="https://keepfit.doxinsoft.com/images/applet/norder.png" />
                        <view>没有订单信息</view>
                        <view class="go-shopping bg-color fs18 fs-white">
                            <navigator url="/pages/index/main">去购物</navigator>
                        </view>
                    </view>
                </div>
                <div v-else-if="source == 'cart' ">
                    <view id="empty1">
                        <view class="e_img">
                            <image src="https://keepfit.doxinsoft.com/images/applet/icon/cart.png"></image>
                        </view>
                        <view class="pb fs18">您的购物车空空的</view>
                        <view class="pd fs12">赶紧去挑些喜欢的填满它吧</view>
                        <view class="pa">
                            <navigator url="/pages/index/main" open-type="redirect">去首页逛逛</navigator>
                        </view>
                    </view>
                </div>
                <div v-else>
                    <p class="p20 fs12 font_grey text-center">暂无数据</p>
                </div>
            </div>
            <div v-if="data.show && data.lists.data && data.lists.data.length == 0 || data.listsIntegral && data.listsIntegral.data && data.listsIntegral.data.length == 0">
                <div v-if="source == 'order' ">
                    <view class="no-order">
                        <image src="https://keepfit.doxinsoft.com/images/applet/norder.png" />
                        <view>没有订单信息</view>
                        <view class="go-shopping bg-color fs18 fs-white">
                            <navigator url="/pages/index/main">去购物</navigator>
                        </view>
                    </view>
                </div>
                <div v-else-if="source == 'cart' ">
                    <view id="empty1">
                        <view class="e_img">
                            <image src="https://keepfit.doxinsoft.com/images/applet/icon/cart.png"></image>
                        </view>
                        <view class="pb fs18">您的购物车空空的</view>
                        <view class="pd fs12">赶紧去挑些喜欢的填满它吧</view>
                        <view class="pa">
                            <navigator url="/pages/index/main" open-type="redirect">去首页逛逛</navigator>
                        </view>
                    </view>
                </div>
                <div v-else>
                    <p class="p20 fs13 font_666 text-center">{{ message ? message : '暂无数据'}}</p>
                </div>
            </div>
            <view class="tips1 hasMore" style="text-align:center;" v-if="data.lastPage>1 && data.thisPage>=1">
                <view v-if="data.hasMore">
                    <view class="weui-loadmore">
                        <text class="weui-loading"></text>
                        <text class="weui-loadmore__tips">正在加载</text>
                    </view>
                </view>
                <view v-else>
                    <view class="">
                        <text class="weui-loadmore__tips">没有更多了...</text>
                    </view>
                </view>
            </view>
            <view class="tips1 hasMore" style="text-align:center;" v-if="isLoading && !data.show && !data.lists.data || data.lists.length==0">
                <view v-if="source !='cart'">
                    <view class="weui-loadmore">
                        <text class="weui-loading"></text>
                        <text class="weui-loadmore__tips">正在加载</text>
                    </view>
                </view>
            </view>
        </div>
    </section>
</template>
<script type="text/javascript">
export default {
    props: ["data", "source", "isLoading", "myclass", 'message'],
    data() {
        return {
            getSiteName: this.getSiteName(),
            data: this.formatData(),
            name: 'xiaozhu'
        }
    },
    onReachBottom() {
        if (this.data.canLoadMore && this.data.hasMore) {
            this.data.nextPage = this.data.nextPage + 1;
            this.$parent.$parent.$parent.$refs.page.ajax();
        }
    },
    onUnload() {
        this.data.show = false;
    },
    computed: {
        loading() {
            if (!this.isLoading) return "";
            if (!this.data.show) {
                return "loading";
            } else {
                return "";
            }
        },

    },
}

</script>
<style type="text/css">
/* 订单列表为空时 */
.no-order {
    padding-top: 15vh;
    text-align: center;
}

.no-order image {
    width: 98px;
    height: 98px;
}

.no-order view:first-of-type {
    color: #333;
    font-size: 15.4px;
    line-height: 42px;
}

.no-order .go-shopping {
    margin: 0 auto;
    width: 180px;
    line-height: 40px;
    border-radius: 40px;
}


/* 购物车为空时 */
#empty1 {
    text-align: center;
    padding-top: 15vh;
}

#empty1 .e_img image {
    width: 120px !important;
    height: 120px !important;
    margin-bottom: 20px;
}

#empty1 .pb {
    font-weight: 500;
    color: black
}

#empty1 .pd {
    color: #999;
    margin: 10px 0 20px;
}

#empty1 .pa {
    border: 1px #FF721F solid;
    background: #FF721F;
    border-radius: 20px;
    padding: 8px 0;
    width: 180px;
    margin: 0 auto;
    color: #fff;
}

</style>
