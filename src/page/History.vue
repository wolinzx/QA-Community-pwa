<template>
  <div class="history">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="routerBack">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
        浏览历史
      <mu-menu slot="right" cover placement="bottom-end">
        <mu-button icon>
          <mu-icon value="delete"></mu-icon>
        </mu-button>
      </mu-menu>
    </mu-appbar>
    <mu-list textline="two-line">
      <mu-sub-header inset>最近浏览</mu-sub-header>
      <mu-list-item avatar button :ripple="false">
        <mu-list-item-action>
          <mu-avatar color="primary">
            <mu-icon value="subject"></mu-icon>
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>你有什么道理后悔没有早点知道？</mu-list-item-title>
          <mu-list-item-sub-title>Jan 9, 2014</mu-list-item-sub-title>
        </mu-list-item-content>
        <mu-list-item-action>
          <mu-button icon>
            <mu-icon value="cancel"></mu-icon>
          </mu-button>
        </mu-list-item-action>
      </mu-list-item>
      <mu-list-item avatar button :ripple="false">
        <mu-list-item-action>
          <mu-avatar color="primary">
            <mu-icon value="subject"></mu-icon>
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>为什么很多职位都要招[应届毕业生]</mu-list-item-title>
          <mu-list-item-sub-title>Jan 17, 2014</mu-list-item-sub-title>
        </mu-list-item-content>
        <mu-list-item-action>
          <mu-button icon>
            <mu-icon value="cancel"></mu-icon>
          </mu-button>
        </mu-list-item-action>
      </mu-list-item>
      <mu-list-item avatar button :ripple="false">
        <mu-list-item-action>
          <mu-avatar color="primary">
            <mu-icon value="subject"></mu-icon>
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>如何辨认身边的聪明人？</mu-list-item-title>
          <mu-list-item-sub-title>Jan 28, 2014</mu-list-item-sub-title>
        </mu-list-item-content>
        <mu-list-item-action>
          <mu-button icon>
            <mu-icon value="cancel"></mu-icon>
          </mu-button>
        </mu-list-item-action>
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
