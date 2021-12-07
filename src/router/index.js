//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
//使用插件
Vue.use(VueRouter)

//先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
//重写push|replace方法 -- 解决抛出NavigationDuppicated的警告错误
/**
 * @location:告诉原来push方法，往哪里跳转（传递哪些参数）
 * @resolve:成功回调
 * @reject:失败回调
 */
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}

//配置路由
export default new VueRouter({
    //配置路由
    routes,
    //滚动行为
    scrollBehavior(to,from,savedPosition){
        return {y:0} //返回的y代表垂直方向离最上方距离
    }
})
