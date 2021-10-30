<!-- 引用
<page :formAction='formAction' :footerShow="true" :ajaxOnload="true" :keepAlive="false" ref="page" :data="data" @ajaxCallBack="ajax">
   <div slot="content" >
    <div v-if="data.show">
      内容
    </div>
   </div>
</page>
 -->
<template>
    <section>
        <slot name="content" />
        <myFooter :url="formAction" v-if="footerShow"></myFooter>
        <userFooter :url="formAction" v-if="footerShow2"></userFooter>
        <div class="float-group" :style="Fbottom" v-if="data.show">
                <slot name="floatBtn"/>
                <backToIndex :myclass="backToIndexClass"></backToIndex>
        </div>
        <!-- <backToIndex :Bottom="'bottom:11vh'" url='/pages/shop/index/main' urlType='2'></backToIndex> -->

    </section>
</template>
<script type="text/javascript">
import backToIndex from "./backToIndex";
export default {
    props: ["formAction", "footerShow", "ajaxOnload", "keepAlive", "data", "ruleform", "vaildate", "otherData", "footerShow2", "ajaxTimeOut", 'notloading',"notRefresh",'backToIndexClass','Fbottom'],
    data() {
        return {
            getSiteName: this.getSiteName(),
            
        }
    },
    methods: {
        ajax(notloading) {
            //检查是否有登陆
            this.$nextTick(()=>{
                this.getAjax(this, "get", {}, msg => {
                    this.$emit("ajaxCallBack", msg);
                }, this.notloading);
            });
        },
        auth() {

        }
    },
    computed: {
        loading() {
            if (!this.data.show) {
                return "loading";
            } else {
                return "";
            }
        },

    },
    onLoad() {
        this.data.show = false
        this.$emit("myMounted");
        if (this.ajaxOnload) {
            if (this.ajaxTimeOut) {
                setTimeout(() => {
                    this.ajax();
                }, 100)
            } else {
                this.ajax();
            }

        } else {
            setTimeout(() => {
                this.data.show = true;
            }, 100)
        }
    },
    onUnload() {
        this.$emit("myUnload");
        let pages = getCurrentPages();
        if (pages.length >= 2) {
            let prevPage = pages[pages.length - 2];

            let reload = wx.setStorageSync('reload');

            let historyUrl = this.$store ? this.$store.state.mutations.historyUrl :'';
            if(historyUrl){
                 prevPage.onLoad(prevPage.options);
                 this.$store.state.mutations.historyUrl="";
            }
            //prevPage.onLoad(prevPage.options);
        }
        this.end(this);
    },
    onShow(){
        if(this.$store && this.$store.state && this.$store.state.mutations.industry){
            this.$set(this.data.query,"industry",this.$store.state.mutations.industry);
            this.$store.state.mutations.industry="";
            this.ajax(); 
        }
    },
    onPullDownRefresh() {
        if(!this.notRefresh){
            this.data.nextPage = 1;
            this.delHistoryUrl(this.data.historyUrl);
            this.ajax();
        }
    },
    components:{
        backToIndex
    },
   

}

</script>
