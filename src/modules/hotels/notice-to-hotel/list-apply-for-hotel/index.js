import router from '@/router'
router.addRoute('hotels', {
  path: '/hotel/sadmin/list-apply-for-hotel',
  name: 'list_apply_for_hotel',
  component: () => import('./View.vue')
})
