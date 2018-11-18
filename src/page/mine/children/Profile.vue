<template>
  <div id="Profile">
    <child-header :title="title"></child-header>
    <div class="menu">
      <ul></ul>
    </div>
    <div class="user-tag">
      <div class="user-avatar" @click="showAvatarMenu=true">
        <img :src="userInfo.user_datas[0].avatar" alt="" v-if="userInfo.isLogined">
      </div>
      <h3 v-if="userInfo.isLogined" class="user-name">{{userInfo.user_datas[0].account}}</h3>
      <h3 v-else>您还没有登陆</h3>
      <p class="user-signature">this is a</p>
      <button class="follow-btn" v-if="false">关注</button>
      <!-- <button class="follow-btn" v-if="true">编辑个人资料</button> -->
      <router-link class="follow-btn" v-if="true" to="/Mine/Profile/EditProfile">编辑个人资料</router-link>
    </div>
    <nav class="user-nav">

    </nav>
    <message-box ref="messageBox"></message-box>
    <transition name="router-slid" mode="out-in">
      <router-view class="child-view"></router-view>
    </transition>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MessageBox from '@/components/TheMessageBox'
import ChildHeader from '@/components/TheChildHeader'

export default {
  name: 'Prifile',
  data() {
    return {
      title: '个人主页'
    }
  },
  components: {
    MessageBox,
    ChildHeader
  },
  methods: {

  },
  computed: {
    ...mapState(['userInfo']),
    Msgs() {
      var Msgs = this.$store.state.userInfo.isLogined;
      console.log(Msgs);
    }
  }
}
</script>

<style scoped>
#Profile {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #f9f9fa;
  /* overflow: hidden; */
  overflow: auto;
  box-shadow: 0 0 8px rgb(133, 133, 133);
}

.user-tag {
  width: 100%;
  background: #ffffff;
  box-sizing: border-box;
  padding: 0.8rem 0.6rem;
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #f2f2f2;
}
.user-tag .user-avatar {
  width: 4.3rem;
  height: 4.3rem;
  background: url("../../../assets/image/default_avatar.png") top center
    no-repeat;
  background-size: cover;
  overflow: hidden;
  border-radius: 2.8rem;
}
.user-avatar img {
  width: 100%;
  height: 100%;
}
.user-tag .user-name {
  margin: 0.7rem;
}
.user-tag .user-signature {
  /* margin: 1rem; */
}
.user-tag .follow-btn {
  margin: 0.5rem;
  display: block;
  width: 5.6rem;
  height: 1.8rem;
  background: #04bb73;
  /* margin: 1.3rem auto; */
  text-align: center;
  line-height: 1.8rem;
  border-radius: 2rem;
  color: white;
  border: none;
  font-size: 0.6rem;
}

/* 动画相关 */
.fade-enter-active,
.fade-leave-active {
  /* transition: opacity .5s; */
}
.fade-enter,
.fade-leave-active {
  /* opacity: 0; */
}
.fade-choose-enter-active,
.fade-choose-leave-active {
  /* transition: opacity .5s; */
}
.fade-choose-leave,
.fade-choose-leave-active {
  display: none;
}
.fade-choose-enter,
.fade-choose-leave-active {
  /* opacity: 0; */
}
.router-slid-enter-active,
.router-slid-leave-active {
  transition: all 0.4s;
}
.router-slid-enter,
.router-slid-leave-active {
  transform: translate3d(100%, 0, 0);
  /* opacity: 0; */
}
.toggle-cart-enter-active,
.toggle-cart-leave-active {
  transition: all 0.4s ease;
}
.toggle-cart-enter,
.toggle-cart-leave-active {
  transform: translate3d(100%, 0, 0);
}
</style>


