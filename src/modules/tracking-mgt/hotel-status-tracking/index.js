import router from '@/router'

router.addRoute({
  path: '/hotel/sadmin/hotel-status-tracking-mgt',
  name: 'hotelStatusTrackingMgt',
  component: () => import('./View.vue')
})
