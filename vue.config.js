const path = require('path');
const copyWebpackPlugin = require("copy-webpack-plugin")
module.exports = {
    publicPath: '/LookLook/',
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        plugins: [
            new copyWebpackPlugin([{
                from: __dirname + '/src/assets',    //要打包的静态资源目录地址，这里的__dirname是指项目目录下，是node的一种语法，可以直接定位到本机的项目目录中
                to: './assets'  //要打包到的文件夹路径，跟随output配置中的目录。所以不需要再自己加__dirname
            }])
        ]
    }
}