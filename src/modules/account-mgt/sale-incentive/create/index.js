import router from '@/router'

router.addRoute('saAccountMgt', {
  name: 'SaleIncentiveHistoryCreate',
  path: '/hotel/sadmin/sale-incentive-history-create',
  component: () => import('./View.vue')
})
