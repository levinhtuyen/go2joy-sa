import router from '@/router'

router.addRoute({
  path: '/hotel/sadmin/profile',
  name: 'profile',
  component: () => import('./View.vue')
})
