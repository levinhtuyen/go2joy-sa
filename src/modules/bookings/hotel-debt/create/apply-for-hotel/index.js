import router from '@/router'

router.addRoute('booking', {
  name: 'ApplyForHotel',
  path: '/hotel/sadmin/apply-for-hotel',
  component: () => import('./View.vue')
})
