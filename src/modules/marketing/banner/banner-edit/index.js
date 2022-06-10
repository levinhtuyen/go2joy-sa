import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/banner-edit/:sn',
  name: 'bannerEdit',
  component: () => import('./View.vue')
})
