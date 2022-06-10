import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/setting-fs',
  name: 'settingFs',
  component: () => import('./View.vue')
})
