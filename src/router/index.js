import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home/Home'
import Follow from '@/page/home/children/Follow'
import Recommend from '@/page/home/children/Recommend'
import Popular from '@/page/home/children/Popular'
import Mine from '@/page/mine/Mine'
import Login from '@/page/mine/children/Login'
import Profile from '@/page/mine/children/Profile'
import EditProfile from '@/page/mine/children/EditProfile'
import Message from '@/page/message/Message'

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
      meta: {
        z_index: 1
      },
      children: [{
        path: '/',
        name: 'Home',
        redirect: '/Home/Follow',
        meta: {
          z_index: 1
        }
      },
      {
        path: '/Home/Follow',
        name: 'Follow',
        component: Follow,
        meta: {
          z_index: 1
        }
      },
      {
        path: '/Home/Recommend',
        name: 'Recommend',
        component: Recommend,
        meta: {
          z_index: 1
        }
      },
      {
        path: '/Home/Popular',
        name: 'Popular',
        component: Popular,
        meta: {
          z_index: 1
        }
      }
      ]
    },
    {
      path: '/Message',
      name: 'Message',
      component: Message,
      meta: {
        z_index: 3
      }
    },
    {
      path: '/Mine',
      name: 'Mine',
      component: Mine,
      meta: {
        z_index: 4
      },
      children: [{
        path: '/Mine/Login',
        name: 'Login',
        component: Login,
        meta: {
          isChild: true
        }
      },
      {
        path: '/Mine/Profile',
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
      }]
    }
  ]
})
