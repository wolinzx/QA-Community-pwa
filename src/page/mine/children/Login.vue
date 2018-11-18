<template>
  <div id="login">
    <div class="loding" v-show="loadingShow">
      加载中
    </div>
    <a class="return" @click="routerBack()"><i class="iconfont icon-a"></i></a>
    <div class="login-logo">
      <img src="../../../assets/image/login_logo4.png" alt="">
    </div>
    <div class="login-input">
      <input :class="{'input-red': checkFail}" type="text" placeholder="请输入账号" v-model="user.account">
      <input type="password" placeholder="请输入密码" v-model="user.password">
      <span><a href="">忘记密码？</a></span>
    </div>
    <div class="buttons">
      <div class="buttons-left">
        <button class="login-button" @click="login()">
          登陆
        </button>
      </div>
      <div class="buttons-right">
        <button class="QQ-button">

        </button>
        <button class="wx-button">

        </button>
      </div>

    </div>
    <div class="sign-up">
      <button class="sign-up-link" @click="showSignUpFun()">
        <p>
          没有账号？
        </p>
        <p>
          创建
        </p>
      </button>
    </div>
    <transition name="fade">
      <div class="sign-up-page" v-show="showSignUp">
        <div class="sign-up-main">
          <button class="sign-up-close" @click="btnClose()"></button>
          <h3 class="sign-up-title">注册</h3>
          <input type="text" placeholder="请输入账号" v-model="user.account">
          <input type="text" placeholder="请输入邮箱" v-model="user.email">
          <input type="password" placeholder="请输入密码" v-model="new_password">
          <input type="password" placeholder="请再次输入密码" v-model="input_password">
          <p class="sign-up-text">点击注册按钮表示你同意协议</p>
          <button class="registration" @click="registration()">注册</button>
        </div>
      </div>
    </transition>
    <MessageBox ref="messageBox"></MessageBox>
  </div>
</template>

