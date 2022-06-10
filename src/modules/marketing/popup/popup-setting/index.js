import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/popup-setting',
  name: 'popupSetting',
  component: () => import('./View.vue')
})
