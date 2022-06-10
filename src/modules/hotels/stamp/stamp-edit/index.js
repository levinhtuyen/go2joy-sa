import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/stamp-edit/:sn',
  name: 'stampEdit',
  component: () => import('./View.vue')
})
