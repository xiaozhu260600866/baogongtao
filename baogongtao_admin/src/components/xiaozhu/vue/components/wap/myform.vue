<!-- 使用
<myform :ruleform="ruleform" :vaildate="vaildate" @callBack="formSubmit"></myform>
  js
  formSubmit(){
   处理验证后的业务逻辑
  }

   -->
<template>
    <div :class="[isFixed ? 'footer-btn': 'mtb20']" @click="formSubmit" >
        <button type="button" :class="[isFixed ? 'f-btn-blue': 'dx-btn-big dx-btn dx-btn-blue w-b100']">{{ title ? title : '确定' }}</button>
    </div>
</template>
<script type="text/javascript">
export default {
    props: ["ruleform", "vaildate", "title","isFixed"],
    data() {
        return {
            getSiteName: this.getSiteName(),
        }
    },
    methods: {
        formSubmit(e) {
            this.$emit("before");
            let res = this.vaildForm(this);
            if(res){
              this.$emit("callBack");
            }
        }
    }
}

</script>
<style type="text/css" scoped="">

.footer-btn {position: fixed;bottom: 0;left: 0;height: 60px;display: flex;box-shadow: 0 0 10px 0 hsla(0, 6%, 58%, .2);-webkit-box-shadow: 0 0 10px 0 hsla(0, 6%, 58%, .2);-moz-box-shadow: 0 0 10px 0 hsla(0, 6%, 58%, .2);padding: 5px 10px;width: 100%;box-sizing: border-box;background: #fff;z-index: 10;}
.footer-btn .f-btn-blue {height: 50px;line-height: 50px;width: 100%;text-align: center;border-radius: 4px;color: #fff;font-size: 16px;background: #1678F3;border: 0;}
.footer-btn .f-btn-orange {height: 50px;line-height: 50px;width: 100%;text-align: center;border-radius: 4px;color: #fff;font-size: 16px;background:  #ff721f;border: 0;}
.footer-btn .f-btn-green {height: 50px;line-height: 50px;width: 100%;text-align: center;border-radius: 4px;color: #fff;font-size: 16px;background: #13cc0c;border: 0;}
.footer-btn .f-btn-red {height: 50px;line-height: 50px;width: 100%;text-align: center;border-radius: 4px;color: #fff;font-size: 16px;background: #ff4949;border: 0;}

</style>