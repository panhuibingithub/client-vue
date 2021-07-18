/* 由build/buildViews.js自动生成 */
import { Layout } from './importViews.js';
import { Login } from './importViews.js';
import { Home } from './importViews.js';
import BaseRouter from './standerd/index.js';


export default {
  path: "/",
  redirect: "/login",
  component: Layout,
  children: [
    {
      path: "/login",
      meta: {
        name: "login"
      },
      component: Login
    },
    {
      path: "/home",
      meta: {
        name: "home"
      },
      component: Home,
      children: [
        ...BaseRouter,
        
      ]
    }
  ]
};