import router from '@/router'
router.addRoute('hotels', {
  path: '/hotel/sadmin/create-apply-for-hotel',
  name: 'create_apply_for_hotel',
  component: () => import('./View.vue')
})
