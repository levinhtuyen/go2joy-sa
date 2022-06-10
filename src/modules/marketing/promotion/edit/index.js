import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/promotion-edit/:promotionSn',
  name: 'editPromotion',
  component: () => import('./View.vue')
})
