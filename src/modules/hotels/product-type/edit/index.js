import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/product-type-edit/:id',
  name: 'product_type_edit',
  component: () => import('./View.vue')
})
