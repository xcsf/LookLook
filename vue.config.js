var path = require('path');
module.exports = {
    publicPath: '/LookLook/',
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        }
    }
}