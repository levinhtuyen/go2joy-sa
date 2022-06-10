import router from '@/router'

router.addRoute('settings', {
  name: 'openSecondSplash',
  path: '/hotel/sadmin/open-second-splash',
  component: () => import('./View.vue')
})
