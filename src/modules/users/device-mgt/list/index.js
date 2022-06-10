import router from '@/router'

router.addRoute('device', {
  name: 'deviceMgt',
  path: '/hotel/sadmin/device',
  component: () => import('./View.vue')
})
