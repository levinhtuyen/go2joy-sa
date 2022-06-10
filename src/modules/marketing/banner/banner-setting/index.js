import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/banner-setting',
  name: 'bannerSetting',
  component: () => import('./View.vue')
})
