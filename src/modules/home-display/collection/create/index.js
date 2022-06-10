import router from '@/router'

router.addRoute('collection', {
  path: '/hotel/sadmin/collection-create',
  name: 'collectionCreate',
  component: () => import('./View.vue')
})
