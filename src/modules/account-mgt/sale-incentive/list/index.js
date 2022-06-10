import router from '@/router'

router.addRoute('saAccountMgt', {
  name: 'SaleIncentiveHistory',
  path: '/hotel/sadmin/sale-incentive-history',
  component: () => import('./View.vue')
})
