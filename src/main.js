import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import './assets/scss/index.scss'
import 'swiper/css/swiper.css'
// 全局引入UI库 vant
import '@/plugins/vant'

fastclick.attach(document.body)

Vue.use(VueLazyload, {
    preLoad: 1,
    error: require('./assets/img/error.png'),
    loading: require('./assets/img/loading.gif'),
    attempt: 1
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
