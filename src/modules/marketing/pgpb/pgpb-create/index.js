import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/pgpb-create',
  name: 'pgpbCreate',
  component: () => import('./View.vue')
})
