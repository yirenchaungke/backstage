import Vue from 'vue'
import App from './App'
import router from './router'
//导入MyBread是组件选项所在的对象{template:'',等...}
import MyBread from '@/components/cuscom/myBread'
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
//处理日期
import moment from "moment"
Vue.filter('fmdate', (v) => {
    return moment(v).format('YYYY-MM-DD')
})
Vue.config.productionTip = false
    //全局引入自定义组件
Vue.component('my-bread', MyBread)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})