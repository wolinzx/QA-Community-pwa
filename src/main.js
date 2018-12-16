// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from '@/vuex/store'
import {
  mapState,
  // mapMutations,
  mapActions
} from 'vuex'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

Vue.use(MuseUI)

Vue.prototype.$http = axios
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
