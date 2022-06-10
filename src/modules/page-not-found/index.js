
import router from '@/router'

router.addRoute({
  path: '*',
  name: 'page_not_found',
  component: () => import(/* webpackChunkName: "404" */ './View.vue')
})
