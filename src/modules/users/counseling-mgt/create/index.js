import router from '@/router'

router.addRoute('counselings', {
  name: 'createCounselings',
  path: '/hotel/sadmin/counseling/create',
  component: () => import('./View.vue')
})
