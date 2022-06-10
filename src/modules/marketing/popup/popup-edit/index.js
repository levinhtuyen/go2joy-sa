import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/popup-edit/:sn',
  name: 'popupEdit',
  component: () => import('./View.vue')
})
