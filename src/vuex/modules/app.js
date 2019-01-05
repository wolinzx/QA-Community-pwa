import * as types from '../mutation-types'

const state = {
  scrolled: false
}

const mutations = {
  [types.SET_SCROLLED] (state, scrolled) {
    state.scrolled = scrolled
  }
}

const app = {
  state,
  mutations
}
export default app