const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
  chainWebpack: (config) => {
    //设置别名
    config.resolve.alias.set("@", resolve("src"));
  },
  devServer: {
    open: true, //打开浏览器窗口
  },
  css: {
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
    },
  },
};
