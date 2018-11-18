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

Vue.prototype.$http = axios
// Vue.use(Vuex);
Vue.config.productionTip = false
/* eslint-disable no-new */
// function sleep(numberMillis) {
//   var now = new Date();
//   var exitTime = now.getTime() + numberMillis;
//   while (true) {
//   now = new Date();
//   if (now.getTime() > exitTime)
//   return;
//   }
//   }

// //定义一个请求拦截器
// axios.interceptors.request.use(function(config){
//   store.commit('SHOW_LODING',true);
//   return config;
// })

// //定义一个响应拦截器
// axios.interceptors.response.use(function(config){
//   sleep(500);
//   store.commit('SHOW_LODING',false);
//   return config;
// })

new Vue({
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
