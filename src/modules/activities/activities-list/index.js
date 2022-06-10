import router from '@/router'

router.addRoute({
  path: '/hotel/sadmin/activities',
  name: 'activities',
  component: () => import('./View.vue')
})
