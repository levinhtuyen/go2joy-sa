import router from '@/router'

router.addRoute('marketing', {
  name: 'smsCreate',
  path: '/hotel/sadmin/sms-create',
  component: () => import('./View.vue')
})
