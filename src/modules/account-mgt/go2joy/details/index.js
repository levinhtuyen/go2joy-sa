
import router from '@/router'

router.addRoute('saAccountMgt', {
  name: 'go2joyStaffDetails',
  path: '/hotel/sadmin/staff-details/:sn',
  component: () => import('./View.vue')
})
