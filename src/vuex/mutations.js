/**
 * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
 */
import * as types from './mutation-types'
export default{
    // [types.SET_LOGINSTATE] (state,{logined,account,avatar}){
    //     if(logined){
    //       state.userInfo.isLogined = true;
    //       state.userInfo.account = account;
    //       state.userInfo.avatar = avatar;
    //     }else{
    //       state.userInfo.isLogined = false;
    //       state.userInfo.account = '您还没有登陆';
    //       state.userInfo.avatar = avatar;
    //     }
    //     // console.log(state.account.isLogined);
    // },
    // [types.SHOW_LODING](state,loadingShow){
    //   state.loadingShow = loadingShow;
    // }
}