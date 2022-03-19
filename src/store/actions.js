import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types'
export default {
    addCart(context, payload) {   //这里的context 也可以被{state,commit}代替，这叫对象的解构
        //返回一个promise告诉detail.vue 里的dispatch
        return new Promise((resolve, reject) => {
                    // state.cartList.push(payload)
        let oldProduct = null;
        for (let item of context.state.cartList) {
            if (item.iid === payload.iid) {
                oldProduct = item;
            }
        }
        if (oldProduct) {
            // oldProduct.count += 1   //一开始oldProduct肯定是为空的，所以执行else语句
            //用下面这叫替换了上面的
            context.commit(ADD_COUNTER, oldProduct)
            resolve('当前商品数量+1')
        } else {
            payload.count = 1
            // context.state.cartList.push(payload)
            context.commit(ADD_TO_CART, payload)
            resolve('添加了新的商品')
        }
        })
    }
}