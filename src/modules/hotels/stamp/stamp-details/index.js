import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/stamp-detail/:sn',
  name: 'stampDetails',
  component: () => import('./View.vue')
})
