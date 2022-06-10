import router from '@/router'

router.addRoute('mileagePointMgt', {
  name: 'mpUserMgt',
  path: '/hotel/sadmin/mp-user-mgt',
  component: () => import('./View.vue')
})
