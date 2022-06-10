import router from '@/router'

router.addRoute('marketing', {
  name: 'Article with title',
  path: '/hotel/sadmin/article-with-title',
  component: () => import('./View.vue')
})
router.addRoute('marketing', {
  name: 'Article with image',
  path: '/hotel/sadmin/article-with-image',
  component: () => import('./View.vue')
})
router.addRoute('marketing', {
  name: 'Article with summary',
  path: '/hotel/sadmin/article-with-summary',
  component: () => import('./View.vue')
})
router.addRoute('marketing', {
  name: 'Article collection',
  path: '/hotel/sadmin/article-collection',
  component: () => import('./View.vue')
})
