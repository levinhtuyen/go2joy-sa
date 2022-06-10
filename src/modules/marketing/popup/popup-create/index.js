import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/popup-create',
  name: 'popupCreate',
  component: () => import('./View.vue')
})
