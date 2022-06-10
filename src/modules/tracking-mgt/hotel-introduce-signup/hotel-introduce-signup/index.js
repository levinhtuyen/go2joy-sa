import router from '@/router'
router.addRoute('tracking-mgt', {
  path: '/hotel/sadmin/hotel-introduce-signup',
  name: 'hotelIntroduceSignup',
  component: () => import('./View.vue')
})
