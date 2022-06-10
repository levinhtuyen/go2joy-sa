import Vue from 'vue'
import VueRouter from 'vue-router'
import { i18n } from './plugins/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    beforeEnter: (to, from, next) => {
      localStorage.getItem('access_token') ? next('/hotel/sadmin/dashboard') : next('/hotel/sadmin/login')
    }
  }
  // {
  //   path: '*',
  //   name: 'page_not_found',
  //   component: () => import(/* webpackChunkName: "404" */ '@/components/NotFoundPage.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

router.afterEach((to, from) => {
  if (to.name) {
    document.title = i18n.t(`breadcrumb.${to.name}`)
  }
})

export default router
