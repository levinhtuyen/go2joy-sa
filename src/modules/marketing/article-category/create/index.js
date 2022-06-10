import router from '@/router'

router.addRoute('marketing', {
  name: 'articleCategoryCreate',
  path: '/hotel/sadmin/article-category-create',
  component: () => import('./View.vue')
})
