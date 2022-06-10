import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/notification',
  name: 'notification',
  component: () => import('./View.vue')
})
