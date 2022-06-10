import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/apply-for-hotel/:couponSn/:promotionSn',
  name: 'applyForHotel',
  component: () => import('./View.vue')
})
