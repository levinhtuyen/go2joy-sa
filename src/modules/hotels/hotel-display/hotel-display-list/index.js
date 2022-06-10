import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/hotel-display',
  name: 'hotelDisplay',
  component: () => import('./View.vue')
})
