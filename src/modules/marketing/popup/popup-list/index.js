import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/popup',
  name: 'popup',
  component: () => import('./View.vue')
})
