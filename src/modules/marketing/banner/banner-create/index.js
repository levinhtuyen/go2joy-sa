import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/banner-create',
  name: 'bannerCreate',
  component: () => import('./View.vue')
})
