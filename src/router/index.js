import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { storageManager } from '../plugins/utils'
import config from '../config'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: 'jgb-web',
    linkActiveClass: 'active',
    routes: routes
});

// 进入路由前
router.beforeEach((to, from, next) => {
    // 重置滚动条
    window.scrollTo(0, 0);
    if (to.matched.some(record => record.meta.auth)) {
        if (storageManager.getItem(config.session.loginKey, false)) {
            next();
        } else {
            router.push({ name: 'index' });
        }
    } else {
        next();
    }
});

export default router;
