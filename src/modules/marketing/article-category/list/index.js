import router from '@/router'

router.addRoute('marketing', {
  name: 'articleCategory',
  path: '/hotel/sadmin/article-category',
  component: () => import('./View.vue')
})
