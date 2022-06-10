import router from '@/router'

router.addRoute('booking', {
  name: 'revenueReport',
  path: '/hotel/sadmin/revenue-report',
  component: () => import('./View.vue')
})
