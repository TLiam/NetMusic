const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// vant 按需引入组件
// const { VantResolver } = require('unplugin-vue-components/resolvers');
// const ComponentsPlugin = require('unplugin-vue-components/webpack');

// module.exports = {
//   configureWebpack: {
//     plugins: [
//       ComponentsPlugin({
//         resolvers: [VantResolver()],
//       }),
//     ],
//   },
// };
