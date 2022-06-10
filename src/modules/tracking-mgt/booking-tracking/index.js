import router from '@/router'

router.addRoute({
  path: '/hotel/sadmin/booking-tracking-mgt',
  name: 'bookingTrackingMgt',
  component: () => import('./View.vue')
})
