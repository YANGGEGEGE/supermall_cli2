import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types'
export default {
    [ADD_COUNTER](state, payload) {
        payload.count++   //因为这里定义的count 本来就是属于payload里的东西
    },
    [ADD_TO_CART](state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    }
}