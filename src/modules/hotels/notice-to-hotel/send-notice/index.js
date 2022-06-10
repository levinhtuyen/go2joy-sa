import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/send-notice-to-hotel/:id',
  name: 'send_notice_to_hotel',
  component: () => import('./View.vue')
})
