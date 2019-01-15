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
.mu-appbar{
  position: sticky;
  top: 0;
  z-index: 1000;
}
.mu-dialog-fullscreen{
  overflow: auto;
}
.mu-menu-activator{
  display: flex;
}
.mu-card{
  max-width: none !important;
  border-radius: 0;
  padding: 16px;
}
.mu-card-title-container,
.mu-card-header
{
  padding: 0 !important;
}
.mu-card-text{
  margin: 0 !important;
}
.mu-card-text{
  padding: 0 !important ;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.mu-card-actions{
  padding: 8px 0 0 !important;
}
</style>
