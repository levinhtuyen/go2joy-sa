import router from '@/router'

router.addRoute('marketing', {
  name: 'articleHome',
  path: '/hotel/sadmin/article-home',
  component: () => import('./View.vue')
})
