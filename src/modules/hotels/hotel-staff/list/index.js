import router from '@/router'
router.addRoute('hotels', {
  path: '/hotel/sadmin/hotel-staff-mgt',
  name: 'hotel_staff_mgt',
  component: () => import('./View.vue')
})
