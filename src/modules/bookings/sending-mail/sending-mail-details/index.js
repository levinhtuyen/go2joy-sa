import router from '@/router'

router.addRoute('booking', {
  path: '/hotel/sadmin/sending-mail-detail/:sn',
  name: 'sendingMailDetails',
  component: () => import('./View.vue')
})
