import router from '@/router'

router.addRoute('marketing', {
  name: 'article',
  path: '/hotel/sadmin/article',
  component: () => import('./View.vue')
})
