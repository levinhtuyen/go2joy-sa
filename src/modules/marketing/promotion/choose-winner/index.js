import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/choose-winner/:sn',
  name: 'chooseWinner',
  component: () => import('./View.vue')
})
