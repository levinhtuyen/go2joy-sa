import router from '@/router'

router.addRoute('mileagePointMgt', {
  name: 'mpListHotelBoostingMgt',
  path: '/hotel/sadmin/list-hotel-boosting-mgt/:sn',
  component: () => import('./View.vue')
})
