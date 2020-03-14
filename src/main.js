// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import http from 'axios'
import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
// import '@/assets/common.scss'
import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.http = http
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
