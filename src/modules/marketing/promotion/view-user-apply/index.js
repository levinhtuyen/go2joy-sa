import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/user-apply/:sn/:type',
  name: 'userApply',
  component: () => import('./View.vue')
})
