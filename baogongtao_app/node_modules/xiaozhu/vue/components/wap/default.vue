<!-- 引用
<page :formAction='formAction'  :ajaxOnload="true"  ref="page" :data="data" @ajaxCallBack="ajax">
   <div slot="content" >
    <div v-if="data.show">
      内容
    </div>
   </div>
</page>
 -->
<template>
  <section :class="this.$route.name.openType && this.$route.name.openType == 'navigate' ? 'navigatorPage fixed' : '' ">
    <slot name="content" />
    <div class="float-group" :style="Fbottom" v-if="data.show" style="position: fixed;z-index:15;right: 15px;bottom: 120px;">
      <slot name="floatBtn" />
    </div>
  </section>
</template>
<script type="text/javascript">
export default {
  props: ["ajaxOnload", "data", "ruleform", "vaildate", "otherData", "ajaxTimeOut", "formAction",'Fbottom'],
  data() {
    return {
      getSiteName: this.getSiteName(),

    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    "$route": "toKeepAlive"
  },
  methods: {
    ajax() {
      //检查是否有登陆
      this.getAjax(this, {}, msg => {
        if (this.getOptions('scrollTo')) {
          this.$nextTick(() => {
            window.scrollTo(0, parseInt(this.getStorage('scrollTop')));
          });
        }
        this.$emit("ajaxCallBack", msg);
      });
    },
    toKeepAlive() {
      if (this.getOptions('keepAlive') && this.getOptions('keepAlive') == "false") {
        this.ajax();
      }
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
  mounted() {
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
}

</script>
