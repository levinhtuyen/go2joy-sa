import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/hotel-apply/:sn',
  name: 'hotelApply',
  component: () => import('./View.vue')
})
