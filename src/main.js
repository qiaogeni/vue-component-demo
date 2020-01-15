// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueCookie from 'vue-cookie'
import http from '@/assets/js/service/http.js'
import util from '@/components/index.js'
import '@/assets/css/index.less'
import { Loading, Cascader } from 'element-ui'
import Echarts from 'echarts'

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(VueCookie)
Vue.use(util)
Vue.use(Loading.directive)
Vue.use(Cascader)

Vue.prototype.$http = http
Vue.prototype.$echarts = Echarts
Vue.prototype.$loading = Loading.service

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    menus: []
  },
  router,
  components: { App },
  template: '<App/>',
  mounted() {
    // 获取用户权限菜单
    // this.$http.send('auth', {}, 'get').then(res => {
    //   if (res.result === null) {
    //     this.$router.push('/')
    //   }
    //   this.menus = res.result || []
    // })

    this.menus = [{
      name: 'extend',
      title: '扩展',
      childMenus: [
        {
          name: 'chart-list',
          title: '图表',
          address: 'extend/chart-list'
        }
      ]
    }]
  }
})
