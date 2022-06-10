import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/notice-edit/:sn',
  name: 'noticeEdit',
  component: () => import('./View.vue')
})
