import router from '@/router'

router.addRoute('mileagePointMgt', {
  name: 'mpBoostingMgt',
  path: '/hotel/sadmin/mp-boosting-mgt',
  component: () => import('./View.vue')
})
