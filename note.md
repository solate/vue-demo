# vue3+element-plus+router+vuex+axios 从零开始搭建 (1)

因为需要一个后端管理系统的界面，所以学习从0开始搭建一个前端框架便于后续使用.

这一章主要是版本选择和基础安装功能。

## 安装步骤

### 下载

1.下载node,

```
brew install node

➜  ~ node -v
v14.17.0
➜  ~ npm -v
6.14.13
```

2.安装vue-cli,

[vue-cli](https://cli.vuejs.org/zh/guide/installation.html)

```
npm install -g @vue/cli
```
如果太慢需要使用`cnpm`安装, 使用下面的命令安装cnpm

```
npm install -g cnpm -registry=https://registry.npm.taobao.org
```
版本信息
```
➜  ~ vue --version
@vue/cli 4.5.13
```

### vue项目创建

1.创建一个vue项目

```
vue create dashboard
```

选择自定义模式

```
Vue CLI v4.5.13
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, Router, Vuex, CSS Pre-processors, Linter
? Choose a version of Vue.js that you want to start the project with 3.x
? Use history mode for router? (Requires proper server setup for index fallbackin production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Stylus
? Pick a linter / formatter config: Prettier
? Pick additional lint features: Lint on save
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? (y/N)

```

运行：

```
cd dashboard
npm run serve
```
vue 项目第一步就搭建完成了


### element-plus

element-plus 是针对vue3的前端组件, 这里和2.x有些区别

```
npm install element-plus --save
```

[快速上手](https://element-plus.gitee.io/#/zh-CN/component/quickstart)

需要vue-cli@4.5。

在 main.js 中写入以下内容：

```bigquery
import { createApp } from "vue";
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')

```

在 `HelloWorld.vue`中添加一个按钮

```
  <div class="hello">
    <el-button>默认按钮</el-button>
    ....其他代码
  </div>
```

## 其他

### 修复问题

安装element-plus的时候提示有错误， 执行就修复好了

```
npm audit fix --force
```

### 开发环境与线上环境配置

下面是vue cli 配置模式和环境变量： [模式和环境变量](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F)

vue-cli 3.0x与vue-cli 2.0x最主要的区别是项目结构目录精简化，这也带来了许多问题，很多配置需要自己配置，

由于2.0x版本中直接在config/文件夹下面配置开发环境与线上环境，3.0x则需要自己配置。

首先配置开发环境，在项目根目录下新建三个文件，如果有测试环境还可以再加一个。

属性名必须以VUE_APP_开头，比如VUE_APP_XXX
只有以 `VUE_APP_` 开头的变量会被 `webpack.DefinePlugin` 静态嵌入到客户端侧的包中，
`NODE_ENV` 和 `BASE_URL` 是两个特殊变量，在代码中始终可用

[vue3.0 .env 文件配置全局环境变量](https://www.jianshu.com/p/61322531645e)

在根目录下创建以下文件

```
.env	全局默认，任何环境都加载合并	
.env.development	开发环境下的配置文件	
.env.production	    生产环境下的配置文件	
```
.env.development 内容写
```
NODE_ENV="development"              //开发环境
BASE_URL="http://localhost:3000/"   //开发环境接口地址
```
.env.production 线上环境

```
NODE_ENV="production"  //生产环境
BASE_URL="url"         //生产环境的地址
```
现在我们如何在项目中判断当前环境呢？
我们可以根据process.env.BASE_URL来获取它是线上环境还是开发环境，下一章中会有运用

```
  if(process.env.NODE_ENV='development'){
    console.log( process.env.BASE_URL) // http://localhost:3000/
  }else{
    console.log( process.env.BASE_URL) // url
  }
```

#### 只在本地有效的变量

有的时候你可能有一些不应该提交到代码仓库中的变量，尤其是当你的项目托管在公共仓库时。
这种情况下你应该使用一个 `.env.local` 文件取而代之。本地环境文件默认会被忽略，且出现在 `.gitignore` 中。

`.local` 也可以加在指定模式的环境文件上，比如 `.env.development.local` 将会在 development 模式下被载入，且被 git 忽略。

### vue.config.js配置

2.x里面webpack相关的配置项直接在项目的build/webpack.base.conf.js里面配置，而3.x完全在vue.config.js中配置

#### 创建vue.config.js

vue.config.js 是一个可选的配置文件，如果项目的 (和 package.json 同级的) 根目录中存在这个文件，那么它会被 @vue/cli-service 自动加载。

由于项目初始化的时候没有vue.config.js配置文件，因此我们需要在项目根目录下新建一个vue.config.js配置项。

配置具体参数可以参考： [配置参考](https://cli.vuejs.org/zh/config/#%E5%85%A8%E5%B1%80-cli-%E9%85%8D%E7%BD%AE)

这个项目主要是配置三个东西，第一个就是目录别名alias，另一个是项目启动时自动打开浏览器，最后一个就是处理css。

[webpack 相关](https://cli.vuejs.org/zh/guide/webpack.html)


```
const path = require("path");
const resolve = dir => path.join(__dirname, dir);
module.exports = {
    chainWebpack: config => {
        //设置别名
        config.resolve.alias
            .set('@',resolve('src'))
    },
    devServer: {
        open:true  //打开浏览器窗口
    },
    css: {
        loaderOptions: {
            css: {
                // 这里的选项会传递给 css-loader
            },
        }
    }
}
```

### vuex

使用vuex管理全局状态, [Vuex 是什么](https://vuex.vuejs.org/zh/)

现在在store文件夹下面新建四个文件`state.js`, `mutations.js`, `getters.js`, `actions.js`

#### state.js

state就是Vuex中的公共的状态, 我是将state看作是所有组件的data, 用于保存所有组件的公共数据.

```
const state = {
    token: '',//权限验证
    tagsList: [], //打开的标签页个数,
    isCollapse: false, //侧边导航是否折叠
}
export default state; //导出
```

#### mutations.js

mutations对象中保存着更改数据的回调函数, 改变state的值必须经过mutations

```
const mutations = {
    //保存token
    COMMIT_TOKEN(state, object) {
        state.token = object.token;
    },
    //保存标签
    TAGES_LIST(state, arr) {
        state.tagsList = arr;
    },
    IS_COLLAPSE(state, bool) {
        state.isCollapse = bool;
    }
}
export default mutations;
```

#### getters.js

我将getters属性理解为所有组件的computed属性,也就是计算属性。vuex的官方文档也是说到可以将getter理解为store的计算属性,
getters的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

```
const getters={
    //你要计算的属性
}
export default getters;
```


#### actions.js

actions 类似于 mutations，不同在于：

1. actions提交的是mutations而不是直接变更状态
2. actions中可以包含异步操作, mutations中绝对不允许出现异步
3. actions中的回调函数的第一个参数是context, 是一个与store实例具有相同属性和方法的对象

```
const actions={

}
export default actions;
```

#### index.js (store.js)

初始化任务时如果选择了vuex, 那么就会有index.js,

store.js是vuex模块整合文件,由于刷新页面会造成vuex数据丢失，

这里引入了一个vuex数据持久话插件，将state里面的数据保存到localstorage。 安装vuex-persistedstate, (这个我没装暂时不需要，有需要的可以装)

```
npm install vuex-persistedstate --save
```

```
import { createStore } from "vuex";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {},
});

```


### vue-router 路由

在安装时选择了Router组件后在main.js里会有自动有router, 详细main.js查看上一篇

然后进入`router/index.js`文件中

1. 引入文件

这里添加状态管理和进度条组件

```bigquery
import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index"; //引入状态管理
import NProgress from "nprogress"; //引入进度条组件 cnpm install nprogress --save
import "nprogress/nprogress.css";
```
2.路由懒加载

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

[路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97)

```
/**
 *@parma {String} name 文件夹名称
 *@parma {String} component 视图组件名称
 */
const getComponent = (name, component) => () =>
  import(`@/views/${name}/${component}.vue`);

```

3.路由配置

```
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
```
4.本项目存在一个token，来验证权限问题，因此进入页面的时候需要判断是否存在token,如果不存在则跳转到登陆页面

```
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
```

5.导出路由

```
export default router;
```



### axios

1.接口处理我选择的是axios，由于它遵循promise规范，能很好的避免回调地狱。现在我们开始安装

```
cnpm install axios -S
```

2.在`src`目录下新建文件夹命名为`api`,里面新建两个文件，一个是`api.js`，用于接口的整合，
另一个是`request.js`,根据相关业务封装axios请求。


#### request.js

1.引入依赖

```
import axios from "axios";
import router from "@/router/index";
import store from "@/store/index"; //引入vuex
```
2.编写axios基本设置

```
axios.defaults.timeout = 60000; //设置接口超时时间
axios.defaults.baseURL = process.env.BASE_URL; //根据环境设置基础路径
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8"; //设置编码
```

3.编写请求拦截，也就是说在请求接口前要做的事情

```
/*
 *请求前拦截
 *用于处理需要请求前的操作
 */
axios.interceptors.request.use(
  (config) => {
    if (store.state.token) {
      config.headers["Authorization"] = "Bearer " + store.state.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

4.编写请求响应拦截，用于处理数据返回操作

```
/*
 *请求响应拦截
 *用于处理数据返回后的操作
 */
axios.interceptors.response.use(
  (response) => {
    return new Promise((resolve, reject) => {
      const res = response.data;
      if (res.errCode === 0) {
        resolve(res);
      } else {
        reject(res);
      }
    });
  },
  (error) => {
    console.log(error);
    //断网处理或者请求超时
    if (!error.response) {
      //请求超时
      if (error.message.includes("timeout")) {
        console.log("超时了");
        this.$message.error("请求超时，请检查互联网连接");
      } else {
        //断网，可以展示断网组件
        console.log("断网了");
        this.$message.error("请检查网络是否已连接");
      }
      return;
    }
    const status = error.response.status;
    switch (status) {
      case 500:
        this.$message.error("服务器内部错误");
        break;
      case 404:
        this.$message.error("未找到远程服务器");
        break;
      case 401:
        this.$message.warn("用户登陆过期，请重新登陆");
        localStorage.removeItem("token");
        setTimeout(() => {
          router.replace({
            path: "/login",
            query: {
              redirect: router.currentRoute.fullPath,
            },
          });
        }, 1000);
        break;
      case 400:
        this.$message.error("数据异常");
        break;
      default:
        this.$message.error(error.response.data.message);
    }
    return Promise.reject(error);
  }
);
```

5.请求相关的事情已经完成，现在开始封装get,post请求,


```
/*
 *get方法，对应get请求
 *@param {String} url [请求的url地址]
 *@param {Object} params [请求时候携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
/*
 *post方法，对应post请求
 *@param {String} url [请求的url地址]
 *@param {Object} params [请求时候携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

```

#### api.js

封装好axios的业务逻辑之后自然要开始，运用，首先引入get以及post方法，然后封装接口并导出

```
import { get, post } from "./request";

//登陆
export const login = (params) => post("/api/login", params);

//上传
export const upload = (upload) => get("/api/upload", upload);
```

那我们如何调用接口呢？以登陆页面为例。

```
import { login } from "@/api/api"; //引入login
```

```
    /**
    * @oarma {Object} login 接口传递的参数
    */
    login(this.postData)
        .then((res) => {
           //成功之后要做的事情
        })
        .catch((err) => {
            //出错时要做的事情
        });
```


### mockjs

有了接口以后需要模拟后台返回数据，这个时候就可以使用mock组件

1. 安装

[mockjs文档](https://github.com/nuysoft/Mock/wiki/Getting-Started)

```
# 安装
npm install mockjs
```

2. 在src目录下创建mock文件夹

[无侵入整合MockJS与Vue3.0实例](https://blog.csdn.net/AlistairCao/article/details/104992181)


#### utils

1. formatOptions.js

```
import qs from "qs";

export default function formatOptions(options) {
  let { url, type, body } = options;
  let params = null;
  if (type === "GET" || type === "DELETE") {
    let index = url.indexOf("?");
    let paramsString = index > -1 ? url.slice(index + 1) : "";
    if (paramsString !== "") {
      params = qs.parse(paramsString);
    }
  } else {
    params = {};
    if (body instanceof FormData) {
      for (let [key, value] of body.entries()) {
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      }
    } else {
      try {
        params = JSON.parse(body);
      } catch (e) {
        params = qs.parse(body);
      }
    }
  }
  if (params !== null && Object.keys(params).length === 0) {
    params = null;
  }
  return { url, type, params };
}

```

2. mock.js

```
import Mock from "mockjs";
import formatOptions from "./formatOptions";

Mock._mock = Mock.mock;
Mock.mock = function (url, method, resFunc) {
  if (arguments.length === 1) {
    return this._mock(url);
  }
  if (arguments.length === 2) {
    console.error(
      "Function Mock.mock require three params: url, method, resFunc!!!"
    );
    return;
  }
  if (arguments.length === 3) {
    let methods = ["get", "post", "put", "delete"];
    if (!methods.includes(method.toLowerCase())) {
      console.error(
        "Function Mock.mock's second param should be get, post, put, delete!!!"
      );
      return;
    }
    if (typeof resFunc !== "function") {
      console.error("Function Mock.mock's third param should be a function!!!");
      return;
    }
  }
  // 将注册的 url 转成能匹配查询字符串的正则
  if (typeof url === "string") {
    url = url.replace(/\//g, "\\/");
    url += "(|\\?.*)$";
    url = new RegExp(url);
  } else if (!(url instanceof RegExp)) {
    console.error(
      "Function Mock.mock's first param should be a string or regexp!!!"
    );
    return;
  }
  this._mock(url, method, function (options) {
    // 格式化 options 对象
    options = formatOptions(options);
    let res = null;
    try {
      res = resFunc(options);
    } catch (err) {
      res = err;
    }
    // 将返回的测试数据打印到控制台
    console.groupCollapsed(
      `%c${options.type.toLowerCase()} | ${options.url}`,
      "color: green;"
    );
    console.log("%cparams: ", "color: #38f");
    console.log(options.params);
    console.log("%cresponseData: ", "color: #38f");
    console.log(res);
    console.groupEnd();
    console.log("---------------");
    return res;
  });
};

export default Mock;

```

#### api

这里就可以和axios里的api对应起来

```
import Mock from "../utils/mock";

//注册

//登录
Mock.mock("/api/login", "post", (options) => {
  console.log(options);
  return {
    errCode: 0,
    data: {
      token: "token",
    },
    message: "token已发送: token",
  };
});

```

#### index.js

这里引入api

```
//引入Mock接口规则文件
import "./api/login.js";
```

#### 然后再main.js中使用

使用require引入，因为只有测试环境需要，那么就用上一节设置的环境变量判断是开发环境的时候引入。
```
//条件引入模拟服务器 MockJS优先级高于域名代理 会导致远程API无法访问
eval(process.env.NODE_ENV == "development") && require("@/mock");

```
在使用上一节的环境的时候注意要把注释删掉，不然取出来的值不是很正确。`.env.development`

```
NODE_ENV="development"
BASE_URL="http://localhost:3000/"
```

### views 实现

现在整体结构还没有设计，现在只是用来演示组件整体是正确的

1.main.js

```
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

```
2.App.vue

```
<template>
  <router-view />
</template>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>

```
3.home/index.vue

```
<template>
  <div>主页</div>
</template>

<script>
export default {
  name: "index",
};
</script>

<style scoped></style>

```
4.layout/layout.vue

```
<template>
  <div>
    样式模块
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "layout",
};
</script>

<style scoped></style>

```
5.login/index.vue

这里使用了axios, vuex的内容注意一下

```
<template>
  <div>
    <h3>登录页</h3>
    <el-form :model="postData" :rules="theRules" ref="loginForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="postData.username"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input
          type="password"
          v-model="postData.password"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">
          提交
        </el-button>
        <el-button @click="resetForm('loginForm')"> 重置 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "@/api/api"; //引入login
export default {
  name: "index",
  data: function () {
    return {
      postData: {
        password: "admin",
        username: "admin",
      },
      theRules: {},
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.postData)
            .then((res) => {
              //提交数据到vuex
              this.$store.commit("setToken", res);
              this.$message.success("登录成功");
              this.$router.push({
                path: "/home",
              });
            })
            .catch((err) => {
              this.$message("error", err.message);
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped></style>

```





## 参考

[使用 vue-cli 3 快速创建 Vue 项目及项目配置 Vue.config.js](https://blog.csdn.net/alice_124/article/details/81082230)

[从0到1搭建Element的后台框架](https://juejin.cn/post/6844903815209025544)

[vue-cli 3.0如何配置多种(2种以上)开发环境下的环境变量](https://segmentfault.com/a/1190000022910960)

[vue3.0 .env 文件配置全局环境变量](https://www.jianshu.com/p/61322531645e)





















