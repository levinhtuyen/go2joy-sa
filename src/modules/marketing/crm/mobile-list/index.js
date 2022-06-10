import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/mobile-list/:sn',
  name: 'mobileList',
  component: () => import('./View.vue')
})
