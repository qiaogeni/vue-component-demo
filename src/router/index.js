import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      children: [
        {
          path: 'extend/chart-list',
          component: () => import('@/pages/chart/chart-list')
        }
      ]
    }
  ]
})
