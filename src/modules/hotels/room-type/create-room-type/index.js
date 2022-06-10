import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/create-room-type',
  name: 'createRoomType',
  component: () => import('./View.vue')
})
