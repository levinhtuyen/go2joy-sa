import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/hotel-group-detail/:id',
  name: 'hotel_group_detail',
  component: () => import('./View.vue')
})
