import router from '@/router'

router.addRoute({
  path: '/hotel/sadmin/dashboard-details/:sn',
  name: 'categoryDetails',
  component: () => import('./View.vue')
})
