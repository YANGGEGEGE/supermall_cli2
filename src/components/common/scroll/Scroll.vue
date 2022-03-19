<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {     //这里用驼峰所有传进来绑定的是 :probe-type
        type: Number,
        default: 0   //不是所有用better-scroll的都要进行实时监听的，需要监听的时候传入相应的值进行监听
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null, //这是指向scroll的对象
        message: '哈哈哈'
      }
    },
    mounted() {
      // 1.创建BScroll对象  
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      // 2.监听滚动的位置
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll', position)
      })

      // 3.监听上拉事件
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)   
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh(){
        console.log("----");
       this.scroll && this.scroll.refresh()  //有scroll对象才执行refresh（）
      },
      getScrollY(){
        return this.scroll?this.scroll.y : 0 
      }
    }
  }
</script>

<style scoped>

</style>
