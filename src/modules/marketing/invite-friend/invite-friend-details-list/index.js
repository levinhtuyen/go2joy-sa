import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/invite-friend-details-list/:sn',
  name: 'inviteFriendDetailsList',
  component: () => import('./View.vue')
})
