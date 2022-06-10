import router from '@/router'

router.addRoute('booking', {
  name: 'hotelDebtCreate',
  path: '/hotel/sadmin/hotel-debt-create',
  component: () => import('./View.vue')
})
