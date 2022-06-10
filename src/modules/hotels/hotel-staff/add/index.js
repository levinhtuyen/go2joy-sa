import router from '@/router'
router.addRoute('hotels', {
  path: '/hotel/sadmin/hotel-staff-create',
  name: 'hotel_staff_create',
  component: () => import('./View.vue')
})
