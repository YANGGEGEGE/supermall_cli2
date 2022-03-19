import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
    cartList:[]
}

const store = new Vuex.Store({
    // state: {
    //     cartList:[]
    // },
    // mutations: {
    //     // addCart(state, payload) {
    //     //     // state.cartList.push(payload)
    //     //     let oldProduct = null;
    //     //     for (let item of state.cartList) {
    //     //         if (item.iid === payload.iid) {
    //     //             oldProduct = item;
    //     //         }
    //     //     }
    //     //     if (oldProduct) {
    //     //         oldProduct.count += 1   //一开始oldProduct肯定是为空的，所以执行else语句
    //     //     } else {
    //     //         payload.count = 1
    //     //         state.cartList.push(payload)
    //     //     }
    //     // }
    //     //本来addCart函数是放在这里的，但是因为mutation里放的方法的功能要尽可能单一
    //     //这样就确保追踪时比较容易，不会因为不知道是添加新商品还是旧商品数目加一
    // },
    state,
    mutations,
    actions,
    getters,
    
    // actions: {
    //     addCart(context, payload) {   //这里的context 也可以被{state,commit}代替，这叫对象的解构
    //         // state.cartList.push(payload)
    //         let oldProduct = null;
    //         for (let item of context.state.cartList) {
    //             if (item.iid === payload.iid) {
    //                 oldProduct = item;
    //             }
    //         }
    //         if (oldProduct) {
    //             // oldProduct.count += 1   //一开始oldProduct肯定是为空的，所以执行else语句
    //             //用下面这叫替换了上面的
    //             context.commit('addCounter',oldProduct)
    //         } else {
    //             payload.count = 1
    //             // context.state.cartList.push(payload)
    //             context.commit('addToCart',payload)
    //         }
    //     }
    // },

}
)
//挂载到vue实例上去
export default store