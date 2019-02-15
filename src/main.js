// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import store from '@/vuex/store'
import {
  mapState,
  // mapMutations,
  mapActions
} from 'vuex'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import Toast from 'muse-ui-toast'
import Loading from 'muse-ui-loading'
import router from './router'
// import VueSocketio from 'vue-socket.io'
// import socketio from 'socket.io-client'

// Vue.use(VueSocketio, socketio('http://localhost:8088/'))
Vue.use(MuseUI)
Vue.use(Toast)
Vue.use(Loading)

MuseUI.theme.add('Teal', {
  primary: '#009688',
  secondary: '#ff4081',
  success: '#4caf50',
  warning: '#ffeb3b'
}, 'light')

MuseUI.theme.add('Carbon', {
  primary: '#474a4f',
  secondary: '#ff4081',
  success: '#4caf50',
  warning: '#ffeb3b'
}, 'light')
MuseUI.theme.use(localStorage.getItem('theme') || 'light')

Vue.prototype.$http = axios
Vue.prototype.$mu_theme = MuseUI.theme
Vue.config.productionTip = false

export default new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  methods: {
    ...mapActions(['GET_USERINFO'])
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created: () => {
    store.dispatch('GET_USERINFO')
  }
})
