import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/edit-room-type/:sn',
  name: 'editRoomType',
  component: () => import('./View.vue')
})
