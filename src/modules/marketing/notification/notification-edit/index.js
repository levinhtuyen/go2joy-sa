import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/notification-edit/:sn',
  name: 'notificationEdit',
  component: () => import('./View.vue')
})
