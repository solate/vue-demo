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
