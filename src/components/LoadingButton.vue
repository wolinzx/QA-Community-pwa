<template>
  <mu-button color="primary"
    v-loading="loading1"
    data-mu-loading-size="24"
    data-mu-loading-color="primary"
    data-mu-loading-overlay-color="rgba(0, 0, 0, .7)"
    @click="handelClick" class="loading-button"
    full-width
    large>
    {{label}}
  </mu-button>
</template>

<script>
export default {
  props: {
    label: {
      type: String
    },
    action: {}
  },
  data () {
    return {
      loading1: false
    }
  },
  methods: {
    handelClick () {
      this.loading1 = true
      setTimeout(() => {
        console.log(this.action)
        this.$emit(this.action, 'fff')
        this.loading1 = false
      }, 500)
    }
  }
}
</script>

<style>
.loading-button .mu-loading-wrap {
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
