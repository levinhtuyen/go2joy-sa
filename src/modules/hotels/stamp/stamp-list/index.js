import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/stamp',
  name: 'stamp',
  component: () => import('./View.vue')
})
