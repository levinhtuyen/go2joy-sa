import router from '@/router'

router.addRoute('booking', {
  name: 'cashFlowReport',
  path: '/hotel/sadmin/cash-flow-report',
  component: () => import('./View.vue')
})
