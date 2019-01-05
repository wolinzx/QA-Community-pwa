import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home/Home'
// import Follow from '@/page/home/children/Follow'
// import Recommend from '@/page/home/children/Recommend'
// import Popular from '@/page/home/children/Popular'
import Mine from '@/page/mine/Mine'
// import Login from '@/page/mine/children/Login'
import Profile from '@/page/mine/Profile'
import EditProfile from '@/page/mine/children/EditProfile'
import Message from '@/page/message/Message'
import Edit from '@/page/Edit'
// const Home = () => import('@/page/home/Home')
// const Message = () => import('@/page/message/Message')

Vue.use(Router)

export default new Router({
  routes: [
    // 默认跳转路由
    {
      path: '*',
      redirect: '/Home',
      meta: {
        // index: 0,
        isChild: false
      }
    },
    {
      path: '/Home',
      component: Home,
      name: 'Home',
      meta: {
        class: 'main'
      }
      // children: [{
      //   path: '/',
      //   name: 'Home',
      //   redirect: '/Home/Follow',
      //   meta: {
      //     class: 'main'
      //   }
      // },
      // {
      //   path: '/Home/Follow',
      //   name: 'Follow',
      //   component: Follow,
      //   meta: {
      //     class: 'main'
      //   }
      // },
      // {
      //   path: '/Home/Recommend',
      //   name: 'Recommend',
      //   component: Recommend,
      //   meta: {
      //     class: 'main'
      //   }
      // },
      // {
      //   path: '/Home/Popular',
      //   name: 'Popular',
      //   component: Popular,
      //   meta: {
      //     class: 'main'
      //   }
      // }
      // ]
    },
    {
      path: '/Message',
      name: 'Message',
      component: Message,
      meta: {
        class: 'main'
      }
    },
    {
      path: '/Mine',
      name: 'Mine',
      component: Mine,
      meta: {
        class: 'main'
      }
      // children: [{
      //   path: '/Mine/Login',
      //   name: 'Login',
      //   component: Login,
      //   meta: {
      //     isChild: true
      //   }
      // },
      // {
      //   path: '/Mine/Profile',
      //   name: 'Profile',
      //   component: Profile,
      //   meta: {
      //     isChild: true
      //   },
      //   children: [{
      //     path: '/Mine/Profile/EditProfile',
      //     name: 'EditProfile',
      //     component: EditProfile,
      //     meta: {
      //       isChild: true
      //     }
      //   }]
      // }]
    },
    {
      path: '/Edit',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: Profile,
      meta: {
        isChild: true
      },
      children: [{
        path: '/Mine/Profile/EditProfile',
        name: 'EditProfile',
        component: EditProfile,
        meta: {
          isChild: true
        }
      }]
    }
  ]
})
