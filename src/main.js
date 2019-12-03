import Vue from 'vue'
import App from './App.vue'
import routes from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
Vue.use(VueRouter);
Vue.use(ElementUI);
const router = new VueRouter({
    routes
})
Vue.config.productionTip = false
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
