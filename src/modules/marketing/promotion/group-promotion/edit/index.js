import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/group-promotion-edit/:sn',
  name: 'editGroupPromotion',
  component: () => import('./View.vue')
})
