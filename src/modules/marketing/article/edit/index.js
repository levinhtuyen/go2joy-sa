import router from '@/router'

router.addRoute('marketing', {
  name: 'articleEdit',
  path: '/hotel/sadmin/article-editing/:sn',
  component: () => import('./View.vue')
})
