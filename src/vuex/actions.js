/**
 * 异步修改vuex状态，不能直接操作state，可以通过commit来实现state修改
 */
import axios from 'axios'
import * as types from './mutation-types'

export default {
	// [types.GET_LOGINSTATE] (context){
	//   axios.get('/api/loginState')
	//     .then((response)=>{
	//       if(response.data){
	//         context.commit('SET_LOGINSTATE',{logined:true,account:response.data.account,avatar:response.data.avatar});
	//       }else{
	//         context.commit('SET_LOGINSTATE',{logined:false,account:'',avatar:''});
	//       }
	//       console.log(response.data);
	//     })
	//     .catch((err)=>{
	//         throw err;
	//     });
	//   }
}
