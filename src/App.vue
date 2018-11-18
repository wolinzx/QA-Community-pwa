<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheFooter from '@/components/TheFooter';
export default {
  name: 'App',
  components: {
    TheFooter
  },
  data() {
    return {
      transitionName: 'slide-left',
    }
  },
  watch: {
    '$route'(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之
      if (to.meta.z_index > from.meta.z_index) {
        this.transitionName = 'slide-left';
      } else {
        this.transitionName = 'slide-right';
      }
    }
  }
}
</script>

<style>
@import "assets/css/reset.css";
.child-view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: transform 0.6s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: transform 400ms ease;
  position: absolute;
}
.slide-right-enter {
  /* opacity: 0; */
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  /* opacity: 0; */
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  /* opacity: 0; */
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  /* opacity: 0; */
  transform: translate3d(-100%, 0, 0);
}
</style>
