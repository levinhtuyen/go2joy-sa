import router from '@/router'

router.addRoute('saAccountMgt', {
  name: 'permission',
  path: '/hotel/sadmin/permission',
  component: () => import('./View.vue')
})
