import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index"; //引入状态管理
import NProgress from "nprogress"; //引入进度条组件 cnpm install nprogress --save
import "nprogress/nprogress.css";

/**
 *@parma {String} name 文件夹名称
 *@parma {String} component 视图组件名称
 */
const getComponent = (name, component) => () =>
  import(`@/views/${name}/${component}.vue`);

const routes = [
  {
    path: "/",
    redirect: "/home",
    component: getComponent("login", "index"),
  },
  {
    path: "/login",
    name: "login",
    component: getComponent("login", "index"),
  },
  {
    path: "/",
    component: getComponent("layout", "layout"),
    children: [
      {
        path: "/home",
        name: "home",
        component: getComponent("home", "index"),
        meta: { title: "首页" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

//判断是否存在token
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path !== "/login" && !store.state.token) {
    next("/login"); //跳转登录
    NProgress.done(); // 结束Progress
  }
  next();
});
router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

export default router;
