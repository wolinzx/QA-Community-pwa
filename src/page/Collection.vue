<template>
  <div class="collection">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="routerBack">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
        我的收藏
      <!-- <mu-menu slot="right" cover placement="bottom-end">
        <mu-button icon>
          <mu-icon value="delete"></mu-icon>
        </mu-button>
      </mu-menu> -->
    </mu-appbar>
    <mu-list textline="two-line">
      <mu-sub-header inset>收藏文件夹</mu-sub-header>
      <mu-list-item avatar button :ripple="false">
        <mu-list-item-action>
          <mu-avatar>
            <mu-icon value="folder"></mu-icon>
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>前端</mu-list-item-title>
          <mu-list-item-sub-title>7个内容</mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
      <mu-list-item avatar button :ripple="false">
        <mu-list-item-action>
          <mu-avatar>
            <mu-icon value="folder"></mu-icon>
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>生活</mu-list-item-title>
          <mu-list-item-sub-title>0个内容</mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
      <mu-list-item avatar button :ripple="false">
        <mu-list-item-action>
          <mu-avatar>
            <mu-icon value="folder"></mu-icon>
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>理论</mu-list-item-title>
          <mu-list-item-sub-title>1个内容</mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    routerBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
