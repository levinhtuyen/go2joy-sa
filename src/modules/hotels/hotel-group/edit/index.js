import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/hotel-group-edit/:id',
  name: 'hotel_group_edit',
  component: () => import('./View.vue')
})
