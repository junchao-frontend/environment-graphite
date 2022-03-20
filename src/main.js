import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import http from '@/utils/http'
import 'element-ui/lib/theme-chalk/index.css'
import './style/_globel.scss'
import './style/_layout.scss'
import '@/icons/index.js'
import '@/assets/iconfont/iconfont.css'
import mixin from '@/mixin'
import menuComponent from '@/components/menuRecursion.vue'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.mixin(mixin)
Vue.prototype.$http = http
Vue.component(menuComponent.name, menuComponent)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
