<template>
  <div id="cart">
    <nav-bar class="nav-bar"><div slot="center">购物车({{length}})</div></nav-bar>
    <cart-list class="cart-list" ></cart-list>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import BottomBar from './childComps/BottomBar'
  
  import { mapGetters } from 'vuex'

	export default {
		name: "Cart",
    components: {
		  NavBar,
      CartList,
      BottomBar,
    },
    computed: {
		  // cartList() {
		  //   // return this.$store.getters.cartList
      //   return this.$store.state.cartList.length
      // },
      // cartCount() {
		  //   // return this.$store.getters.cartCount
      //   return this.$store.state.cartList.length
      // }

      // 用getter方法简化上面两种写法
    // carLength(){
    //   return this.$store.getters.carLength   有种简便的方法
    // },
      
    // ...mapGetters(['carLength','cartList'])  下面一种是对象写法

    ...mapGetters(
      {
        length:'cartLength',
      }
    )
    }
	}
</script>

<style scoped>
  #cart {
    /*position: relative;*/
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: rgb(255, 255, 255);
  }

  /* .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  } */
</style>
