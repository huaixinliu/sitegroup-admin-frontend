import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from './libs/util';
import env from '../build/env';
import Cookies from 'js-cookie';

Vue.use(VueI18n);
Vue.use(iView);

let domain = 'salesman.cc';

const ajaxUrl = env === 'development'
    // ? 'http://local.sitegroup.com/index.php/'
    ? 'http://bn.sjy/index.php/'
    : env === 'production'
        ? 'http://api.' + domain + '/index.php/'
        : 'http://debugapi.' + domain + '/index.php/';

window.HOST = ajaxUrl;
window.axios = require('axios');
window.axios.defaults.baseURL = ajaxUrl;
// 请求超时时间
window.axios.defaults.timeout = 1000 * 15;
// 默认返回值json
window.axios.defaults.headers['Content-Type'] = 'application/json';
// 实现跨域操作
window.axios.defaults.withCredentials = true;
window.Cookies = Cookies;

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
        this.$store.commit('initCachepage');
        // iview-admin检查更新
        // util.checkUpdate(this);
    },
    created () {
    }
});
