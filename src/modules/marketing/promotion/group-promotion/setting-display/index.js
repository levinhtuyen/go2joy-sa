import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/group-promotion-setting',
  name: 'settingGroupPromotion',
  component: () => import('./View.vue')
})
