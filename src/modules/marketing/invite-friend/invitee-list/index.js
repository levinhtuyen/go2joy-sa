import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/invitee-list/:sn/:inviterUserSn?',
  name: 'inviteeList',
  component: () => import('./View.vue')
})
