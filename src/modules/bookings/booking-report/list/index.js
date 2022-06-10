import router from '@/router'

router.addRoute('booking', {
  name: 'bookingReport',
  path: '/hotel/sadmin/booking-report',
  component: () => import('./View.vue')
})
