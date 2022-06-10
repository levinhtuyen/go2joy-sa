import router from '@/router'

router.addRoute('marketing', {
  name: 'Pin article',
  path: '/hotel/sadmin/pin-article',
  component: () => import('./View.vue')
})
