import router from '@/router'

router.addRoute('marketing', {
  name: 'articleCreate',
  path: '/hotel/sadmin/article-create',
  component: () => import('./View.vue')
})
