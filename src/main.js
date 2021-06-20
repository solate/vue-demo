import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//条件引入模拟服务器 MockJS优先级高于域名代理 会导致远程API无法访问
//小心,Boolean('false')等于true 'false'不等于false
eval(process.env.NODE_ENV == "development") && require("@/mock");

const app = createApp(App);
app.use(ElementPlus);
app.use(store);
app.use(router);
app.mount("#app");
