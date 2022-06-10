import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/hotel-display-details/:sn',
  name: 'hotelDisplayDetails',
  component: () => import('./View.vue')
})
