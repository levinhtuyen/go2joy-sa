import router from '@/router'

router.addRoute('booking', {
  name: 'hotelDebtEdit',
  path: '/hotel/sadmin/hotel-debt-edit/:sn',
  component: () => import('./View.vue')
})
