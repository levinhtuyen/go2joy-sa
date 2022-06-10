import router from '@/router'

router.addRoute('booking', {
  name: 'hotelDebt',
  path: '/hotel/sadmin/hotel-debt',
  component: () => import('./View.vue')
})
