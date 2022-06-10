import router from '@/router'

router.addRoute('booking', {
  name: 'bookingReportHotels',
  path: '/hotel/sadmin/booking-report-hotels',
  component: () => import('./View.vue')
})
