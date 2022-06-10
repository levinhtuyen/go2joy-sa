import router from '@/router'
router.addRoute('hotels', {
  path: '/hotel/sadmin/hotel-group-mgt',
  name: 'hotel_group_mgt',
  component: () => import('./View.vue')
})
