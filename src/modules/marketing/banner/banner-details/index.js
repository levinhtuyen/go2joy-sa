import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/banner-detail/:sn',
  name: 'bannerDetails',
  component: () => import('./View.vue')
})
