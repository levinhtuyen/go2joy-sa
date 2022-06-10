import router from '@/router'

router.addRoute('counselings', {
  name: 'counselingMgt',
  path: '/hotel/sadmin/counseling',
  component: () => import('./View.vue')
})
