import router from '@/router'

router.addRoute('booking', {
  path: '/hotel/sadmin/sending-mail',
  name: 'sendingMail',
  component: () => import('./View.vue')
})
