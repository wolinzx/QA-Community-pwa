<template>
  <footer id="footer">
    <router-link :to="{name:'Home'}">
      <i class="iconfont icon-home icon-home"></i>
    </router-link>
    <router-link :to="{name:'Message'}">
      <i class="iconfont icon-clock"></i>
    </router-link>
    <router-link :to="{name:'Mine'}">
      <i class="iconfont icon-my"></i>
    </router-link>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  data () {
    return {

    }
  }
}
</script>

<style scoped>
#footer {
  display: flex;
  position: fixed;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  /* box-shadow: 0 0 8px #cccccc; */
  border: 1px solid #f2f2f2;
  bottom: 0;
}
#footer a {
  flex: 1;
  /* width: 100px; */
  display: block;
  height: 2.5rem;
  text-align: center;
  /* line-height: 2.5rem; */
  background: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* border-top: 0.08rem solid #FFFFFF; */
  font-size: 1.5rem;
  color: #e6e5e5;
}
.router-link-active {
  color: #04bb73 !important;
}
</style>
