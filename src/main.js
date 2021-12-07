import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from './router'
//三级联动组件--全局组件
import TypeNav from './components/TypeNav'
//轮播图组件--全局组件
import Carousel from './components/Carousel'
//分页组件--全局组件
import Pagination from './components/Pagination'
//第一个参数：全局组件的名字，第二个参数：组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
//引入仓库
import store from './store'
//引入mockServe.js
import './mock/mockServe'
//引入swiper样式
import 'swiper/css/swiper.css'

new Vue({
  render: h => h(App),
  //全局事件总线$bus的配置
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  //注册路由，当这里书写router的时候，组件身上都拥有$router,$route属性
  router,
  //注册仓库，组件实例的身上会多一个$store属性
  store
}).$mount('#app')
