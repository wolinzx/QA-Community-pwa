<template>
  <div id="app">
    <index></index>
  </div>
</template>

<script>
import Index from './page/index'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    Index
  }
}
</script>

<style>
@import "assets/css/reset.css";
/* muse-ui全屏对话框可滑动 */
/* .mu-appbar{
  position: sticky;
  top: 0;
} */
.mu-dialog-fullscreen{
  overflow: auto;
}
</style>
