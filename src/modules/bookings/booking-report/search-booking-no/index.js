import router from '@/router'

router.addRoute('booking', {
  name: 'searchByBookingNo',
  path: '/hotel/sadmin/search-by-booking-no',
  component: () => import('./View.vue')
})
