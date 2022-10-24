import { createRouter, createWebHashHistory } from "vue-router";

import Layout from '@/views/layout/Layout'

const routes = [
  {
    component: () => import("@/views/login/Login"),
    path: '/login',
    name: 'login',
    meta: {
      title: "登录"
    }
  },
  {
    component: Layout,
    path: '/',
    name: '后台管理系统',
    meta: {
      title: "后台管理系统"
    }
  },
]

const router = createRouter({
  history: createWebHashHistory('/'),
  routes
});

export default router;