<script>
// import store from '@/vuex/store'
import { mapState, mapMutations, mapActions } from 'vuex'
import MessageBox from '@/components/TheMessageBox'
export default {
  name: 'Login',
  data() {
    return {
      user: {
        avatar: '',
        account: '',
        password: '',
        email: '',
        sex: '',
        describe: '',
        industry: ''
      },
      new_password: '',
      input_password: '',
      showSignUp: false,
      msg: '',
      showMsg: false,
      checkFail: false,
    }
  },
  components: {
    MessageBox
  },
  methods: {
    ...mapMutations(['SET_USERINFO']),
    routerBack() {
      this.$router.go(-1);
    },
    login() {

      if (!this.loginCheck()) {
        return;
      }

      this.$http.post('/api/login', {
        account: this.user.account,
        password: this.user.password
      })
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            this.SET_USERINFO({
              logined: true,
              data: res.data
            });
            console.log(res.data);
            this.$router.push('/Home');
          } else {
            this.$refs.messageBox.showMsgBox('账号或密码错误！');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loginCheck() {
      if (this.user.account == '') {
        this.$refs.messageBox.showMsgBox('请输入账号！');
        return false;
      } else if (this.user.password == '') {
        this.$refs.messageBox.showMsgBox('请输入密码！');
        return false;
      } else {
        return true;
      }
    },
    registration() {
      if (!this.regCheck()) {
        return;
      }
      let user = {
        account: this.user.account,
        password: this.new_password,
        email: this.user.email
      }
      console.log(user);
      this.$http.post('/api/login/createAccount', user)
        .then((res) => {
          console.log(res.data);
          if (res.data == true) {
            this.$refs.messageBox.showMsgBox('创建成功！');
          } else {
            this.$refs.messageBox.showMsgBox('用户名或邮箱已经使用！');
          }
        })
        .catch((err) => {
          this.$refs.messageBox.showMsgBox('创建失败！');
        });
    },
    regCheck() {
      let reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
      if (this.user.account == '') {
        this.$refs.messageBox.showMsgBox('请输入账号！');
        return false;
      } else if (this.user.email == '') {
        this.$refs.messageBox.showMsgBox('请输入邮箱！');
        return false;
      } else if (this.user.email.match(reg) == null) {
        this.$refs.messageBox.showMsgBox('请输入正确的邮箱地址！');
        return false;
      } else if (this.new_password == '' && this.input_password == '') {
        this.$refs.messageBox.showMsgBox('请输入密码！');
        return false;
      } else if (this.new_password != this.input_password) {
        this.$refs.messageBox.showMsgBox('两次密码输入不一致！');
        return false;
      } else {
        return true;
      }
    },
    showSignUpFun() {
      this.showSignUp = true;
    },
    btnClose() {
      this.showSignUp = false;
    },
    // showMsgBox (msg) {
    //     this.msg = msg;
    //     this.showMsg = true;
    //     setTimeout(()=>{
    //         this.showMsg = false;
    //     },1500);
    // }

  },
  computed: {
    ...mapState(['loadingShow'])
  }
}
</script>

<style scoped>
.loding {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}
#login {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #ffffff;
  /* overflow: hidden; */
  overflow: auto;
  box-shadow: 0 0 8px rgb(133, 133, 133);
}
.return {
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: #bababa;
}
.login-logo {
  width: 100%;
  margin: 1rem 0;
}
.login-logo img {
  width: 100%;
}
.login-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}
/* .login-input input:nth-child(1){
    margin-top: 0.8rem;
} */
.login-input input,
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
.login-input a {
  color: #a3a8ab;
  font-size: 0.6rem;
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 11.6rem;
  margin: 1.2rem auto;
}
.buttons div {
  width: 5.3rem;
}
.buttons div button {
  height: 2rem;
  border-radius: 1rem;
  color: #ffffff;
  border: none;
  overflow: hidden;
}
.buttons div .login-button {
  position: relative;
  width: 5.6rem;
  background: #04bb73;
  font-size: 0.8rem;
  transition: all 300ms ease;
}
.buttons div .login-button:after {
  content: "";
  background: #fff;
  position: absolute;
  width: 5.6rem;
  height: 5.6rem;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
  margin: auto;
  border-radius: 50%;
  transform: scale(1.5);
  transition: all 0.75s ease;
}
.buttons div .login-button:active:after {
  transform: scale(0);
  opacity: 1;
  transition: 0s;
}
/* .buttons div .login-button:hover{
    background: #FFFFFF;
    color: #FB1A44;
    border: 1px solid #FB1A44;
} */
.buttons .buttons-right {
  display: flex;
  justify-content: space-around;
}

.buttons .buttons-right button {
  width: 2rem;
}
.buttons .QQ-button {
  background: url("../../../assets/image/qq_icon.png") top center no-repeat;
  background-size: cover;
}
.buttons .wx-button {
  background: url("../../../assets/image/wx_icon.png") top center no-repeat;
  background-size: cover;
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
  border: 1px solid #eeeef0;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 0.5rem;
  width: 11.6rem;
  height: 3rem;
  font-size: 0.7rem;
  color: #a3a8ab;
  margin: 1.6rem 0;
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
  background: url("../../../assets/image/close.png") top center no-repeat;
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
.registration {
  width: 8.3rem;
  height: 2rem;
  background: #04bb73;
  font-size: 0.8rem;
  transition: all 300ms ease;
  align-self: center;
  border: 1px solid #04bb73;
  border-radius: 1rem;
  color: #ffffff;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.msgbox {
  position: fixed;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  bottom: -2.8rem;
  z-index: 999;
  transition: all 300ms ease;
}
.msg {
  width: 95%;
  height: 2.5rem;
  background: #04bb73;
  font-size: 0.9rem;
  color: white;
  border-radius: 0.5rem;
  line-height: 2.5rem;
  text-align: center;
}
.msgbox-move {
  bottom: 0.5rem;
}
</style>


