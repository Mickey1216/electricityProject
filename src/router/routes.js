//路由配置的信息
//引入一级路由组件--使用路由懒加载的方式--好处：将不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应的组件，这样更高效。
const Home = ()=> import('../pages/Home')
const Search = ()=> import('../pages/Search')
const Login = ()=> import('../pages/Login')
const Register = ()=> import('../pages/Register')
const Detail = ()=> import('../pages/Detail')
const AddCartSuccess = ()=> import('../pages/AddCartSuccess')
const ShopCart = ()=> import('../pages/ShopCart')
const Trade = ()=> import('../pages/Trade')
const Pay = ()=> import('../pages/Pay')
const PaySuccess = ()=> import('../pages/PaySuccess')
const Center = ()=> import('../pages/Center')
//引入二级路由组件
const MyOrder = ()=> import('../pages/Center/myOrder')
const GroupOrder = ()=> import('../pages/Center/groupOrder')

export default [
    {
        path:"/center",
        component:Center,
        meta:{show:true},
        children:[
            {
                path:'myorder',
                component:MyOrder
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {
        path:"/paysuccess",
        component:PaySuccess,
        meta:{show:true}
    },
    {
        path:"/pay",
        component:Pay,
        meta:{show:true},
        //路由独享守卫（用的多）
        beforeEnter:(to,form,next)=>{
            if(form.path === '/trade'){ //去支付页面，必须是从交易而来
                next()
            }else{ //从其它路由组件来的，停留在当前
                next(false)
            }
        }
    },
    {
        path:"/trade",
        component:Trade,
        meta:{show:true},
        //路由独享守卫
        beforeEnter:(to,form,next)=>{
            if(form.path === '/shopcart'){ //去交易页面，必须是从购物车而来
                next()
            }else{ //从其它路由组件来的，停留在当前
                next(false)
            }
        }
    },
    {
        path:"/shopcart",
        component:ShopCart,
        meta:{show:true}
    },
    {
        path:"/addcartsuccess",
        name:'addcartsuccess',
        component:AddCartSuccess,
        meta:{show:true}
    },
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