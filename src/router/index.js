//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
//引入仓库
import store from '../store'

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
let router = new VueRouter({
    //配置路由
    routes,
    //滚动行为
    scrollBehavior(to,from,savedPosition){
        return {y:0} //返回的y代表垂直方向离最上方距离
    }
})

//全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to,from,next)=>{
    //to:可以获取到你要跳转到的那个的路由信息；form:可以获取到你从哪个路由而来的信息;next:放行函数
    //next的写法：next()--直接方行；next(path)--放行到指定的路由；next(false)
    
    //用户登录之后才有token
    let token = store.state.user.token
    //用户信息
    let name = store.state.user.userInfo.name
    if(token){ //用户已经登录
        if(to.path === '/login'){ //不能再去login【停留在home】
            next('/')
        }else{ //去的不是login
            if(name){
                next()
            }else{ //没有用户信息，则派发action，让仓库存储用户信息后再进行路由跳转
              try {
                await store.dispatch('getUserInfo')
                next()
              } catch (error) { //token失效了，获取不到用户信息，需要重新登录
                //清除token
                await store.dispatch('userLogout')
                next('/login')
              }
            }
        }
    }else{ //用户未登录
        next()
    }
})

export default router
