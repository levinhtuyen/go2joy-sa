import router from '@/router'

router.addRoute('collection', {
  path: '/hotel/sadmin/collection-details/:sn',
  name: 'collectionDetails',
  component: () => import('./View.vue')
})
