import * as types from '../mutation-types'

const state = {
  scrolled: false,
  theme: 'light'
}

const mutations = {
  [types.SET_SCROLLED] (state, scrolled) {
    state.scrolled = scrolled
  },
  [types.SET_THEME] (state, theme) {
    state.theme = theme
  }
}

const getters = {
  [types.GET_THEME]: state => {
    return state.theme
  }
}

const app = {
  state,
  mutations,
  getters
}
export default app
