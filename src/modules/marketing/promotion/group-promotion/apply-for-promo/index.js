import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/promotion-apply/:sn?',
  name: 'applyForPromotion',
  component: () => import('./View.vue')
})
