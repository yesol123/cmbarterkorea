const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer : {
    webSocketServer: false, //사용하지 않게 변경
    // proxy : {
    //   '/' : {
    //     target : 'http://localhost:8080',
    //     changeOrigin : true,
    //     ws : true
    //   }
    // }
    // port: 8080,
    // liveReload: true,
    // host : 'localhost',
    // allowedHosts: "all",
    // open : true,
    // client : {
    //   // logging: 'log',
    //   overlay: true,
    //   webSocketURL: 'wss://192.168.50.156:80/ws' // Add this
    // },
    // compress : true
  }
})
