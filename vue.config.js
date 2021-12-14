module.exports = {
    //打包后，不保留.map文件
    productionSourceMap:false,
    //关闭eslint
    lintOnSave:false,
    //代理跨域
    devServer:{
        proxy:{
            '/api':{
                target:'http://39.98.123.211'
            }
        }
    }

}