import router from '@/router'

router.addRoute('saAccountMgt', {
  name: 'DetailsOfStaff',
  path: '/hotel/sadmin/detail-of-staff/:sn',
  component: () => import('./View.vue')
})
