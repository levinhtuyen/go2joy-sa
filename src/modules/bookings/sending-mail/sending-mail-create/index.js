import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/sending-mail-create',
  name: 'sendingMailCreate',
  component: () => import('./View.vue')
})
