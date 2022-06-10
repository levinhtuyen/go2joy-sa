import router from '@/router'

router.addRoute({
  path: '/hotel/sadmin/dashboard',
  name: 'home',
  component: () => import('./View.vue')
})
