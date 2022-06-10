import router from '@/router'

router.addRoute('marketing', {
  name: 'articleCategoryEdit',
  path: '/hotel/sadmin/article-category-edit/:sn',
  component: () => import('./View.vue')
})
