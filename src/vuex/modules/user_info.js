import * as types from '../mutation-types'
import axios from 'axios'
import * as localStorage from '../localStorage'

const state = {
  isLogined: false, // 登陆状态
  user_datas: localStorage.userInfo.get() || []
}

const mutations = {
  [types.SET_USERINFO] (state, {
    logined,
    data
  }) {
    try {
      if (logined) {
        console.log('登陆了' + data)
        state.isLogined = true
        state.user_datas = data
        localStorage.userInfo.set(data)
        console.log('local:' + localStorage.userInfo.get())
        console.log('state:' + state.user_datas)
      } else {
        localStorage.userInfo.clear()
        state.isLogined = false
      }
    } catch (err) {
      console.log('seterr:' + err)
    }
  },
  [types.CLEAR_USERINFO] () {
    state.user_datas = []
    localStorage.userInfo.clear()
  },
  [types.SHOW_LODING] (state, loadingShow) {
    state.loadingShow = loadingShow
  }
}

const actions = {
  [types.GET_USERINFO] (context) {
    if (localStorage.userInfo.get()) {
      axios.get('/api/login/getAccount')
        .then((response) => {
          if (response.data) {
            context.commit('SET_USERINFO', {
              logined: true,
              data: localStorage.userInfo.get()
            })
          } else {
            context.commit('SET_USERINFO', {
              logined: false
            })
          }
        })
        .catch((err) => {
          throw err
        })
    } else {
      // 本地没有用户数据，需要重新未登录
    }
  }

}

const userInfo = {
  state,
  mutations,
  actions
}
export default userInfo
