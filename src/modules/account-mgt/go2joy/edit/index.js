
import router from '@/router'

router.addRoute('saAccountMgt', {
  name: 'go2joyStaffEdit',
  path: '/hotel/sadmin/staff-edit/:sn',
  component: () => import('./View.vue')
})
