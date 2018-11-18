<template>
  <div id="TheChildHeader">
    <header class="header">
      <a class="return" @click="routerBack()"><i class="iconfont icon-a"></i></a>
      <h3 class="title">{{title}}</h3>
      <a class="menu-btn"><i class="iconfont icon-caidan"></i></a>
    </header>
    <div class="occupation"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: [
    'title'
  ],
  methods: {
    routerBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  display: flex;
  box-sizing: border-box;
  padding: 0 0.6rem;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 2.4rem;
  background: #ffffff;
  border-bottom: 1px solid #f2f2f2;
}
.occupation {
  height: 2.4rem;
}
.title {
  /* font-size: 1rem; */
  font-weight: normal;
}
.return,
.menu-btn,
.title {
  color: #646263;
  font-size: 0.9rem;
}
.menu-btn {
  font-size: 1.2rem;
}
</style>


