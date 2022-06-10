import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/notice-detail/:sn',
  name: 'noticeDetails',
  component: () => import('./View.vue')
})
