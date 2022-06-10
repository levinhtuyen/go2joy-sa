import router from '@/router'

router.addRoute('booking', {
  name: 'cashFlowReportDetail',
  path: '/hotel/sadmin/cash-flow-report/detail/:sn/:deviceType/:startDate/:endDate',
  component: () => import('./View.vue')
})
