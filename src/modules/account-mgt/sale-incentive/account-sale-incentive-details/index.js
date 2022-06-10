import router from '@/router'

router.addRoute('saAccountMgt', {
  name: 'AccountSaleIncentiveDetail',
  path: '/hotel/sadmin/account-sale-incentive-detail',
  component: () => import('./View.vue')
})
