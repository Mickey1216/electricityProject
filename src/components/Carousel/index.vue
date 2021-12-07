<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel,index) in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
//引入swiper
import Swiper from "swiper";
export default {
  name: "Carousel",
  props:['list'],
  watch: {
    list: {
      immediate:true, //立即监听：不管数据有没有变化，上来立即监听一次。
      //如果执行handler方法，代表组件实例身上这个属性的属性值已经有了
      handler(newValue, lodValue) {
        //$nextTick:在下次DOM更新 循环结束之后 执行延迟回调。 在 修改数据之后，立即使用这个方法，获取更新后的DOM。
        this.$nextTick(() => {
          //当执行这个回调的时候，保证服务器数据回来了，v-for执行完毕了，所以轮播图的结构一定有了。
          let mySwiper = new Swiper(this.$refs.cur, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable:true //点击小球的时候也能切换图片
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            }
          });
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
</style>