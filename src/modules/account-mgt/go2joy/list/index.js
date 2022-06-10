import router from '@/router'

router.addRoute('saAccountMgt', {
  name: 'go2joyStaffs',
  path: '/hotel/sadmin/staffs-management',
  component: () => import('./View.vue')
})
