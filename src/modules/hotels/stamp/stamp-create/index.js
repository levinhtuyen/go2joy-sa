import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/stamp-create',
  name: 'stampCreate',
  component: () => import('./View.vue')
})
