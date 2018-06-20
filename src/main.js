// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ax from './lib/axios'
import service from './lib/service'
import ElementUI from 'element-ui'

Vue.config.productionTip = false

Vue.use(require('vue-cookies'))
Vue.use(ElementUI)
Vue.use(service)
Vue.prototype.$https = ax
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})