<template>
  <div class="cart-list">
    <!-- 这里的scroll是替换Scroll中slot -->
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="item in cartList"
        :key="item.iid"
        :item-info="item"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";
import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  // props: {
  //   cartList: {
  //     type: Array,
  //     default() {
  //       return []
  //     }
  //   }
  // },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated(){
    this.$refs.scroll.refresh()
  },
};
</script>

<style scoped>
.cart-list {
  /* 相对于父元素cart中的cart */
  height: calc(100% - 44px - 49px);
}
/* 下面的100%是相对是父元素cart-list */
.content {
  height:100%;
  overflow: hidden;
}
</style>
