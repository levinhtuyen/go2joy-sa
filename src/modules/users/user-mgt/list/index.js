import router from '@/router'

router.addRoute('user', {
  name: 'userMgt',
  path: '/hotel/sadmin/users',
  component: () => import('./View.vue')
})
