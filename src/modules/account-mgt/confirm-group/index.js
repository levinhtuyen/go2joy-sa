
import router from '@/router'

router.addRoute('saAccountMgt', {
  name: 'go2joyConfirmGroup',
  path: '/hotel/sadmin/confirm-group-mgt',
  component: () => import('./View.vue')
})
