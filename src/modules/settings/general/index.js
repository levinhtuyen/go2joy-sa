import router from '@/router'

router.addRoute('settings', {
  name: 'generalSetting',
  path: '/hotel/sadmin/general-setting',
  component: () => import('./View.vue')
})
