import router from '@/router'

router.addRoute('saAccountMgt', {
  name: 'SaleIncentiveHistoryDetails',
  path: '/hotel/sadmin/sale-incentive-history-details/:sn',
  component: () => import('./View.vue')
})
