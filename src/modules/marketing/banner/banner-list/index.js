import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/banner',
  name: 'banner',
  component: () => import('./View.vue')
})
