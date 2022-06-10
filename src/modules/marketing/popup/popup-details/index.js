import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/popup-detail/:sn',
  name: 'popupDetails',
  component: () => import('./View.vue')
})
