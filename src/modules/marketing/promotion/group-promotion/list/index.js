import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/group-promotion',
  name: 'groupPromotion',
  component: () => import('./View.vue')
})
