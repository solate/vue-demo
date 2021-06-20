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
