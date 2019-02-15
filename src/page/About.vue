<template>
  <div class="about">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="routerBack">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
        关于
    </mu-appbar>
    <mu-flex class="flex-wrapper" justify-content="around" direction="column" align-items="center" style="width: 100%; height: 30rem;">
      <mu-flex class="flex-wrapper" justify-content="between" direction="column" align-items="center" align-self="center">
        <img style="width: 6rem" src="..\assets\image\login_logo2.png" alt="">
        <h2 style="margin: 0">网络问答社区</h2>
        <span style="font-size: 0.8rem">Version 0.1</span>
      </mu-flex>
      <mu-flex>
        <p class="shenming">本平台资源与内容均搜集于网络，仅供学习参考，不得进行任何商业用途，否则产生的一切后果将由使用者本人承担!<br>
        如有侵权内容请与本人(email: wolinzx@163.com)联系</p>
      </mu-flex>
    </mu-flex>
  </div>
</template>

<script>
export default {
  methods: {
    routerBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.shenming{
  width: 13rem;
  font-size: 0.4rem;
  text-align: center;
  color: #979797;
}
</style>
