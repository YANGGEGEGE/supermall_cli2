export default {
    cartList(state) {
        // return this.$store.getters.cartList
        return state.cartList
    },
    cartLength(state) {  //注意这里是要传个state参数进来的
        // return this.$store.getters.cartCount
        return state.cartList.length
    }
}