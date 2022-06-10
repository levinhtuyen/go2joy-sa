import router from '@/router'

router.addRoute('user', {
  name: 'firstBookingDetails',
  path: '/hotel/sadmin/booking-details/:sn',
  component: () => import('./View.vue')
})
