const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer : {
    webSocketServer: false, //사용하지 않게 변경
  }
})
