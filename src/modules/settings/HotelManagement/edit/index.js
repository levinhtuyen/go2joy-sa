import router from '@/router'

router.addRoute('settings', {
  name: 'hotelOnTopEdit',
  path: '/hotel/sadmin/hotel-on-top-edit/:sn',
  component: () => import('./View.vue')
})
