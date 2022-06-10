import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/notification-create',
  name: 'notificationCreate',
  component: () => import('./View.vue')
})
