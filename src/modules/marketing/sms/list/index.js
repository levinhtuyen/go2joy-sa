import router from '@/router'

router.addRoute('marketing', {
  name: 'sms',
  path: '/hotel/sadmin/sms',
  component: () => import('./View.vue')
})
