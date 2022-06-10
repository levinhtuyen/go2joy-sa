import router from '@/router'

router.addRoute('settings', {
  name: 'openSecondSplashCreate',
  path: '/hotel/sadmin/open-second-splash-create',
  component: () => import('./View.vue')
})
