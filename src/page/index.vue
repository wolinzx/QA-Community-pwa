<template>
  <div id="index">
    <mu-appbar style="width: 100%;" z-depth="0" color="primary"  v-if="this.routeMainPath">
      <mu-button class="menu-left" icon slot="left" @click="open = !open">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      <mu-avatar size="30" slot="left" @click="open = !open">
        <img :src="userInfo.user_datas[0].avatar || this.default_avatar" alt="">
      </mu-avatar>
      <!-- <div v-if="this.routeFirstPath !== 'Home'" class="appbar-title">
        {{this.routerName[this.routeFirstPath]}}
      </div> -->
      <div class="appbar-title">
        {{this.routerName[this.routeFirstPath]}}
      </div>
      <mu-button icon slot="right">
        <mu-icon value="search"></mu-icon>
      </mu-button>
    </mu-appbar>
    <!-- <transition :name="transitionName"> -->
      <router-view class="child-view"></router-view>
    <!-- </transition> -->
    <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'">
      <mu-container class="login-block">
        <div class="user-base"  @click="!userInfo.isLogined ? openFullscreenDialog() : openProfile()">
          <!-- <div class="user-avatar">
            <img :src="userInfo.user_datas[0].avatar || this.default_avatar" alt="">
          </div> -->
          <mu-avatar size="55">
            <img :src="userInfo.user_datas[0].avatar || this.default_avatar" alt="">
          </mu-avatar>
          <h3>{{ userInfo.user_datas[0].account || '点击头像登陆' }}</h3>
        </div>
        <div class="back-img"></div>
      </mu-container>
      <div class="user-bar" v-if="userInfo.isLogined">
        <mu-button flat>
          <p>0</p>
          动态
        </mu-button>
        <mu-button flat>
          <p>0</p>
          关注
        </mu-button>
        <mu-button flat>
          <p>0</p>
          粉丝
        </mu-button>
      </div>
      <mu-divider></mu-divider>
      <mu-list :value="this.routeFirstPath" @change="open = false">
        <mu-list-item button value="Home" :to="{ name:'Home'}">
          <mu-list-item-action>
            <mu-icon value="home"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>首页</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :to="{ name:'History'}">
          <mu-list-item-action>
            <mu-icon value="query_builder"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>浏览历史</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :to="{ name:'Collection' }">
          <mu-list-item-action>
            <mu-icon value="folder_open"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>我的收藏</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :to="{ name:'Follow' }">
          <mu-list-item-action>
            <mu-icon value="favorite_border"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>我的关注</mu-list-item-title>
        </mu-list-item>
        <!-- <mu-list-item  @click="open = false" button>
          <mu-list-item-title>关闭</mu-list-item-title>
        </mu-list-item> -->
        <mu-divider></mu-divider>
        <mu-list-item button @click="openLogoutDialog = true" v-if="userInfo.isLogined">
          <mu-list-item-action>
            <mu-icon value="close"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>注销登陆</mu-list-item-title>
        </mu-list-item>
        <mu-dialog title="注销" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openLogoutDialog">
          确定注销登陆?
          <mu-button slot="actions" flat color="primary" @click="openLogoutDialog = false">手滑</mu-button>
          <mu-button slot="actions" flat color="primary" @click="logout">注销</mu-button>
        </mu-dialog>
        <div class="setting-button">
          <mu-divider></mu-divider>
          <!-- <mu-list-item button>
            <mu-list-item-title>设置</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button @click="themeSwitch('light')" v-if="this.themeMode === 'dark'">
            <mu-list-item-title>日间模式</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button @click="themeSwitch('dark')" v-if="this.themeMode === 'light'">
            <mu-list-item-title>夜间模式</mu-list-item-title>
          </mu-list-item> -->
          <div class="user-bar bar-foot">
            <mu-button flat>
              <mu-icon value="settings"></mu-icon>
              设置
            </mu-button>
            <mu-button flat>
              <mu-icon value="color_lens"></mu-icon>
              主题
            </mu-button>
            <mu-button flat  @click="themeSwitch('light')" v-if="this.themeMode === 'dark'">
              <mu-icon value="brightness_1"></mu-icon>
              日间
            </mu-button>
            <mu-button flat  @click="themeSwitch('dark')" v-if="this.themeMode === 'light'">
              <mu-icon value="brightness_2"></mu-icon>
              夜间
            </mu-button>
          </div>
        </div>
      </mu-list>
    </mu-drawer>
    <mu-slide-bottom-transition>
      <!-- <mu-bottom-nav :class="[ app.scrolled ? 'app-footer-scroll': ''  ,'app-footer']" :value="this.routeFirstPath" v-show="this.routeMainPath && app.scrolled"> -->
        <mu-bottom-nav :class="['app-footer']" :value="this.routeFirstPath" v-show="this.routeMainPath && !app.scrolled">
        <mu-bottom-nav-item title="首页" icon="home" value="Home" :to="{name:'Home'}"></mu-bottom-nav-item>
        <mu-bottom-nav-item title="通知" icon="notifications"  value="Message" :to="{name:'Message'}"></mu-bottom-nav-item>
        <mu-bottom-nav-item title="想法" icon="chat"  value="Think" :to="{name:'Think'}"></mu-bottom-nav-item>
        <!-- <mu-bottom-nav-item title="我的" icon="person"  value="Mine" :to="{name:'Mine'}"></mu-bottom-nav-item> -->
      </mu-bottom-nav>
    </mu-slide-bottom-transition>
    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openFullscreen">
      <mu-appbar color="primary" title="登陆">
        <mu-button slot="left" icon @click="closeFullscreenDialog">
          <mu-icon value="close"></mu-icon>
        </mu-button>
        <mu-button slot="right" flat>
          忘记密码?
        </mu-button>
      </mu-appbar>
      <div style="padding: 24px;">
        <div class="login-logo">
          <img src="../assets/image/login_logo4.png" alt="">
        </div>
        <mu-container>
          <mu-form ref="loginForm" :model="loginForm" class="mu-demo-form">
            <mu-form-item label="用户名" prop="username" :rules="usernameRules" label-float>
              <mu-text-field v-model="loginForm.username" prop="username"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="密码" prop="password" :rules="passwordRules" label-float>
                <mu-text-field type="password" v-model="loginForm.password" prop="password"></mu-text-field>
            </mu-form-item>
            <mu-form-item class="form-button">
              <mu-button color="primary"
              v-loading="loading1"
              data-mu-loading-size="24"
              data-mu-loading-color="primary"
              data-mu-loading-overlay-color="rgba(0, 0, 0, .7)"
              @click="loginSubmit" class="loading-button"
              full-width
              large>
              登陆
              </mu-button>
            </mu-form-item>
          </mu-form>
          <div class="sign-up">
            <mu-button color="success" class="sign-up-link" @click="showSignUpFun">
              <p>
                没有账号？
              </p>
              <p>
                创建
              </p>
            </mu-button>
            <mu-dialog title="注册" width="360" :open.sync="openRegistrationForm">
              <mu-form ref="registrationForm" :model="registrationForm" class="mu-demo-form">
                <mu-form-item prop="username" :rules="usernameRules">
                  <mu-text-field v-model="registrationForm.username" prop="username" placeholder="用户名"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="email" :rules="emailRules">
                    <mu-text-field v-model="registrationForm.email" prop="email" placeholder="邮箱"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="password" :rules="passwordRules">
                  <mu-text-field type="password" v-model="registrationForm.password" prop="password" placeholder="密码"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="checkPassword" :rules="checkPasswordRules">
                    <mu-text-field type="password" v-model="registrationForm.checkPassword" prop="checkPassword" placeholder="确认密码"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="isAgree" :rules="argeeRules">
                  <mu-checkbox label="同意用户协议" v-model="registrationForm.isAgree"></mu-checkbox>
                </mu-form-item>
                <mu-form-item>
                  <mu-button color="primary"
                    v-loading="loading2"
                    data-mu-loading-size="24"
                    data-mu-loading-color="primary"
                    data-mu-loading-overlay-color="rgba(0, 0, 0, .7)"
                    @click="registration" class="loading-button registration-button"
                    full-width
                    large>
                    注册并登陆
                  </mu-button>
                </mu-form-item>
              </mu-form>
            </mu-dialog>
          </div>
        </mu-container>
      </div>
    </mu-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import * as api from '@/api/api'
