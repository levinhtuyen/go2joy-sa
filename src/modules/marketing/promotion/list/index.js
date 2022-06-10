import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/promotion',
  name: 'promotion',
  component: () => import('./View.vue')
})
