import router from '@/router'

router.addRoute('user', {
  name: 'userDetails',
  path: '/hotel/sadmin/user-details/:sn',
  component: () => import('./View.vue')
})
