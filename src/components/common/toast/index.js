import Toast from './Toast'

const obj = {}
 
obj.install = function (Vue) {  //执行这个install函数时默认将Vue也传过来了
    // console.log("执行力install函数");

    //1创建组件构造器 继承了Toast和Vue的组件构造器然后通过new出来之后 添加到prototype
    const toastConstrustor = Vue.extend(Toast)
    const toast = new toastConstrustor()
    //将组件对象挂载到某个元素上去
    toast.$mount(document.createElement('div'))

   // toast.$el对应的就是上面的div  将div添加到body即可
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast;
}

export default obj