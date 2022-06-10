import router from '@/router'

router.addRoute('user', {
  name: 'userEdit',
  path: '/hotel/sadmin/user-edit/:sn',
  component: () => import('./View.vue')
})
