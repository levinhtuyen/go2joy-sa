
import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/room-type',
  name: 'roomType',
  component: () => import('./View.vue')
})
