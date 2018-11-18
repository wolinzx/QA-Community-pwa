/**
 * vuex状态机，用来保存各种状态以及全局变量
 */

import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import userInfo from './modules/user_info'

Vue.use(Vuex);


const state = {
	//account
	// isLogined: false, // 登陆状态
	// avatar: '', // 用户头像地址
	// account: '您还没有登陆', // 用户名
	// loadingShow: false, // 加载动画
}

export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions,
	modules: {
		userInfo,
	}
})
