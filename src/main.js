import Vue from 'vue'
import FastClick from 'fastclick'    //上两个用命令行装好了，下面的在各自文件中安装如router

import App from './App'
import router from './router'    
import store from './store' 
import toast from 'components/common/toast'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()   //一开始$bus是个空的,得给$bus赋值一个vue实例

//安装toast插件  
Vue.use(toast)

//使用fastclick
FastClick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
    render: h => h(App)
})
