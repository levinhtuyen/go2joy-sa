import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/notice-create',
  name: 'noticeCreate',
  component: () => import('./View.vue')
})
