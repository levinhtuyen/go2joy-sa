import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/invite-friend-create',
  name: 'inviteFriendCreate',
  component: () => import('./View.vue')
})
