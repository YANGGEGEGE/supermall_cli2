<template>
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad"/>
        </a>
        
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    data(){
      return{
        isLoad:false
      }
    },
    methods:{
      imageLoad(){
        // console.log("homeSwiper");这里轮播图有四张图片,加载4次，但只需加载一次，用一个flag就行了，在data()放isLoad属性
        if(!this.isLoad){
          this.$emit("swiperImageLoad")
          this.isLoad =true
        }
      }
    },
  }
</script>

<style scoped>

</style>
