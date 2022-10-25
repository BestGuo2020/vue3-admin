import { createRouter, createWebHashHistory } from "vue-router";
import generateRoutes from "./routeGenerate";

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
  ...generateRoutes
]

const router = createRouter({
  history: createWebHashHistory('/'),
  routes
});

export default router;
