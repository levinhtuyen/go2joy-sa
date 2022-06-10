import router from '@/router'

router.addRoute('mileagePointMgt', {
  name: 'mpBoostingCreate',
  path: '/hotel/sadmin/mp-boosting-create',
  component: () => import('./View.vue')
})
