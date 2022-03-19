<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"      
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />

      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 要监听原生事件点击，加.native -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView.vue";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";
//下面用括号的原因是没有用default 导出
import { getHomeMultidata, getHomeGoods } from "network/home";
import { Swiper, SwiperItem } from "components/common/swiper";
import { itemListenerMixin } from "common/mixin";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,

    Swiper,
    SwiperItem,
    BackTop,
    Scroll,
    GoodsList,
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    // 1.请求多个数据 下面的变量是局部变量，调用函数时就释放了，所以得保存到data()中
    this.getHomeMultidata(); //要加this不然调用不到下面methods里面的函数
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //将itemImgListener
    // this.$bus.$on("itemImageLoad", this.itemImgListener); 这些代码都mixin了
    // debounce(this.$refs.scroll.refresh,500)  //传入函数不加（）
    // this.$refs.scroll.refresh();
    //之所以在这里调用refresh（）的原因是因为在home.vue created时，scroll对象还没mounted上去
  },
  activated() {
    // console.log("activated");
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // console.log("deactivated");
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log(this.saveY);
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    //防抖动函数
    debounce(func, delay) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer); //有timer就清除，直到第31次没timer
        timer = setTimeout(() => {
          //在delay过程中，第二次就到了，重新有timer指向setTimeout创建好的定时器，一直到31次创建后
          func.apply(this, args); //第31次执行传入来的refresh函数
        }, delay);
      };
    },
    // 事件点击相关
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      // console.log(this.$refs.scroll.message);
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },

    contentScroll(position) {
      // if(position.y<1000){
      //   isShowBackTop = false
      // }else{
      //   isShowBackTop = true
      // }
      // console.log(position);
      this.isShowBackTop = -position.y > 1000;

      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      console.log("加载更多");
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.scroll.refresh();
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    //网络请求相关
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;     fixed 意味着脱标，下面的元素会顶上来，之前脱标是为了在滚动的时候不被顶上去，但是现在交给了better-scroll管理了，所以还是不要fixed好*/
}

/* .content {
      overflow: hidden;

      position: absolute;
      top: 44px;
      bottom: 49px;
      left: 0;
      right: 0;
    } */
.content {
  /* height: calc(100% -93px); 不知道为什么这个属性值无效 */
  /* height: 475px; */
  /* height: 400px; */
  /* overflow: hidden; */
  /* background-color: rgb(255, 255, 255); */
  top: 44px;
  bottom: 49px;
  position: absolute;
  overflow: hidden;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>