export default {
  name: 'Index',
  data () {
    let checkPassword = (val) => {
      return this.registrationForm.password === this.registrationForm.checkPassword
    }
    let passwordVolidate = [
      { validate: (val) => !!val, message: '必须填写密码' },
      { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10' }
    ]
    return {
      routerName: {
        Home: '首页',
        Message: '通知',
        Think: '想法',
        Mine: '我的',
        Profile: '我的'
      },
      routeFirstPath: this.$route.matched[0].path.substring(1),
      routeMainPath: this.$route.meta.class === 'main',
      transitionName: 'slide-left',
      docked: false,
      open: false,
      position: 'left',
      shift: 'movies',
      openFullscreen: false,
      usernameRules: [
        { validate: (val) => !!val, message: '必须填写用户名' },
        { validate: (val) => val.length >= 3, message: '用户名长度大于3' }
      ],
      passwordRules: [
        ...passwordVolidate
      ],
      checkPasswordRules: [
        ...passwordVolidate,
        { validate: checkPassword, message: '两次密码不一致' }
      ],
      emailRules: [
        { validate: (val) => !!val, message: '必须填写邮箱' },
        { validate: (val) => val.match(/^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g), message: '请输入正确邮箱' }
      ],
      argeeRules: [
        { validate: (val) => !!val, message: '必须同意用户协议' }
      ],
      loginForm: {
        username: '',
        password: ''
      },
      registrationForm: {
        email: '',
        password: '',
        checkPassword: '',
        isAgree: false
      },
      loading1: false,
      loading2: false,
      openRegistrationForm: false,
      openLogoutDialog: false,
      default_avatar: '/static/img/default_avatar.jpeg',
      themeMode: 'light'
    }
  },
  methods: {
    ...mapMutations(['SET_USERINFO', 'CLEAR_USERINFO']),
    ...mapActions(['GET_USERINFO']),
    login () {
      this.$router.push('/Mine/Login')
    },
    routerChange (val) {
      this.$router.push({ name: val })
    },
    openFullscreenDialog () {
      this.openFullscreen = true
    },
    closeFullscreenDialog () {
      this.openFullscreen = false
    },
    // 登陆
    loginSubmit () {
      this.$refs.loginForm.validate().then((result) => {
        if (result) {
          let params = {
            account: this.loginForm.username,
            password: this.loginForm.password
          }
          this.loading1 = true
          setTimeout(() => {
            this.loginApi(params)
            this.loading1 = false
          }, 500)
        }
      })
    },
    // 注册
    registration () {
      this.$refs.registrationForm.validate().then((result) => {
        if (result) {
          this.loading2 = true
          let params = {
            account: this.registrationForm.username,
            password: this.registrationForm.password,
            email: this.registrationForm.email
          }
          setTimeout(() => {
            api.registrationGet(params).then(res => {
              console.log(res)
              if (res) {
                if (res.code === 11000) {
                  this.$toast.warning('用户名或邮箱已经使用')
                } else {
                  this.$toast.success('创建成功')
                  this.loading1 = false
                  setTimeout(() => {
                    console.log(params)
                    let { email, ...param } = params
                    console.log(email)
                    this.loginApi(param)
                  }, 500)
                }
              } else {
                this.$toast.error('创建失败')
              }
            }).catch(e => {
              throw e
            })
            this.loading2 = false
          }, 500)
        }
      })
    },
    loginApi (params) {
      api.loginPost(params).then(res => {
        console.log(res)
        if (res) {
          this.SET_USERINFO({
            logined: true,
            data: res
          })
          console.log(res)
          this.$router.go(0) // 将整个页面刷新
        } else {
          this.$toast.error('用户名或密码错误')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    logout () {
      this.$http.get('/api/logout', {})
        .then((res) => {
          console.log(res.data)
          this.SET_USERINFO({ logined: false })
          this.CLEAR_USERINFO({ logined: false })
          this.$router.go(0) // 将整个页面刷新
        })
        .catch((err) => {
          console.log(err)
        })
    },
    showSignUpFun () {
      this.openRegistrationForm = true
    },
    openProfile () {
      this.open = false
      this.$router.push({ name: 'Profile' })
    },
    themeSwitch (theme) {
      this.$mu_theme.use(theme)
      this.themeMode = theme
    }
  },
  computed: {
    ...mapState(['userInfo', 'app'])
  },
  watch: {
    $route (to, from) {
      this.routeFirstPath = this.$route.matched[0].path.substring(1)
      this.routeMainPath = this.$route.meta.class === 'main'
    }
  }
}
</script>

<style scoped>
.app-footer{
  width: 100%;
  position: fixed;
  bottom: 0;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);  
}
.login-logo img{
  width: 100%;
}
.form-button>div{
  display: flex;
  justify-content: space-between;
}
.demo-loading-wrap {
  height: 300px;
  position: relative;
}
.demo-loading-wrap .mu-button {
    margin: 6px 8px;
}
.mu-form-item .mu-button{
  margin: 0;
}
.sign-up-page .sign-up-main input {
  box-sizing: border-box;
  padding: 1rem;
  width: 11.6rem;
  height: 1.8rem;
  margin: 0.3rem 0;
  border: 1px solid #e9eaec;
  border-radius: 1.4rem;
  background: #f7f8fa;
  font-size: 0.7rem;
}
.appbar-title{
  text-align: center;
  margin-left: -10px;
}
.sign-up {
  width: 100%;
  display: flex;
  justify-content: center;
}
.sign-up .sign-up-link {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  border: none;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  /* border-radius: 0.5rem; */
  width: 100%;
  height: 3rem;
  font-size: 0.7rem;
  color: #2196f3;
  /* margin: 1.6rem 0; */
  background: #ffffff;
}
.sign-up-page {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
}
.sign-up-page .sign-up-main {
  width: 14rem;
  height: 23rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 2rem;
}
.sign-up-page .sign-up-main .sign-up-close {
  width: 1rem;
  height: 1rem;
  -ms-flex-item-align: end;
  align-self: flex-end;
  margin-right: -1rem;
  margin-top: -1rem;
  /* background: url("../../../assets/image/close.png") top center no-repeat; */
  background-size: cover;
  border: none;
}
.sign-up-page .sign-up-main .sign-up-title {
  text-align: center;
  color: #04bb73;
  margin-bottom: 1.3rem;
}
.sign-up-page .sign-up-main input {
  width: 100%;
}
.sign-up-text {
  text-align: center;
  color: #a3a8ab;
  font-size: 0.6rem;
  margin: 1.2rem 0;
}
.registration-button{
  flex: 1;
}
.login-block{
  position: relative;
  color: #FFFFFF;
  background: #2196f3;
  padding: 0.7rem;
  height: 5.6rem;
}
.login-block .back-img{
  position: absolute;
  width: 50%;
  height: 100%;
  top: 0;
  right: 0;
  background: url('../assets/image/back-img.png') 60% 65% no-repeat;
  background-size: 70%;
}
.user-base h3{
  font-weight: normal;
  font-size: 0.6rem;
  margin: 0.4rem 0;
}
.user-bar{
  display: flex;
  justify-content: space-between;
}
.user-bar .mu-button{
  height: auto;
  line-height: inherit;
  min-width: auto;
  flex: 1;
  padding: 4px;
}
.bar-foot .mu-button{
  padding: 6px;
  height: 48px;
  color: rgba(0,0,0,.54);
}
/* 深度作用选择器 >>> */
.user-bar .mu-button >>> div{
  flex-direction: column;
}
.bar-foot .mu-button >>> div{
  flex-direction: row;
}
.user-bar .mu-button >>> p{
  margin: 0;
}
.mu-list >>> .router-link-active{
  background: #eeeeee;
}
.setting-button{
  position: fixed;
  bottom: 0;
  width: 100%;
}
.mu-paper-round{
  border-radius: 0;
  width: 14rem;
}
.menu-left{
  margin-left: -26px;
}
</style>
