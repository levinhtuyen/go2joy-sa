import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/notice',
  name: 'notice',
  component: () => import('./View.vue')
})
