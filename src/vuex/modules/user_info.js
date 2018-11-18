import * as types from '../mutation-types'
import axios from 'axios'
import * as localStorage from '../localStorage'



const state = {
	isLogined: false, // 登陆状态
	user_datas: localStorage.user_info.get() || [],
}

const mutations = {
	[types.SET_USERINFO](state, {
		logined,
		data
	}) {
		try {
			if (logined) {
				console.log("登陆了" + data);
				state.isLogined = true;
				state.user_datas = data;
				localStorage.user_info.set(data);
				console.log("local:" + localStorage.user_info.get());
				console.log("state:" + state.user_datas);
			} else {
				localStorage.user_info.clear();
				state.isLogined = false;
			}
		} catch (err) {
			console.log("seterr:" + err);
		}
	},
	[types.CLEAR_USERINFO]() {
		state.user_datas = [],
			localStorage.user_info.clear();
	},
	[types.SHOW_LODING](state, loadingShow) {
		state.loadingShow = loadingShow;
	}
}

const actions = {
	[types.GET_USERINFO](context) {
		if (localStorage.user_info.get()) {
			axios.get('/api/login/getAccount')
				.then((response) => {
					if (response.data) {
						context.commit('SET_USERINFO', {
							logined: true,
							data: localStorage.user_info.get()
						});
					} else {
						context.commit('SET_USERINFO', {
							logined: false
						});
					}
				})
				.catch((err) => {
					throw err;
				});
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
export default userInfo;
