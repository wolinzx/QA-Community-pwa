<template>
  <div id="Mine">
    <!-- <div class="container-inner mine-title">
      <h3>我的</h3>
    </div> -->
    <div class="container-inner user-tag">
      <router-link to="/Mine/Profile" :class="{disabled:!userInfo.isLogined}">
        <div class="user-avatar">
          <img :src="userInfo.user_datas[0].avatar" alt="" v-if="userInfo.isLogined">
        </div>
        <div class="user-name">
          <h4 v-if="userInfo.isLogined">{{userInfo.user_datas[0].account}}</h4>
          <h4 v-else>您还没有登陆</h4>
        </div>
        <div class="right-ico">
          <i class="iconfont icon-iconfontyoujiantou"></i>
        </div>
      </router-link>
    </div>
    <div class="container-inner menu">
      <menu-list-bar title="浏览历史"></menu-list-bar>
      <menu-list-bar title="我的收藏"></menu-list-bar>
      <menu-list-bar title="我的关注"></menu-list-bar>
    </div>
    <div class="sign-in" v-if="!userInfo.isLogined">
      <router-link to="/Mine/Login">登陆</router-link>
    </div>
    <div class="sign-out" v-else>
      <a @click="logout()">注销</a>
      <!-- <form-button title="注销" align="center" type="danger" @click.native="logout()"></form-button> -->
    </div>
    <transition name="router-slid" mode="out-in">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
import MenuListBar from '@/components/MenuListBar'
import FormButton from '@/components/form/FormButton'
import store from '@/vuex/store'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'Mine',
  data () {
    return {

    }
  },
  components: {
    MenuListBar,
    FormButton
  },
  store,
  methods: {
    logout () {
      this.$http.get('/api/logout', {})
        .then((res) => {
          console.log(res.data)
          this.SET_USERINFO({ logined: false })
          this.$router.push({ name: 'Login' })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    ...mapMutations(['SET_USERINFO', 'CLEAR_USERINFO']),
    ...mapActions(['GET_USERINFO'])
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped>
#Mine {
  height: 100%;
  background: #f9f9fa;
}
a.disabled {
  pointer-events: none;
}
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
.mine-title {
  margin-top: 0;
  /* text-align: center; */
  font-size: 1rem;
}
.user-tag .user-avatar {
  width: 3.2rem;
  height: 3.2rem;
  background: url("../../assets/image/default_avatar.png") top center no-repeat;
  background-size: cover;
  border-radius: 2rem;
  overflow: hidden;
}
.user-avatar img {
  width: 100%;
  height: 100%;
}
.user-tag a{
  display: flex;
  flex-direction: row;
  /* align-content: center; */
  align-items: center;
  justify-content: space-between;
  color: #000000;
}
.user-tag .user-name {
  width: 10rem;
}
.right-ico {
  font-size: 0.8rem;
}
.sign-in a,
.sign-out a {
  display: block;
  width: 10rem;
  height: 2.1rem;
  background: #04bb73;
  margin: 1.3rem auto;
  text-align: center;
  line-height: 2.1rem;
  border-radius: 2rem;
  color: #FFFFFF;
}
.sign-out a {
  background: rgb(206, 72, 19);
}
</style>
