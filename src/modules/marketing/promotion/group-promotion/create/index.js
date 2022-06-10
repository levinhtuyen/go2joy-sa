import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/group-promotion-create',
  name: 'createGroupPromotion',
  component: () => import('./View.vue')
})
