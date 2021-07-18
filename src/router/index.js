import Vue from "vue";
import VueRouter from "vue-router";
import myRouters from "./router";

Vue.use(VueRouter);
const routes = [myRouters];
console.log(routes);

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
