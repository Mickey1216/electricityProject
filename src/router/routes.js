//路由配置的信息
//引入路由组件
import Home from '../pages/Home'
import Search from '../pages/Search'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Detail from '../pages/Detail'
export default [
    {
        path:"/detail/:skuId",
        component:Detail,
        meta:{show:true}
    },
    {
        path:"/home",
        component:Home,
        meta:{show:true}
    },
    {
        path:"/search/:keyword?",
        component:Search,
        meta:{show:true},
        name:"search"
    },
    {
        path:"/login",
        component:Login,
        meta:{show:false}
    },
    {
        path:"/register",
        component:Register,
        meta:{show:false}
    },
    //重定向，在项目跑起来时，访问/，立马让他重定向到首页
    {
        path:"*",
        redirect:"/home"
    }

]