import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/coupon-dondition/:promotionSn/:couponSn',
  name: 'couponCondition',
  component: () => import('./View.vue')
})
