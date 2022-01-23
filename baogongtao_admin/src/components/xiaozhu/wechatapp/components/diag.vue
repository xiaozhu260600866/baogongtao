<template>
  <section>
    <div v-if="thisDiag || open" class="share-overlay" style="z-index: 1" @click="toggleDiag" />
    <div v-if="thisDiag || open" :class="['layermchild layermanim  p15','bounceIn']" :style="top ? 'top:'+top+'%;' : 'top:45%;'">
      <slot name="content" />
      <div v-if="thisDiag == true || open" class="icon_off" @click="toggleDiag"><span class="iconfont icon-xiaozhu-off" /></div>
    </div>
  </section>
</template>
<script type="text/javascript">
export default {
    props: ['top', 'ruleform', 'data', 'vaildate', 'open'],
    data() {
        return {
            thisDiag: false,
            diagClass: 'bounceIn'
        }
    },
    methods: {
        toggleDiag() {
            this.thisDiag = false
            this.open = false
        },
        ajax() {
            this.thisDiag = true
        }
    }

}

</script>
<style type="text/css" scoped="">
.icon_off {
    position: absolute;
    bottom: -81px;
    z-index: 22;
    left: 50%;
    margin-left: -20px;
}

.icon_off .iconfont {
    font-size: 40px;
    color: #fff;
}

.layermchild {
    border: none;
    border-radius: 0;
    background: white;
    position: relative
}

.layermchild {
    opacity: 1;
    transform: scale(1);
    -webkit-transform: scale(1);
}

.bounceIn {
    width: 95%;
    margin: 0 auto;
    z-index: 10;
    position: fixed;
    left: 2.5%;
    -webkit-animation-duration: 0.2s;
    animation-duration: 0.2s;
    -webkit-animation-name: bounceIn;
    animation-name: bounceIn;
}

.bounceOut {
    width: 95%;
    margin: 0 auto;
    z-index: 10;
    position: fixed;
    left: 2.5%;
    -webkit-animation-duration: 0.2s;
    animation-duration: 0.2s;
    -webkit-animation-name: bounceOut;
    animation-name: bounceOut;
}

.share-overlay {
    position: fixed;
    top: 0px;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 800px;
    background: #333;
    filter: alpha(opacity=70);
    -moz-opacity: 0.7;
    opacity: 0.7;
}

@keyframes bounceIn {

    from,
    20%,
    40%,
    60%,
    80%,
    to {
        -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    0% {
        opacity: 0;
        -webkit-transform: scale3d(0, 0, 0);
        transform: scale3d(0, 0, 0);
    }

    20% {
        opacity: 0.2;
        -webkit-transform: scale3d(0.2, 0.2, 0.2);
        transform: scale3d(0.2, 0.2, 0.2);
    }

    40% {
        opacity: 0.4;
        -webkit-transform: scale3d(0.4, 0.4, 0.4);
        transform: scale3d(0.4, 0.4, 0.4);
    }

    60% {
        opacity: 0.6;
        -webkit-transform: scale3d(0.6, 0.6, 0.6);
        transform: scale3d(0.6, 0.6, 0.6);
    }

    80% {
        opacity: 0.8;
        -webkit-transform: scale3d(0.8, 0.8, 0.8);
        transform: scale3d(0.8, 0.8, 0.8);
    }

    to {
        opacity: 1;
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
    }
}

@keyframes bounceOut {
    20% {
        -webkit-transform: scale3d(0.9, 0.9, 0.9);
        transform: scale3d(0.9, 0.9, 0.9);
    }

    50%,
    55% {
        opacity: 1;
        -webkit-transform: scale3d(1.1, 1.1, 1.1);
        transform: scale3d(1.1, 1.1, 1.1);
    }

    to {
        opacity: 0;
        -webkit-transform: scale3d(0.3, 0.3, 0.3);
        transform: scale3d(0.3, 0.3, 0.3);
    }
}

</style>
