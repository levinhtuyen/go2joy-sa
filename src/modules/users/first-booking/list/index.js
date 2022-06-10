import router from '@/router'

router.addRoute('user', {
  name: 'firstBooking',
  path: '/hotel/sadmin/first-booking',
  component: () => import('./View.vue')
})
