<template>
  <mu-container data-mu-loading-color="secondary" data-mu-loading-overlay-color="rgba(0, 0, 0, .7)" v-loading="loading2" class="demo-loading-wrap">
    <mu-button color="primary" @click="loading()">区域加载</mu-button>
    <mu-button color="secondary" class="button-two" v-loading="loading1" data-mu-loading-size="24" @click="loading1 = !loading1">按钮加载</mu-button>
    <mu-button color="teal" @click="fullscreen()">全屏加载</mu-button>
    <!-- <mu-button color="primary"
      v-loading="loading1"
      data-mu-loading-size="24"
      data-mu-loading-color="primary"
      data-mu-loading-overlay-color="rgba(0, 0, 0, .7)"
      class="button-two"
      full-width
      large>
      登陆
    </mu-button> -->
  </mu-container>
</template>

<script>
export default {
  data () {
    return {
      loading1: false,
      loading2: false
    }
  },
  methods: {
    loading () {
      this.loading2 = true
      setTimeout(() => {
        this.loading2 = false
      }, 2000)
    },
    fullscreen () {
      const loading = this.$loading()
      setTimeout(() => {
        loading.close()
      }, 2000)
    }
  }
}
</script>
<style scoped>
/* .demo-loading-wrap {
  height: 300px;
  position: relative;
}
.mu-button {
  margin: 6px 8px;W
} */
.button-two .mu-loading-wrap{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  /* line-height: 32px; */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
