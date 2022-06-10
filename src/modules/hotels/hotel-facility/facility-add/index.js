import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/facility-create',
  name: 'facility_create',
  component: () => import('./View.vue')
})
