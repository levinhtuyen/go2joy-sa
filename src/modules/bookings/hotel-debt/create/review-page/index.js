import router from '@/router'

router.addRoute('booking', {
  name: 'hotelDebtReview',
  path: '/hotel/sadmin/hotel-debt-review',
  component: () => import('./View.vue')
})
