import * as types from '../mutation-types'
// import axios from 'axios'
import * as localStorage from '../../util/localStorage'

const state = {
  isLogined: false, // 登陆状态
  user_datas: localStorage.userInfo.get() || [ { avatar: '' }, { userAvatar: '' } ]
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
    localStorage.userInfo.clear()
  },
  [types.SHOW_LODING] (state, loadingShow) {
    state.loadingShow = loadingShow
  }
}

const actions = {
  [types.GET_USERINFO] (context) {
    let arr = localStorage.userInfo.get()
    if (arr) {
      context.commit('SET_USERINFO', {
        logined: true,
        data: arr
      })
      // axios.post('/api/login', { account: arr[0].account, password: arr[0].password }).then(res => {
      //   console.log(res)
      //   if (res.data) {
      //     context.commit('SET_USERINFO', {
      //       logined: true,
      //       data: res.data
      //     })
      //   } else {
      //     context.commit('SET_USERINFO', {
      //       logined: false
      //     })
      //   }
      // }).catch(err => {
      //   throw err
      // })
    } else {
      context.commit('SET_USERINFO', {
        logined: false
      })
    }
  }
}

const userInfo = {
  state,
  mutations,
  actions
}
export default userInfo
