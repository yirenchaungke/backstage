import Vue from 'vue'
import App from './App'
import router from './router'
//引入饿啦么插件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
//引入axios插件
import axios from 'axios'
Vue.prototype.$http = axios;
//引入时间函数

//引入css公共样式
import './assets/css/reset.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
