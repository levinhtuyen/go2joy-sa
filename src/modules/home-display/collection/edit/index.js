import router from '@/router'

router.addRoute('collection', {
  path: '/hotel/sadmin/edit-collection/:sn',
  name: 'collectionEdit',
  component: () => import('./View.vue')
})
