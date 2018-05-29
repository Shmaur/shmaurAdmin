// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import '@/assets/mains.scss'
import VueResource from 'vue-resource'


axios.defaults.headers.common['Authorization'] = "application/json";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use(function(config) {
    //在请求发送之前做一些事
    //console.log(url)
    console.log('被拦截')
    return config;
}, function(error) {
    //当出现请求错误是做一些事
    return Promise.reject(error);
});

//引入editor插件
import vueEditor from 'vue-quill-editor'

//在vue中使用富文本
Vue.use(VueResource)
Vue.use(axios)

Vue.use(vueEditor)
Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})