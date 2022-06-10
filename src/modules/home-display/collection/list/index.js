import router from '@/router'

router.addRoute({
  path: '/hotel/sadmin/collection',
  name: 'collection',
  component: () => import('./View.vue')
})
