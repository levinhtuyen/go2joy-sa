
import router from '@/router'

router.addRoute('saAccountMgt', {
  name: 'go2joyStaffCreate',
  path: '/hotel/sadmin/staff-create',
  component: () => import('./View.vue')
})
