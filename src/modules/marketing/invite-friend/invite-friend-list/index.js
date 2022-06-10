import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/invite-friend',
  name: 'inviteFriend',
  component: () => import('./View.vue')
})
