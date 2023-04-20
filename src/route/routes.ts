import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    meta: {
      title: '可配置大屏',
      keepAlive: false
    },
    name: 'login',
    component: () => import(/* webpackChunkName: "home" */ '../pages/home.vue')
  }, {
    path: '/login',
    meta: {
      title: '登录',
      keepAlive: false
    },
    name: 'Login',
    component: () => import(/* webpackChunkName: "home" */ '../pages/login.vue')
  }, {
    path: '/list',
    meta: {
      title: '列表',
      keepAlive: false
    },
    name: 'List',
    component: () => import(/* webpackChunkName: "home" */ '../pages/list.vue')
  }, {
    path: '/main',
    meta: {
      title: '主操作界面',
      keepAlive: false
    },
    name: 'Main',
    component: () => import(/* webpackChunkName: "home" */ '../pages/main.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router