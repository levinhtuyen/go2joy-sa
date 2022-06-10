import router from '@/router'

router.addRoute({
  path: '/hotel/sadmin/dashboard-edit/:sn',
  name: 'categoryEdit',
  component: () => import('./View.vue')
})
