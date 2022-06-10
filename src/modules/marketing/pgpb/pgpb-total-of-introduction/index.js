import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/pgpb-total-of-introduction',
  name: 'pgpbTotalOfIntroduction',
  component: () => import('./View.vue')
})
