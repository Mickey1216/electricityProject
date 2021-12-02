<template>
  <div class="app">
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home、Search显示，在Login、Register隐藏（利用meta属性） -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
//引入
import Header from "./components/Header"
import Footer from "./components/Footer"
export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  mounted(){
    //派发一个action，获取商品分类的三级列表的数据
    this.$store.dispatch("categoryList");
  }
};
</script>

<style scoped>
</style>
