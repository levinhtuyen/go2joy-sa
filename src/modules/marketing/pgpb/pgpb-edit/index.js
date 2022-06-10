import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/pgpb-edit/:sn',
  name: 'pgpbEdit',
  component: () => import('./View.vue')
})
