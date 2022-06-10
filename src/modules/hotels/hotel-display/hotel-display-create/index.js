import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/hotel-display-create',
  name: 'hotelDisplayCreate',
  component: () => import('./View.vue')
})
