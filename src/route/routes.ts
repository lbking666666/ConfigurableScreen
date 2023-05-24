import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    meta: {
      title: "可配置大屏",
      keepAlive: false,
    },
    name: "layout",
    component: () =>
      import(/* webpackChunkName: "home" */ "../components/layout/index.vue"),
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        meta: {
          title: "工作台",
          keepAlive: false,
        },
        component: () =>
          import(/* webpackChunkName: "home" */ "../pages/home.vue"),
      },
      {
        path: "app",
        meta: {
          title: "应用列表",
          keepAlive: true,
        },
        component: () =>
          import(/* webpackChunkName: "home" */ "../pages/app.vue"),
      },
      // {
      //   path: "list",
      //   meta: {
      //     title: "列表",
      //     keepAlive: false,
      //   },
      //   name: "List",
      //   component: () =>
      //     import(/* webpackChunkName: "home" */ "../pages/list.vue"),
      // },
    ],
  },
  {
    path: "/login",
    meta: {
      title: "登录",
      keepAlive: false,
    },
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "home" */ "../pages/login.vue"),
  },
  {
    path: "/main",
    meta: {
      title: "主操作界面",
      keepAlive: false,
    },
    name: "Main",
    component: () => import(/* webpackChunkName: "home" */ "../pages/main.vue"),
  },
  {
    path: "/view",
    meta: {
      title: "预览界面",
      keepAlive: false,
    },
    name: "View",
    component: () => import(/* webpackChunkName: "home" */ "../pages/view.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
