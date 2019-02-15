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
import Think from '@/page/think/Think'
import Edit from '@/page/Edit'
import _History from '@/page/History'
import Collection from '@/page/Collection'
import Follow from '@/page/Follow'
import Detail from '@/page/Detail'
import Answer from '@/page/Answer'
import Topic from '@/page/topic/Topic'
import TopicDetail from '@/page/topic/TopicDetail'
import About from '@/page/About'
// const Home = () => import('@/page/home/Home')
// const Message = () => import('@/page/message/Message')About

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
        class: 'main',
        keepAlive: true // 需要被缓存
      }
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
      path: '/Think',
      name: 'Think',
      component: Think,
      meta: {
        class: 'main'
      }
    },
    {
      path: '/Topic',
      name: 'Topic',
      component: Topic,
      meta: {
        class: 'main'
      }
    },
    {
      path: '/History',
      name: 'History',
      component: _History
    },
    {
      path: '/Collection',
      name: 'Collection',
      component: Collection
    },
    {
      path: '/Follow',
      name: 'Follow',
      component: Follow
    },
    {
      path: '/About',
      name: 'About',
      component: About
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: Detail
      // meta: {
      //   keepAlive: true, // 需要被缓存
      //   isBack: false
      // }
    },
    {
      path: '/Answer',
      name: 'Answer',
      component: Answer
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
      path: '/TopicDetail',
      name: 'TopicDetail',
      component: TopicDetail
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
