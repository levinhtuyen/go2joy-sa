import router from '@/router'

router.addRoute('mileagePointMgt', {
  name: 'mpBoostingDetails',
  path: '/hotel/sadmin/mp-boosting-details/:sn',
  component: () => import('./View.vue')
})
