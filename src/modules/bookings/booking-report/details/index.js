import router from '@/router'

router.addRoute('booking', {
  name: 'bookingReportDetails',
  path: '/hotel/sadmin/booking-report-details/:sn',
  component: () => import('./View.vue')
})
