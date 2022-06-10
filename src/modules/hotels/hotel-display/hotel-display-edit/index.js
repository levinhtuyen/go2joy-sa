import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/hotel-display-edit/:sn',
  name: 'hotelDisplayEdit',
  component: () => import('./View.vue')
})
