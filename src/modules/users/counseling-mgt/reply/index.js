import router from '@/router'

router.addRoute('counselings', {
  name: 'replyCounselings',
  path: '/hotel/sadmin/counseling/reply/:sn',
  component: () => import('./View.vue')
})
