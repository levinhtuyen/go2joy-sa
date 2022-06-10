import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/promotion-create',
  name: 'createPromotion',
  component: () => import('./View.vue')
})
