import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/notification-detail/:sn/:type?',
  name: 'notificationDetails',
  component: () => import('./View.vue')
})
