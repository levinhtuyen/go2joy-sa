import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/pgpb',
  name: 'pgpb',
  component: () => import('./View.vue')
})
