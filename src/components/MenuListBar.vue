<template>
  <div id="MenuListBar">
    <div class="com-container menu">
      <a href="">
        <h5>{{title}}</h5>
        <div class="right-ico">
          <i class="iconfont icon-iconfontyoujiantou"></i>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menuListBar',
  data () {
    return {

    }
  },
  props: ['title']
}
</script>

<style scoped>
.menu a {
  height: 2.3rem;
  font-size: 0.8rem;
  border-bottom: 1px solid #f5f4f4;
  display: flex;
  flex-direction: row;
  /* align-content: center; */
  align-items: center;
  justify-content: space-between;
  color: #000000;
}
</style>
