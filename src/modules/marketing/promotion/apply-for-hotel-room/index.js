import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/apply-for-hotel-room/:promotionSn/:couponSn',
  name: 'applyForHotelRoom',
  component: () => import('./View.vue')
})
