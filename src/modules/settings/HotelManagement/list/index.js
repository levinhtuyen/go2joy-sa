import router from '@/router'

router.addRoute('settings', {
  name: 'hotelOnTop',
  path: '/hotel/sadmin/hotel-on-top-management',
  component: () => import('./View.vue')
})
