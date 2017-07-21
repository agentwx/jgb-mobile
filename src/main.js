import Vue from 'vue'
import VueResource from 'vue-resource'
import router from './router'
import store from './store'
import filters from './filters'
import * as App from './App'

// 使用插件
Vue.use(VueResource);

// 加载过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

// AJAX 配置
Vue.http.interceptors.push((req, next) => {
    $.showLoading('加载中');
    next((resp) => {
        $.hideLoading();
        setTimeout(function () {
            $('.weui_loading_toast').remove();
        }, 300);
    })
});

// 启动应用
const app = new Vue({
    router,
    store,
    ...App
}).$mount('app');
