import router from '@/router'

router.addRoute('marketing', {
  name: 'articleSetup',
  path: '/hotel/sadmin/article-setup/:sn',
  component: () => import('./View.vue')
})
